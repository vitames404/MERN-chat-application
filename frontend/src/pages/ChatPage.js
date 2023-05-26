import axios from 'axios';
import { useEffect, useState } from 'react';
import {ChatState} from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from '../components/miscellaneous/SideDrawer';

const ChatPage = () => {

    const { user } = ChatState();

    return(
        <div style={{width: '100'}}>
             {user && <SideDrawer />}
             <Box>
                {/* {{user && <MyChats/>}} */}
                {/* {{user && <ChatBox/>}} */}
             </Box>
        </div>
    )   
}

export default ChatPage;