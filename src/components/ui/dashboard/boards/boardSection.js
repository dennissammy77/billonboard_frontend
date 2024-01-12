import { Center, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { BoardCard } from './boardCard';
import { UserContext } from '@/components/providers/user.context';
import { GoBrowser } from "react-icons/go";
import BoardsByOwner from '@/api/billboards/owner/route';

function BoardSection() {
  const {user} = useContext(UserContext);
  const [data, set_data] = useState([]);
  useEffect(()=>{
    fetch()
  },[])
  async function fetch(){
    await BoardsByOwner(user?._id).then((response)=>{
      set_data(response?.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
      {data?.length == 0?
        <Center boxShadow={'sm'} display={'flex'} flexDirection={'column'} py='10' h='100%' borderRadius='md' w='full'>
          <Icon as={GoBrowser} boxSize={10} color={'gray.200'}/>
          <Text fontSize={'xs'} color={'gray.400'} textAlign={'center'}>You have not uploaded any boards yet.</Text>
        </Center>
      :
        <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(3, 1fr)',xl:'repeat(4, 1fr)'}} gap={6} my='4'>
          {data.map((board)=>{
            return(
              <BoardCard board={board} key={board?._id}/>
            )
          })}
        </Grid>
      }
    </>
  )
}

export default BoardSection