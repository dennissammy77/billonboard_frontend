'use client'
import { Grid, GridItem, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import GetAgencies from '@/api/auth/client/agency/all/route';
import { AgencyCard } from './AgencyCard';

function AgencySection({query}) {
  const [data, set_data] = useState([]);
  useEffect(()=>{
    fetch()
  },[query])
  async function fetch(){
    await GetAgencies().then((response)=>{
      const arr = response?.data
      set_data(arr.filter((item) => item.company_name?.toLowerCase().includes(query.toLowerCase())))
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(5, 1fr)'}} gap={6} my='4'>
        {data.map((agency)=>{
            return(
                <AgencyCard agency={agency} key={agency?._id}/>
            )
        })}
    </Grid>
  )
}

export default AgencySection;