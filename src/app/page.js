'use client'
import { Box, Button, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  return (
    <Box p=''>
      <Box position={'relative'}>
        <Box display={{base:'none',lg:'block'}}>
          <Image src="../bg/bg-1-2.png" alt='hero-header' w='full' position={'relative'}/>
          <Image src="../bg/herosec.jpg" alt='hero-header' w='full' position={'absolute'} top='100px' right={'100px'} boxSize={500} borderRadius={10}/>
        </Box>
        <Box position={{base:'inherit',lg:'absolute'}} top={{base:'0px',lg:'100px'}} left={{base:'',lg:'100px'}} align='center'>
          <Heading as='h2' fontSize={'60px'} p={{base:'8',lg:'0'}}>
            <span style={{color:'#3874FF'}}>Discover </span><br/>Billboards <br />Online
          </Heading>
          <Text w={{base:'',lg:'400px'}} p={{base:'8',lg:'0'}} mt='2'>Discover and explore billboards from around the world. Get access to a collection of billboards and filter their search based on location, type of billboard, and category. Whether you're a marketer looking for inspiration, an artist seeking to showcase your work, or simply curious about the latest trends in outdoor advertising, BillonBoard offers a unique way to discover and appreciate the art of the billboard.</Text>
          <Button borderRadius={'full'} fontSize={'md'} bg='#3874FF' color='#fff' my='4' onClick={(()=>{router.push('/auth/signup')})}>Register</Button>
        </Box>
      </Box>
      <Grid
        templateRows={{base:'repeat(4, 1fr)',lg:'repeat(2, 1fr)'}}
        templateColumns={{base:'repeat(2, 1fr)',lg:'repeat(4, 1fr)'}}
        gap={2}
        mt='6'
        px='6'
      >
        {partners?.map((item)=>{
          return(
            <Image boxSize={'full'} src={item?.imagepath} key={item?.id} objectFit={'contain'} border={'2px dotted #eee'} p='2'/>
            )
          })}
      </Grid>
      <Box bg='#eee' mt='6'>
        <Flex align='center' px='8' justify={'space-around'} gap={{base:'4',lg:'8'}} flexDirection={{base:'column',lg:'row'}}>
          <Image boxSize={400} src={'../landingpage/interactivemap.png'} objectFit={'contain'}/>
          <Box>
            <Text color='#2874FF' fontSize={'lg'}>Interactive Map view</Text>
            <Text fontWeight={'bold'} fontSize={'xl'}>Get Access to Realtime Billboard locations</Text>
            <Text>Explore billboards from various locations around the world.The map view provides an intuitive and personalized experience for users to search for billboards based on their desired location. Users can zoom in or out, pan the map, and click on markers to view billboards in the selected area. </Text>
          </Box>
        </Flex>
        <Flex align='center' px='8' justify={'space-around'} gap={{base:'4',lg:'8'}} flexDirection={{base:'column-reverse',lg:'row'}}>
          <Box py='4'>
            <Text color='#2874FF' fontSize={'lg'}>COLLECTION OF BILLBOARDS</Text>
            <Text fontWeight={'bold'} fontSize={'xl'}>See various billboards</Text>
            <Text>Diverse collection of billboards from various locations,industries, and categories Browse, search, and discover billboards based on interests</Text>
          </Box>
          <Image boxSize={{base:400,lg:600}} src={'../landingpage/collection.jpg'} objectFit={'contain'}/>
        </Flex>
      </Box>
    </Box>
  )
}

const partners=[
  {
    id:'1',
    imagepath:'../companies/AllianceMediaLogo_02-1.png'
  },
  {
    id:'2',
    imagepath:'../companies/consumerlink.png'
  },
  {
    id:'3',
    imagepath:'../companies/download.jfif'
  },
  {
    id:'4',
    imagepath:'../companies/firmbridge.webp'
  },
  {
    id:'5',
    imagepath:'../companies/Logo-300x193.jpg'
  },
  {
    id:'6',
    imagepath:'../companies/logoadsite.png'
  },
  {
    id:'7',
    imagepath:'../companies/Magnate.png'
  },
  {
    id:'8',
    imagepath:'../companies/Tangerine.png'
  },
]