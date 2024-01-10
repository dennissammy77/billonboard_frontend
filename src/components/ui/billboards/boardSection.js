import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { BoardCard } from './boardCard';

function BoardSection() {
    let arr = [1,2,3,4,5,6,7,8,9,0]
  return (
    <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(5, 1fr)'}} gap={6} my='4'>
        {arr.map((_,board)=>{
            return(
                <BoardCard/>
            )
        })}
    </Grid>
  )
}

export default BoardSection