class ManageModel{
    addTour(con, data, callback) {
        // sql statements
        // data: got from form
        let sql = "INSERT INTO tour VALUES ('"+data.tourId+"', '"+data.tourName+"', '"+data.tourPrice+"', '"+data.tourSurcharge+"', '"+data.tourVehicle+"', '"+data.dateGo+"', '"+data.time+"', '"+data.destStart+"', '"+data.destEnd.join(", ")+"', '"+data.maxTourist+"', '"+data.minTourist+"', '"+data.tourDescription+"', '"+data.tourStatus+"');";

        // loop through touristDest array, get each dest id with tour id and insert into tour_details
        for(let i = 0; i < data.touristDest.length; i++){
            sql += "INSERT INTO tour_details VALUES ('"+data.touristDest[i]+"', '"+data.tourId+"');";
        }

        // execute sql statements
        con.query(sql, callback);
    }

    getTour(con, callback) {
        // sql statement to get dest_address from tourist_destination table
        let sql = "SELECT DISTINCT dest_address from tourist_destination;";

        // sql statement to get dest_id and dest_name from tourist_destination table
        sql += "SELECT dest_id, dest_name from tourist_destination;";

        // sql statement to get all tour information from tour table
        sql += "SELECT * FROM tour;";

        // sql statement to get all dest_name from tour, tour_details and tourist_destination tables, group by tour id, each name separate by comma (,)
        sql += "SELECT GROUP_CONCAT(dest_name SEPARATOR', ') as destinationName FROM tour, tour_details, tourist_destination " +
                "WHERE tour.tour_id=tour_details.tour_id AND tour_details.dest_id=tourist_destination.dest_id GROUP BY tour.tour_id;";

        // execute sql statements
        con.query(sql, callback);
    }

    getTicketInfoByTourId(con, tourId, callback){
        // sql statement to get a tour information
        let sql = "SELECT * FROM ticket WHERE tour_id='"+tourId+"';";

        // execute sql statement
        con.query(sql, callback);
    }

    deleteTourByTourId(con, tourId, callback){
        // sql statement to delete a tour
        let sql =  "DELETE FROM tour_details WHERE tour_id='"+tourId+"';";
        sql += "DELETE FROM tour WHERE tour_id='"+tourId+"';";

        // execute sql statements
        con.query(sql, callback);
    }

    editTourById(con, tourId, callback){
        // sql statement to get all dest_address from tourist_destination table without duplication
        let sql = "SELECT DISTINCT dest_address from tourist_destination;";

        // sql statement to get tour information by tour id
        sql += "SELECT * from tour WHERE tour_id='"+tourId+"';";

        // sql statement to get all tourist destination information
        sql += "SELECT * from tourist_destination;";

        // execute sql statements
        con.query(sql, callback);
    }

    updateTour(con, data, callback){
        // sql statement to update tour information
        let sql = "UPDATE tour SET tour_name='"+data.tourName+"', tour_price='"+data.tourPrice+"', tour_vehicle='"+data.tourVehicle+"', tour_date_go='"+data.dateGo+"', tour_time='"+data.time+"', tour_dest_start='"+data.destStart+"', tour_dest_end='"+data.destEnd.join(", ")+"', tour_max_customer='"+data.maxTourist+"', tour_min_customer='"+data.minTourist+"', tour_description='"+data.tourDescription+"', tour_status='"+data.tourStatus+"' WHERE tour_id='"+data.tourId+"';";

        // sql statement to delete from tour_details table by tour id
        sql += "DELETE FROM tour_details WHERE tour_id='"+data.tourId+"';";

        // sql statement to insert to tour_details table
        for(let i = 0; i < data.touristDest.length; i++){
            sql += "INSERT INTO tour_details VALUES ('"+data.touristDest[i]+"', '"+data.tourId+"');";
        }

        // execute sql statements
        con.query(sql, callback);
    }

    addDest(con, data, path, callback){
        // sql statement to insert tourist destination information
        let sql = "INSERT INTO tourist_destination VALUES ('"+data.destId+"', '"+data.destName+"', '"+data.destAddress+"', '"+path+"');";

        // execute sql statement
        con.query(sql, callback);
    }

    getDest(con, callback){
        // sql statement to get all tourist destination
        let sql = "SELECT * FROM tourist_destination;";

        // execute sql statement
        con.query(sql, callback);
    }

    deleteDestByDestIds(con, destIds, callback){
        if(!destIds.includes(",")){
            // sql statement to delete one tourist destination
            let sql = "DELETE from tourist_destination WHERE dest_id='"+destIds.slice(1, destIds.length-1)+"';";

            // execute sql statement
            con.query(sql, callback);
        }
        else{
            let dests = destIds.split(",");
            dests[0] = dests[0].replace("'", "");
            dests[dests.length-1] = dests[dests.length-1].replace("'", "");

            // sql statement to delete multiple tourist destinations
            let sql = "DELETE from tourist_destination WHERE dest_id IN (?);";

            // execute sql statement
            con.query(sql, [dests], callback);
        }
    }

    editDestById(con, destId, callback){
        // sql statement to get all tourist destination information by dest_id
        let sql = "SELECT * from tourist_destination WHERE dest_id='"+destId+"';";

        // execute sql statement
        con.query(sql, callback);
    }

    updateDest(con, data, path, callback){
        // sql statement to update tourist destination information by dest_id
        let sql = "UPDATE tourist_destination SET dest_name='"+data.destName+"', dest_address='"+data.destAddress+"', dest_image='"+path+"' WHERE dest_id='"+data.destId+"';";

        // execute sql statement
        con.query(sql, callback);
    }

    getAllTourBookingInfo(con, callback){
        let sql = "SELECT tour.tour_id, tour.tour_name, COUNT(tour.tour_id) as nbCustomers, tour.tour_date_go, tour.tour_max_customer FROM ticket, tour WHERE ticket.tour_id=tour.tour_id;";

        // execute sql statement
        con.query(sql, callback);
    }

    getTourBookingDetailsById(con, tourId, callback){
        let sql = "SELECT customer.customer_name, customer.customer_gender, customer.customer_dob, customer.customer_phone, customer.customer_address, " +
        "customer.customer_note, customer.booking_single_room, invoice.booking_date FROM ticket, customer, invoice WHERE ticket.customer_id=customer.customer_id " +
        "AND ticket.invoice_id=invoice.invoice_id AND ticket.tour_id='"+tourId+"';";

        sql += "SELECT tour_name, tour_price, tour_surcharge FROM tour WHERE tour_id='"+tourId+"';";

        // execute sql statement
        con.query(sql, callback);
    }
}

module.exports = new ManageModel();
