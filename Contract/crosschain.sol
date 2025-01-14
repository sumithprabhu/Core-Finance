// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./cUSD.sol";
import "./cEDU.sol";

contract LiquidityPool is Ownable {
    // Stablecoin Pool Tokens
    IERC20 public usdc;
    IERC20 public usdt;
    IERC20 public dai;

    // EDU Token
    IERC20 public edu;

    // Protocol Tokens
    cUSD public cUsd;
    cEDU public cEdu;

    // Events
    event LiquidityAdded(address indexed user, string poolType, uint256 amount);
    event LiquidityRemoved(address indexed user, string poolType, uint256 amount);
    event SwapInitiated(
        address indexed user,
        string fromToken,
        string toToken,
        uint256 amount,
        string destinationChain
    );
    event SwapCompleted(address indexed user, string toToken, uint256 amount);

    constructor(
        address _initialOwner,
        address _usdc,
        address _usdt,
        address _dai,
        address _edu,
        address _cUsd,
        address _cEdu
    )Ownable(_initialOwner) {
        usdc = IERC20(_usdc);
        usdt = IERC20(_usdt);
        dai = IERC20(_dai);
        edu = IERC20(_edu);
        cUsd = cUSD(_cUsd);
        cEdu = cEDU(_cEdu);
    }

    // ------------------------------
    // Liquidity Management
    // ------------------------------

    /**
     * @dev Add liquidity to a specific pool.
     * @param poolType The pool type ("stable" or "edu").
     * @param token Address of the token to add (e.g., USDC, USDT, DAI, EDU).
     * @param amount Amount of tokens to add.
     */
    function addLiquidity(
        string memory poolType,
        address token,
        uint256 amount
    ) external {
        require(amount > 0, "Amount must be greater than 0");

        if (keccak256(abi.encodePacked(poolType)) == keccak256(abi.encodePacked("stable"))) {
            require(
                token == address(usdc) || token == address(usdt) || token == address(dai),
                "Invalid stablecoin"
            );

            // Transfer token to pool
            IERC20(token).transferFrom(msg.sender, address(this), amount);

            // Mint equivalent cUSD
            cUsd.mint(address(this), amount);
        } else if (keccak256(abi.encodePacked(poolType)) == keccak256(abi.encodePacked("edu"))) {
            require(token == address(edu), "Invalid EDU token");

            // Transfer token to pool
            IERC20(token).transferFrom(msg.sender, address(this), amount);

            // Mint equivalent cEDU
            cEdu.mint(address(this), amount);
        } else {
            revert("Invalid pool type");
        }

        emit LiquidityAdded(msg.sender, poolType, amount);
    }

    /**
     * @dev Remove liquidity from a specific pool.
     * @param poolType The pool type ("stable" or "edu").
     * @param token Address of the token to remove (e.g., USDC, USDT, DAI, EDU).
     * @param amount Amount of tokens to remove.
     */
    function removeLiquidity(
        string memory poolType,
        address token,
        uint256 amount
    ) external {
        require(amount > 0, "Amount must be greater than 0");

        if (keccak256(abi.encodePacked(poolType)) == keccak256(abi.encodePacked("stable"))) {
            require(
                token == address(usdc) || token == address(usdt) || token == address(dai),
                "Invalid stablecoin"
            );

            // Burn equivalent cUSD
            cUsd.burn(address(this), amount);

            // Transfer token back to user
            IERC20(token).transfer(msg.sender, amount);
        } else if (keccak256(abi.encodePacked(poolType)) == keccak256(abi.encodePacked("edu"))) {
            require(token == address(edu), "Invalid EDU token");

            // Burn equivalent cEDU
            cEdu.burn(address(this), amount);

            // Transfer token back to user
            IERC20(token).transfer(msg.sender, amount);
        } else {
            revert("Invalid pool type");
        }

        emit LiquidityRemoved(msg.sender, poolType, amount);
    }

    // ------------------------------
    // Swap Logic
    // ------------------------------

       /**
     * @dev Swap tokens on the source chain (Handles both cUSD and cEDU swaps).
     * @param fromToken Address of the token to swap from (e.g., USDC, EDU).
     * @param amount Amount of tokens to swap.
     * @param destinationChain The destination chain identifier.
     */
    function swap(
        address fromToken,
        uint256 amount,
        string memory destinationChain
    ) external {
        require(amount > 0, "Amount must be greater than 0");

        if (
            fromToken == address(usdc) || 
            fromToken == address(usdt) || 
            fromToken == address(dai)
        ) {
            // Transfer the stablecoin to the pool
            IERC20(fromToken).transferFrom(msg.sender, address(this), amount);

            // Burn the equivalent cUSD
            cUsd.burn(address(this), amount);

            emit SwapInitiated(msg.sender, "Stablecoin", "cUSD", amount, destinationChain);
        } else if (fromToken == address(edu)) {
            // Transfer EDU to the pool
            IERC20(fromToken).transferFrom(msg.sender, address(this), amount);

            // Burn the equivalent cEDU
            cEdu.burn(address(this), amount);

            emit SwapInitiated(msg.sender, "EDU", "cEDU", amount, destinationChain);
        } else {
            revert("Invalid token for swapping");
        }
    }

    /**
     * @dev Receive a cross-chain swap on the destination chain (Handles both cUSD and cEDU).
     * @param toToken Address of the token to swap to (e.g., USDC, EDU).
     * @param amount Amount of tokens to swap.
     * @param user Address of the user to receive tokens.
     */
    function receiveSwap(
        address toToken,
        uint256 amount,
        address user
    ) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");

        if (
            toToken == address(usdc) || 
            toToken == address(usdt) || 
            toToken == address(dai)
        ) {
            // Mint equivalent cUSD
            cUsd.mint(address(this), amount);

            // Transfer the equivalent stablecoin to the user
            IERC20(toToken).transfer(user, amount);

            emit SwapCompleted(user, "Stablecoin", amount);
        } else if (toToken == address(edu)) {
            // Mint equivalent cEDU
            cEdu.mint(address(this), amount);

            // Transfer EDU to the user
            IERC20(toToken).transfer(user, amount);

            emit SwapCompleted(user, "EDU", amount);
        } else {
            revert("Invalid token for receiving swap");
        }
    }

    /**
 * @dev Get balances for all tokens in the pool (USDC, USDT, DAI, cUSD, cEDU, EDU).
 * @return usdcBalance Balance of USDC in the pool.
 * @return usdtBalance Balance of USDT in the pool.
 * @return daiBalance Balance of DAI in the pool.
 * @return cUsdBalance Balance of cUSD in the pool.
 * @return cEduBalance Balance of cEDU in the pool.
 * @return eduBalance Balance of EDU in the pool.
 */

    function getAllTokenBalances()
    external
    view
    returns (
        uint256 usdcBalance,
        uint256 usdtBalance,
        uint256 daiBalance,
        uint256 cUsdBalance,
        uint256 cEduBalance,
        uint256 eduBalance
    )
{
    usdcBalance = usdc.balanceOf(address(this));
    usdtBalance = usdt.balanceOf(address(this));
    daiBalance = dai.balanceOf(address(this));
    cUsdBalance = cUsd.balanceOf(address(this));
    cEduBalance = cEdu.balanceOf(address(this));
    eduBalance = edu.balanceOf(address(this));

    return (usdcBalance, usdtBalance, daiBalance, cUsdBalance, cEduBalance, eduBalance);
}


    // ------------------------------
    // View Functions
    // ------------------------------

    /**
     * @dev Get the balance of a specific token in the pool.
     * @param token Address of the token to check.
     * @return Balance of the token in the pool.
     */
    function getPoolBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    /**
     * @dev Get the balance of cUSD in the pool.
     * @return Balance of cUSD in the pool.
     */
    function getCUsdBalance() external view returns (uint256) {
        return cUsd.balanceOf(address(this));
    }

    /**
     * @dev Get the balance of cEDU in the pool.
     * @return Balance of cEDU in the pool.
     */
    function getCEduBalance() external view returns (uint256) {
        return cEdu.balanceOf(address(this));
    }
}
