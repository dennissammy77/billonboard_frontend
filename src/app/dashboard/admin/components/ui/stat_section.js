'use client'

import { Box, Grid } from "@chakra-ui/react";
import {StatCard} from './stat_card'
import { RiAccountPinCircleFill } from "react-icons/ri"
import { MdOutlineSwitchAccount } from "react-icons/md";
import { FaPersonWalking } from "react-icons/fa6";
import { SiBillboard } from "react-icons/si";
import { useEffect, useState } from "react";
import GetAgencies from "@/api/auth/client/agency/all/route";
import GetClients from "@/api/auth/client/client/all/route";
import GetFootsolidier from "@/api/auth/client/footsoldier/all/route";
import { GetBillBoardsAdmin } from "@/api/billboards/all/route";

export const Stat_Section=()=>{
    const [agencies,set_agencies]=useState([]);
    const [clients,set_clients]=useState([]);
    const [footsoldiers,set_footsoldiers]=useState([]);
    const [billboards,set_billboards]=useState([]);

    useEffect(()=>{
        get_Agencies_Data()
        get_Clients_Data()
        get_FootSoldiers_Data()
        get_BillBoards()
    },[])

    async function get_Agencies_Data(){
		let data = await GetAgencies();
		set_agencies(data.data)
	}
    async function get_Clients_Data(){
		let data = await GetClients();
		set_clients(data.data)
	}
    async function get_FootSoldiers_Data(){
		let data = await GetFootsolidier();
		set_footsoldiers(data.data)
	}
    async function get_BillBoards(){
		let data = await GetBillBoardsAdmin();
		set_billboards(data.data)
	}
    return(
        <Grid templateRows={{base:'repeat(4, 1fr)',md:'repeat(1, 1fr)'}} templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(4, 1fr)'}} gap={2} mt='6'>
            <StatCard 
                icon={RiAccountPinCircleFill} 
                Title='Clients' 
                Stat={clients?.length ? clients.length : '-'}
                bg='green.100'
                colorTt='green.800'
                colorSt='green.500'
            />
            <StatCard 
                icon={MdOutlineSwitchAccount} 
                Title='Agencies' 
                Stat={agencies?.length ? agencies.length : '-'}
                bg='orange.100'
                colorTt='orange.800'
                colorSt='orange.500'
            />
            <StatCard 
                icon={FaPersonWalking} 
                Title='FootSoldiers' 
                Stat={footsoldiers?.length ? footsoldiers.length : '-'} 
                bg='blue.100'
                colorTt='blue.800'
                colorSt='blue.500'
            />
            <StatCard 
                icon={SiBillboard} 
                Title='Billboards' 
                Stat={billboards?.length ? billboards.length : '-'} 
                bg='pink.100'
                colorTt='pink.800'
                colorSt='pink.500'
            />
        </Grid>
    )
}