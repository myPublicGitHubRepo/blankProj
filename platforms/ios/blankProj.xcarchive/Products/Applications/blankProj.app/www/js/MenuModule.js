var MenuModule = (function() {
    var mySidenav;
    var mySidenavBackground;
    var topBar;
    var menuContainer;
    var topBarTitle;
    var isMenuOpen = false;

    function init() {
        mySidenav = document.getElementById("mySidenav");
        mySidenavBackground = $("#mySidenavBackground");
        topBar = document.getElementById("topBar");
        menuContainer = document.getElementById("menuContainer");
        topBarTitle = document.getElementById("topBarTitle");


        document.getElementById("prefMenu").addEventListener("click", PreferenceModule.go2pref);
        document.getElementById("pixelFarbeMenu").addEventListener("click", LayerModule.setPixelkarteFarbe);
        document.getElementById("swissimageMenu").addEventListener("click", LayerModule.setSwissimage);
        document.getElementById("dufourMenu").addEventListener("click", LayerModule.setDufour);
        document.getElementById("siegfriedMenu").addEventListener("click", LayerModule.setSiegfried);


        document.getElementById("wanderlandMenu").addEventListener("click", LayerModule.toggleWanderland);
        document.getElementById("wanderwegeMenu").addEventListener("click", LayerModule.toggleWanderwege);



        document.getElementById("mySidenavBackground").addEventListener("click", closeNav);
        document.getElementById("drawMenu").addEventListener("click", drawOkBtnClick);




        document.addEventListener("backbutton", closeNav, false);
    }


    function openNav() {
        if (!isMenuOpen) {
            menuContainer.classList.toggle("change");
            mySidenav.style.width = "250px";
            mySidenavBackground.show(300);
            topBar.style.opacity = 1;
            topBarTitle.innerHTML = "Settings";
            isMenuOpen = true;
        } else { closeNav(); }
    }

    function closeNav() {
        if (isMenuOpen) {
            menuContainer.classList.toggle("change");

            mySidenav.style.width = "0";
            mySidenavBackground.hide(300);

            topBar.style.opacity = 0.7;
            topBarTitle.innerHTML = "Swiss Map";

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