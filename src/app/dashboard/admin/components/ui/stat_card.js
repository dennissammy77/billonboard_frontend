import { Box, Flex, Icon, Text } from "@chakra-ui/react"


export const StatCard=(props)=>{
    const {icon, Title,  Stat, colorTt, colorSt, bg} = {...props}
    return(
        <Box boxSize='100%' gap='2' flexDirection={'column'} py='10' bg={bg} borderRadius={10} boxShadow={'md'} justify={'center'} align={'center'}>
            <Icon as={icon} boxSize={'10'} />
            <Text fontWeight={'bold'} color={colorSt} fontSize={'lg'}>{Stat}</Text>
            <Text color={colorTt} fontSize={'sm'}>{Title}</Text>
        </Box>
    )
}