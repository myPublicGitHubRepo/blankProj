var LayerModule = (function() {


    var layer = "ch.swisstopo.pixelkarte-farbe";
    var ext = ".jpeg";
    var time = "current";
    var dimension = "21781";

    function getLayerUrl() {
        return 'https://wmts.geo.admin.ch/1.0.0/' + layer + '/default/' + time + '/' + dimension + '/';
    }

    function getExt() {
        return ext;
    }

    function setPixelkarteFarbe() {
        layer = "ch.swisstopo.pixelkarte-farbe";
        ext = ".jpeg";
        time = "current";
        dimension = "21781";
    }

    function setSwissimage() {
        layer = "ch.swisstopo.swissimage";
        ext = ".jpeg";
        time = "current";
        dimension = "21781";
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
        bla: bla
    }

})();