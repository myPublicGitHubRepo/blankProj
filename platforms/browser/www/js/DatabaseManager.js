function databaseManager(dbName) {


    this.db = window.sqlitePlugin.openDatabase({ name: dbName, location: 'default' }, function(dbase) {
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




    this.insertTile = function(x, y, z, ext) {
        this.db.transaction(function(tx) {
            tx.executeSql('INSERT INTO Tiles VALUES (?, ?, ?, ?)', [x, y, z, ext]);
        }, function(error) {
            log('Transaction ERROR: ' + error.message);
        }, function() {
            log('Populated database OK');
        });
    };

    this.tileExist = function(x, y, z) {
        console.log("checking...")
        this.db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM Tiles WHERE x = (?) AND y = (?) AND z = (?)', [x, y, z], function(tx, rs) {
                //console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                //console.log("number: " + rs.rows.length);

                if (rs.rows.length > 0) {
                    console.log("Local :)")
                    return true;
                } else {
                    console.log("no...")

                    return false;
                }

            }, function(tx, error) {
                log('SELECT error: ' + error.message);
                return false;
            });
        });
    };
}