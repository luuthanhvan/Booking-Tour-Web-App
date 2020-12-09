class ManageModel{
    addTour(con, data, callback) {
        // data: got from form
        let sql = "INSERT INTO tour VALUES ('"+data.tourId+"', '"+data.tourName+"', '"+data.tourPrice+"', '"+data.tourSurcharge+"', '"+data.tourVehicle+"', '"+data.dateGo+"', '"+data.time+"', '"+data.destStart+"', '"+data.destEnd.join(", ")+"', '"+data.maxTourist+"', '"+data.minTourist+"', '"+data.tourDescription+"', '"+data.tourStatus+"');";
        // loop through touristDest array, get each dest id with tour id and insert into tour_details
        for(let i = 0; i < data.touristDest.length; i++){
            sql += "INSERT INTO tour_details VALUES ('"+data.touristDest[i]+"', '"+data.tourId+"');";
        }
        con.query(sql, callback);
    }

    getTour(con, callback) {
        let sql = "SELECT DISTINCT dest_address from tourist_destination;";
        sql += "SELECT dest_id, dest_name from tourist_destination;";
        sql += "SELECT * FROM tour;";
        sql += "SELECT GROUP_CONCAT(dest_name SEPARATOR', ') as destinationName FROM tour, tour_details, tourist_destination " +
                "WHERE tour.tour_id=tour_details.tour_id AND tour_details.dest_id=tourist_destination.dest_id GROUP BY tour.tour_id;";

        con.query(sql, callback);
    }

    deleteTour(con, data, callback){
        // if only one tour selected
        if(!data.includes(",")){
            // data is a string like 'tour1' so I need remove ''
            let tourId = data.slice(1,data.length-1);
            let sql =  "DELETE from tour_details WHERE tour_id='"+tourId+"';";
            sql += "DELETE from tour WHERE tour_id='"+tourId+"';";
            con.query(sql, callback);
        }
        else{ // multiple tours selected
            let tours = data.split(",");
            tours[0] = tours[0].replace("'", "");
            tours[tours.length-1] = tours[tours.length-1].replace("'", "");
            let sql = "DELETE from tour_details WHERE tour_id IN (?);";
            sql += "DELETE from tour WHERE tour_id IN (?);";
            con.query(sql, [tours, tours], callback);
        }
    }

    editTour(con, tourId, callback){
        let sql = "SELECT DISTINCT dest_address from tourist_destination;";
        sql += "SELECT * from tour WHERE tour_id='"+tourId.slice(1,tourId.length-1)+"';";
        sql += "SELECT * from tourist_destination;";
        con.query(sql, callback);
    }

    updateTour(con, data, callback){
        let sql = "UPDATE tour SET tour_name='"+data.tourName+"', tour_price='"+data.tourPrice+"', tour_vehicle='"+data.tourVehicle+"', tour_date_go='"+data.dateGo+"', tour_time='"+data.time+"', tour_dest_start='"+data.destStart+"', tour_dest_end='"+data.destEnd.join(", ")+"', tour_max_customer='"+data.maxTourist+"', tour_min_customer='"+data.minTourist+"', tour_description='"+data.tourDescription+"', tour_status='"+data.tourStatus+"' WHERE tour_id='"+data.tourId+"';";
        sql += "DELETE FROM tour_details WHERE tour_id='"+data.tourId+"';";
        for(let i = 0; i < data.touristDest.length; i++){
            sql += "INSERT INTO tour_details VALUES ('"+data.touristDest[i]+"', '"+data.tourId+"');";
        }
        con.query(sql, callback);
    }

    addDest(con, data, path, callback){
        let sql = "INSERT INTO tourist_destination VALUES ('"+data.destId+"', '"+data.destName+"', '"+data.destAddress+"', '"+path+"');";
        con.query(sql, callback);
    }

    getDest(con, callback){
        let sql = "SELECT * FROM tourist_destination;";
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
            let sql = "DELETE from tourist_destination WHERE dest_id IN (?);";
            con.query(sql, [dests], callback);
        }
    }

    editDest(con, destId, callback){
        let sql = "SELECT * from tourist_destination WHERE dest_id='"+destId.slice(1,destId.length-1)+"';";
        con.query(sql, callback);
    }

    updateDest(con, data, path, callback){
        let sql = "UPDATE tourist_destination SET dest_name='"+data.destName+"', dest_address='"+data.destAddress+"', dest_image='"+path+"' WHERE dest_id='"+data.destId+"';";
        con.query(sql, callback);
    }
}

module.exports = new ManageModel();
