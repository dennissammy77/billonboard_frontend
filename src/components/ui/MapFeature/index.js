'use client'

import Map,{ NavigationControl,Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
mapboxgl.workerClass = MapboxWorker;
import 'mapbox-gl/dist/mapbox-gl.css';
import { useContext, useEffect, useState } from 'react';
import { Flex, Icon, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import { FaLocationPin } from "react-icons/fa6";
import GetBillBoards, { GetBillBoardsAdmin } from '@/api/billboards/all/route';
import BoardsByOwner from '@/api/billboards/owner/route';
import { UserContext } from '@/components/providers/user.context';
import { usePathname } from 'next/navigation';
import { Notification } from '../dashboard/alert.ui';
import { BoardCard } from '../dashboard/boards/boardCard';


export default function MapSection(){
	const [data, set_data] = useState([]);
	const {user} = useContext(UserContext);

	const pathname = usePathname();
	const pathArr = pathname?.split('/');

	useEffect(()=>{
		fetch()
	},[])
	async function fetch(){
		if (pathArr[2] === 'admin'){
			await GetBillBoardsAdmin().then((response)=>{
				const arr = response?.data
				set_data(arr)
			}).catch((err)=>{
				console.log(err)
			})
		}else if(pathArr[2] === 'agency' || pathArr[2] === 'footsoldier'){
			await BoardsByOwner(user?._id).then((response)=>{
				const arr = response?.data
				set_data(arr)
			}).catch((err)=>{
				console.log(err)
			})
		}else{
			await GetBillBoards().then((response)=>{
				const arr = response?.data
				set_data(arr)
			}).catch((err)=>{
				console.log(err)
			})
		}
	}
	return(
		<>
			{(!user?.verification_status || !user?.verified_email_status || user?.account_suspension_status) && user?.account_type !== 'admin'? 
                <Notification />
            :
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
								<MarkProp board={board}/>
							</div>
						)
					})}
				</Map>
			}
		</>
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