// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CoreToken.sol";

contract VaultManager {
    // ------------------------------
    // State Variables
    // ------------------------------

    CoreToken public coreToken; // CORE stablecoin contract
    address public treasury; // Treasury contract or EOA
    uint256 public constant MIN_COLLATERAL_RATIO = 150; // Minimum collateral ratio (150%)
    uint256 public constant LIQUIDATION_PENALTY = 10; // Liquidation penalty (10%)

    enum VaultStatus {
        Active,
        Liquidated,
        Dissolved
    } // Possible states of a vault

    struct Vault {
        string name; // Name of the vault
        uint256 collateral; // Amount of EDU tokens deposited
        uint256 debt; // Amount of CORE tokens borrowed
        VaultStatus status; // Status of the vault
        uint256 createdDate; // Timestamp of vault creation
        uint256 liquidatedDate; // Timestamp when liquidated (if applicable)
        uint256 dissolvedDate; // Timestamp when fully repaid (if applicable)
    }

    mapping(address => Vault[]) public userVaults; // User-specific array of vaults

    // EDU price in USD (mocked for now, changeable via `updatePrice`)
    uint256 public eduPrice = 0.6 * 1e18; // $0.5 per EDU token (1e18 precision)

    // ------------------------------
    // Events
    // ------------------------------

    event VaultCreated(address indexed user, uint256 vaultId, string name, uint256 timestamp);
    event CollateralDeposited(address indexed user, uint256 vaultId, uint256 amount);
    event DebtMinted(address indexed user, uint256 vaultId, uint256 amount);
    event DebtRepaid(address indexed user, uint256 vaultId, uint256 amount);
    event CollateralWithdrawn(address indexed user, uint256 vaultId, uint256 amount);
    event VaultLiquidated(address indexed user, uint256 vaultId, uint256 collateralSeized, uint256 remainingCollateral, uint256 timestamp);
    event VaultDissolved(address indexed user, uint256 vaultId, uint256 timestamp);
    event CollateralRedeemed(address indexed user, uint256 vaultId, uint256 amount);
    event PriceUpdated(uint256 newPrice);

    // ------------------------------
    // Constructor
    // ------------------------------

    /**
     * @dev Initializes the VaultManager contract.
     * @param _coreToken Address of the CORE token contract.
     * @param _treasury Address of the treasury contract or EOA.
     */
    constructor(address _coreToken, address _treasury) {
        require(_coreToken != address(0), "VaultManager: Invalid CORE token address");
        require(_treasury != address(0), "VaultManager: Invalid treasury address");

        coreToken = CoreToken(_coreToken);
        treasury = _treasury;
    }

    // ------------------------------
    // Modifiers
    // ------------------------------

    /**
     * @dev Ensures the vault exists and is active.
     */
    modifier onlyExistingVault(uint256 vaultId) {
        require(vaultId < userVaults[msg.sender].length, "VaultManager: Invalid vault ID");
        Vault storage vault = userVaults[msg.sender][vaultId];
        require(vault.status == VaultStatus.Active, "VaultManager: Vault is not active");
        _;
    }

    // ------------------------------
    // User Functions
    // ------------------------------

    /**
     * @dev Allows a user to create a new vault.
     * @param name The name of the vault.
     */
    function createVault(string memory name) external {
        userVaults[msg.sender].push(
            Vault({
                name: name,
                collateral: 0,
                debt: 0,
                status: VaultStatus.Active,
                createdDate: block.timestamp,
                liquidatedDate: 0,
                dissolvedDate: 0
            })
        );
        emit VaultCreated(msg.sender, userVaults[msg.sender].length - 1, name, block.timestamp);
    }

    /**
     * @dev Deposit EDU tokens into a specific vault.
     * @param vaultId The ID of the vault.
     */
    function depositCollateral(uint256 vaultId) external payable onlyExistingVault(vaultId) {
        require(msg.value > 0, "VaultManager: Cannot deposit zero amount");

        Vault storage vault = userVaults[msg.sender][vaultId];
        vault.collateral += msg.value;

        emit CollateralDeposited(msg.sender, vaultId, msg.value);
    }

    /**
     * @dev Mint CORE tokens from the collateral in the vault.
     * @param vaultId The ID of the vault.
     * @param amount The amount of CORE tokens to mint.
     */
    function mintCORE(uint256 vaultId, uint256 amount) external onlyExistingVault(vaultId) {
        require(amount > 0, "VaultManager: Cannot mint zero amount");

        Vault storage vault = userVaults[msg.sender][vaultId];
        uint256 maxMintable = (vault.collateral * eduPrice) / 1e18 / MIN_COLLATERAL_RATIO;

        require(vault.debt + amount <= maxMintable, "VaultManager: Exceeds mintable limit");

        vault.debt += amount;
        coreToken.mint(msg.sender, amount);

        emit DebtMinted(msg.sender, vaultId, amount);
    }

    /**
     * @dev Repay CORE debt to reduce the user's debt.
     * @param vaultId The ID of the vault.
     * @param amount The amount of CORE tokens to repay.
     */
    function repayCORE(uint256 vaultId, uint256 amount) external onlyExistingVault(vaultId) {
        require(amount > 0, "VaultManager: Cannot repay zero amount");

        Vault storage vault = userVaults[msg.sender][vaultId];
        require(vault.debt >= amount, "VaultManager: Repay amount exceeds debt");

        coreToken.burn(msg.sender, amount);
        vault.debt -= amount;

        if (vault.debt == 0) {
            vault.status = VaultStatus.Dissolved;
            vault.dissolvedDate = block.timestamp;
            emit VaultDissolved(msg.sender, vaultId, block.timestamp);
        }

        emit DebtRepaid(msg.sender, vaultId, amount);
    }

    /**
     * @dev Withdraw EDU collateral from the vault.
     * @param vaultId The ID of the vault.
     * @param amount The amount of collateral to withdraw.
     */
    function withdrawCollateral(uint256 vaultId, uint256 amount) external onlyExistingVault(vaultId) {
        require(amount > 0, "VaultManager: Cannot withdraw zero amount");

        Vault storage vault = userVaults[msg.sender][vaultId];
        uint256 remainingCollateral = vault.collateral - amount;
        uint256 requiredCollateral = (vault.debt * MIN_COLLATERAL_RATIO) / eduPrice;

        require(remainingCollateral >= requiredCollateral, "VaultManager: Collateral ratio too low after withdrawal");

        vault.collateral -= amount;
        payable(msg.sender).transfer(amount);

        emit CollateralWithdrawn(msg.sender, vaultId, amount);
    }

    /**
     * @dev Liquidate a vault that is below the collateralization threshold.
     * @param user The address of the vault owner.
     * @param vaultId The ID of the vault to liquidate.
     */
    function liquidateVault(address user, uint256 vaultId) external {
        Vault storage vault = userVaults[user][vaultId];
        require(vault.status == VaultStatus.Active, "VaultManager: Vault already liquidated");

        uint256 collateralValue = (vault.collateral * eduPrice) / 1e18;
        uint256 requiredCollateral = (vault.debt * MIN_COLLATERAL_RATIO) / 100;

        require(collateralValue < requiredCollateral, "VaultManager: Vault is sufficiently collateralized");

        uint256 totalSeizedValue = vault.debt + (vault.debt * LIQUIDATION_PENALTY) / 100;
        uint256 seizedCollateral = (totalSeizedValue * 1e18) / eduPrice;

        vault.collateral -= seizedCollateral;
        vault.status = VaultStatus.Liquidated;
        vault.liquidatedDate = block.timestamp;

        payable(treasury).transfer(seizedCollateral);

        emit VaultLiquidated(user, vaultId, seizedCollateral, vault.collateral, block.timestamp);
    }

    // ------------------------------
    // View Functions
    // ------------------------------

    /**
     * @dev Get all details of a specific vault, including name and timestamps.
     */
    function getVaultDetails(address user, uint256 vaultId)
        external
        view
        returns (
            string memory name,
            uint256 collateral,
            uint256 debt,
            VaultStatus status,
            uint256 createdDate,
            uint256 liquidatedDate,
            uint256 dissolvedDate
        )
    {
        Vault storage vault = userVaults[user][vaultId];
        return (
            vault.name,
            vault.collateral,
            vault.debt,
            vault.status,
            vault.createdDate,
            vault.liquidatedDate,
            vault.dissolvedDate
        );
    }
}
