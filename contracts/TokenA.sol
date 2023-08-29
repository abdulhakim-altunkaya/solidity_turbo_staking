//SPDX-License-Identifier: MIT

pragma solidity >= 0.8.7;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Jumbo Swap AMM Pool will need two tokens: TokenA and TokenB.
//Tokens are created with a cap. That's why it is ERC20Capped. Cap will be 1.000.000
contract TokenA is Ownable, ERC20Capped {

    //Token burning and minting events
    event TokenMinted(address minter, uint amount);
    event TokenBurned(address burner, uint amount);

    //creating token
    constructor(uint cap) ERC20("TokenA", "TOKA") ERC20Capped(cap*(10**18)) {
    }

    //minting function for owner, decimals handled
    function mintToken(uint _amount) external onlyOwner {
        require(_amount > 0 && _amount < 100000, "mint between 0 and 100000");
        _mint(msg.sender, _amount*(10**18));
        emit TokenMinted(msg.sender, _amount);
    }

    //minting function for generals, decimals handled
    function mintTokenGenerals(uint _amount) external  {
        require(_amount > 0 && _amount < 500, "mint between 0 and 500");
        _mint(msg.sender, _amount*(10**18));
        emit TokenMinted(msg.sender, _amount);
    }

    //burning token function, no need set a higher limit, decimals handled
    function burnToken(uint _amount) external {
        require(_amount > 0, "burn amount must be greater than 0");
        _burn(msg.sender, _amount*(10**18));
        emit TokenBurned(msg.sender, _amount);
    }

    //approve swap contract before sending tokens to it for liquidity, decimals handled
    function approvePanda(address _pandaContract, uint _amount) external {
        require(_amount > 0, "approve amount must be greater than 0");
        uint amount = _amount*(10**18);
        _approve(msg.sender, _pandaContract, amount);
    }

    //general view functions, you can understand what they do from names, decimals handled
    function getTotalSupply() external view returns(uint) {
        return totalSupply() / (10**18);
    }

    function getContractAddress() external view returns(address) {
        return address(this);
    } 

    function getYourBalance() external view returns(uint) {
        return balanceOf(msg.sender) / (10**18);
    }

    function getContractBalance() external view returns(uint) {
        return balanceOf(address(this)) / (10**18);
    }

}