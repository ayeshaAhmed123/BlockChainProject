

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Web3 from 'web3'; // Import Web3 library
import { CheckWalletConnection, connectWallet, connectingWithContract } from '../Utils/ApiFeature';

export const MrChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMessage, setFriendMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const connectAccount = await CheckWalletConnection();
      //account address
      setAccount(connectAccount);
      console.log("From ftch data address", connectAccount)
      const contract = await connectingWithContract();
      console.log("from fetch data contract", contract)




      // try {

      //   const transaction = contract.methods.getFriends();
      //   const receipt = await transaction.send({ from: connectAccount });
      //   setFriendLists(receipt);
      // } catch (error) {
      //   console.log("inside", error)
      // }

      // try {
      //   const transaction = contract.methods.getAppUsers();
      //   const receipt = await transaction.send({ from: connectAccount });
      //   setUserList(receipt);
      // } catch (error) {
      //   console.log("inside2", error)
      // }

    } catch (error) {
      setError("Please Install And Connect Your Wallet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friendAdd) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.methods.getFriendChat(friendAdd).call();
      setFriendMessage(read);
    } catch (error) {
      setError("You Currently Have no message");
    }
  };

  const createAccount = async ({ name, accountAddress }) => {
    try {
      const contract = await connectingWithContract();
      const transaction = contract.methods.creatNewAccount(name, accountAddress);
  
      setLoading(true);
      const receipt = await transaction.send({ from: accountAddress });
      setLoading(false);
  
      // Now, call the getUsername function
      await getUsername(accountAddress);
  
    } catch (error) {
      console.error("Error creating account:", error);
      setError("Your account could not be created.");
    }
  };
  const getUsername = async (accountAddress) => {
    try {
      const contract = await connectingWithContract();
      setLoading(true);
      const username = await contract.methods.getUserName(accountAddress).call();
      setLoading(false);
      // Now you can use the received username
      console.log("Received Username", username);
  
      // Assuming you have a state setter function for username, use it like this:
      // setUsername(username);
  
    } catch (error) {
      console.error("Error getting username", error);
      // Handle the error, maybe set an error state or show an error message
    }
  };
    
  const addFriends = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress) return setError("Name and Account Address should not be empty");

      const contract = await connectingWithContract();
      const transaction = contract.methods.addNewFriend(accountAddress, name);

      setLoading(true);
      const receipt = await transaction.send({ from: accountAddress });
      setLoading(false);

      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Friend could not be added.");
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      if (!msg || !address) return setError("Please enter your message");

      const contract = await connectingWithContract();
      const transaction = contract.methods.sendMessage(address, msg);

      setLoading(true);
      const receipt = await transaction.send({ from: account });
      setLoading(false);

      window.location.reload();
    } catch (error) {
      setError("Message could not be sent.");
    }
  };

  const readUser = async (address) => {
    try {
      const contract = await connectingWithContract();
      const userName = await contract.methods.getUserName(address).call();
      setCurrentUsername(userName);
      setCurrentUserAddress(address);
    } catch (error) {
      setError("User details could not be retrieved.");
    }
  };

  return (
    <MrChatAppContext.Provider value={{ readMessage, createAccount, addFriends, sendMessage, readUser, account, username, friendLists, friendMessage, userList, loading, error, currentUsername, currentUserAddress, CheckWalletConnection, connectWallet }}>
      {children}
    </MrChatAppContext.Provider>
  );
};
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { ethers } from 'ethers';
// import { CheckWalletConnection, connectWallet, connectingWithContract } from '../Utils/ApiFeature';

// export const MrChatAppContext = React.createContext();

// export const ChatAppProvider = ({ children }) => {
//   const [account, setAccount] = useState("");
//   const [username, setUsername] = useState("");
//   const [friendLists, setFriendLists] = useState([]);
//   const [friendMessage, setFriendMessage] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userList, setUserList] = useState([]);
//   const [error, setError] = useState("");
//   const [currentUsername, setCurrentUsername] = useState("");
//   const [currentUserAddress, setCurrentUserAddress] = useState("");

//   const router = useRouter();

//   const fetchData = async () => {
//     try {
//       const connectAccount = await CheckWalletConnection();
//       setAccount(connectAccount);

//       const contract = await connectingWithContract();

//       // Uncomment and modify the code as needed
//       // const friends = await contract.getFriends();
//       // setFriendLists(friends);

//       // const users = await contract.getAppUsers();
//       // setUserList(users);

//     } catch (error) {
//       setError("Please Install And Connect Your Wallet");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const readMessage = async (friendAdd) => {
//     try {
//       const contract = await connectingWithContract();
//       const read = await contract.getFriendChat(friendAdd);
//       setFriendMessage(read);
//     } catch (error) {
//       setError("You Currently Have no message");
//     }
//   };

//   const createAccount = async ({ name, accountAddress }) => {
//     try {
//       const contract = await connectingWithContract();
//       const transaction = contract.creatNewAccount(name, accountAddress);

//       setLoading(true);
//       const receipt = await transaction;
//       setLoading(false);

//       await getUsername(accountAddress);

//     } catch (error) {
//       console.error("Error creating account:", error);
//       setError("Your account could not be created.");
//     }
//   };

//   const getUsername = async (accountAddress) => {
//     try {
//       const contract = await connectingWithContract();
//       setLoading(true);
//       const username = await contract.getUserName(accountAddress);
//       setLoading(false);
//       console.log("Received Username", username);

//     } catch (error) {
//       console.error("Error getting username", error);
//     }
//   };

//   const addFriends = async ({ name, accountAddress }) => {
//     try {
//       if (!name || !accountAddress) return setError("Name and Account Address should not be empty");

//       const contract = await connectingWithContract();
//       const transaction = contract.addNewFriend(accountAddress, name);

//       setLoading(true);
//       const receipt = await transaction;
//       setLoading(false);

//       router.push("/");
//       window.location.reload();
//     } catch (error) {
//       setError("Friend could not be added.");
//     }
//   };

//   const sendMessage = async ({ msg, address }) => {
//     try {
//       if (!msg || !address) return setError("Please enter your message");

//       const contract = await connectingWithContract();
//       const transaction = contract.sendMessage(address, msg);

//       setLoading(true);
//       const receipt = await transaction;
//       setLoading(false);

//       window.location.reload();
//     } catch (error) {
//       setError("Message could not be sent.");
//     }
//   };

//   const readUser = async (address) => {
//     try {
//       const contract = await connectingWithContract();
//       const userName = await contract.getUserName(address);
//       setCurrentUsername(userName);
//       setCurrentUserAddress(address);
//     } catch (error) {
//       setError("User details could not be retrieved.");
//     }
//   };

//   return (
//     <MrChatAppContext.Provider value={{ readMessage, createAccount, addFriends, sendMessage, readUser, account, username, friendLists, friendMessage, userList, loading, error, currentUsername, currentUserAddress, CheckWalletConnection, connectWallet }}>
//       {children}
//     </MrChatAppContext.Provider>
//   );
// };
