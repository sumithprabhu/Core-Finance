// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // Provides admin control for the owner

contract Treasury is Ownable {
    // ------------------------------
    // State Variables
    // ------------------------------

    IERC20 public eduToken;   // EDU token contract (collateral seized during liquidation)
    IERC20 public coreToken;  // CORE token contract (commission from loan repayment)

    uint256 public totalEDUCollateral; // Total EDU tokens held in the treasury
    uint256 public totalCORECommission; // Total CORE tokens held as commission

    // ------------------------------
    // Events
    // ------------------------------

    event CollateralDeposited(address indexed from, uint256 amount);
    event CommissionAdded(address indexed from, uint256 amount);
    event EDUTransferred(address indexed to, uint256 amount);
    event CORETransferred(address indexed to, uint256 amount);

    // ------------------------------
    // Constructor
    // ------------------------------

    /**
     * @dev Initializes the Treasury contract.
     * @param _eduToken Address of the EDU token contract.
     * @param _coreToken Address of the CORE token contract.
     */
    constructor(address _eduToken, address _coreToken) {
        require(_eduToken != address(0), "Treasury: Invalid EDU token address");
        require(_coreToken != address(0), "Treasury: Invalid CORE token address");

        eduToken = IERC20(_eduToken);
        coreToken = IERC20(_coreToken);
    }

    // ------------------------------
    // Core Functions
    // ------------------------------

    /**
     * @dev Allows the `VaultManager` to deposit liquidated EDU collateral.
     * @param amount The amount of EDU tokens to deposit.
     */
    function depositCollateral(uint256 amount) external {
        require(amount > 0, "Treasury: Cannot deposit zero amount");

        // Transfer EDU tokens from the sender (VaultManager) to this contract
        bool success = eduToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Treasury: Transfer failed");

        // Update total EDU collateral held
        totalEDUCollateral += amount;

        emit CollateralDeposited(msg.sender, amount);
    }

    /**
     * @dev Adds CORE commission to the treasury during loan repayment.
     * @param amount The amount of CORE tokens to add as commission.
     */
    function addCommission(uint256 amount) external {
        require(amount > 0, "Treasury: Cannot add zero commission");

        // Transfer CORE tokens from the sender (VaultManager or user) to this contract
        bool success = coreToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Treasury: Transfer failed");

        // Update total CORE commission held
        totalCORECommission += amount;

        emit CommissionAdded(msg.sender, amount);
    }

    /**
     * @dev Allows the owner to transfer EDU collateral from the treasury.
     * @param to The address to which the EDU tokens will be transferred.
     * @param amount The amount of EDU tokens to transfer.
     */
    function transferEDU(address to, uint256 amount) external onlyOwner {
        require(amount > 0, "Treasury: Cannot transfer zero amount");
        require(amount <= totalEDUCollateral, "Treasury: Insufficient EDU collateral");

        // Transfer EDU tokens to the specified address
        bool success = eduToken.transfer(to, amount);
        require(success, "Treasury: Transfer failed");

        // Update total EDU collateral held
        totalEDUCollateral -= amount;

        emit EDUTransferred(to, amount);
    }

    /**
     * @dev Allows the owner to transfer CORE commission from the treasury.
     * @param to The address to which the CORE tokens will be transferred.
     * @param amount The amount of CORE tokens to transfer.
     */
    function transferCORE(address to, uint256 amount) external onlyOwner {
        require(amount > 0, "Treasury: Cannot transfer zero amount");
        require(amount <= totalCORECommission, "Treasury: Insufficient CORE commission");

        // Transfer CORE tokens to the specified address
        bool success = coreToken.transfer(to, amount);
        require(success, "Treasury: Transfer failed");

        // Update total CORE commission held
        totalCORECommission -= amount;

        emit CORETransferred(to, amount);
    }

    // ------------------------------
    // View Functions
    // ------------------------------

    /**
     * @dev Returns the total EDU collateral held in the treasury.
     * @return Total EDU tokens held.
     */
    function getTotalEDUCollateral() external view returns (uint256) {
        return totalEDUCollateral;
    }

    /**
     * @dev Returns the total CORE commission held in the treasury.
     * @return Total CORE tokens held.
     */
    function getTotalCORECommission() external view returns (uint256) {
        return totalCORECommission;
    }
}
