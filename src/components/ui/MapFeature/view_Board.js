'use client'

import Map,{ NavigationControl,Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
// mapboxgl.workerClass = MapboxWorker;
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import { Box, Icon, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import { FaLocationPin } from "react-icons/fa6";
import { BoardCard } from '../billboards/boardCard';
mapboxgl.workerUrl = new URL(
	"mapbox-gl/dist/mapbox-gl-csp-worker",
	import.meta.url
);

export default function ViewBoardMapSection({board_data}){
	return(
		<Map
			mapStyle="mapbox://styles/mapbox/streets-v9"
			mapboxAccessToken="pk.eyJ1IjoibXVzZW1iaSIsImEiOiJjbHJ6cG1wOTMxdm5qMnFsbXVod2J3Z3FwIn0.AwwZCnNzLvnDVtqvW-nBiw"
		    initialViewState={{
	          	latitude: -1.099616,
			    longitude: 37.043557,
			    zoom: 10,
	        }}
	    >
			<MarkProp board={board_data}/>
	    </Map>
	)
}

const MarkProp=({board})=>{
	const [show,setShow]=useState(false)
	return(
		<Marker 
			longitude={board?.location_cord?.Longitude? board?.location_cord?.Longitude : ''} 
			latitude={board?.location_cord?.Latitude? board?.location_cord?.Latitude : ''}
			color='#3874ff'
			onClick={(()=>{setShow(!show)})}
		>
			<Popover>
				<PopoverTrigger>
					{/**
					 * 
					<Box boxSize={100} p='1' borderRadius={'md'} bgColor={'#fff'}>
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