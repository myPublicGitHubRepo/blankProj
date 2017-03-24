var MenuModule = (function() {
    function init() {
        document.getElementById("prefMenu").addEventListener("click", PreferenceModule.go2pref);
        document.getElementById("pixelFarbeMenu").addEventListener("click", LayerModule.setPixelkarteFarbe);
        document.getElementById("swissimageMenu").addEventListener("click", LayerModule.setSwissimage);

    }


    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }







    var publicVariable = 0;

    function bla() {
        publicVariable += 10;
    }
    return {
        //This function can access `publicVariable` !
        publicVariable: function(value) {
            return (arguments.length ? publicVariable = value : publicVariable);
        },
        bla: bla,
        openNav: openNav,
        closeNav: closeNav,
        init: init
    }

})();