'use client'

import MapSection from '@/components/ui/MapFeature/view_boards';
import BoardSection from '@/components/ui/billboards/boardSection';
import { Filter } from '@/components/ui/billboards/filter.ui';
import { Search_Input } from '@/components/ui/billboards/input';
import { Box, Flex, Grid, HStack, IconButton, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaMapLocation } from 'react-icons/fa6';

function Page() {
  const [query,set_query]=useState('');
  const [view_map,set_view_map]=useState(false);
  return (
    <Box p={{base:'2',md:'6'}}>
        <Text>Billboards</Text>
        <HStack my='2'>
            {view_map?
              <Text p='2' bg='#e3e3e3' borderRadius={'5'} onClick={(()=>{set_view_map(!view_map)})} cursor='pointer'>View Boards</Text>
              :
              <Flex onClick={(()=>{set_view_map(!view_map)})} cursor={'pointer'} gap='2' align='center'>
                <IconButton icon={<FaMapLocation/>} variant='outline' aria-label='view map' colorScheme={'blue'} />
                <Text>Map</Text>
              </Flex>
            }
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

export default Page;