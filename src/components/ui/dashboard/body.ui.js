'use client'
import { Box, Button, Divider, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { MdAdminPanelSettings, MdOutlineMenu, MdUpgrade } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { dashboardContext } from "../../providers/dashboard.context";
import { useContext } from "react";
import { usePathname, useRouter  } from "next/navigation";
import { UserContext } from "@/components/providers/user.context";

function Dashboard_Body({children,navigation}){
    const sidebar = useDisclosure();
    return(
        <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh" >
            {/**side bar content on large screen */}
            <SidebarContent display={{ base: "none", md: "unset", }} navigation={navigation} onClose={sidebar.onClose}/> 
            {/**side bar content on small screen will use drawer*/}
            <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left" >
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent  w="full"  borderRight="none"  navigation={navigation} onClose={sidebar.onClose}/>
                </DrawerContent>
            </Drawer>
            {/**body of the dasboard */}
            <Box ml={{ base: 0, md: 60, }} transition=".3s ease" >
                {/**Header for the body section */}
                <Flex as="header" align="center" w="full" px="4" bg="white" display={{ base: "inline-flex", md: "none", }} _dark={{ bg: "gray.800", }} borderBottomWidth="1px" color="inherit" h="14" gap='2' >
                    <IconButton aria-label="Menu" display={{ base: "inline-flex", md: "none", }} onClick={sidebar.onOpen} icon={<MdOutlineMenu />} size="sm" />
                    <Text display={{ base: "inline-flex", md: "none", }} >Navigation</Text>
                </Flex>
                {/**Contents of the body */}
                <Box as="main" p="2">
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard_Body;

const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex align="center" m='2' px="4" pl="4" py="3" cursor="pointer" _dark={{ color: "gray.400" }} _hover={{ bg: "gray.300", _dark: { bg: "gray.900" }, color: "gray.900", borderRadius:5,boxShadow:'sm' }} role="group" fontWeight="regular" fontSize={'md'} transition=".3s ease" {...rest}>
        {icon && ( <Icon mx="2" boxSize="5" _groupHover={{ color: "gray.900", }} as={icon} /> )}
        {children}
      </Flex>
    );
  };

const SidebarContent = (props) => {
  const {active_page,set_page} = useContext(dashboardContext);
  const {user} = useContext(UserContext)
  const pathname = usePathname();
  const pathArr = pathname?.split('/');
  const router = useRouter();

  return(
    <Box as="nav" pos="fixed" top={{  base: "70px",  md: "70px" }} left="0" zIndex="sticky" h="calc(100vh - 70px)" pb="10" overflowX="hidden" overflowY="auto" bg="white" _dark={{ bg: "gray.800", }} bordercolor="inherit" borderRightWidth="1px" w="60" {...props} >
      <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation" gap='1' h='100%' justify={'space-between'} position={'relative'}>
        <Box>
          {props?.navigation?.map((item)=>{
            return(
              <>
                <NavItem key={item?.id} bg={active_page == item?.title? '#3874ff' : 'gray.100'} color={active_page == item?.title? '#fff' : '#000'} borderRadius={active_page == item?.title? 'md' : '5'} icon={item?.icon} onClick={(()=>{set_page(item?.title);props.onClose()})}>
                  {item.title}
                </NavItem>
                <Divider/>
              </>
            )
          })}
        </Box>
        {user?.account_type === 'admin' && user?.position === 'MANAGER'?
          <Flex align="center" m='2' mb='4' px="4" pl="4" py="3" cursor="pointer" _dark={{ color: "gray.400" }} _hover={{ bg: "gray.300", _dark: { bg: "gray.900" }, color: "gray.900", borderRadius:5,boxShadow:'sm' }} role="group" fontWeight="regular" fontSize={'md'} transition=".3s ease" bg={active_page == 'Admin_Panel'? '#3874ff' : 'gray.100'} color={active_page == 'Admin_Panel'? '#fff' : '#000'} borderRadius={active_page == 'Admin_Panel'? 'md' : '5'} onClick={(()=>{set_page('Admin_Panel')})}>
            <Icon mx="2" boxSize="5" _groupHover={{ color: "gray.900", }} as={MdAdminPanelSettings} />
            Admin Panel
          </Flex> : null
        }
        {user?.account_type === 'agency' && !user?.account_susbscription_token?
          <Flex align="center" m='2' mb='4' px="4" pl="4" py="3" cursor="pointer" _dark={{ color: "gray.400" }} _hover={{ bg: "gray.300", _dark: { bg: "gray.900" }, color: "gray.900", borderRadius:5,boxShadow:'sm' }} role="group" fontWeight="regular" fontSize={'md'} transition=".3s ease" bg={active_page == 'Admin_Panel'? '#3874ff' : 'gray.100'} color={active_page == 'Admin_Panel'? '#fff' : '#000'} borderRadius={active_page == 'Admin_Panel'? 'md' : '5'} onClick={(()=>{router.push('/pricing')})}>
            <Icon mx="2" boxSize="5" _groupHover={{ color: "gray.900", }} as={MdUpgrade} />
            Upgrade
          </Flex> : null
        }
      </Flex>
    </Box>
  )};