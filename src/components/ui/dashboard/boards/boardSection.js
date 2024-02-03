import { Box, Center, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { BoardCard } from './boardCard';
import { UserContext } from '@/components/providers/user.context';
import { GoBrowser } from "react-icons/go";
import BoardsByOwner from '@/api/billboards/owner/route';
import { usePathname } from 'next/navigation';
import { GetBillBoardsAdmin } from '@/api/billboards/all/route';

function BoardSection({query,filter_option}) {
  const {user} = useContext(UserContext);
  const [data, set_data] = useState([]);

  const pathname = usePathname();
  const pathArr = pathname?.split('/');

  useEffect(()=>{
    fetch()
  },[query,filter_option])
  async function fetch(){
    if (pathArr[2] === 'admin'){
      await GetBillBoardsAdmin().then((response)=>{
        const arr = response?.data.reverse()
        let filtered_data;
        switch(filter_option){
          case 'all':
            filtered_data = arr
            break;
          case 'available':
            filtered_data = arr.filter((item) => item.availability_status)
            break;
          case 'draft':
            filtered_data = arr.filter((item) => !item.publish_status)
            break;
          case 'published':
            filtered_data = arr.filter((item) => item.publish_status)
            break;
          case 'suspended':
            filtered_data = arr.filter((item) => item.suspension_status)
            break;
          case 'verified':
            filtered_data = arr.filter((item) => item.verification_status)
            break;
          case 'unverified':
            filtered_data = arr.filter((item) => !item.verification_status)
            break;
          default:
            filtered_data = arr
        }
        set_data(filtered_data.filter((item) => item.name_of_billboard?.toLowerCase().includes(query.toLowerCase())))
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      await BoardsByOwner(user?._id).then((response)=>{
        const arr = response?.data.reverse();
        let filtered_data;
        switch(filter_option){
          case 'all':
            filtered_data = arr
            break;
          case 'available':
            filtered_data = arr.filter((item) => item.availability_status)
            break;
          case 'draft':
            filtered_data = arr.filter((item) => !item.publish_status)
            break;
          case 'published':
            filtered_data = arr.filter((item) => item.publish_status)
            break;
          case 'suspended':
            filtered_data = arr.filter((item) => item.suspension_status)
            break;
          case 'verified':
            filtered_data = arr.filter((item) => item.verification_status)
            break;
          case 'unverified':
            filtered_data = arr.filter((item) => !item.verification_status)
            break;
          default:
            filtered_data = arr
        }
        set_data(filtered_data.filter((item) => item.name_of_billboard?.toLowerCase().includes(query.toLowerCase())).reverse())
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  return (
    <Box w='full' p='1'>
      {data?.length === 0?
        <Center boxShadow={'sm'} display={'flex'} flexDirection={'column'} py='10' h='100vh' borderRadius='md' w='full'>
          <Icon as={GoBrowser} boxSize={10} color={'gray.200'}/>
          <Text fontSize={'xs'} color={'gray.400'} textAlign={'center'}>You have not uploaded any boards yet.</Text>
        </Center>
      :
        <Box>
          <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(3, 1fr)',xl:'repeat(4, 1fr)'}} gap={6} my='4' w='full'>
            {data.map((board)=>{
              return(
                <BoardCard board={board} key={board?._id}/>
              )
            })}
          </Grid>
        </Box>
      }
    </Box>
  )
}

export default BoardSection