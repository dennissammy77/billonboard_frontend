'use client'
import { Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BoardCard } from './boardCard';
import GetBillBoards from '@/api/billboards/all/route';

function BoardSection({query}) {
  const [data, set_data] = useState([]);
  useEffect(()=>{
    fetch()
  },[query])
  async function fetch(){
    await GetBillBoards().then((response)=>{
      const arr = response?.data
      set_data(arr.filter((item) => item.name_of_billboard?.toLowerCase().includes(query.toLowerCase())))
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(5, 1fr)'}} gap={6} my='4'>
        {data.map((board)=>{
            return(
                <BoardCard key={board?._id} board={board}/>
            )
        })}
    </Grid>
  )
}

export default BoardSection