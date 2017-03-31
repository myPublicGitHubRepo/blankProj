/*
function strToBase64(str) {
	return base64EncArr(strToUTF8Arr(str));
};
*/
/* Base64 string to array encoding */

// function uint6ToB64(nUint6) {

// 	return nUint6 < 26 ? nUint6 + 65 : nUint6 < 52 ? nUint6 + 71
// 			: nUint6 < 62 ? nUint6 - 4 : nUint6 === 62 ? 43
// 					: nUint6 === 63 ? 47 : 65;
// }

// function base64EncArr(aBytes) {

// 	var nMod3 = 2, sB64Enc = "";

// 	for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
// 		nMod3 = nIdx % 3;
// 		if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) {
// 			sB64Enc += "\r\n";
// 		}
// 		nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
// 		if (nMod3 === 2 || aBytes.length - nIdx === 1) {
// 			sB64Enc += String.fromCharCode(uint6ToB64(nUint24 >>> 18 & 63),
// 					uint6ToB64(nUint24 >>> 12 & 63),
// 					uint6ToB64(nUint24 >>> 6 & 63), uint6ToB64(nUint24 & 63));
// 			nUint24 = 0;
// 		}
// 	}

// 	return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3)
// 			+ (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');

// }

// /* UTF-8 array to DOMString and vice versa */

// function UTF8ArrToStr(aBytes) {

// 	var sView = "";

// 	for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
// 		nPart = aBytes[nIdx];
// 		sView += String.fromCharCode(nPart > 251 && nPart < 254
// 				&& nIdx + 5 < nLen ? /* six bytes */
// 		/* (nPart - 252 << 32) is not possible in ECMAScript! So...: */
// 		(nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24)
// 				+ (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12)
// 				+ (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
// 				: nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? /* five bytes */
// 				(nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18)
// 						+ (aBytes[++nIdx] - 128 << 12)
// 						+ (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
// 						: nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? /* four bytes */
// 						(nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12)
// 								+ (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx]
// 								- 128 : nPart > 223 && nPart < 240
// 								&& nIdx + 2 < nLen ? /* three bytes */
// 						(nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6)
// 								+ aBytes[++nIdx] - 128 : nPart > 191
// 								&& nPart < 224 && nIdx + 1 < nLen ? /* two bytes */
// 						(nPart - 192 << 6) + aBytes[++nIdx] - 128 : /* nPart < 127 ? *//* one byte */
// 						nPart);
// 	}

// 	return sView;

// }

// function strToUTF8Arr(sDOMStr) {

// 	var aBytes, nChr, nStrLen = sDOMStr.length, nArrLen = 0;

// 	/* mapping... */

// 	for (var nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
// 		nChr = sDOMStr.charCodeAt(nMapIdx);
// 		nArrLen += nChr < 0x80 ? 1 : nChr < 0x800 ? 2 : nChr < 0x10000 ? 3
// 				: nChr < 0x200000 ? 4 : nChr < 0x4000000 ? 5 : 6;
// 	}

// 	aBytes = new Uint8Array(nArrLen);

// 	/* transcription... */

// 	for (var nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
// 		nChr = sDOMStr.charCodeAt(nChrIdx);
// 		if (nChr < 128) {
// 			/* one byte */
// 			aBytes[nIdx++] = nChr;
// 		} else if (nChr < 0x800) {
// 			/* two bytes */
// 			aBytes[nIdx++] = 192 + (nChr >>> 6);
// 			aBytes[nIdx++] = 128 + (nChr & 63);
// 		} else if (nChr < 0x10000) {
// 			/* three bytes */
// 			aBytes[nIdx++] = 224 + (nChr >>> 12);
// 			aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
// 			aBytes[nIdx++] = 128 + (nChr & 63);
// 		} else if (nChr < 0x200000) {
// 			/* four bytes */
// 			aBytes[nIdx++] = 240 + (nChr >>> 18);
// 			aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
// 			aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
// 			aBytes[nIdx++] = 128 + (nChr & 63);
// 		} else if (nChr < 0x4000000) {
// 			/* five bytes */
// 			aBytes[nIdx++] = 248 + (nChr >>> 24);
// 			aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
// 			aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
// 			aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
// 			aBytes[nIdx++] = 128 + (nChr & 63);
// 		} else /* if (nChr <= 0x7fffffff) */{
// 			/* six bytes */
// 			aBytes[nIdx++] = 252 + /* (nChr >>> 32) is not possible in ECMAScript! So...: */(nChr / 1073741824);
// 			aBytes[nIdx++] = 128 + (nChr >>> 24 & 63);
// 			aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
// 			aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
// 			aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
// 			aBytes[nIdx++] = 128 + (nChr & 63);
// 		}
// 	}

// 	return aBytes;

// }


////////////////////////////////////////////////////////////////////////////////////////
// Transformations from http://openlayers.org/en/v3.5.0/examples/wms-custom-proj.html //
////////////////////////////////////////////////////////////////////////////////////////


/*
 * Swiss projection transform functions downloaded from
 * http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/software/products/skripts.html
 */

// Convert WGS lat/long (° dec) to CH y
function WGStoCHy(lat, lng) {

    // Converts degrees dec to sex
    lat = DECtoSEX(lat);
    lng = DECtoSEX(lng);

    // Converts degrees to seconds (sex)
    lat = DEGtoSEC(lat);
    lng = DEGtoSEC(lng);

    // Axiliary values (% Bern)
    var lat_aux = (lat - 169028.66) / 10000;
    var lng_aux = (lng - 26782.5) / 10000;

    // Process Y
    var y = 600072.37 +
        211455.93 * lng_aux -
        10938.51 * lng_aux * lat_aux -
        0.36 * lng_aux * Math.pow(lat_aux, 2) -
        44.54 * Math.pow(lng_aux, 3);

    return y;
}

// Convert WGS lat/long (° dec) to CH x
function WGStoCHx(lat, lng) {

    // Converts degrees dec to sex
    lat = DECtoSEX(lat);
    lng = DECtoSEX(lng);

    // Converts degrees to seconds (sex)
    lat = DEGtoSEC(lat);
    lng = DEGtoSEC(lng);

    // Axiliary values (% Bern)
    var lat_aux = (lat - 169028.66) / 10000;
    var lng_aux = (lng - 26782.5) / 10000;

    // Process X
    var x = 200147.07 +
        308807.95 * lat_aux +
        3745.25 * Math.pow(lng_aux, 2) +
        76.63 * Math.pow(lat_aux, 2) -
        194.56 * Math.pow(lng_aux, 2) * lat_aux +
        119.79 * Math.pow(lat_aux, 3);

    return x;

}


// Convert CH y/x to WGS lat
function CHtoWGSlat(y, x) {

    // Converts militar to civil and  to unit = 1000km
    // Axiliary values (% Bern)
    var y_aux = (y - 600000) / 1000000;
    var x_aux = (x - 200000) / 1000000;

    // Process lat
    var lat = 16.9023892 +
        3.238272 * x_aux -
        0.270978 * Math.pow(y_aux, 2) -
        0.002528 * Math.pow(x_aux, 2) -
        0.0447 * Math.pow(y_aux, 2) * x_aux -
        0.0140 * Math.pow(x_aux, 3);

    // Unit 10000" to 1 " and converts seconds to degrees (dec)
    lat = lat * 100 / 36;

    return lat;

}

// Convert CH y/x to WGS long
function CHtoWGSlng(y, x) {

    // Converts militar to civil and  to unit = 1000km
    // Axiliary values (% Bern)
    var y_aux = (y - 600000) / 1000000;
    var x_aux = (x - 200000) / 1000000;

    // Process long
    var lng = 2.6779094 +
        4.728982 * y_aux +
        0.791484 * y_aux * x_aux +
        0.1306 * y_aux * Math.pow(x_aux, 2) -
        0.0436 * Math.pow(y_aux, 3);

    // Unit 10000" to 1 " and converts seconds to degrees (dec)
    lng = lng * 100 / 36;

    return lng;

}


// Convert SEX DMS angle to DEC
function SEXtoDEC(angle) {

    // Extract DMS
    var deg = parseInt(angle, 10);
    var min = parseInt((angle - deg) * 100, 10);
    var sec = (((angle - deg) * 100) - min) * 100;

    // Result in degrees sex (dd.mmss)
    return deg + (sec / 60 + min) / 60;

}

// Convert DEC angle to SEX DMS
function DECtoSEX(angle) {

    // Extract DMS
    var deg = parseInt(angle, 10);
    var min = parseInt((angle - deg) * 60, 10);
    var sec = (((angle - deg) * 60) - min) * 60;

    // Result in degrees sex (dd.mmss)
    return deg + min / 100 + sec / 10000;

}

// Convert Degrees angle to seconds
function DEGtoSEC(angle) {

    // Extract DMS
    var deg = parseInt(angle, 10);
    var min = parseInt((angle - deg) * 100, 10);
    var sec = (((angle - deg) * 100) - min) * 100;

    // Avoid rounding problems with seconds=0
    var parts = String(angle).split('.');
    if (parts.length == 2 && parts[1].length == 2) {
        min = Number(parts[1]);
        sec = 0;
    }

    // Result in degrees sex (dd.mmss)
    return sec + min * 60 + deg * 3600;

}