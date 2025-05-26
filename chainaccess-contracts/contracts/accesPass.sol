// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AccessPass {
    mapping(address => bool) public hasAccess;

    function claimAccess() external {
        require(!hasAccess[msg.sender], "Already claimed.");
        hasAccess[msg.sender] = true;
    }

    function checkAccess(address user) external view returns (bool) {
        return hasAccess[user];
    }
}
