var LayerModule = (function() {



    var name = "ch.swisstopo.pixelkarte-farbe";
    var ext = ".jpeg";
    var time = "current";
    var dimension = "21781";



    function getLayerUrl() {
        return 'https://wmts.geo.admin.ch/1.0.0/' + name + '/default/' + time + '/' + dimension + '/{z}/{y}/{x}' + getExt();

    }

    function getExt() {
        return ext;
    }

    function getLayerName() {
        return name;
    }

    function setPixelkarteFarbe() {
        name = "ch.swisstopo.pixelkarte-farbe";
        ext = ".jpeg";
        time = "current";
        dimension = "21781";
        _refreshLayers()
    }

    function setSwissimage() {
        name = "ch.swisstopo.swissimage";
        ext = ".jpeg";
        time = "current";
        dimension = "21781";
        _refreshLayers();
    }

    function _refreshLayers() {
        olStuff.getXYZLayer().getSource().setUrl(getLayerUrl());
        TileModule.deleteTemp();
        olStuff.getXYZLayer().getSource().refresh()

    }


    var publicVariable = 10;

    function bla() {
        publicVariable += 10;
    }
    return {
        //This function can access `publicVariable` !
        publicVariable: function(value) {
            return (arguments.length ? publicVariable = value : publicVariable);
        },
        bla: bla,
        getLayerUrl: getLayerUrl,
        getLayerName: getLayerName,
        getExt: getExt,
        setPixelkarteFarbe: setPixelkarteFarbe,
        setSwissimage: setSwissimage

    }

})();