'use client'

import BoardSection from '@/components/ui/billboards/boardSection';
import { Filter } from '@/components/ui/billboards/filter.ui';
import { Search_Input } from '@/components/ui/billboards/input';
import { Box, Grid, HStack, Text } from '@chakra-ui/react';
import React from 'react'

function Page() {
  return (
    <Box p={{base:'2',md:'6'}}>
        <Text>Billboards</Text>
        <HStack my='2'>
            <Filter/>
            <Search_Input/>
        </HStack>
        <BoardSection/>
    </Box>
  )
}

export default Page;