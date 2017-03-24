var LayerModule = (function() {
    var wanderland = null;
    var wanderwege = null;
    var dufour = null;


    var name = "ch.swisstopo.pixelkarte-farbe";
    var ext = ".jpeg";
    var time = "current";
    var dimension = "21781";


    function getPrefix() {
        return 'https://wmts.geo.admin.ch/1.0.0/' + name + '/default/' + time + '/' + dimension + '/';

    }

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
        if (name == "ch.swisstopo.pixelkarte-farbe") return;
        name = "ch.swisstopo.pixelkarte-farbe";
        ext = ".jpeg";
        time = "current";
        dimension = "21781";
        _refreshLayers()
        MenuModule.closeNav();
    }

    function setSwissimage() {
        if (name == "ch.swisstopo.swissimage") return;
        name = "ch.swisstopo.swissimage";
        ext = ".jpeg";
        time = "current";
        dimension = "21781";
        _refreshLayers();
        MenuModule.closeNav();
    }





    function setDufour() {
        if (name == "ch.swisstopo.hiks-dufour") return;
        name = "ch.swisstopo.hiks-dufour";
        ext = ".png";
        time = "18650101";
        dimension = "21781";
        _refreshLayers();
        MenuModule.closeNav();
    }

    function setSiegfried() {
        if (name == "ch.swisstopo.hiks-siegfried") return;
        name = "ch.swisstopo.hiks-siegfried";
        ext = ".png";
        time = "19260101";
        dimension = "21781";
        _refreshLayers();
        MenuModule.closeNav();
    }

    function toggleWanderland() {
        //https://wmts101.geo.admin.ch/1.0.0/ch.astra.wanderland/default/20160518/21781
        MenuModule.closeNav();
        if (wanderland == null) {
            wanderland = olStuff.addOverLayer({
                name: "ch.astra.wanderland",
                ext: ".png",
                url: "https://wmts.geo.admin.ch/1.0.0/ch.astra.wanderland/default/20160518/21781/{z}/{y}/{x}.png"
            });
        } else {
            olStuff.removeOverLayer(wanderland);
            wanderland = null;
        }
    }

    function toggleWanderwege() {
        //https: //wmts106.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-wanderwege/default/current/21781/
        debugger;
        MenuModule.closeNav();
        if (wanderwege == null) {
            wanderwege = olStuff.addOverLayer({
                name: "ch.swisstopo.swisstlm3d-wanderwege",
                ext: ".png",
                url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-wanderwege/default/current/21781/{z}/{y}/{x}.png"
            });
        } else {
            olStuff.removeOverLayer(wanderwege);
            wanderwege = null;
        }
    }







    function _refreshLayers() {
        olStuff.getXYZLayer().getSource().setUrl(getLayerUrl());
        olStuff.getXYZLayer().getSource().refresh()
        TileModule.deleteTemp();


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
        setSwissimage: setSwissimage,
        setDufour: setDufour,
        setSiegfried: setSiegfried,
        getPrefix: getPrefix,
        toggleWanderland: toggleWanderland,
        toggleWanderwege: toggleWanderwege

    }

})();