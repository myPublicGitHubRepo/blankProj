var PreferenceModule = (function() {
    //false if online
    var network = false;

    function _arrowPrefOk(value) {
        olStuff.setArrowStyle(value);
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


    function _prefFail(error) {
        console.log("error getting preferences" + error);
    }

    function isOffline() {
        return network;
    }

    function updatePreferences() {
        plugins.appPreferences.fetch(_arrowPrefOk, _prefFail, 'bigArrow');
        plugins.appPreferences.fetch(_newworkPrefOk, _prefFail, 'network');
    }

    function go2pref() {
        plugins.appPreferences.show(function() { console.log("ok??") }, _prefFail);
    }

    return {
        updatePreferences: updatePreferences,
        isOffline: isOffline,
        go2pref: go2pref
    }
}());