class SiteModel{
    getTour(con, callback) {
        // sql statement
        let sql = "SELECT tour.tour_id, tour_name, tour_price, dest_image FROM tour, tour_details, tourist_destination WHERE tour.tour_id=tour_details.tour_id " +
        "AND tour_details.dest_id=tourist_destination.dest_id GROUP BY tour.tour_id;";

        // execute sql statement
        con.query(sql, callback);
    }

    getDetailedTourInfo(con, data, callback){
        // data is a string like 'tour1' so I need remove ''
        let tourId = data.slice(1,data.length-1);
        // sql statement
        let sql = "SELECT * FROM tour WHERE tour_id='"+tourId+"';";
        sql += "SELECT tourist_destination.dest_name, tourist_destination.dest_image " +
                "FROM tourist_destination, tour_details " +
                "WHERE tourist_destination.dest_id=tour_details.dest_id " +
                "AND tour_details.tour_id='"+tourId+"';";
        // execute sql statement
        con.query(sql, callback);
    }
}

module.exports = new SiteModel();
