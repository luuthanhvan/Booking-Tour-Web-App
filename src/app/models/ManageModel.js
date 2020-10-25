class ManageModel{
    addTour(con, data, callback) {
        // console.log(data);
        // var sql = "INSERT INTO tour VALUES ('01', 'ABC', 25, 20, 2000000, 1, 'mo ta abc');"; // test
        var sql = "INSERT INTO tour VALUES ('"+data.tourId+"', '"+data.tourName+"', '"+data.maxTourist+"', '"+data.minTourist+"', '"+data.tourPrice+"', '"+data.tourStatus+"', '"+data.tourDescription+"');";
        con.query(sql, callback);
    }

    getTour(con, callback) {
        var sql = "SELECT * FROM tour";
        con.query(sql, callback);
    }

    addDest(con, data, callback){
        // console.log(data);
        // var sql = "INSERT INTO tourist_destination VALUES ('01', 'ABC', 'ZYX', 'IMG', 'mo ta abc', 1);"; // test
        var sql = "INSERT INTO tourist_destination VALUES ('"+data.destId+"', '"+data.destName+"', '"+data.destAddress+"', '"+data.destImg+"', '"+data.destDescription+"', '"+data.isDestPopular+"');";
        con.query(sql, callback);
    }

    getDest(con, callback){
        var sql = "SELECT * FROM tourist_destination";
        con.query(sql, callback);
    }
}

module.exports = new ManageModel();
