var TileModule = (function() {


    function getTilesInSquare(pointX, pointY, radius) {

        hasErrors = false;

        for (var gdsKey in gds) {
            // skip loop if the property is from prototype
            if (!gds.hasOwnProperty(gdsKey)) continue;

            // your code
            console.log(gdsKey + " = " + gds[gdsKey]);
            var dictionaryForScale = getDictionaryForScale(gds[gdsKey]);

            var tileSizeM = dictionaryForScale.tileSizeM;

            var zoom = dictionaryForScale.zoom;
            //calculates the boundaries
            var minRow = getTileRowFromY(pointY + radius, tileSizeM);
            var minCol = getTileColFromX(pointX - radius, tileSizeM);
            var maxRow = getTileRowFromY(pointY - radius, tileSizeM);
            var maxCol = getTileColFromX(pointX + radius, tileSizeM);

            hasErrors = _getTilesForPerimeter(zoom, minRow, minCol, maxRow, maxCol);

        }
        console.log("Done");

        return hasErrors;
    }

    function getTilesInBox(pointX1, pointY1, pointX2, pointY2) {
        var tilesPerimeter = [];
        hasErrors = false;
        console.log("Prepare getTilesInSquare");
        for (var gdsKey in gds) {
            // skip loop if the property is from prototype
            if (!gds.hasOwnProperty(gdsKey)) continue;

            // your code
            console.log(gdsKey + " = " + gds[gdsKey]);
            var dictionaryForScale = getDictionaryForScale(gds[gdsKey]);

            var tileSizeM = dictionaryForScale.tileSizeM;

            var zoom = dictionaryForScale.zoom;
            //calculates the boundaries
            var minRow = getTileRowFromY(pointY2, tileSizeM);
            var minCol = getTileColFromX(pointX1, tileSizeM);
            var maxRow = getTileRowFromY(pointY1, tileSizeM);
            var maxCol = getTileColFromX(pointX2, tileSizeM);

            //hasErrors = _getTilesForPerimeter(zoom, minRow, minCol, maxRow, maxCol);
            tilesPerimeter.push({
                zoom: zoom,
                minRow: minRow,
                minCol: minCol,
                maxRow: maxRow,
                maxCol: maxCol
            });
        }

        console.log("Completed getTilesInSquare");
        _getTilesForPerimeter2(tilesPerimeter);
        return hasErrors;
    }



    function _getTilesForPerimeter(zoom, minRow, minCol, maxRow, maxCol) {
        //Consider to perform an update first in order to avoid mixed tiles (old and new)
        //maybe ask the user if he also wants to update the tiles (it's recommended)

        //get only the tiles that are missing for this perimeter
        var missingTiles = _getMissingTilesForPerimeter(zoom, minRow, minCol, maxRow, maxCol);
        //if (missingTiles == null)
        //{
        //    //an error occurred
        //    return true;
        //}
        _downloadMissingTiles(missingTiles);
        console.log("done");
        return false;
    }

    function _getTilesForPerimeter2(tilesPerimeter) {
        //Consider to perform an update first in order to avoid mixed tiles (old and new)
        //maybe ask the user if he also wants to update the tiles (it's recommended)

        //get only the tiles that are missing for this perimeter
        var missingTiles = _getMissingTilesForPerimeter2(tilesPerimeter);
        //if (missingTiles == null)
        //{
        //    //an error occurred
        //    return true;
        //}
        _downloadMissingTiles(missingTiles);
        console.log("done");
        return false;
    }

    function _downloadMissingTiles(missingTiles) {
        var hasError = false;
        //change this const to a variable
        //var layer = "ch.swisstopo.pixelkarte-farbe";
        //download the tiles
        //TileRequester tr = new TileRequester(u, layer);
        // Do it Multithreaded and Async Download

        /*
        for (tile in missingTiles) {
            // skip loop if the property is from prototype
            if (!missingTiles.hasOwnProperty(tile)) continue;
            //alert("tile zoom"+tile.zoom);
            //alert("tile zoom"+missingTiles[tile].zoom);

            TransferModule.downlodTile(missingTiles[tile].zoom, missingTiles[tile].row, missingTiles[tile].col);
        }
        */


        TransferModule.downlodTileArray(missingTiles);
    }


    function _getMissingTilesForPerimeter(zoom, minRow, minCol, maxRow, maxCol) {
        var missingTiles = [];
        for (var row = minRow; row <= maxRow; row++) {

            //directory doese not exist, add all tiles
            for (var col = minCol; col <= maxCol; col++) {
                missingTiles.push({
                    zoom: zoom,
                    row: row,
                    col: col
                });
            }

        }
        console.log("Total missing tiles: " + missingTiles.length);
        return missingTiles;
    }

    function _getMissingTilesForPerimeter2(tilesPerimeter) {
        console.log("prepare _getMissingTilesForPerimeter2");
        var missingTiles = [];
        tilesPerimeter.forEach(function(element) {
            for (var row = element.minRow; row <= element.maxRow; row++) {

                //directory doese not exist, add all tiles
                for (var col = element.minCol; col <= element.maxCol; col++) {
                    missingTiles.push({
                        zoom: element.zoom,
                        row: row,
                        col: col
                    });
                }

            }
        }, this);


        console.log("Total missing tiles: " + missingTiles.length);
        console.log("Completed _getMissingTilesForPerimeter2");

        return missingTiles;
    }


    function deleteLayer() {
        if (confirm('Are you sure you want to delete everything?')) {
            var type = cordova.file.dataDirectory;
            var fileName = type + '/tiles/ch.swisstopo.pixelkarte-farbe'; //ch.swisstopo.pixelkarte-farbe/'

            window.resolveLocalFileSystemURL(fileName, function(dir) {
                dir.removeRecursively(function(file) {
                    alert("all files removed");

                    //reset firstLaunch
                    window.localStorage.setItem('firstLaunch', 0);


                }, function(error) {
                    console.log(dir);
                    alert("error remove " + error.code);
                }, function() {
                    alert("dir is already empty");
                });
                /*
                            dir.getDirectory('ch.swisstopo.pixelkarte-farbe', { create: false }, function(dirEntry) {
                                dirEntry.remove(function(file) {
                                    alert("fichier supprimer");
                                }, function() {
                                    alert("erreur suppression " + error.code);
                                }, function() {
                                    alert("fichier n'existe pas");
                                });
                            }, function() {
                                console.log("error");
                            });
                            */


                /*

                            dir.getFile("log1.txt", { create: false }, function(fileEntry) {
                                fileEntry.remove(function(file) {
                                    alert("fichier supprimer");
                                }, function() {
                                    alert("erreur suppression " + error.code);
                                }, function() {
                                    alert("fichier n'existe pas");
                                });
                            });
                */

            });
        }

    }

    function deleteTemp() {
        var cachedir = cordova.file.cacheDirectory;
        if (device.platform == "iOS") {

            cachedir = cordova.file.tempDirectory;
        }
        var cacheName = cachedir + 'blankProj/temp';

        window.resolveLocalFileSystemURL(cacheName, function(dir) {
            dir.removeRecursively(function(file) {
                console.log("temp deleted");

            }, function(error) {
                console.log("error remove " + error.code);

            }, function() {
                //already empty...
            });
        });
    }


    function downloadDefault() {
        var ext = ".jpeg";

        var z = 15;
        var maxY = 3;
        var maxX = 4;
        _dRowCol(z, maxY, maxX);

        var z = 14;
        var maxY = 2;
        var maxX = 3;
        _dRowCol(z, maxY, maxX);

        var z = 13;
        var maxY = 2;
        var maxX = 3;
        _dRowCol(z, maxY, maxX);

        var z = 12;
        var maxY = 2;
        var maxX = 2;
        _dRowCol(z, maxY, maxX);

        var z = 11;
        var maxY = 1;
        var maxX = 2;
        _dRowCol(z, maxY, maxX);


        function _dRowCol(z, maxY, maxX) {
            for (var y = 0; y < maxY; y++) {
                for (var x = 0; x < maxX; x++) {
                    TransferModule.downlodTile(z, y, x, ext);
                }
            }
        }

    }

    return {
        getTilesInSquare: getTilesInSquare,
        getTilesInBox: getTilesInBox,
        deleteLayer: deleteLayer,
        downloadDefault: downloadDefault,
        deleteTemp: deleteTemp
    }
}());