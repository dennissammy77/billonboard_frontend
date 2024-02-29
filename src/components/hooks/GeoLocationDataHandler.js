'use client'
export default function detectCoordinateFormat(coordinate) {
    // Regular expressions to match degrees minutes seconds (DMS) and decimal degrees (DD) formats
    const dmsRegex = /^(\d{1,3})°\s*(\d{1,2})'\s*(\d{1,2}(\.\d+)?)"?\s*([NS])?,?\s*(\d{1,3})°\s*(\d{1,2})'\s*(\d{1,2}(\.\d+)?)"?\s*([WE])?$/;
    const ddRegex = /^-?\d+(\.\d+)?,?\s*-?\d+(\.\d+)?$/;

    console.log(coordinate)
    if (dmsRegex.test(coordinate)) {
        return dmsToDd(coordinate).toString(); // Degrees, minutes, seconds format
    } else if (ddRegex.test(coordinate)) {
        return 'dd'; // Decimal degrees format
    } else {
        //throw new Error('Invalid coordinate format'); // Neither DMS nor DD
        return 'Unknown'
    }
}

function dmsToDd(dmsCoordinate) {
    // Regular expression to match degrees minutes seconds (DMS) format
    const dmsRegex = /^(\d{1,3})°\s*(\d{1,2})'\s*(\d{1,2}(?:\.\d+)?)?"?\s*([NS])?\s*(\d{1,3})°\s*(\d{1,2})'\s*(\d{1,2}(?:\.\d+)?)?"?\s*([WE])?$/;
    
    // Match the DMS format and extract the components
    const match = dmsCoordinate.match(dmsRegex);
    if (!match) {
        throw new Error("Invalid DMS coordinate format");
    }

    // Extract components from the matched groups
    const degreesLat = parseFloat(match[1]);
    const minutesLat = parseFloat(match[2]);
    const secondsLat = parseFloat(match[3] || 0);
    const directionLat = match[4] || "N";

    const degreesLon = parseFloat(match[5]);
    const minutesLon = parseFloat(match[6]);
    const secondsLon = parseFloat(match[7] || 0);
    const directionLon = match[8] || "E";

    // Convert degrees, minutes, seconds to decimal degrees
    let latitude = Math.abs(degreesLat) + minutesLat / 60 + secondsLat / 3600;
    let longitude = Math.abs(degreesLon) + minutesLon / 60 + secondsLon / 3600;

    // Change the sign based on the direction (North or East are positive, South or West are negative)
    if (directionLat === "S") {
        latitude = -latitude;
    }
    if (directionLon === "W") {
        longitude = -longitude;
    }

    return [latitude, longitude];
}