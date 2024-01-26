'use client'

import { useEffect, useState } from "react";
import { GetBillBoardsAdmin } from "@/api/billboards/all/route";
import { Box, Center, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaFolderOpen } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

export const TopBillboards=()=>{
    const [billboards,set_billboards]=useState([]);

    useEffect(()=>{
        get_BillBoards()
    },[])
    async function get_BillBoards(){
		let data = await GetBillBoardsAdmin();
		set_billboards(data?.data?.filter((item)=>{item?.views > 0}))
	}
    return(
        <Flex flexDirection={'column'} borderRadius={10} boxShadow='md' p='2' mt='2' bg='#fff' w={{base:'full',md:'30%'}}>
            <Text p='4' fontSize={'md'} fontWeight={'bold'}> Top Billboards</Text>
            {billboards?.length > 0 ?
                <>
                    {billboards?.map((board)=>{
                        return(
                            <Board_Card key={board?._id} board={board}/>
                        )
                    })}
                </>
            :
                <Center display={'flex'} flexDirection={'column'} py='10' >
                    <Icon as={SiGoogleanalytics} boxSize={10} color={'gray.200'}/>
                    <Text color={'gray.300'} textAlign={'center'} >Seems there are no billboards Topping the charts.</Text>
                </Center>
            }
        </Flex>
    )
}

const Board_Card=({board})=>{
    return(
        <Flex gap='2' my='2' align='center'>
            <Image src={board?.advertisement_data[0]?.image_url || board?.img_placeholder} borderRadius={10} alt='bord_image' boxSize={50}/>
            <Box>
                <Text fontSize={'sm'} fontWeight={'bold'}>{board?.name_of_billboard}</Text>
                <Text fontSize={'xs'}>{board?.views}</Text>
                <Text fontSize={'xs'}>{board?.ad_agency_name}</Text>
            </Box>
        </Flex>
    )
}