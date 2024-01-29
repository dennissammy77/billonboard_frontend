const successCallback = (position) => {
    let Latitude = position.coords.latitude;
    let Longitude = position.coords.longitude;
    const location_cord = {
        Latitude,
        Longitude
    }
    console.log(location_cord)
};

const errorCallback = (error) => {
    console.log(error);
};

export default function GetLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }else{
        return 'Geolaction is not supported by this browser.'
    }
}

const showPostion=(position)=>{
    let Latitude = position.coords.latitude;
    let Longitude = position.coords.longitude;
    const location_cord = {
        Latitude,
        Longitude
    }
    console.log(location_cord)
    return location_cord
}