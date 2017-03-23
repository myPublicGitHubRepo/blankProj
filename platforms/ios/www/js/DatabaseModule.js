var DatabaseModule = (function() {
    "use strict";
    var _db;

    function _initDB() {
        _db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Tiles (x INT, y INT, z INT, ext TEXT)');

        }, function(tx, error) {
            console.log('Error while executing query');
        });
    }


    function openDB() {
        _db = window.sqlitePlugin.openDatabase({ name: "tilesDB.sqlite", location: 'default' }, _initDB, _openDbError);

    }

    function _openDbError(e) {
        console.log('DB Error');
        console.dir(e);
    }
    /*
    function openDB(dbName) {
        _db = window.sqlitePlugin.openDatabase({ name: dbName, location: 'default' }, function(dbase) {
            log("Database opened");
            dbase.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Tiles (x INT, y INT, z INT, ext TEXT)');
            }, function(error) {
                log('Transaction ERROR: ' + error.message);
            }, function() {
                log('Created DB OK');
                return;
            });
        }, function(error) {
            log('Open database ERROR: ' + JSON.stringify(error));
        });
    }*/


    function insertTile(x, y, z, ext) {
        _db.transaction(function(tx) {
            tx.executeSql('INSERT INTO Tiles VALUES (?, ?, ?, ?)', [x, y, z, ext]);
        }, function(error) {
            log('Transaction ERROR: ' + error.message);
        }, function() {
            log('Populated database OK');
        });
    };

    function tileExist(x, y, z, imageTile, src) {
        console.log("checking...")
        _db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM Tiles WHERE x = (?) AND y = (?) AND z = (?)', [x, y, z], function(tx, rs) {
                //console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                //console.log("number: " + rs.rows.length);

                if (rs.rows.length > 0) {
                    var theUrl = (cordova.file.externalDataDirectory + '/tiles/' + z.toString() + '/' + y.toString() + '/' + x.toString() + '.jpeg');
                    log("LOCAL");
                    imageTile.getImage().src = theUrl;
                } else {
                    console.log("REMOTE")

                    imageTile.getImage().src = src;
                }

            }, function(tx, error) {
                log('SELECT error: ' + error.message);
                return false;
            });
        });
    };


    return {
        openDB: openDB,
        insertTile: insertTile,
        tileExist: tileExist
    };
}());