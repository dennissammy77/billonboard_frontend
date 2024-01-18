import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "@/components/providers/user.context";

export const Banner=({msg,msg2,img})=>{
    const {user,set_user_handler } = useContext(UserContext);
    return(
        <Flex flexDirection={{base:'column',md:'row'}} flex='1' bg={'#fff'} p='4' borderRadius={20} gap='2' align='center' justify={'space-between'} boxShadow={'md'}>
            <Box px='2' gap='2'>
                <Text fontSize={'2xl'} my='2'> Welcome back 👋 {user?.first_name} </Text>
                <Text my='3'>{msg}<br/>{msg2}</Text>
            </Box>
            <Image src={img} boxSize='200' display={{sm:'block',md:'none',lg:'block'}}/>
        </Flex>
    )
}