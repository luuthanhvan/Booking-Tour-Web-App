class SiteModel{
    getTour(con, callback) {
        // sql statement
        let sql = "SELECT tour_id, tour_name, tour_price FROM tour;";
        sql += "SELECT tourist_destination.dest_image from tourist_destination, tour_details " +
                "WHERE tourist_destination.dest_id=tour_details.dest_id LIMIT 1;";
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
