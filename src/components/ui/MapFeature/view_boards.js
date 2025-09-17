'use client'

import Map,{ NavigationControl,Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
// mapboxgl.workerClass = MapboxWorker;
import 'mapbox-gl/dist/mapbox-gl.css';
import { useContext, useEffect, useState } from 'react';
import { Box, Flex, Icon, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text, useDisclosure } from '@chakra-ui/react';
import { FaLocationPin } from "react-icons/fa6";
import GetBillBoards, { GetBillBoardsAdmin } from '@/api/billboards/all/route';
import { usePathname } from 'next/navigation';
import { BoardCard } from '../billboards/boardCard';
mapboxgl.workerUrl = new URL(
  "mapbox-gl/dist/mapbox-gl-csp-worker",
  import.meta.url
);


export default function MapSection({query,owner_id}){
	const [data, set_data] = useState([]);
	const [location_initialstate,set_location_initialstate]=useState({
		latitude: data[0]?.location_cord?.Latitude ? data[0]?.location_cord?.Latitude : -1.099616,
		longitude: data[0]?.location_cord?.Longitude ? data[0]?.location_cord?.Longitude : 37.043557,
	})

	const pathname = usePathname();
	const pathArr = pathname?.split('/');

	useEffect(()=>{
		fetch();
	},[query])
	async function fetch(){
		await GetBillBoards().then((response)=>{
			const arr = response?.data
			if(owner_id){
				set_data(arr.filter((item)=>item.currently_owned_by?.owner_id.includes(owner_id)))	
			}else{
				set_data(arr.filter((item)=>item.name_of_billboard?.toLowerCase().includes(query.toLowerCase())))
			}
		}).catch((err)=>{
			console.log(err)
		})
	}
	return(
		<Map
			mapStyle="mapbox://styles/mapbox/streets-v9"
			mapboxAccessToken="pk.eyJ1IjoibXVzZW1iaSIsImEiOiJjbHJ6cG1wOTMxdm5qMnFsbXVod2J3Z3FwIn0.AwwZCnNzLvnDVtqvW-nBiw"
			initialViewState={{
				latitude: location_initialstate.latitude,
				longitude: location_initialstate.longitude,
				zoom: 10,
			}}
		>
			{data.map((board)=>{
				return(	
					<div key={board?._id}>
						<MarkProp board={board} query={query}/>
					</div>
				)
			})}
		</Map>
	)
}

const MarkProp=({board,query})=>{
	return(
		<Marker 			
			longitude={board?.location_cord?.Longitude? board?.location_cord?.Longitude : ''} 
			latitude={board?.location_cord?.Latitude? board?.location_cord?.Latitude : ''} 
			color='#3874ff'
		>
			<Popover>
				<PopoverTrigger onClick={(()=>{view_board_data_popover?.onToggle()})}>
					{/**
					 * 
					<Box boxSize={query?.length > 0 ? 400 : 100} p='1' borderRadius={'md'} bgColor={query?.length > 0? 'orange.200' : '#fff'}>
						<Image src={board?.advertisement_data?.length > 0 && board.advertisement_data[board?.advertisement_data.length - 1]?.image_url !== ''? board?.advertisement_data[board?.advertisement_data.length - 1]?.image_url: board?.img_placeholder} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'/>
					</Box>
					 */}
					<Icon as={FaLocationPin} boxSize='8' color='#3874ff'/>
				</PopoverTrigger>
				<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody>
					<BoardCard board={board}/>
				</PopoverBody>
				</PopoverContent>
			</Popover>
		</Marker>
	)
}								