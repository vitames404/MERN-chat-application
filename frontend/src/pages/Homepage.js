import React from 'react'

import { useEffect } from 'react';

import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs, } from '@chakra-ui/react';

import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';

import { useHistory } from "react-router";

const Homepage = () => {

  const history = useHistory();
    
  useEffect(() => {

     const user = JSON.parse(localStorage.getItem("userInfo"));

     if(user)
     {
          history.push('/chats');
     }

  }, [history]);


  return (
    <Container maxW='xl' centerContent>
      <Box
        d="flex"
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text
          fontSize="4x1"
          fontFamily="Work Sans"
          color="black"
        >
          Portfolio Chat-App
        </Text>
      </Box>
      <Box
      bg="white"
      w="100%"
      p={4}
      borderRadius={"lg"}
      borderWidth={"1px"}
      color={"black"}
      >
        <Tabs variant='soft-rounded'>
        <TabList>
          <Tab width={"50%"}>Login</Tab>
          <Tab width={"50%"}>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel> <Login /> </TabPanel>
          <TabPanel> <Signup /> </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage