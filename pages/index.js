import React from 'react';
import { useState,useEffect, useContext} from 'react';
import { MrChatAppContext } from '../Context/MrChatAppContext';
import { useRouter } from 'next/router';
import { connectWallet, connectingWithContract } from '@/Utils/ApiFeature';
const ChatApp = () => {
  const {}=useContext(MrChatAppContext);
  return (
      <div></div>
  );
};

export default ChatApp;
