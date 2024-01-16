'use client'

import BoardSection from '@/components/ui/billboards/boardSection';
import { Filter } from '@/components/ui/billboards/filter.ui';
import { Search_Input } from '@/components/ui/billboards/input';
import { Box, Grid, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react'

function Page() {
  const [query,set_query]=useState('');
  return (
    <Box p={{base:'2',md:'6'}}>
        <Text>Billboards</Text>
        <HStack my='2'>
            <Search_Input query={query} set_query={set_query} placeholder='search for boards'/>
        </HStack>
        <BoardSection query={query} set_query={set_query}/>
    </Box>
  )
}

export default Page;