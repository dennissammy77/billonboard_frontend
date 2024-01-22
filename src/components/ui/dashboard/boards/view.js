'use client'
import { Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Collapse, Divider, Flex, HStack, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react"
import { dashboardContext } from "@/components/providers/dashboard.context"
import { use, useContext, useEffect, useState } from "react"
import { FaChalkboardUser } from "react-icons/fa6";
import { BsFillPinMapFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaPhone, FaStar } from "react-icons/fa";
import { MdDelete, MdEmail } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiUserLocationFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { UserContext } from "@/components/providers/user.context";
import DeleteBillboard from "./delete_billboard.ui";
import { View_side_Board } from "./view_side";
import BoardDataByUser from "@/api/billboards/billboardbyuser/route";

export const ViewBoard=()=>{
    const {board_data,set_page} = useContext(dashboardContext);
    const {user} = useContext(UserContext)
    const [data, set_data]=useState(board_data);
    const delete_billboard_disclosure = useDisclosure();
    
    const HandleDeleteSale=()=>{
        delete_billboard_disclosure?.onToggle();
    }

    useEffect(()=>{
        fetch()
    },[board_data?._id]);
    const fetch=async()=>{
        await BoardDataByUser(board_data?._id).then((response)=>{
            set_data(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return(
        <Box>
            <Flex align={'center'} justify={'space-between'} my='2'>
                <Breadcrumb spacing='5px' alignItems={'center'} fontSize={'xs'} fontWeight={'semibold'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={(()=>{set_page('Boards')})}>Boards</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='gray.400'>{data?.name_of_billboard}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Menu>
                    <MenuButton as={Button} rightIcon={<IoIosArrowDown />} bg={'#3874ff'} color='#fff'>  Actions </MenuButton>
                    <MenuList p='2'>
                        <MenuItem icon={<IoMdAdd/>} onClick={(()=>{set_page('New_Side')})}>Add a Board</MenuItem>
                        <MenuItem icon={<FiEdit/>} onClick={(()=>{set_page('Edit_Board')})}>Edit BillBoard</MenuItem>
                        <MenuItem icon={<MdDelete />} onClick={HandleDeleteSale}>Delete BillBoard</MenuItem>
                        <DeleteBillboard delete_billboard_disclosure={delete_billboard_disclosure}/>
                    </MenuList>
                </Menu>
            </Flex>
            <Box bg='#fff' p='4' flex='1'>
                {data?.availability_status? <Badge bgColor='green' color='#fff'>Available</Badge> : null }
                <Divider />
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
            <Box bg='#fff' p='4' flex='1' my='2' >
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
            {user?.account_type === 'admin'?
                <Box bg='#fff' p='4' flex='1' mt='2'>
                    <Text fontWeight={'bold'}>Lister details</Text>
                    <HStack my='2' fontSize={'xs'}>
                        <Text fontWeight={'bold'}>Name</Text>
                        <Text>{data?.listed_by?.Name}</Text>
                    </HStack>
                    <Badge>{data?.listed_by?.account_type}</Badge>
                </Box>: 
                null 
            }
            {user?.account_type === 'admin'?
                <Box bg='#fff' p='4' flex='1' mt='2'>
                    <Text fontWeight={'bold'}>Owner details</Text>
                    <HStack my='2' fontSize={'xs'}>
                        <Text fontWeight={'bold'}>Name</Text>
                        <Text>{data?.currently_owned_by?.Name}</Text>
                    </HStack>
                    <Badge>{data?.currently_owned_by?.account_type}</Badge>
                </Box>: 
                null 
            }
            <Flex flexDirection={'column'} gap='2' mt='2'>
                {data?.advertisement_data.map((data, data_id)=>{
                    return(
                        <Card data={data}/>
                    )
                })}
            </Flex>
        </Box>
    )
}

const Card=(props)=>{
    const {side_ref_Id, brand, message, from_date, to_date, image_url} = props.data;
    const [show, setShow] = useState(false)

    const handleToggle = () => setShow(!show);
    const view_side_disclosure = useDisclosure();
    return(
        <Flex gap='2' p='2' fontSize={'xs'} bg='#fff' boxShadow={'sm'} position={'relative'}>
            <Image src={image_url} alt="board image" boxSize={100} backgroundSize="cover" objectFit={'cover'} borderRadius={5}/>
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