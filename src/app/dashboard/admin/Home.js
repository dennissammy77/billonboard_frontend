import { Banner } from './components/ui/Banner'
import React from 'react'
import { Stat_Section } from './components/ui/stat_section'
import { Box, Flex } from '@chakra-ui/react'
import { TopFootSoldiers } from './components/ui/TopFootsoldiers'
import { TopBillboards } from './components/ui/TopBillboards'

function Home() {
  return (
    <Box>
        <Banner  msg={'To provide The best service to all!'}  msg2={'@'}  img={'../../boardad.jpg'} />
        <Stat_Section/>
        <Flex flexDirection={{base:'column',md:'row'}} gap='2'>
            <TopFootSoldiers />
            <TopBillboards />
        </Flex>
    </Box>
  )
}

export default Home