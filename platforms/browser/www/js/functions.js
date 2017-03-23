//var globalDB;
var pb;
var fileTransfer = null;
(function(global) {
    "use strict";
    //http://stackoverflow.com/questions/21577230/phonegap-save-image-from-url-into-device-photo-gallery
    //https://www.neontribe.co.uk/cordova-file-plugin-examples/

    function theCallback() {
        log("callback called;")
    }

    function test() {
        var filePath = "";
        var uri = encodeURI('http://192.168.1.34:3001');
        var fileTransfer = new FileTransfer();
        fileTransfer.download(
            uri,
            filePath,
            function(entry) {
                //log("download complete: " + entry.fullPath);
                //_downloadImageSync();
                //DatabaseModule.insertTile(x, y, z, ext);
                console.log("ok");
            },
            function(error) {
                log("download error source " + error.source);
                log("download error target " + error.target);
                log("upload error code" + error.code);
                //_downloadImageSync();
            },
            false, { //No idea... do i need this???
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==",
                    "referer": "asdasdsd",
                    "Referer": "due"

                }
            }
        );
    }



    function onDeviceReady() {
        //test();
        log("Device ready");
        //StatusBar.hide();

        DatabaseModule.openDB(theCallback);

        fileTransfer = new FileTransfer();
        //globalDB = new databaseManager("tilesDB.sqlite");
        log("Database OK");
        olStuff.init();

        PreferenceModule.updatePreferences();

        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);

        document.addEventListener("resume", onResume, false);
        document.addEventListener("pause", onPause, false);


        /*
        document.getElementById("downloadBtn").addEventListener("click", createFile);
        document.getElementById("downloadBtn").disabled = false;*/

        document.getElementById("drawBtn").addEventListener("click", drawOkBtnClick);
        document.getElementById("drawBtn").disabled = false;

        document.getElementById("okBtn").addEventListener("click", downloadDraw);
        document.getElementById("okBtn").disabled = false;

        document.getElementById("delBtn").addEventListener("click", TileModule.deleteLayer);
        document.getElementById("delBtn").disabled = false;

        document.getElementById("prefBtn").addEventListener("click", PreferenceModule.go2pref);
        document.getElementById("prefBtn").disabled = false;

        document.getElementById("cancelBtn").addEventListener("click", cancelDraw);
        document.getElementById("cancelBtn").disabled = false;



        pb = document.getElementById("myBar");


        //var olStuff = new createOlStuff();
        if (navigator.connection.type != Connection.NONE) {
            onOnline();
        } else {
            onOffline();
        }
        /*
        $("#gpsCB").click(function() {
            log("tooggle gos")
            olStuff.toggleGPS(this);
        });
        */


        //Check if it already exists or not
        if (window.localStorage.getItem('firstLaunch') != 1) {
            log("first launch");
            window.localStorage.setItem('firstLaunch', 1);
            TileModule.downloadDefault();


            //Do the other stuff related to first time launch
        }
    }



    function onResume() {
        log("resume");
        PreferenceModule.updatePreferences();

        TileModule.deleteTemp();

    }

    function onPause() {
        console.log("Pause");
        TileModule.deleteTemp();
    }

    document.addEventListener("deviceready", onDeviceReady, false);
})(window);

function fail(e) {
    log("FileSystem Error");
    dir(e);
    alert("failed...");
}

var select;
var modify;
var vector;
var circleFeature;



var draw = null; // global so we can remove it later
var allFeatures = [];

function addInteraction(source) {


    draw = new ol.interaction.Draw({
        source: source,
        type: "Polygon",
        freehand: true
    });
    olMap.addInteraction(draw);

    draw.on('drawend', function(event) {
        console.log("end");
        // get the feature
        //var feature = event.element;
        // ...listen for changes on it
        //debugger;
        var extent = event.feature.getGeometry().getExtent();
        var newCoords = [
            [
                [extent[0], extent[1]],
                [extent[0], extent[3]],
                [extent[2], extent[3]],
                [extent[2], extent[1]]
            ]
        ];


        event.feature.getGeometry().setCoordinates(newCoords);

        allFeatures.push(event.feature);
        if (device.platform == "iOS") {
            TapticEngine.impact({
                style: "medium" // light | medium | heavy
            });
        } else {
            navigator.vibrate(20);
            console.log("vib");
        }


    });

}
var isDraw = false;

function drawOkBtnClick() {
    if (isDraw) {
        downloadDraw();
        isDraw = false;

        document.getElementById("drawBtn").innerHTML = "Draw";
    } else {
        startDraw();
        isDraw = true;
        document.getElementById("drawBtn").innerHTML = "Ok";
    }
}

function startDraw() {
    $("#cancelBtn").show();



    if (navigator.connection.type == Connection.NONE) {
        alert("no internet connection");
        return;
    }

    if (draw != null) { olMap.removeInteraction(draw); }
    var theStyle = new ol.style.Style({
        //I don't know how to get the color of your kml to fill each room
        stroke: new ol.style.Stroke({ color: '#0000FF', width: 3 }),

        //fill: red
    });

    var source = new ol.source.Vector({
        // features: [circleFeature]
    });

    vector = new ol.layer.Vector({
        source: source,
        style: theStyle
    });
    olMap.addLayer(vector);
    addInteraction(source);
    /*
    //var drawedFeautres = new ol.Collection();

    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        log("no network");
    } else {
        log("network OK");
        console.log(olMap.getView().getCenter());
        circleFeature = new ol.Feature({
            geometry: new ol.geom.Circle(olMap.getView().getCenter(), 5000)
        });
        var source = new ol.source.Vector({
            features: [circleFeature]
        });

        vector = new ol.layer.Vector({
            source: source
        });
        olMap.addLayer(vector);


        select = new ol.interaction.Select({
            //style: drawStyle,
            multi: false,
            toggleCondition: ol.events.condition.never,
            condition: ol.events.condition.click

        });

        modify = new ol.interaction.Modify({
            features: select.getFeatures(),
            //style: modifyStyle,
            deleteCondition: ol.events.condition.never,
        });

        olMap.addInteraction(select);
        olMap.addInteraction(modify);

    }
    */
}

function downloadDraw() {
    if (navigator.connection.type == Connection.NONE) {
        alert("no internet connection");

        allFeatures = null;
        vector.getSource().clear();
        $('#myProgress').hide();
        $("#drawBtn").show();


        return;
    }

    if (allFeatures.length == 0) {
        //done
        vector.getSource().clear();
        $('#myProgress').hide(200);
        $("#drawBtn").show();

        alert("done");
        return;
    }
    var theStyle = new ol.style.Style({
        //I don't know how to get the color of your kml to fill each room
        stroke: new ol.style.Stroke({ color: '#ff0000', width: 4 })

        //fill: red
    });

    olMap.removeInteraction(draw);
    $('#myProgress').show(200);
    var f = allFeatures.pop();

    f.setStyle(theStyle);
    var c = f.getGeometry().getExtent();
    TileModule.getTilesInBox(c[0], c[1], c[2], c[3]);


    /*
    var c = circleFeature.getGeometry().getExtent();

    olMap.removeInteraction(select);
    olMap.removeInteraction(modify);
    olMap.removeLayer(vector);

    //console.log(circleFeature.getGeometry().flatCoordinates);
    TileModule.getTilesInBox(c[0], c[1], c[2], c[3]);    */


}

function cancelDraw() {
    isDraw = false;
    document.getElementById("drawBtn").innerHTML = "Draw";
    $("#cancelBtn").hide();

    olMap.removeInteraction(draw);
    vector.getSource().clear();
    allFeatures = [];

}

function createFile() {
    //alert("hello");
    //alert(cordova.file.externalDataDirectory);Ok
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        log("no network");
    } else {
        log("network OK");
        //download(URL, Folder_Name, File_Name); //If available download function call
        //var type = cordova.file.externalDataDirectory;
        //window.resolveLocalFileSystemURL(type, successCallback, errorCallback);
        // alert(olMap.getView().getCenter()[0] + " " + olMap.getView().getCenter()[1]);
        TileModule.getTilesInSquare(olMap.getView().getCenter()[0], olMap.getView().getCenter()[1], 5000);
    }



    function errorCallback(error) {
        alert("ERROR: " + error.code);
        log("ERROR: " + error.code);
    }
}


function onOnline() {
    if (PreferenceModule.isOffline()) {
        onOffline();
        return;
    }
    //var topBar = document.getElementById('topBar');
    //topBar.classList.add("online");
    //topBar.classList.remove("offline");
    StatusBar.backgroundColorByName("green");
    var theArray = olMap.getLayers().getArray();


    for (var l in theArray) {
        console.log(theArray[l].getSource());

        theArray[l].getSource().refresh();
    }
}

function onOffline() {
    //var topBar = document.getElementById('topBar');
    //topBar.classList.remove("online");

    StatusBar.backgroundColorByName("red");

}