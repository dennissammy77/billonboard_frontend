import { Alert, AlertDescription, AlertIcon, AlertTitle, Icon } from "@chakra-ui/react"
import { CiWarning } from "react-icons/ci";
import { MdDone } from "react-icons/md";

export const FormStatus=(props)=>{
    const {message, status} = {...props};
    if (!message) return null;

    return(
        <Alert status={status} size='sm' mt='2 '>
            <Icon as={status == 'success'? MdDone : CiWarning} mr='2'/>
            <AlertDescription fontSize={'sm'}>{message}</AlertDescription>
        </Alert>
    )
} 