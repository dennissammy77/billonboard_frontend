'use client'

import Map,{ NavigationControl,Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
mapboxgl.workerClass = MapboxWorker;
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import { Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import { FaLocationPin } from "react-icons/fa6";
import { BoardCard } from '../billboards/boardCard';


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