'use client'

import { Alert, AlertDescription, AlertIcon, AlertTitle, Badge, Box, Button, Collapse, Text, useDisclosure } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "@/components/providers/user.context";
import { dashboardContext } from "@/components/providers/dashboard.context";

export const Notification=()=>{
    const {user} = useContext(UserContext);

    if (user?.account_suspension_status === true){
        return (
            <Alert_Card status={'error'} Title={'Your account has been suspended!'} Description={'you cannot add a new board. Contact our support at help@prokemia.com for any assistance.'}/>
        )
    }
    if(user?.verified_email_status === false){
        return (
            <Alert_Card status={'info'} Title={'You Need to verify your email first!'} Description={''}/>
        )
    }
    if(user?.verification_status === false){
        return (
            <Alert_Card status={'info'} Title={'Your account needs to be verified!'} Description={''}/>
        )
    }
    return null;
}

const Alert_Card=({
    status,
    Title,
    Description,
})=>{
    const {set_page} = useContext(dashboardContext)
    return(
        <Alert status={status} mb='2' fontSize={'xs'} borderRadius={'md'}>
            <AlertIcon />
            <Box>
                <AlertTitle>{Title}</AlertTitle>
                <AlertDescription>
                    <Text>
                        {Description}
                    </Text>
                    <Button size={'sm'} bg='#343838' color='white' onClick={(()=>{set_page('Boards')})} icon={<FaArrowLeft/>}>Go back</Button>
                </AlertDescription>
            </Box>
        </Alert>
    )
}