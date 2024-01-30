'use client'

import Map,{ NavigationControl,Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
mapboxgl.workerClass = MapboxWorker;
import 'mapbox-gl/dist/mapbox-gl.css';

const MapSection=()=>{
	return(
		<Map
			mapStyle="mapbox://styles/mapbox/streets-v9"
			mapboxAccessToken="pk.eyJ1IjoibXVzZW1iaSIsImEiOiJjbGFnam5uODEwMmU3M3BtcTV6YW8wdnAzIn0.a3v6U1sWi095uwDY8YRBhA"
		    initialViewState={{
	          	latitude: -1.099616,
			    longitude: 37.043557,
			    zoom: 10,
	        }}
		   
	    >
	    {data.map((data)=>{
	    	return(
	    		<div key={data.id}>
	    			<MarkProp data={data}/>
	    		</div>
	    	)
	    })}
	    </Map>
	)
}

const data=[
	{
		id:1,
		latitude:-1.089616,
		longitude:37.033557
	},
	{
		id:2,
		latitude:-1.028071,
		longitude:37.041622
	},
	{
		id:3,
		latitude:0.701078,
		longitude:35.259376
	},
]

const MarkProp=({data})=>{
	const [show,setShow]=useState(false)
	return(
		<Marker longitude={data.longitude} latitude={data.latitude} color='#392F5A' onClick={(()=>{setShow(!show)})}>
			<Popover>
				<PopoverTrigger>
					<RoomIcon style={{fontSize:'40px',color:'#392f5a'}}/>
				</PopoverTrigger>
				<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody>
					<Flex direction={'column'}>
						<Text fontSize='18px'>Name: <span style={{color:'#f092dd'}}>Uptone Pharmacy</span></Text>
						<Text>Location: Juja, Kiambu</Text>
						<Text>Distance: 50km</Text>
					</Flex>
				</PopoverBody>
				</PopoverContent>
			</Popover>
		</Marker>
	)
}