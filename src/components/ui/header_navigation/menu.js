import { AbsoluteCenter, Avatar, Box, Button, Center, Divider, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import Script from "next/script";
import { useContext } from "react";
import { UserContext } from "@/components/providers/user.context";
import useLogOut from "@/components/hooks/useLogOut.hook";
import { useUserDashboardroute } from "@/components/hooks/useUserDashboardroute.hook";

export const MenuComponent = ()=>{
    const router = useRouter();
    const {user,set_user_handler} = useContext(UserContext);
    const dashboard_route = useUserDashboardroute(user?.account_type,user?._id);
    const handleClick = ()=>{
        useLogOut();
        router.push('/');
        set_user_handler(`${user?._id} logged out`);
    }
    return(
        <Menu display={{md:'none',base:'flex'}}>
            <MenuButton title='menu' as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} pt='1' color='#000'>
                <Icon as={IoMenu} boxSize={8} display={{base:'inline-block',md:'none'}} cursor={'pointer'}/>
            </MenuButton>
            <MenuList alignItems={'center'} p='2' boxShadow='md'>
                {user !== null?
                    <>
                        <Flex justify={'center'} w='100%' align={'center'} gap='2' my='4'>
                            <Avatar src={user?.profile_photo_url} name={user?.first_name || user?.company_name} size='lg'/>
                            <Text>{user?.first_name || user?.company_name}</Text>
                        </Flex>
                        <Divider/>
                        <MenuItem py='3' gap='2' onClick={(()=>{router.push(dashboard_route)})}>
                            <Icon as={VscAccount} />
                            Go to dashboard
                        </MenuItem>
                        <Divider/>
                        {user?.account_type === 'client' || user?.account_type === 'salesperson'?
                        null
                        :
                        <MenuItem py='3'>Add product</MenuItem>
                        }
                        <Divider/>
                    </>
                    : 
                    <Center alignItems={'center'} align='center' gap='2'>
                        <Script src="https://cdn.lordicon.com/xdjxvujz.js"></Script>
                        <lord-icon src="https://cdn.lordicon.com/dklbhvrt.json" trigger="loop" delay="7000" style={{marginTop:'20px',width:'70px',height:"70px",}} >
                        </lord-icon>
                        <Text mt='2' fontSize={'sm'}>sign in to <br/> view profile</Text>
                    </Center>
                }
                <Divider />
                {user !== null? 
                    <Flex w='100%' px='2' py='2'>
                        <Button flex='1' fontSize={'sm'} bg={'#343838'} color='#fff' onClick={handleClick}>LogOut</Button>
                    </Flex>
                    :
                    <Flex direction={'column'} gap='2' mt='2'>
                        <Button bg='#343838' color={'#fff'} onClick={(()=>{router.push('/auth/signin')})}>Sign In</Button>
                        <Box position='relative' padding='2'>
                            <Divider />
                            <AbsoluteCenter bg='white' px='4'>
                                or
                            </AbsoluteCenter>
                        </Box>
                        <Button bg={'#3874ff'} color='#fff' onClick={(()=>{router.push('/auth/signup')})}>Sign Up for free</Button>
                    </Flex>
                }
            </MenuList>
        </Menu>
    )
}