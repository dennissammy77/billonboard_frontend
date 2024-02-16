'use client'

import Map,{ NavigationControl,Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
mapboxgl.workerClass = MapboxWorker;
import 'mapbox-gl/dist/mapbox-gl.css';
import { useContext, useEffect, useState } from 'react';
import { Box, Flex, Icon, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text, useDisclosure } from '@chakra-ui/react';
import { FaLocationPin } from "react-icons/fa6";
import GetBillBoards, { GetBillBoardsAdmin } from '@/api/billboards/all/route';
import { usePathname } from 'next/navigation';
import { BoardCard } from '../billboards/boardCard';


export default function MapSection({query}){
	const [data, set_data] = useState([]);
	const [show_board_data,setShow_board_data]=useState(false)

	const pathname = usePathname();
	const pathArr = pathname?.split('/');

	useEffect(()=>{
		fetch();
		console.log(query?.length > 0)
		if(query?.length > 0){
			setShow_board_data(true)
		}else{
			setShow_board_data(false)
		}
	},[query])
	async function fetch(){
		await GetBillBoards().then((response)=>{
			const arr = response?.data
			set_data(arr.filter((item) => item.name_of_billboard?.toLowerCase().includes(query.toLowerCase())))
		}).catch((err)=>{
			console.log(err)
		})
	}
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
			{data.map((board)=>{
				return(	
					<div key={board?._id}>
						<MarkProp board={board} show_board_data={show_board_data} setShow_board_data={setShow_board_data}/>
					</div>
				)
			})}
		</Map>
	)
}

const MarkProp=({board,show_board_data,setShow_board_data})=>{
	return(
		<Marker 			
			longitude={board?.location_cord?.Longitude? board?.location_cord?.Longitude : ''} 
			latitude={board?.location_cord?.Latitude? board?.location_cord?.Latitude : ''} 
			color='#3874ff'
		>
			<Popover>
				<PopoverTrigger onClick={(()=>{view_board_data_popover?.onToggle()})}>
					<Box boxSize={100} p='1' borderRadius={'md'} bgColor={'#fff'}>
						<Image src={board?.advertisement_data?.length > 0 && board.advertisement_data[board?.advertisement_data.length - 1]?.image_url !== ''? board?.advertisement_data[board?.advertisement_data.length - 1]?.image_url: board?.img_placeholder} w='full' h='full' alt='board' borderRadius={'md'} objectFit={'cover'} fallbackSrc='https://firebasestorage.googleapis.com/v0/b/billonoard.appspot.com/o/profile_photo%2Fandroid-chrome-192x192.pngf512460f-12f4-4579-970a-8afb032bb687?alt=media&token=dcc45251-1db7-4a53-b0e3-feb5b43c30c5'/>
					</Box>
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