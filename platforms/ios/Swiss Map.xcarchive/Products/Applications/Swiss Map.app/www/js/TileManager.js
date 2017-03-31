TileManager = {
    u: new Utils(),
    //download sheet for a given sheet number
    getTilesForSheet: function(number) {
        /*if (!dm.sheetExist(number)) {
            u.info("This sheet doese not exist: "+ number);
            return true;
        }*/
        var sm = dm.getSheetMetadataForSheetNumber(number); // var sm = new SheetMetadata(bla, bla, bla);

        var hasErros = getTilesForPerimeterAllScale(sm);

        return hasErros;
    },

    // For a given perimeter, downloads the tiles in all scales
    getTilesForPerimeterAllScale: function(sm) {

    }
}