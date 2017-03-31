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

        menuContainer.addEventListener("touchstart", openNav);

        document.getElementById("prefMenu").addEventListener("touchstart", PreferenceModule.go2pref);
        document.getElementById("pixelFarbeMenu").addEventListener("touchstart", LayerModule.setPixelkarteFarbe);
        document.getElementById("swissimageMenu").addEventListener("touchstart", LayerModule.setSwissimage);
        document.getElementById("dufourMenu").addEventListener("touchstart", LayerModule.setDufour);
        document.getElementById("siegfriedMenu").addEventListener("touchstart", LayerModule.setSiegfried);


        document.getElementById("wanderlandMenu").addEventListener("touchstart", LayerModule.toggleWanderland);
        document.getElementById("wanderwegeMenu").addEventListener("touchstart", LayerModule.toggleWanderwege);



        document.getElementById("mySidenavBackground").addEventListener("touchstart", closeNav);
        document.getElementById("drawMenu").addEventListener("click", drawOkBtnClick);

        document.getElementById("innerBla").addEventListener("touchstart", openInnerNav);





        document.addEventListener("backbutton", closeNav, false);


    }




    function openNav() {

        if (!isMenuOpen) {

            menuContainer.classList.toggle("change");
            mySidenav.style.width = "250px";
            mySidenavBackground.fadeIn(300);
            topBar.style.opacity = 1;
            topBarTitle.innerHTML = "Settings";
            isMenuOpen = true;

        } else {
            closeNav();
        }

    }

    function openInnerNav() {

        document.getElementById("mySidenav2").style.width = "250px";

    }

    function closeNav() {
        if (isMenuOpen) {
            menuContainer.classList.toggle("change");
            mySidenav.style.width = "0";
            mySidenavBackground.fadeOut(300);
            topBar.style.opacity = 0.7;
            topBarTitle.innerHTML = "Swiss Map";
            isMenuOpen = false;
        } else {
            openNav();
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