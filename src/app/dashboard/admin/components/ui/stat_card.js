import { dashboardContext } from "@/components/providers/dashboard.context"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { useContext } from "react"


export const StatCard=(props)=>{
    const {set_page} = useContext(dashboardContext)
    const {icon, Title,  Stat, colorTt, colorSt, bg, page_link} = {...props}
    return(
        <Box boxSize='100%' gap='2' flexDirection={'column'} py='10' bg={bg} borderRadius={10} boxShadow={'md'} justify={'center'} align={'center'} cursor='pointer' onClick={(()=>{set_page(page_link)})}>
            <Icon as={icon} boxSize={'10'} />
            <Text fontWeight={'bold'} color={colorSt} fontSize={'lg'}>{Stat}</Text>
            <Text color={colorTt} fontSize={'sm'}>{Title}</Text>
        </Box>
    )
}