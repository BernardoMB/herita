export function formatJsonKeysCdr(jsonRecord): any {
    let originalKeys = Object.keys(jsonRecord);
    let formattedKeys = [];
    for (let key of originalKeys) {
        // tslint:disable-next-line:curly
        if (key !== 'id') formattedKeys.push(parseSingleKeyCdr(key));
    }
    let result = {original: originalKeys, formatted : formattedKeys};
    return result;
}

export function parseSingleKeyCdr(key) {
    switch (key) {
        case 'CellSiteId':
            return 'cellId';
        case 'Adress':
            return 'address';
        case 'SeviceDescription':
            return 'serviceDescription';
        default:
            return key[0].toLowerCase() + key.substring(1);
    }
}


export function formatJsonKeys(originalKeys): any {
    //let originalKeys = Object.keys(jsonRecord);
    let formattedKeys = [];
    for (let key of originalKeys) {
        formattedKeys.push(parseSingleKey(key));
    }
    let result = {original: originalKeys, formatted : formattedKeys};
    return result;
}

export function parseSingleKey(key) {
    let lowerCase = key.toLowerCase();
    let idx = lowerCase.split(' ')[0].length;
    let noSpacedKey = lowerCase.split(' ').join('');
    let formattedKey = noSpacedKey.substr(0, idx) + noSpacedKey.charAt(idx).toUpperCase() + noSpacedKey.substr(idx + 1, noSpacedKey.length);
    return formattedKey;
}

export function formatDateAndTimeStrings(date, time) {

	let splittedDate = date.split('/');
	let splittedTime = time.split(':');

	let d = new Date(splittedDate[2], splittedDate[1] - 1, splittedDate[0], splittedTime[0], splittedTime[1], splittedTime[2], 0);
	return d;


}
export function formatCoordinates(msCoordinates) {
     let splittedCoordinates = msCoordinates.split(' ');
     return {
         coordinates: [splittedCoordinates[1], splittedCoordinates[0]]
     }
    }

export function formatCoordinatesCallReport(degrees, minutes, seconds) : number {
        console.log('degrees', degrees);
        console.log('minutes', minutes);
        console.log('seconds', seconds);
        return parseInt(degrees) + (parseInt(minutes) / 60) + (parseInt(seconds) / 3600);
}
