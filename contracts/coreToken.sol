// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Import OpenZeppelin's ERC20 Standard
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoreToken is ERC20, Ownable {
    // ------------------------------
    // State Variables
    // ------------------------------

    address public vaultManager; // Address of the VaultManager contract

    // Events
    event Mint(address indexed account, uint256 amount);
    event Burn(address indexed account, uint256 amount);
    event VaultManagerUpdated(address indexed newVaultManager);

    // ------------------------------
    // Constructor
    // ------------------------------

    constructor() ERC20("Core Finance", "CORE") {
        // Initially, the owner is the deployer, but VaultManager will be added later
    }

    // ------------------------------
    // Modifiers
    // ------------------------------

    modifier onlyVaultManager() {
        require(msg.sender == vaultManager, "CoreToken: Not authorized");
        _;
    }

    // ------------------------------
    // VaultManager Control
    // ------------------------------

    /**
     * @dev Set the VaultManager contract address.
     * Can only be set by the contract owner.
     * @param _vaultManager Address of the VaultManager contract.
     */
    function setVaultManager(address _vaultManager) external onlyOwner {
        require(_vaultManager != address(0), "CoreToken: Invalid address");
        vaultManager = _vaultManager;
        emit VaultManagerUpdated(_vaultManager);
    }

    // ------------------------------
    // Minting and Burning
    // ------------------------------

    /**
     * @dev Mint CORE stablecoins to a specified account.
     * Can only be called by the VaultManager.
     * @param account Address to mint tokens to.
     * @param amount Amount of tokens to mint.
     */
    function mint(address account, uint256 amount) external onlyVaultManager {
        require(account != address(0), "CoreToken: Cannot mint to zero address");
        require(amount > 0, "CoreToken: Mint amount must be greater than zero");

        _mint(account, amount);
        emit Mint(account, amount);
    }

    /**
     * @dev Burn CORE stablecoins from a specified account.
     * Can only be called by the VaultManager.
     * @param account Address to burn tokens from.
     * @param amount Amount of tokens to burn.
     */
    function burn(address account, uint256 amount) external onlyVaultManager {
        require(account != address(0), "CoreToken: Cannot burn from zero address");
        require(amount > 0, "CoreToken: Burn amount must be greater than zero");

        _burn(account, amount);
        emit Burn(account, amount);
    }

    // ------------------------------
    // View Functions
    // ------------------------------

    /**
     * @dev Returns the total supply of CORE tokens.
     * @return Total supply of CORE tokens.
     */
    function getTotalSupply() external view returns (uint256) {
        return totalSupply();
    }

    /**
     * @dev Returns the balance of a specific address.
     * @param account Address to query the balance of.
     * @return Balance of the given address.
     */
    function getBalanceOf(address account) external view returns (uint256) {
        return balanceOf(account);
    }
}
