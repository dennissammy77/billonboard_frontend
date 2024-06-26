'use client'
import { Flex, Grid, GridItem, Text,  Box} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BoardCard } from './boardCard';
import GetBillBoards from '@/api/billboards/all/route';

function BoardSection({query,owner_id,currentPage}) {
  const [data, set_data] = useState([]);
  useEffect(()=>{
    fetch()
  },[query,currentPage])
  async function fetch(){
    const payload = {
      page: currentPage
    }
    await GetBillBoards(payload).then((response)=>{
      const arr = response?.data;
      if(owner_id){
				set_data(arr.filter((item)=>item.currently_owned_by?.owner_id.includes(owner_id)))	
			}else{
				set_data(arr.filter((item) => item.name_of_billboard?.toLowerCase().includes(query.toLowerCase())))
			};
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(5, 1fr)'}} gap={6} my='4'>
      {data?.length === 0? 
        <Flex w='full' h='full' justify={'center'} alignItems='center'>
            <Text color='gray.300' w='full'>No results found</Text>
        </Flex>
        :
        <>
          {data?.map((board)=>{
              return(
                  <BoardCard key={board?._id} board={board}/>
              )
          })}
        </>
      }
    </Grid>
  )
}

export default BoardSection