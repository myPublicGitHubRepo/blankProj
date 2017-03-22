//var dbName = "tilesDB.sqlite";

function log(message) {
    var showLog = true;
    if (showLog) {
        console.log(message);
        //var txtArea = document.getElementById('textarea');
        //txtArea.value = txtArea.value + "\n" + message;

    }
}

var Utils = {
        wmtsXMin: 420000, //minimum  X coordinate in BGDI
        wmtsXRange: 480000, // X rage in BGDI (900'000 - 420'000)
        wmtsYMax: 350000, //maximum  Y coordinate in BGDI
        wmtsYRange: 320000 // Y rage in BGDI (350'000- 30'000)
    }
    /*

    function SheetMetadata(oldDate, zoom, minRow, minCol, maxRow, maxCol, number, responseDate) {
        this.oldDate = oldDate;
        this.zoom = zoom;
        this.minRow = inRow;
        this.minCol = minCol;
        this.maxRow = maxRow;
        this.maxCol = maxCol;
        this.number = number;
        this.responseDate = responseDate;
    }

    function TileMetadata(etag, zoom, row, col) {
        this.etag = etag;
        this.zoom = zoom;
        this.row = row;
        this.col = col;
    };

    */


/// Get the col of the Tile at a given X coordinate
function getTileColFromX(x, tileSizeM) {
    return Math.floor((x - Utils.wmtsXMin) / tileSizeM);
}


/// Get the row of the Tile at a given Y coordinate
function getTileRowFromY(y, tileSizeM) {
    return Math.floor((Utils.wmtsYMax - y) / tileSizeM);
}


/// Get the X coordinate (in LV03, left) of a given BGDI Tile
function getXFromTileCol(col, tileSizeM) {
    return tileSizeM * col + Utils.wmtsXMin;
}

/// Get the Y coordinate (in LV03, top) of a given BGDI Tile
function getYFromTileRow(row, tileSizeM) {
    return Utils.wmtsYMax - tileSizeM * row;
}

function removeGPSClasses() {
    $('.triStateCb').removeClass("disabled enabled centering rotating");
}

var gds = {
    key25: "SMR25_LV95",
    key50: "SMR50_LV95",
    key100: "PK100_LV03",
    key200: "PK200_LV03",
    key500: "PK500_LV03",
    key1M: "PK1M_LV03",
    keyZ16: "nullkeyZ16"
}



function getDictionaryForScale(gdsKey) {
    switch (gdsKey) {
        case gds.key25:
            return {
                zoom: 22, //BGDI zoom level for get request
                tilesX: 750, //total number of tiles
                tilesY: 500, //total number of tiles
                tileSizeM: 640, //tile size in meters
                sheetWidth: 17500, //sheet width in meters
                sheetHeight: 12000
            }
        case gds.key50:
            return {
                zoom: 21, //BGDI zoom level for get request
                tilesX: 375, //total number of tiles
                tilesY: 250, //total number of tiles
                tileSizeM: 1280, //tile size in meters
                sheetWidth: 35000, //sheet width in meters
                sheetHeight: 24000
            }
        case gds.key100:
            return {
                zoom: 20, //BGDI zoom level for get request
                tilesX: 188, //total number of tiles
                tilesY: 125, //total number of tiles
                tileSizeM: 2560, //tile size in meters
                sheetWidth: 70000, //sheet width in meters
                sheetHeight: 48000
            }
        case gds.key200:
            return {
                zoom: 19, //BGDI zoom level for get request
                tilesX: 94, //total number of tiles
                tilesY: 63, //total number of tiles
                tileSizeM: 5120, //tile size in meters
                sheetWidth: 192000, //sheet width in meters
                sheetHeight: 137900
            }
        case gds.key500:
            return {
                zoom: 18, //BGDI zoom level for get request
                tilesX: 38, //total number of tiles
                tilesY: 25, //total number of tiles
                tileSizeM: 12800, //tile size in meters
                sheetWidth: 385000, //sheet width in meters
                sheetHeight: 240000
            }
        case gds.key1M:
            return {
                zoom: 17, //BGDI zoom level for get request
                tilesX: 19, //total number of tiles
                tilesY: 13, //total number of tiles
                tileSizeM: 25600, //tile size in meters
                sheetWidth: 480000, //sheet width in meters
                sheetHeight: 320000
            }
        case gds.keyZ16:
            return {
                zoom: 16, //BGDI zoom level for get request
                tilesX: 8, //total number of tiles
                tilesY: 5, //total number of tiles
                tileSizeM: 64000, //tile size in meters
                sheetWidth: 480000, //sheet width in meters
                sheetHeight: 320000
            }


        default:
            alert("gds was not found");
            return null;
    }
}