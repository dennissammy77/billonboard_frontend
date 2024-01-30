function getPosition(){
    return new Promise((res, rej) => {
        if(navigator.geolocation){
            //postion = navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            navigator.geolocation.getCurrentPosition(showPosition);
        }else{
            return 'Geolaction is not supported by this browser.'
        }

        function showPosition(position){
            let Latitude = position.coords.latitude;
            let Longitude = position.coords.longitude;
            const location_cord = {
                Latitude,
                Longitude
            }
            console.log(location_cord)
            res(location_cord)
        }

        // const successCallback = (position) => {
        //     let Latitude = position.coords.latitude;
        //     let Longitude = position.coords.longitude;
        //     const location_cord = {
        //         Latitude,
        //         Longitude
        //     }
        //     console.log(location_cord)
        //     res(location_cord)
        // };
        
        // const errorCallback = (error) => {
        //     console.log(error);
        //     rej(error)
        // };
    })
}


export default getPosition