var PreferenceModule = (function() {
    //false if online
    var network = false;

    function _arrowPrefOk(value) {
        olStuff.setArrowStyle(value);
    }

    function _deleteLayerPrefOk(value) {
        if (value) {
            TileModule.deleteLayer();
            plugins.appPreferences.store(function() {}, _prefFail, 'deleteLayer', false);
        }
    }

    function _newworkPrefOk(value) {
        if (network != value) {
            network = value;

            if (value) {
                onOffline();
            } else {
                if (navigator.connection.type == Connection.NONE) { return; }
                onOnline();
            }
        }

    }

    function _vibrationsPrefOk(value) {
        olStuff.setVibrate(value);
    }


    function _prefFail(error) {
        console.log("error getting preferences" + error);
    }

    function isOffline() {
        return network;
    }


    function updatePreferences() {
        plugins.appPreferences.fetch(_arrowPrefOk, _prefFail, 'bigArrow');
        plugins.appPreferences.fetch(_newworkPrefOk, _prefFail, 'network');
        plugins.appPreferences.fetch(_deleteLayerPrefOk, _prefFail, 'deleteLayer');
        plugins.appPreferences.fetch(_vibrationsPrefOk, _prefFail, 'vibrations');


    }

    function go2pref() {
        MenuModule.closeNav();
        plugins.appPreferences.show(function() {}, _prefFail);
    }

    return {
        updatePreferences: updatePreferences,
        isOffline: isOffline,
        go2pref: go2pref
    }
}());