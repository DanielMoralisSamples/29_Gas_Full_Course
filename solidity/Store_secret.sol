// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Store {
    
    event NumberUpdated (address indexed owner, uint updatedTimestamp, uint entryGas, uint gasSpent);
    
    mapping (address => uint) storeRegistry;

    function storeSecret(uint _newSecret) external {
        uint _entryGas = gasleft();
        storeRegistry[msg.sender] = _newSecret;
        uint _actualGas = _entryGas - gasleft();
        emit NumberUpdated(msg.sender, block.timestamp, _entryGas, _actualGas);
    }


    function benchMark() external {
        uint _entryGas = gasleft();
        uint _actualGas = _entryGas - gasleft();
        emit NumberUpdated(msg.sender, block.timestamp, _entryGas, _actualGas);
    }
    
    function getSecret() external view returns (uint _secret){
        _secret = storeRegistry[msg.sender];
    }

}