var TransferModule = (function() {

    function _downloadImage(fileTransfer, url, filePath, x, y, z, ext) {

        var uri = encodeURI(url);

        fileTransfer.download(
            uri,
            filePath,
            function(entry) {
                console.log("download complete: " + entry.fullPath);
                //debugger;
                //DatabaseModule.insertTile(x, y, z, ext);
            },
            function(error) {
                log("download error source " + error.source);
                log("download error target " + error.target);
                log("upload error code" + error.code);
            },
            false, { //No idea... do i need this???
                headers: {
                    "Referer": "http://smm-admin.ch"
                        //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            }
        );
    }

    function downlodTile(z, y, x, layerName, ext) {

        //var prefix = "https://wmts.geo.admin.ch/1.0.0/" + layerTile + "/default/current/21781/";

        var prefix = LayerModule.getPrefix();
        //var prefix = "http://192.168.1.34:3001/tu/";
        var url = prefix + z + '/' + y + '/' + x + ext;

        //var filePath = cordova.file.externalDataDirectory + '/tiles/' + layerTile + '/' + z + '/' + y + '/' + x + ext;        
        var filePath = cordova.file.dataDirectory + '/tiles/' + layerName + '/' + z + '/' + y + '/' + x + ext;

        //var fileTransfer = new FileTransfer();
        //var url = prefix + "offline.jpeg";
        //var filePath = cordova.file.externalDataDirectory + 'offline.jpeg';

        //check if it's not already here
        window.resolveLocalFileSystemURL(filePath, function(o) {
                //yes, do not download...
                console.log("tile already exist");
            },
            function(e) {
                //no, you must download it
                console.log("No tile, dowload it");

                _downloadImage(fileTransfer, url, filePath, x, y, z, ext);
            });

    }


    function downlodTileArray(tiles) {
        //var fileTransfer = new FileTransfer();
        var layerTile = LayerModule.getLayerName();

        var ext = LayerModule.getExt();
        var prefix = LayerModule.getPrefix();

        //var prefix = "http://wmtsproxy.smm-admin.ch:8082/1.0.0/" + layerTile + "/default/current/21781/";

        var tilesArray = tiles;
        var total = tiles.length;
        var progress = 0;

        var downloadThreads = 5;
        console.time('_downloadImageSyncTime');
        if (total > 0) {

            for (var index = 0; index < downloadThreads; index++) {
                _downloadImageSync();
                _downloadImageSync();
                _downloadImageSync();
                _downloadImageSync();
                _downloadImageSync();
            }
        }


        function _downloadImageSync() {
            if (tilesArray.length == 0) {
                downloadThreads--;
                console.log("*************** Thread done ****************");

                if (downloadThreads == 0) {
                    console.log("*************** ALL DOWNLOADS COMPLETED ****************");
                    console.timeEnd('_downloadImageSyncTime');
                    progress = 100;
                    pb.style.width = progress + '%';
                    pb.innerHTML = progress * 1 + '%';

                    //alert("download done");
                    downloadDraw();
                }
                return;
            }

            var tile = tilesArray.pop();
            var url = prefix + tile.zoom + '/' + tile.row + '/' + tile.col + ext;
            //var filePath = cordova.file.externalDataDirectory + '/tiles/' + layerTile + '/' + tile.zoom + '/' + tile.row + '/' + tile.col + ext;
            var filePath = cordova.file.dataDirectory + '/tiles/' + layerTile + '/' + tile.zoom + '/' + tile.row + '/' + tile.col + ext;


            progress = 100 - Math.floor(tilesArray.length / total * 100);
            pb.style.width = progress + '%';
            pb.innerHTML = progress * 1 + '%';

            window.resolveLocalFileSystemURL(filePath, function(o) {
                    //yes, do not download...
                    //console.log("tile already exist");
                    _downloadImageSync();
                },
                function(e) {
                    //no, you must download it
                    //console.log("No tile, dowload it");

                    var uri = encodeURI(url);
                    //console.log(url);
                    fileTransfer.download(
                        uri,
                        filePath,
                        function(entry) {
                            //log("download complete: " + entry.fullPath);
                            _downloadImageSync();
                            //debugger;
                            //DatabaseModule.insertTile(x, y, z, ext);
                        },
                        function(error) {
                            log("download error source " + error.source);
                            log("download error target " + error.target);
                            log("upload error code" + error.code);
                            _downloadImageSync();
                        },
                        false, { //No idea... do i need this???
                            headers: {
                                //"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                                "Referer": "http://smm-admin.ch"
                            }
                        }
                    );
                }
            );
        }
    }


    return {
        downlodTile: downlodTile,
        downlodTileArray: downlodTileArray
    }
}());