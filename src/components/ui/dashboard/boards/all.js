'use client'

import { Search_Input } from '@/components/ui/billboards/input';
import { Badge, Box, Button, Flex, Grid, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { IoMdAdd, IoMdCloseCircle } from 'react-icons/io';
import BoardSection from './boardSection';
import { dashboardContext } from '@/components/providers/dashboard.context';
import { FaMapLocation } from 'react-icons/fa6';
import MapSection from '@/components/ui/MapFeature/view_boards';
import { Filter } from '../../billboards/filter.ui';
import Pagination from '../../billboards/Pagination';

function Boards() {
  const {set_page} = useContext(dashboardContext);
  const [query,set_query]=useState('');
  const [filter_option,set_filter_option]=useState('');
  const [view_map,set_view_map]=useState(false);

  const [toggle_board_options,set_toggle_board_options]=useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Replace this with the actual total number of pages

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Perform data fetching or any other actions based on the new page
  };
  return (
    <Box p={{base:'2',md:'4'}}>
        <Flex align='center' justify='space-between' my='3' >
            {view_map?
              <Text p='2' bg='#e3e3e3' borderRadius={'5'} onClick={(()=>{set_view_map(!view_map)})} cursor='pointer'>View Boards</Text>
              :
              <Flex onClick={(()=>{set_view_map(!view_map)})} cursor={'pointer'} gap='2' align='center'>
                <IconButton icon={<FaMapLocation/>} variant='outline' aria-label='view map' colorScheme={'blue'} />
                <Text>Map</Text>
              </Flex>
            }
            <Button leftIcon={<IoMdAdd/>} bg={'#3874ff'} color='#fff' onClick={(()=>{set_page('New_Board')})}>New billboard</Button>
        </Flex>
        <HStack my='2'>
            <Filter filter_option={filter_option} set_filter_option={set_filter_option}/>
            <Search_Input query={query} set_query={set_query} placeholder='search for billboards'/>
        </HStack>
        {filter_option == '' ? null : 
          <Badge onClick={(()=>{set_filter_option('')})} align={'center'} colorScheme={'orange'} cursor={'pointer'}>
            <HStack>
              <Text>{filter_option}</Text>
              <Icon as={IoMdCloseCircle} boxSize={'4'}/>
            </HStack>
          </Badge>
        }
        {view_map?
          <Box h='600px' w='calc(100vw-20vw)'>
             <MapSection query={query}/>
          </Box>  
          :
          <Box>
            <BoardSection query={query} set_query={set_query} toggle_board_options={toggle_board_options} set_toggle_board_options={set_toggle_board_options} currentPage={currentPage}/>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        }
    </Box>
  )
}

export default Boards;