'use client'

import { dashboardContext } from '@/components/providers/dashboard.context';
import AgencySection from '@/components/ui/agency/Agency_Section';
import { Search_Input } from '@/components/ui/billboards/input';
import { Box, Button, Flex, Grid, HStack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import { NewUser } from './components/ui/NewUser';
import { AgenciesUser } from './components/ui/agencies';

export const Agencies=()=>{
  const [query,set_query]=useState('');
  const {set_page} = useContext(dashboardContext);
  const view_drawer_disclosure = useDisclosure();

  return (
    <Box p={{base:'2',md:'6'}}>
        <Flex align='center' justify='space-between' my='3' >
            <Text>Agencies</Text>
            <Button leftIcon={<IoMdAdd/>} bg={'#3874ff'} color='#fff' onClick={(()=>{view_drawer_disclosure.onToggle()})}>New Agency</Button>
            <NewUser view_drawer_disclosure={view_drawer_disclosure} account_type={'agency'} def_password={'default.password@billonboard.co.ke'}/>
        </Flex>
        <HStack my='2'>
            <Search_Input query={query} set_query={set_query} placeholder='search agencies'/>
        </HStack>
        <AgenciesUser query={query}/>
    </Box>
  )
}