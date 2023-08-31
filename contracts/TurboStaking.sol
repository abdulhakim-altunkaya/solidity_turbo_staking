// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TurboStaking is Ownable {
    event Staked(address stakerAddress, uint amount);
    event Unstaked(address unstaker, uint index);
    event RewardClaimed(address claimer, uint index, uint amount);
    event RewardStaked(address rewardStaker, uint index, uint amount);
    event StakeDecreased(address receiver, uint index, uint decreaseAmount);

    // --- STATE VARIABLES ---
    //Each stake will have data presented here.
    struct StakeDetails {
        uint amount;
        uint startTime;
    }
    //Main mapping. A person can stake many times. Each stake will have record. And each stake
    //will be saved inside StakeDetails array.
    mapping(address => StakeDetails[]) public StakeDetailsMapping;
    //keeping track of how much staked. Will be used for control checks.
    mapping(address => uint) public stakers;
    //Keeping track total staked amount in the system.
    uint public totalStaked;
    //tokenA address to be assigned by a function
    IERC20 public tokenA;

    // --- MODIFIERS ---
    error NotStaker(address caller, string message);
    modifier onlyStakers() {
        if(stakers[msg.sender] == 0 ) {
            revert NotStaker(msg.sender, "you have 0 stake amount");
        }
        _;
    }

    //MODIFIER-2: Pausing system in case of emergencies, onlyOwner can pause and unpause
    bool public isPaused = false;
    modifier pauseStatus() {
        if(isPaused == true) {
            revert("System is paused, contact Owner");
        }
        _;
    }
    function togglePause() external onlyOwner {
        isPaused = !isPaused;
    }

    // SUPPORT FUNCTION 1: apy and apy update function. onlyOwner can call function.
    // 10 means 10% apy.
    uint public apy = 10;
    function updateApy(uint _newApy) external onlyOwner {
        require(_newApy != 0 && _newApy < 30, "apy should have reasonable limits");
        apy = _newApy;
    }

    // SUPPORT FUNCTION 2: assigning token address
    function setToken (address _tokenA) external onlyOwner {
        tokenA = IERC20(_tokenA);
    }

    // SUPPORT FUNCTION 3: calculate stake reward
    // Reward will be calculated on a daily basis on compound interest formula. Current apy is 10%.
    // startTime will be obtained from staking record. Endtime will be function block.timestamp
    function calculateReward(uint _amount, uint _startTime) internal view returns(uint) {
        uint principal = _amount;
        //getting number of days stake remained in the system
        uint numberDays = (block.timestamp - _startTime) / 1 days;
        //calculating reward(yield) on a daily basis
        for(uint i=0; i<numberDays; i++) {
            principal += principal * (apy/365);
        }
        uint reward = principal - _amount;
        return reward;
    }   

    //user can claim reward for his/her stakes. To specify which stake, user needs to enter an index number
    //for the  StakeDetails[] array. User can specify his choice on the frontend website, and later web3
    //functions will convey the index number to the function below.
    function claimReward(address _to, uint _index) external onlyStakers pauseStatus {
        //input checks
        require(_to != address(0), "Cannot claim from address 0");

        uint stakeAmount = StakeDetailsMapping[msg.sender][_index].amount;
        uint stakeTime = StakeDetailsMapping[msg.sender][_index].startTime;
        
        require(stakeAmount > 0, "stake amount must be bigger than 0");

        uint reward = calculateReward(stakeAmount, stakeTime);
        //staking reset, rewards reset
        StakeDetailsMapping[msg.sender][_index].startTime = block.timestamp;
        tokenA.transfer(_to, reward);

        emit RewardClaimed(msg.sender, _index, reward);
    }

    //In case person would like to stake his reward, they can stake it here
    function stakeReward(uint _index) external onlyStakers pauseStatus {

        //fetching stake details for reward(yield) calculation
        uint stakeAmount = StakeDetailsMapping[msg.sender][_index].amount;
        uint stakeTime = StakeDetailsMapping[msg.sender][_index].startTime;
        require(stakeAmount > 0, "stake amount must be bigger than 0");
        uint reward = calculateReward(stakeAmount, stakeTime);

        //staking reset, rewards reset
        StakeDetailsMapping[msg.sender][_index].startTime = block.timestamp;
        //total stake amount of msg.sender increases with every new stake
        stakers[msg.sender] += reward;
        //Total staked amount in the system increases
        totalStaked += reward;

        //Creating a new stake record
        StakeDetails memory newStake = StakeDetails(reward, block.timestamp);
        //pushing new stake record to the stake array of the msg.sender
        StakeDetailsMapping[msg.sender].push(newStake);

        emit RewardStaked(msg.sender, _index, reward);
    }


    //Function lets everyone to stake anytime they want and as many times they want.
    //Each stake will be a new staking record.
    function stake(uint _amount) public pauseStatus {
        require(msg.sender != address(0), "Cannot stake from address 0");
        require(_amount > 0, "stake must be > 0");
        
        //decimals are handled by the function.
        uint amount = _amount * (10**18);

        //assumption: user already approved contract. Now we can transfer tokens for staking.
        tokenA.transferFrom(msg.sender, address(this), amount);

        //creating a new stake record and saving it inside user stake array
        StakeDetails memory newStake = StakeDetails(amount, block.timestamp);
        StakeDetailsMapping[msg.sender].push(newStake);

        //total stake amount of msg.sender increases with every new stake
        stakers[msg.sender] += amount;
        //all stake amount  in the system increases
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    //users can unstake their stakes. In this unstaking amount + accummulated reward will be
    //transferred to the msg.sender
    function unstake(address _to, uint _index) external onlyStakers pauseStatus {
        //input and general checks
        require(_to != address(0), "Cannot claim from address 0");
        require(msg.sender != address(0), "Cannot stake from address 0");

        //fetching stake details and calculating reward(yield)
        uint stakeAmount = StakeDetailsMapping[msg.sender][_index].amount;
        uint stakeTime = StakeDetailsMapping[msg.sender][_index].startTime;
        require(stakeAmount > 0, "stake amount must be bigger than 0");
        uint reward = calculateReward(stakeAmount, stakeTime);

        uint totalAmount = stakeAmount + reward;

        //staking reset, rewards reset
        StakeDetailsMapping[msg.sender][_index].amount = 0;
        StakeDetailsMapping[msg.sender][_index].startTime = block.timestamp;

        tokenA.transfer(_to, totalAmount);

        emit Unstaked(_to, _index);
    }

    function decreaseStake(uint _index, uint _decreaseAmount, address _to) external onlyStakers pauseStatus { 
        //input and general checks
        require(_to != address(0), "Cannot claim from address 0");
        require(msg.sender != address(0), "Cannot stake from address 0");

        //decimals are handled by the function.
        uint decreaseAmount = _decreaseAmount * (10**18);

        //fetching stake details and calculating reward(yield)
        uint stakeAmount = StakeDetailsMapping[msg.sender][_index].amount;
        uint stakeTime = StakeDetailsMapping[msg.sender][_index].startTime;
        require(stakeAmount > 0, "stake amount must be bigger than 0");
        uint reward = calculateReward(stakeAmount, stakeTime);
        
        //resetting stake record
        uint newStakeAmount = stakeAmount - decreaseAmount;
        if(newStakeAmount < 1){
            revert("You have decreased way too much. Consider using unstaking.");
        }
    
        StakeDetailsMapping[msg.sender][_index].amount = newStakeAmount;
        StakeDetailsMapping[msg.sender][_index].startTime = block.timestamp;

        //transferring decreaseAmount+reward
        tokenA.transfer(_to, reward + decreaseAmount);

        emit StakeDecreased(_to, _index, decreaseAmount);
    }

    function displayStakes() external view returns(StakeDetails[] memory) {
        return StakeDetailsMapping[msg.sender];
    }

    function displaySpecificStake(uint _index) external view returns(StakeDetails memory) {
        return StakeDetailsMapping[msg.sender][_index];
    }

    function displaySpecificStakeAmount(uint _index) external view returns(uint){
        return StakeDetailsMapping[msg.sender][_index].amount;
    }

    function getContractTokenABalance() external view returns(uint) {
        return tokenA.balanceOf(address(this)) / (10**18);
    }

    function getYourTokenABalance() external view returns(uint) {
        return tokenA.balanceOf(msg.sender) / (10**18);
    }

    fallback() external payable{}
    receive() external payable{}

    /*
    function stake(uint _amount, uint _period, uint _apy) public { }
    function calculateReward(uint _index) internal onlyStakers { }
    function claimReward(uint _index) external onlyStakers { } reset blocktimestamp
    function stakeReward(uint _index) external onlyStakers { }
    function decreaseStake(uint _index) external onlyStakers {}
    function unstake(uint _index) external onlyStakers { }

    */
}