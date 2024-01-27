'use client'

import { useEffect, useState } from "react";
import { GetBillBoardsAdmin } from "@/api/billboards/all/route";
import { Box, Center, Flex, HStack, Icon, Image, Text } from "@chakra-ui/react";
import { SiGoogleanalytics } from "react-icons/si";
import { MdVisibility } from "react-icons/md";
import { IoTrophySharp } from "react-icons/io5";

export const TopBillboards=()=>{
    const [billboards,set_billboards]=useState([]);

    useEffect(()=>{
        get_BillBoards()
    },[])
    async function get_BillBoards(){
		let data = await GetBillBoardsAdmin();
		set_billboards(data?.data)
	}
    return(
        <Flex flexDirection={'column'} borderRadius={10} boxShadow='md' p='2' mt='2' bg='#fff' w={{base:'full',md:'30%'}}>
            <Text p='4' fontSize={'md'} fontWeight={'bold'}> Top Billboards</Text>
            {billboards?.length > 0 ?
                <>
                    {billboards?.sort((a, b) => b?.views - a?.views).slice(0,3).map((board,index)=>{
                        return(
                            <Board_Card key={board?._id} board={board} index={index}/>
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

const Board_Card=({board,index})=>{
    let color ;
    if (index == 0){
        color='gold'
    }else if(index == 1){
        color='#C0C0C0'
    }else if(index == 2){
        color='#CD7F32'
    }else{
        color=''
    }
    return(
        <Flex gap='2' my='2' align='center' position={'relative'}>
            <Image src={board?.advertisement_data[0]?.image_url || board?.img_placeholder} borderRadius={10} alt='bord_image' boxSize={50}/>
            <Box >
                <Text fontSize={'sm'} fontWeight={'bold'}>{board?.name_of_billboard}</Text>
                <HStack>
                    <Icon as={MdVisibility} boxSize='3' />
                    <Text fontSize={'xs'}>{board?.views}</Text>
                </HStack>
                <Text fontSize={'xs'}>{board?.ad_agency_name}</Text>
                <Icon as={IoTrophySharp} boxSize={'5'} position={'absolute'} top='25px' right='10px' bgColor='#eee'  borderRadius={'full'} color={color}/>
            </Box>
        </Flex>
    )
}