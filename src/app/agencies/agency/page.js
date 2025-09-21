'use client'
import { Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Divider, Flex, Grid, HStack, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import { Suspense, useCallback, useContext, useEffect, useState } from "react"
import { FaChalkboardUser } from "react-icons/fa6";
import { BsFillPinMapFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaPhone, FaStar } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiUserLocationFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoCommentDiscussion } from "react-icons/go";
import { useSearchParams , useRouter } from "next/navigation";
import BoardDataByUser from "@/api/billboards/billboardbyuser/route";
import { View_side_Board } from "@/components/ui/billboards/view_side";
import MapSection from '@/components/ui/MapFeature/view_boards';
import { UserContext } from "@/components/providers/user.context";
import BoardSection from "@/components/ui/billboards/boardSection";
import AdvertisementSection from "@/components/ui/billboards/AdvertisementSection";
import { GetAgencyData } from "@/api/auth/client/route";
import Footer from "@/components/ui/footer";

function PageContent() {
    const params = useSearchParams()
    const agency_id = params?.get('query');

    const [data,set_user_data]=useState('');
    const img_placeholder = 'https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5';

    const fetchData=useCallback(async()=>{
        await GetAgencyData(agency_id).then((res)=>{
            set_user_data(res?.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[agency_id])
    const [query,set_query]=useState('');
    const [toggle_board_options,set_toggle_board_options]=useState(false);
    useEffect(()=>{
        fetchData();
    },[agency_id,fetchData]);

    return(
    <Box p='4'>
        <Flex gap='2' my='4' bg='#fff' borderRadius={'md'} alignItems={'center'}>
            <Image src={data?.profile_photo_url || img_placeholder} alt='image' boxSize={100} objectFit={'cover'} borderRadius={'md'} boxShadow={'sm'}/>
            <Flex flexDirection={'column'} flex='1' fontSize={'sm'}>
                <Heading as={'h2'}>{data?.company_name}</Heading>
                <Text>{data?.company_email}</Text>
                <Text>{data?.company_mobile}</Text>
                <Text>{data?.company_address}</Text>
            </Flex>
        </Flex>
        <Divider/>
        <Box h='300px' w='calc(100vw-20vw)' my='2' borderRadius={'md'} bg='#fff' p='2'>
            <MapSection query={''} owner_id={agency_id}/>
        </Box>
        <Box borderRadius={'md'} bg='#fff'>
            <Flex my='4'>
            <Text cursor={'pointer'} fontWeight={'bold'} borderTopLeftRadius='5' borderBottomLeftRadius='5' bg={toggle_board_options? '#3874ff':'gray.200'} color={toggle_board_options? 'white':'gray.600'} p='2' onClick={(()=>{set_toggle_board_options(!toggle_board_options)})}>Billboards</Text>
            <Text cursor={'pointer'} fontWeight={'bold'} borderTopRightRadius='5' borderBottomRightRadius='5' bg={!toggle_board_options? '#3874ff':'gray.200'} color={!toggle_board_options? 'white':'gray.600'} p='2' onClick={(()=>{set_toggle_board_options(!toggle_board_options)})}>Advertisements</Text>
            </Flex>
            {toggle_board_options?
                <BoardSection query={query} set_query={set_query} owner_id={agency_id} toggle_board_options={toggle_board_options} set_toggle_board_options={set_toggle_board_options}/>
                :
                <AdvertisementSection owner_id={agency_id}/>
            }
        </Box>
        <Footer/>
    </Box>
    )
}
export default function Page(){
    return(
        <Suspense fallback={<div>Loading ...</div>}>
            <PageContent/>
        </Suspense>
    )
}