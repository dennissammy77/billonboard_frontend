export default function GetCordFromURL(url){
    const splitURL = url.split('!3d');
    const cord = splitURL[splitURL.length-1].split('!4d');

    let longitude;
    let latitude;

    if (cord.indexOf('?') !== -1){
        longitude = cord[1].split('\\?')[0];
    }else{
        longitude = cord[1];
    }
    latitude = cord[0];
    const location_cord = {
        latitude,
        longitude
    }
    return location_cord;
}