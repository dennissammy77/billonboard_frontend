'use client'
import { Button, Center, Divider, Flex, Grid, GridItem, HStack, IconButton, Input, Menu, MenuButton, MenuList, Select, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import GetAllSideBoard from '@/api/billboards/board/all/route';
import { CiFilter } from 'react-icons/ci';
import { AdvertisementCard } from './AdvertisementCard';
import moment from 'moment';
import { IoCloseSharp } from 'react-icons/io5';

function AdvertisementSection({owner_id}) {
  const [data, set_data] = useState([]);
  const [agenciesArr,set_agenciesArr]=useState([]);
  const [query,set_query]=useState('');
  const [filter_option,set_filter_option]=useState('');

  const [fromDate,set_fromDate]=useState('');
  const [toDate,set_toDate]=useState(moment(new Date()).format("YYYY-MM-DD"));
  
    useEffect(()=>{
      const fetch=async()=>{
        await GetAllSideBoard().then((response)=>{
            const arr = response?.data;
            let intial_arr = arr;
    
            if(fromDate){
                intial_arr = arr?.filter((item)=>{
                    return new Date(item?.from_date).getTime() >= new Date(fromDate).getTime() && new Date(item?.to_date).getTime() <= new Date(toDate).getTime()
                });
            }
    
            if(owner_id){
                set_data(intial_arr.filter((item)=>item.billboard_id?.currently_owned_by?.owner_id.includes(owner_id)))	
            }else{
                set_data(intial_arr);
            };
          
            const agencies = arr.map((item)=>item?.billboard_id?.ad_agency_name);
            const uniqueArr = [...new Set(agencies)]
            const tempArr = uniqueArr.filter(function( element ) {
                return element !== undefined;
            });
            set_agenciesArr(tempArr);
        }).catch((err)=>{
          console.log(err)
        })
      }
        fetch()
    },[query,toDate,fromDate,owner_id]);


  const ClearFilter=()=>{
    set_filter_option('');
    set_fromDate('');
  }

  return (
    <Flex flexDirection={'column'} gap='2' mt='2'>
        <HStack>
            <Filter set_filter_option={set_filter_option} agenciesdata={agenciesArr} set_fromDate={set_fromDate} set_toDate={set_toDate}/>
            <Input w={{base:'80%',md:'full'}} placeholder='search for advertisements' size='md' onChange={((e)=>{set_query(e.target.value)})}/>
            {filter_option || fromDate ? 
            <IconButton isRound={true} variant='solid' size={'sm'} bg={'#000'} color='#fff' aria-label='clear' fontSize='20px' icon={<IoCloseSharp />} onClick={ClearFilter}/>
                : null
            }
        </HStack>
        <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)',lg:'repeat(5, 1fr)'}} gap={6} my='4' w='full'>
            {data?.length === 0? 
                <Flex w='full' h='full' justify={'center'} alignItems='center'>
                    <Text color='gray.300' w='full'>No results found</Text>
                </Flex>
                :
                <>
                    {data?.filter((item) => item.billboard_id !== null).filter((item)=>item?.brand.toLowerCase().includes(query.toLowerCase())||item?.message?.toLowerCase().includes(query.toLowerCase())).filter((item)=>item?.category.toLowerCase().includes(filter_option.toLowerCase())||item?.season.toLowerCase().includes(filter_option.toLowerCase())||item?.billboard_id?.ad_agency_name.toLowerCase().includes(filter_option.toLowerCase())).map((board)=>{
                        return(
                            <AdvertisementCard key={board?._id} data={board}/>
                        )
                    })}
                </>
            }
        </Grid>
        
    </Flex>
    
  )
}

export default AdvertisementSection;

const Filter=({set_filter_option,agenciesdata,set_toDate,set_fromDate})=>{
    return(
        <Menu>
            <MenuButton as={Button} rightIcon={<CiFilter />}>
                Filter
            </MenuButton>
            <MenuList>
                <Select placeholder='Agencies' variant='Unstyled' cursor='pointer' onChange={((e)=>{set_filter_option(e.target.value)})}>
                    {agenciesdata?.map((item,index)=>{
                        return(
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </Select>
                <Select placeholder='Seasons' variant='Unstyled' cursor='pointer' onChange={((e)=>{set_filter_option(e.target.value)})}>
                    <option value='End of Year'>End of Year</option>
                    <option value='New Year'>New Year</option>
                    <option value='Easter'>Easter</option>
                    <option value='Valentine'>Valentine</option>
                    <option value='Eid'>Eid</option>
                    <option value='Christmas'>Christmas</option>
                    <option value='otherseason'>Other</option>
                </Select>
                <Divider/>
                <Select placeholder='Category' variant='Unstyled' cursor='pointer' onChange={((e)=>{set_filter_option(e.target.value)})}>
                    <option value='education'>Education</option>
                    <option value='finance'>Finance</option>
                    <option value='agriculture'>Agriculture</option>
                    <option value='government'>Government</option>
                    <option value='technology'>Technology</option>
                    <option value='ecommerce'>Ecommerce</option>
                    <option value='Beauty&cosmetics'>Beauty & cosmetics</option>
                    <option value='business'>Business</option>
                    <option value='beverages'>Beverages</option>
                    <option value='government'>Government</option>
                    <option value='othercategory'>Other</option>
                </Select>
                <Divider/>
                <Text color='gray.300' p='2'>Filter by Date</Text>
                <Flex p='2' gap='2' flex='1' flexDirection={'column'}>
                    <Text>From</Text>
                    <Input placeholder="Select Date and Time" size="md" type="datetime-local"  onChange={((e)=>{set_fromDate(e.target.value)})}/>
                </Flex>
                <Flex p='2' gap='2' flex='1' flexDirection={'column'}>
                    <Text>To</Text>
                    <Input placeholder="Select Date and Time" size="md" type="datetime-local" onChange={((e)=>{set_toDate(e.target.value)})}/>
                </Flex>
            </MenuList>
        </Menu>
    )
}