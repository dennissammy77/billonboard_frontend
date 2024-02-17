'use client'

import { Search_Input } from '@/components/ui/billboards/input';
import { Box, Button, Flex, Grid, HStack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import { NewUser } from './components/ui/NewUser';
import { ClientsUser } from './components/ui/Clients';

export const Clients=()=>{
  const [query,set_query]=useState('');
  const view_drawer_disclosure = useDisclosure();
  return (
    <Box p={{base:'2',md:'4'}}>
        <Flex align='center' justify='space-between' my='3' >
            <Text>Clients</Text>
            <Button leftIcon={<IoMdAdd/>} bg={'#3874ff'} color='#fff' onClick={(()=>{view_drawer_disclosure.onToggle()})}>New User</Button>
            <NewUser view_drawer_disclosure={view_drawer_disclosure} account_type={'client'} def_password={'default.password@billonboard.co.ke'}/>
        </Flex>
        <HStack my='2'>
            <Search_Input query={query} set_query={set_query} placeholder='search clients'/>
        </HStack>
        <ClientsUser query={query} set_query={set_query}/>
    </Box>
  )
}