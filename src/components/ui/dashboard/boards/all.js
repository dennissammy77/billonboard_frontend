'use client'

import { Filter } from '@/components/ui/billboards/filter.ui';
import { Search_Input } from '@/components/ui/billboards/input';
import { Box, Button, Flex, Grid, HStack, IconButton, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import BoardSection from './boardSection';
import { dashboardContext } from '@/components/providers/dashboard.context';
import { FaMapLocation } from 'react-icons/fa6';
import MapSection from '../../MapFeature';

function Boards() {
  const {set_page} = useContext(dashboardContext);
  const [query,set_query]=useState('');
  const [view_map,set_view_map]=useState(true);
  return (
    <Box p={{base:'2',md:'4'}}>
        <Flex align='center' justify='space-between' my='3' >
            <Text>Billboards</Text>
            <HStack>
              <IconButton icon={<FaMapLocation/>} variant='outline' aria-label='view map' colorScheme={'blue'}/>
              <Button leftIcon={<IoMdAdd/>} bg={'#3874ff'} color='#fff' onClick={(()=>{set_page('New_Board')})}>New billboard</Button>
            </HStack>
        </Flex>
        <HStack my='2'>
            <Search_Input query={query} set_query={set_query} placeholder='search for boards'/>
        </HStack>
        {view_map?
          <Box h='600px' w='calc(100vw-20vw)'>
            <MapSection />
          </Box>  
          :
          <BoardSection query={query} set_query={set_query}/>
        }
    </Box>
  )
}

export default Boards;