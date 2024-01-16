'use client'

import AgencySection from '@/components/ui/agency/Agency_Section';
import { Search_Input } from '@/components/ui/billboards/input';
import { Box, Grid, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react'

function Page() {
  const [query,set_query]=useState('');
  return (
    <Box p={{base:'2',md:'6'}}>
        <Text>Agencies</Text>
        <HStack my='2'>
            <Search_Input query={query} set_query={set_query} placeholder='search agencies'/>
        </HStack>
        <AgencySection query={query}/>
    </Box>
  )
}

export default Page;