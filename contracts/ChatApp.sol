// licenseidentifier
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    //for defining user  and thier friends
    struct user{
     string uname;
     friend[] friendlist;
    }
    //for defining friend and to connect with them using public key
    struct friend{
        string fname;
        address publicKey;

    } 
    struct message{
        string msg;
        address sender;
        uint256 timeStamp;

    }
    struct allUsers{
        string name;
        address accountAdd;
    }
    
     allUsers[] getAllUsers;
    // Mapping to store messages, where the key is the sender's address
    mapping(address => user) userList;
    //for storingchats
    mapping(bytes32 => message[]) allMessages;

    // Function to send a message
   function checkIfUserExists(address publickey) public view returns (bool) {
    uint256 usernameLength = bytes(userList[publickey].uname).length;
    return usernameLength > 0;

}

    function creatNewAccount(string calldata name,address add)  external {
        address senderAddress=add;
        //if user dont ewxist then move forward
        require(checkIfUserExists(senderAddress)==false, "Sorry!!!!! User Already Exists");
        require(bytes(name).length>0,"Username cannot be empty");
        userList[senderAddress].uname=name;
        getAllUsers.push(allUsers(name,senderAddress));
    }

    // Function to retrieve a message by address
    function getUserName(address publickey) public view returns (string memory) {
        //if user is existing then check for his name
        require(checkIfUserExists(publickey), "Sorry!!!!! User is not registered");
        string memory username=userList[publickey].uname;
        return username;
    }
    function addNewFriend(address useradd,address friendAdd , string calldata name)  external {
        address senderAddress=useradd;
        //if user exist then move
        require(checkIfUserExists(senderAddress), "Sorry!!!!! You need to create an account first");
        //if friend exist then move
        require(checkIfUserExists(friendAdd), "Sorry!!!!! There is no account like this");
        //if sender is not adding himself then move
        require(senderAddress != friendAdd, "Sorry!!!!! You can not add yourself friend");
        //if they are not already firends then move
        require(checkIfFriendAlready(senderAddress,friendAdd)==false,"You guys are already friends");
        _addNewFriend(senderAddress,friendAdd,name);
        _addNewFriend(friendAdd,senderAddress,userList[senderAddress].uname);
    }
    function checkIfFriendAlready(address senderAdd,address friendAdd) internal view returns (bool) {
        //// Swaping addresses if senderAdd has a longer friendlist
        if(userList[senderAdd].friendlist.length>userList[friendAdd].friendlist.length){
            address temp=senderAdd;
            senderAdd=friendAdd;
            friendAdd=temp;
        }
        //traversing the shorter list
        for (uint256 index = 0; index < userList[senderAdd].friendlist.length; index++) {
            if(userList[senderAdd].friendlist[index].publicKey==friendAdd){
             return true;
            }
        }
        return false;
    }    
    
    function _addNewFriend(address userAdd,address friendAdd,string memory name)internal{
    friend memory newFriend=friend(name,friendAdd);
    userList[userAdd].friendlist.push(newFriend);
    }
    
    //function for getting chatcode
    function _getChatId(address address1, address address2) internal pure returns (bytes32) {
         bytes32 hash;
        if (address1 < address2) {
          hash = keccak256(abi.encodePacked(address1, address2));   
        } else {
           hash = keccak256(abi.encodePacked(address2, address1));
        }
        return hash;
    }
    //for sending messages 
    function sendMessage(address useradd,address friendAdd, string calldata messageSent) external{
        address senderAddress=useradd;
       require(checkIfUserExists(senderAddress), "Sorry!!!!! You need to create an account first");
       require(checkIfUserExists(friendAdd), "Sorry!!!!! There is no account like this");
       require(checkIfFriendAlready(senderAddress, friendAdd), "Sorry!!!!! You are not friend with this user");
       bytes32 chatId=_getChatId(senderAddress, friendAdd);
       message memory newMessage=message(messageSent, senderAddress,block.timestamp);
       allMessages[chatId].push(newMessage);
    }
    //geting messages of particular chat weith freind
    function getFriendChat(address useradd,address friendAdd ) external view returns(message[] memory) {
        address senderAdd= useradd;
        bytes32 chatId=_getChatId(senderAdd, friendAdd);
        return allMessages[chatId];

    }
    //get all users
     function getAppUsers() external view returns(allUsers[] memory) {
        return getAllUsers;
    }
//function to get all freinds
    function getFriends() external view returns(friend[] memory) {
        
        return userList[msg.sender].friendlist;

    }
    receive() external payable{

    }
     fallback() external payable{

     }

}
