'use client'

import { Filter } from '@/components/ui/billboards/filter.ui';
import { Search_Input } from '@/components/ui/billboards/input';
import { Box, Button, Flex, Grid, HStack, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import BoardSection from './boardSection';
import { dashboardContext } from '@/components/providers/dashboard.context';

function Boards() {
  const {set_page} = useContext(dashboardContext);
  const [query,set_query]=useState('');
  return (
    <Box p={{base:'2',md:'4'}}>
        <Flex align='center' justify='space-between' my='3' >
            <Text>Billboards</Text>
            <Button leftIcon={<IoMdAdd/>} bg={'#3874ff'} color='#fff' onClick={(()=>{set_page('New_Board')})}>New billboard</Button>
        </Flex>
        <HStack my='2'>
            <Search_Input query={query} set_query={set_query} placeholder='search for boards'/>
        </HStack>
        <BoardSection query={query} set_query={set_query}/>
    </Box>
  )
}

export default Boards;