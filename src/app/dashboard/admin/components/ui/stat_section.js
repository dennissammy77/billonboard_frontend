'use client'

import { Box, Grid } from "@chakra-ui/react";
import {StatCard} from './stat_card'
import { RiAccountPinCircleFill } from "react-icons/ri"
import { MdOutlineSwitchAccount } from "react-icons/md";
import { FaPersonWalking } from "react-icons/fa6";
import { SiBillboard } from "react-icons/si";

export const Stat_Section=()=>{
    return(
        <Grid templateRows={{base:'repeat(4, 1fr)',md:'repeat(1, 1fr)'}} templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(4, 1fr)'}} gap={2} mt='6'>
            <StatCard 
                icon={RiAccountPinCircleFill} 
                Title='Clients' 
                Stat='50K'
                bg='green.100'
                colorTt='green.800'
                colorSt='green.500'
            />
            <StatCard 
                icon={MdOutlineSwitchAccount} 
                Title='Agencies' 
                Stat='100K'
                bg='orange.100'
                colorTt='orange.800'
                colorSt='orange.500'
            />
            <StatCard 
                icon={FaPersonWalking} 
                Title='FootSoldiers' 
                Stat='200K'
                bg='blue.100'
                colorTt='blue.800'
                colorSt='blue.500'
            />
            <StatCard 
                icon={SiBillboard} 
                Title='Billboards' 
                Stat='200K'
                bg='pink.100'
                colorTt='pink.800'
                colorSt='pink.500'
            />
        </Grid>
    )
}