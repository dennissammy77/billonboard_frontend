'use client'
import { Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Divider, Flex, Grid, HStack, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
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
import ViewBoardMapSection from "@/components/ui/MapFeature/view_Board";
import { UserContext } from "@/components/providers/user.context";

function Page() {
    const [data, set_data]=useState('');
    const {user}=useContext(UserContext)
    const params = useSearchParams()
    const board_id = params?.get('query');

    useEffect(()=>{
        fetch()
    },[board_id]);
    const fetch=async()=>{
        const payload={
            boardid: board_id,
            acc_type: user?.account_type
        }
        await BoardDataByUser(payload).then((response)=>{
            set_data(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return(
        <Box p='4' bg='#eee'>
            <Box bg='#fff' p='4' flex='1' borderRadius={5}>
                <Text fontSize={'lg'}>{data?.name_of_billboard}</Text>
                <HStack my='2' fontSize={'xs'}>
                    <Text fontWeight={'bold'}>Sides: </Text>
                    <Text>{data?.number_of_sides}</Text>
                </HStack>
                <HStack mt='2' fontSize={'xs'}>
                    <Text fontWeight={'bold'}>type: </Text>
                    <Text>{data?.billboard_type}</Text>
                </HStack>
                <HStack mt='2'> fontSize={'xs'}
                    <Icon boxSize={3} as={BsFillPinMapFill}/>
                    <Text>{data?.location}</Text>
                </HStack>
                <HStack color='#3874ff' mt='2' fontSize={'xs'}>
                    <Icon boxSize={2} as={FaStar}/>
                    <Badge bgColor={'#3874ff'} color={'#fff'} size={'xs'}>{data?.bob_rating}/5</Badge>
                </HStack>
                <HStack color='#3874ff' mt='2' fontSize={'xs'}>
                    <Icon boxSize={3} as={GoCommentDiscussion}/>
                    <Badge bgColor={'#3874ff'} color={'#fff'}>{data?.bob_remark}</Badge>
                </HStack>
            </Box>
            <Box bg='#fff' p='4' flex='1' my='2' borderRadius={5}>
                <Text fontWeight={'bold'}>Description</Text>
                <Text>{data?.description}</Text>
            </Box>
            <Box bg='#fff' p='4' flex='1'>
                <Text fontWeight={'bold'}>Agency details</Text>
                <HStack my='2' fontSize={'xs'}>
                    <Icon boxSize={3} as={FaChalkboardUser}/>
                    <Text>{data?.ad_agency_name}</Text>
                </HStack>
                <HStack my='2' fontSize={'xs'}>
                    <Icon boxSize={3} as={MdEmail}/>
                    <Text>{data?.ad_agency_email}</Text>
                </HStack>
                <HStack my='2' fontSize={'xs'}>
                    <Icon boxSize={3} as={FaPhone}/>
                    <Text>{data?.ad_agency_mobile}</Text>
                </HStack>
                <HStack my='2' fontSize={'xs'}>
                    <Icon boxSize={3} as={RiUserLocationFill}/>
                    <Text>{data?.ad_agency_address}</Text>
                </HStack>
            </Box>
            <Box h='300px' w='calc(100vw-20vw)' my='2'>
                <ViewBoardMapSection board_data={data}/>
            </Box>  
            <Box bg='#fff' w='full' p='4' borderRadius={5} my='2'>
                <Text fontSize={'xs'} color='#3874ff'>all advertisements made on this board</Text>
            </Box>
            <Flex flexDirection={'column'} gap='2' mt='2'>
                {data?.advertisement_data?.map((data, data_id)=>{
                    return(
                        <Card data={data} key={data_id}/>
                    )
                })}
            </Flex>
        </Box>
    )
}

export default Page

const Card=(props)=>{
    const {side_ref_Id, brand, message, from_date, to_date, image_url} = props.data;
    const [show, setShow] = useState(false)

    const handleToggle = () => setShow(!show);
    const view_side_disclosure = useDisclosure();
    const view_image_modal = useDisclosure()
    return(
        <Flex gap='2' p='2' fontSize={'xs'} bg='#fff' boxShadow={'sm'} position={'relative'}>
            <Modal isOpen={view_image_modal?.isOpen} onClose={view_image_modal?.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>-</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src={image_url} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'/>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Image src={image_url} alt="board image" boxSize={100} backgroundSize="cover" objectFit={'cover'} borderRadius={5} onClick={(()=>{view_image_modal?.onToggle()})} cursor='pointer'/>
            <Box>
                <HStack my='1'>
                    <Text fontWeight={'bold'}>Side:</Text>
                    <Text fontWeight={'bold'}>{side_ref_Id}</Text>
                </HStack>
                <HStack my='1'>
                    <Text fontWeight={'bold'}>Brand:</Text>
                    <Text fontWeight={'bold'}>{brand}</Text>
                </HStack>
                <Collapse startingHeight={20} in={show}>
                    <Text fontWeight={'bold'}>Messages:</Text>
                    {message}
                </Collapse>
                <Text fontSize='xs' onClick={handleToggle} mt='1rem' bg='#eee' p='1' w='110px' borderRadius={'5'} cursor={'pointer'}>
                    Show {show ? 'Less' : 'More'} {show ? <Icon as={IoIosArrowUp} boxSize={3}/> : <Icon as={IoIosArrowDown} boxSize={3}/>}
                </Text>
            </Box>
            <IconButton icon={<BsThreeDotsVertical/>} position='absolute' top='5' right='5' size={'sm'} onClick={view_side_disclosure?.onToggle}/>
            <View_side_Board data={props?.data} view_side_disclosure={view_side_disclosure}/>
        </Flex>
    )
}