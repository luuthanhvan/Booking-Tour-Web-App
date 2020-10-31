class ManageModel{
    addTour(con, data, callback) {
        let sql = "INSERT INTO tour VALUES ('"+data.tourId+"', '"+data.tourName+"', '"+data.maxTourist+"', '"+data.minTourist+"', '"+data.tourPrice+"', '"+data.tourStatus+"', '"+data.tourDescription+"');";
        con.query(sql, callback);
    }

    getTour(con, callback) {
        let sql = "SELECT * FROM tour;";
        con.query(sql, callback);
    }

    deleteTour(con, data, callback){
        if(!data.includes(",")){
            let sql = "DELETE from tour WHERE tour_id='"+data.slice(1,data.length-1)+"';";
            con.query(sql, callback);
        }
        else{
            let tours = data.split(",");
            tours[0] = tours[0].replace("'", "");
            tours[tours.length-1] = tours[tours.length-1].replace("'", "");
            let sql = "DELETE from tour WHERE tour_id IN (?)";
            con.query(sql, [tours], callback);
        }
    }

    addDest(con, data, callback){
        let sql = "INSERT INTO tourist_destination VALUES ('"+data.destId+"', '"+data.destName+"', '"+data.destAddress+"', '"+data.destImg+"');";
        con.query(sql, callback);
    }

    getDest(con, callback){
        let sql = "SELECT * FROM tourist_destination";
        con.query(sql, callback);
    }

    deleteDest(con, data, callback){
        if(!data.includes(",")){
            let sql = "DELETE from tourist_destination WHERE dest_id='"+data.slice(1,data.length-1)+"';";
            con.query(sql, callback);
        }
        else{
            let dests = data.split(",");
            dests[0] = dests[0].replace("'", "");
            dests[dests.length-1] = dests[dests.length-1].replace("'", "");
            let sql = "DELETE from tourist_destination WHERE dest_id IN (?)";
            con.query(sql, [dests], callback);
        }
    }
}

module.exports = new ManageModel();
