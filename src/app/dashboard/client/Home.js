import { UseGetLocalStorage, UseRemoveItemLocalStorage } from '@/components/hooks/useLocalStorage.hook'
import { BoardCard } from '@/components/ui/billboards/boardCard'
import { Banner } from '@/components/ui/dashboard/banner'
import { Box, Flex, Grid, GridItem, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Home() {
  const [data, set_data]=useState([]);
  const [remove_from_liked_data, set_remove_from_liked_data]=useState(data);
  const toast = useToast()
  useEffect(()=>{
      fetchdata()
  },[remove_from_liked_data])
  async function fetchdata(){
    const data= await UseGetLocalStorage('billboards');
    set_data(data)
  }
  const handle_remove=async(board_id)=>{
    const data={
        _id: board_id
    }
    UseRemoveItemLocalStorage('billboards', data).then((res)=>{
        toast({ title: 'Billboard removed from library', description: '',position:'top-left',variant:'left-accent'})
        set_remove_from_liked_data(board_id)
    }).catch((err)=>{
        toast({ title: 'Something went wrong', description: 'Could not remove this billboard',position:'top-left',variant:'left-accent' })
    })
}
  return (
    <Box>
      <Banner 
        msg={'We are here to help you advertise your business or your content.'} 
        msg2={'Talk to our qualified experts.'} 
        img={'../../boardad.jpg'}
      />
      <Text p='2' bg='#FFF' boxShadow={'md'} my='2' borderRadius='sm'>Saved Billboards</Text>
      <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(5, 1fr)'}} gap={6} my='4'>
        {data?.length === 0? 
          <Flex w='full' h='full' justify={'center'} alignItems='center'>
              <Text color='gray.300' w='full'>No billboards found</Text>
          </Flex>
          :
          <>
            {data?.map((board,index)=>{
                return(
                    <Box m='2' key={board?._id}>
                      <BoardCard key={board?._id} board={board}/>
                      <Text p='1' bg='#FFF' boxShadow={'md'} borderRadius={'sm'} cursor='pointer' onClick={(()=>{handle_remove(board?._id)})}>remove</Text>
                    </Box>
                )
            })}
          </>
        }
      </Grid>
    </Box>
  )
}

export default Home