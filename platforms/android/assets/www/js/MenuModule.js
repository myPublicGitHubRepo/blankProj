var MenuModule = (function() {
    var mySidenav;
    var mySidenavBackground;
    var topBar;
    var menuContainer;

    var isMenuOpen = false;

    function init() {
        mySidenav = document.getElementById("mySidenav");
        mySidenavBackground = document.getElementById("mySidenavBackground");
        topBar = document.getElementById("topBar");
        menuContainer = document.getElementById("menuContainer");

        document.getElementById("prefMenu").addEventListener("click", PreferenceModule.go2pref);
        document.getElementById("pixelFarbeMenu").addEventListener("click", LayerModule.setPixelkarteFarbe);
        document.getElementById("swissimageMenu").addEventListener("click", LayerModule.setSwissimage);
        document.getElementById("mySidenavBackground").addEventListener("click", closeNav);
        document.getElementById("drawMenu").addEventListener("click", drawOkBtnClick);


        document.addEventListener("backbutton", closeNav, false);
    }


    function openNav() {
        if (!isMenuOpen) {
            menuContainer.classList.toggle("change");
            mySidenav.style.width = "250px";
            mySidenavBackground.style.width = "100%";

            topBar.style.opacity = 1;
            isMenuOpen = true;
        }
    }

    function closeNav() {
        if (isMenuOpen) {
            menuContainer.classList.toggle("change");

            mySidenav.style.width = "0";
            mySidenavBackground.style.width = "0";
            topBar.style.opacity = 0.5;
            isMenuOpen = false;
        }

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