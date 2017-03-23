var olMap;
var olStuff = (function() {
    var gpsStates = {
        disabled: 0,
        enabled: 1,
        centering: 2,
        rotating: 3
    }
    var gpsState = gpsStates.disabled;
    var watchId;
    var watchIdCompass;
    var accuracyFeature;
    var arrowFeature;


    var ovalFeature;


    proj4.defs('EPSG:21781', '+proj=somerc +lat_0=46.95240555555556 ' +
        '+lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel ' +
        '+towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs');
    var proj21781 = ol.proj.get('EPSG:21781');
    proj21781.setExtent([485071.54, 75346.36, 828515.78, 299941.84]);
    ol.proj.addProjection(proj21781);

    /*
    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }*/

    function b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    function utf8_to_b64(str) {
        return window.btoa(decodeURIComponent(encodeURIComponent(str)));
    }



    function _createXYZSource(layerName, imgExt) {

        var resolutions = [4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250,
            2000, 1750, 1500, 1250, 1000, 750, 650, 500, 250,
            100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5
        ];
        //var matrixIds = [];
        var extent = [420000, 30000, 900000, 350000];
        return new ol.source.XYZ({
            cacheSize: 32768,
            crossOrigin: 'anonymous',
            //url: 'http://wmtsproxy.smm-admin.ch:8082/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/21781/{z}/{y}/{x}.jpeg',
            url: 'https://wmts.geo.admin.ch/1.0.0/' + layerName + '/default/current/21781/{z}/{y}/{x}' + imgExt,
            //tileUrlFunction: function() { console.log("url") },
            tileLoadFunction: function(imageTile, src) {

                /*
                                         var z = imageTile.tileCoord[0];
                                    var x = imageTile.tileCoord[1];
                                    var y = -imageTile.tileCoord[2] - 1;
                                    console.time(z.toString() + y.toString() + x.toString());
                                    cordovaHTTP.setHeader("Referer", "http://smm-admin.ch");

                                    //var filename = cordova.file.externalDataDirectory + '/tiles/' + z.toString() + '/' + y.toString() + '/' + x.toString() + '.jpeg';
                                    var fileName = cordova.file.dataDirectory + '/tiles/' + layerName + '/' + z.toString() + '/' + y.toString() + '/' + x.toString() + imgExt;

                                    window.resolveLocalFileSystemURL(fileName, function(o) {
                                            //get the local stored tile
                                            imageTile.getImage().src = fileName;
                                        },
                                        function(e) {
                                            //get the tile from internet or an "network error" image
                                            if (navigator.connection.type == Connection.NONE) {
                                                imageTile.getImage().src = cordova.file.applicationDirectory + 'www/images/offline.jpeg';
                                            } else {
                                                //check if it's cached/or in temp
                                                var cachedir = cordova.file.cacheDirectory;
                                                if (device.platform == "iOS") {

                                                    cachedir = cordova.file.tempDirectory;
                                                }
                                                var cacheName = cachedir + '/blankProj/temp/' + layerName + '/' + z.toString() + '/' + y.toString() + '/' + x.toString() + imgExt;
                                                window.resolveLocalFileSystemURL(cacheName, function(o2) {
                                                        //get the cached tile

                                                        imageTile.getImage().src = cacheName;
                                                    },
                                                    function(e2) {
                                                        //not in persistent and also not cached

                                                        //console.log(url);

                                                        //var uri2 = encodeURI(src);

                                                        cordovaHTTP.downloadFile(src, {

                                                        }, {}, cacheName, function(entry) {

                                                            imageTile.getImage().src = entry.nativeURL;
                                                            console.timeEnd(z.toString() + y.toString() + x.toString());




                                                        }, function(response) {
                                                            console.error(response.error);
                                                        });

                                                    }
                                                );




                                            }
                                        });
                
                                     */

                /*
                var z = imageTile.tileCoord[0];
                var x = imageTile.tileCoord[1];
                var y = -imageTile.tileCoord[2] - 1;

                var cachedir = cordova.file.cacheDirectory;
                if (device.platform == "iOS") {

                    cachedir = cordova.file.tempDirectory;
                }
                var cacheName = cachedir + 'blankProj/temp/' + layerName + '/' + z.toString() + '/' + y.toString() + '/' + x.toString() + imgExt;
                console.log(cacheName);

                cordovaHTTP.setHeader("Referer", "http://smm-admin.ch");

                cordovaHTTP.downloadFile(src, {

                }, {}, cacheName, function(entry) {

                    imageTile.getImage().src = entry.nativeURL;

                }, function(response) {
                    console.log(response);
                    console.error(response.error);
                });

                */
                /*
                                cordovaHTTP.setHeader("Referer", "http://smm-admin.ch");
                                cordovaHTTP.setHeader("Content-Type", "image/jpeg");
                                cordovaHTTP.get(src, {

                                    }, {}, function(response) {
                                        //console.log(response.data);
                                        //var dd = Base64.encode(response.data);
                                        //console.log(dd);
                                        //debugger;
                                        //console.log(dd);

                                        //var base64Data = btoa(response.data);
                                        //debugger;
                                        //var base64Data = b64DecodeUnicode(response.data);
                                        //console.log(response.data.blob());

                                        //debugger;
                                        //console.log(response.data);
                                        //var sdas = 'data:text/plain;charset=UTF-8;base64,' + response.data;
                                        //var data2 = 'data:image/jpeg;charset=UTF-8;base64,' + window.btoa(unescape(encodeURIComponent(response.data)));


                                        //console.log(data2);
                                        //debugger;

                                        var binary = '';
                                        var responseText = response.data;
                                        var responseTextLen = response.data.length;
                                        for (var j = 0; j < responseTextLen; j += 1) {
                                            binary += String.fromCharCode(responseText.charCodeAt(j) & 0xff)
                                        }
                                        var base64Image = 'data:image/jpeg;charset=UTF-8;base64,' + window.btoa(binary);

                                        //var blob = new Blob([response.data], { type: 'image/jpeg' });
                                        //var theImageData = base64Image;
                                        //console.log(binary);
                                        imageTile.getImage().src = base64Image;
                                        debugger;
                                        //debugger;
                                        //console.log(response);
                                        //debugger;
                                    },
                                    function(response) {
                                        console.error(response);
                                        debugger;

                                    });
                */

                /*
                                $.ajax({
                                    url: "src",
                                    //data: { signature: authHeader },
                                    type: "GET",
                                    beforeSend: function(xhr) { xhr.setRequestHeader('Referer', 'http://smm-admin.ch'); },
                                    success: function(f) {

                                        alert('Success!' + authHeader);
                                        debugger;
                                    }
                                });*/



                var z = imageTile.tileCoord[0];
                var x = imageTile.tileCoord[1];
                var y = -imageTile.tileCoord[2] - 1;

                //var filename = cordova.file.externalDataDirectory + '/tiles/' + z.toString() + '/' + y.toString() + '/' + x.toString() + '.jpeg';
                var fileName = cordova.file.dataDirectory + '/tiles/' + layerName + '/' + z.toString() + '/' + y.toString() + '/' + x.toString() + imgExt;

                window.resolveLocalFileSystemURL(fileName, function(o) {
                        //get the local stored tile
                        imageTile.getImage().src = fileName;
                    },
                    function(e) {
                        //get the tile from internet or an "network error" image
                        if (navigator.connection.type == Connection.NONE || PreferenceModule.isOffline()) {
                            imageTile.getImage().src = cordova.file.applicationDirectory + 'www/images/offline.jpeg';
                        } else {
                            //check if it's cached/or in temp
                            var cachedir = cordova.file.cacheDirectory;
                            if (device.platform == "iOS") {

                                cachedir = cordova.file.tempDirectory;
                            }
                            var cacheName = cachedir + 'blankProj/temp/' + layerName + '/' + z.toString() + y.toString() + x.toString() + imgExt;
                            /*
                            //this apporach could be uesd in order to chache the files...
                            window.resolveLocalFileSystemURL(cacheName, function(o2) {
                                    //get the cached tile
                                    
                                    imageTile.getImage().src = cacheName;
                                },
                                function(e2) {
                                    */
                            var uri = encodeURI(src);
                            fileTransfer.download(
                                uri,
                                cacheName,
                                function(entry) {

                                    imageTile.getImage().src = entry.nativeURL;
                                    //DatabaseModule.insertTile(x, y, z, ext);
                                },
                                function(error) {
                                    console.log("download error source " + error.source);
                                    console.log("download error target " + error.target);
                                    console.log("upload error code" + error.code);

                                },
                                false, { //No idea... do i need this???
                                    headers: {
                                        //"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                                        "Referer": "http://smm-admin.ch"
                                    }
                                }
                            );
                            //   }
                            // );
                        }
                    });


                /*
                                    var z = imageTile.tileCoord[0];
                                    var x = imageTile.tileCoord[1];
                                    var y = -imageTile.tileCoord[2] - 1;
                                    //var filename = cordova.file.externalDataDirectory + '/tiles/' + z.toString() + '/' + y.toString() + '/' + x.toString() + '.jpeg';
                                    var fileName = cordova.file.dataDirectory + '/tiles/ch.swisstopo.pixelkarte-farbe/' + z.toString() + '/' + y.toString() + '/' + x.toString() + '.jpeg';

                                    window.resolveLocalFileSystemURL(fileName, function(o) {
                                            //get the local stored tile
                                            imageTile.getImage().src = fileName;
                                        },
                                        function(e) {
                                            //get the tile from internet or an "network error" image
                                            if (navigator.connection.type == Connection.NONE) {
                                                imageTile.getImage().src = cordova.file.applicationDirectory + 'www/images/offline.jpeg';
                                            } else {
                                                imageTile.getImage().src = src;
                                            }
                                        });*/

            },
            projection: 'EPSG:21781',
            //projection: ol.proj.get("EPSG:21781"),
            tileGrid: new ol.tilegrid.WMTS({
                matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                origin: [420000, 350000],
                resolutions: resolutions,

                //tileSize: 512,
            }),
        });
    }
    var swissLayer = createSwissLayer();

    function createSwissLayer() {;
        //var extent = [ 420000, 30000, 900000, 350000 ];
        var l = new ol.layer.Tile({
            //useInterimTilesOnError: false,
            source: _createXYZSource("ch.swisstopo.pixelkarte-farbe", ".jpeg")
        });
        //var source1 = l.getSource();
        //source1.setRenderReprojectionEdges(true);
        return l;
    }



    function init() {

        var olStyle = getOlStyles();       
        ovalFeature  =  new  ol.Feature({
            geometry:  new  ol.geom.Point([0,  0])
        });        
        ovalFeature.setStyle(olStyle.ovalStyle);

              
        arrowFeature  =  new  ol.Feature({
            geometry:  new  ol.geom.Point([0,  0])
        });        
        arrowFeature.setStyle(olStyle.arrowStyle);

        accuracyFeature = new ol.Feature({
            geometry: new ol.geom.Circle([0, 0], 0)
        });

        accuracyFeature.setStyle(olStyle.accuracyStyle);

        var vectorSource = new ol.source.Vector({
            features: [accuracyFeature, arrowFeature, ovalFeature]
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            //style: iconStyle
        });



        //alert(window.devicePixelRatio);
        olMap = new ol.Map({
            pixelRatio: 2,
            target: 'map',
            renderer: 'canvas',
            controls: ol.control.defaults({
                attribution: false,
                zoom: false,
            }),
            //renderer: 'webgl', // use WebGL renderer
            //renderer: 'dom',
            layers: [
                swissLayer,
                vectorLayer
            ],
            view: new ol.View({
                projection: ol.proj.get("EPSG:21781"),
                extent: (ol.proj.get("EPSG:21781").getExtent() || undefined),
                center: [660450, 192550],
                resolution: 750,
                resolutions: [1000, 500, 250,
                    100, 50, 20, 10, 5, 2.5, 1.5, 0.5
                ]

                //minResolution: 0.1,
                //maxResolution: 1000
                //zoom: 6,
                //maxZoom: 13,
                //minZoom: 4
            }),
            loadTilesWhileAnimating: true,
            loadTilesWhileInteracting: true

        });
        /*
        swissLayer.getSource().on('tileloadend', function(e) {
            console.log(e);
        });*/

        //DETECT ZOOM change

        /*
        olMap.on('moveend', function() {
            olMap.once('postcompose', function(event) {
                console.log(event);
                //doyourmagic();
                //console.time('someFunction');
                //TileModule.deleteTemp();
            });
            //map.getVue0
            //console.time('someFunction');
            //TileModule.deleteTemp();
        });
*/
        /*
            olMap.on('dblclick', function(e) {

                console.log(e);
                //console.log(e.originalEvent.touches.length);


            });
            */

        /*
            olMap.getView().on('change:resolution', function() {

                console.log(olMap.getView().getResolution());
                console.log(olMap.getView().getZoom());

            });
            */

    }

    function onHeadSuccess(heading) {
        console.log('Heading: ' + heading);
    }


    function toggleGPS(element) {
        //var geolocationBtn = document.getElementById('gpsBtn');
        $(element).removeClass("disabled enabled centering rotating");
        arrowFeature.setStyle(olStyles.arrowStyle);
        switch (gpsState) {
            case gpsStates.disabled:
                gpsState = gpsStates.enabled;
                $(element).addClass("enabled");

                navigator.geolocation.getCurrentPosition(function(position) {
                    var chY = WGStoCHy(position.coords.latitude, position.coords.longitude);
                    var chX = WGStoCHx(position.coords.latitude, position.coords.longitude);
                    if (ovalFeature.getGeometry().getCoordinates() != [0, 0]) {
                        olMap.getView().animate({ center: [chY, chX] }, { resolution: 5 });
                    }
                }, _geolocationError);
                watchId = navigator.geolocation.watchPosition(_geolocationSuccess, _geolocationError, { enableHighAccuracy: true });
                watchIdCompass = navigator.compass.watchHeading(_compassSuccess, _compassError, { frequency: 200 });

                //olMap.getView().animate({ center: ovalFeature.getGeometry().getCoordinates() });
                break;
            case gpsStates.enabled:
                gpsState = gpsStates.centering;
                $('#gpsBtn').addClass("centering");
                if (ovalFeature.getGeometry().getCoordinates() != [0, 0]) {
                    olMap.getView().animate({ center: ovalFeature.getGeometry().getCoordinates(), resolution: 5 });

                }
                break;
            case gpsStates.centering:
                gpsState = gpsStates.rotating;
                $(element).addClass("rotating");
                arrowFeature.setStyle(olStyles.arrowStyleRotate);

                if (ovalFeature.getGeometry().getCoordinates() != [0, 0]) {
                    olMap.getView().animate({ center: ovalFeature.getGeometry().getCoordinates(), resolution: 5 });
                }
                break;
            case gpsStates.rotating:
                navigator.geolocation.clearWatch(watchId);
                navigator.compass.clearWatch(watchIdCompass);
                gpsState = gpsStates.disabled;
                $(element).addClass("disabled");
                //reset everithing (and hide)
                ovalFeature.getGeometry().setCoordinates([0, 0]);
                arrowFeature.getGeometry().setCoordinates([0, 0]);
                accuracyFeature.getGeometry().setCenterAndRadius([0, 0], 0);
                olMap.getView().animate({ rotation: 0, duration: 100, easing: ol.easing.linear });
                break;

            default:
                break;
        }

    }
    var prevHeading = 0;

    function _compassSuccess(heading) {
        //TODO iphone 5 and 6 


        if (Math.abs(heading.trueHeading - prevHeading) > 10) {

            if (device.platform == "iOS") {
                TapticEngine.impact({
                    style: "medium" // light | medium | heavy
                });
            } else {
                navigator.vibrate(20);
                console.log("vib");
            }

            //console.log(heading.trueHeading - prevHeading);
            var radiants = heading.trueHeading * (Math.PI / 180);

            if (gpsState == gpsStates.rotating) {
                if (Math.abs(olMap.getView().getRotation() - radiants) >= 3) {
                    olMap.getView().setRotation(-radiants);
                } else {
                    olMap.getView().animate({ rotation: -radiants, duration: 200, easing: ol.easing.linear, anchor: ovalFeature.getGeometry().getCoordinates() });
                }
            } else {
                if (Math.abs(heading.trueHeading - prevHeading) > 10) {
                    arrowFeature.getStyle().getImage().setRotation(radiants);
                    arrowFeature.setStyle(arrowFeature.getStyle());

                }
            }
            prevHeading = heading.trueHeading;
        }



    };

    function _compassError(compassError) {
        console.log('Compass error: ' + compassError.code);
    };


    function _geolocationSuccess(position) {
        var chY = WGStoCHy(position.coords.latitude, position.coords.longitude);
        var chX = WGStoCHx(position.coords.latitude, position.coords.longitude);
        //console.log("acc: " + position.coords.accuracy);
        //console.log("head: " + position.coords.heading);


        //save position and set map center
        var pos = [chY, chX];

        var acc = position.coords.accuracy <= 30 ? 0 : position.coords.accuracy;
        arrowFeature.getGeometry().setCoordinates(pos);
        ovalFeature.getGeometry().setCoordinates(pos);
        accuracyFeature.getGeometry().setCenterAndRadius(pos, acc);
        //olMap.getView().setCenter(pos);
        if (gpsState == gpsStates.centering || gpsState == gpsStates.rotating) {
            olMap.getView().animate({ center: pos });
        }



    };

    function _geolocationError() {
        console.log("GEOLOCATION error");
    }

    function setArrowStyle(isBig) {
        var olStyles = getOlStyles();
        if (isBig) {
            arrowFeature.setStyle(olStyles.bigArrowStyle);
        } else {
            arrowFeature.setStyle(olStyles.arrowStyle);
        }
    }

    return {
        init: init,
        toggleGPS: toggleGPS,
        setArrowStyle: setArrowStyle
    }

}());