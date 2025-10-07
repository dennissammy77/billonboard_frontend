'use client'
import { Banner } from '@/components/ui/dashboard/banner'
import { Stat_Section } from '../admin/components/ui/stat_section'
import React from 'react'
import { Box } from '@chakra-ui/react'

function Home() {
  return (
    <Box>
      <Banner 
        msg={'Looking for clients to advertise their business? Talk to our sales team to help promote your billboards'} 
        msg2={'Contact us!'} 
        img={'../../boardad.jpg'}
      />
      <Stat_Section/>
    </Box>
  )
}

export default Home