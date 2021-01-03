class SiteModel{
    getTour(con, callback) {
        // sql statement to get all tour information from tour, tour_details and tourist_destination tables group by tour_id
        let sql = "SELECT tour.tour_id, tour_name, tour_price, dest_image FROM tour, tour_details, tourist_destination WHERE tour.tour_id=tour_details.tour_id " +
        "AND tour_details.dest_id=tourist_destination.dest_id GROUP BY tour.tour_id;";

        // execute sql statement
        con.query(sql, callback);
    }

    getTourInfoByDestAddress(con, destAddress, callback){
        // sql statement to get tour information by dest_address
        let sql = "SELECT tour.tour_id, tour.tour_name, tour.tour_price, dest_image FROM tour, tourist_destination, tour_details WHERE tour.tour_id=tour_details.tour_id " +
                "AND tour_details.dest_id=tourist_destination.dest_id AND tourist_destination.dest_address='"+destAddress+"';"

        // execute sql statement
        con.query(sql, callback);
    }

    getTourInfoById(con, tourId, callback){
        // sql statements to get all tour information by tour_id
        let sql = "SELECT * FROM tour WHERE tour_id='"+tourId+"';";
        sql += "SELECT tourist_destination.dest_name, tourist_destination.dest_image " +
                "FROM tourist_destination, tour_details " +
                "WHERE tourist_destination.dest_id=tour_details.dest_id " +
                "AND tour_details.tour_id='"+tourId+"';";

        // execute sql statements
        con.query(sql, callback);
    }

    submitCustomerInfo(con, data, callback){
        // sql statement to insert customer information to customer table
        let dob = data.year + "-" + data.month + "-" + data.day;
        let sql = "INSERT INTO customer (customer_name, customer_gender, customer_dob, customer_phone, customer_address) " +
                "VALUES ('"+data.fullname+"', '"+data.gender+"', '"+dob+"', '"+data.phoneNumber+"', '"+data.address+"');";

        // execute sql statement
        con.query(sql, callback);
    }

    submitAccountInfo(con, username, password, role, callback){
        // sql statement to insert customer account information into account table
        let sql = "INSERT INTO account VALUES ('"+username+"', (SELECT MAX(customer_id) FROM customer), '"+password+"', '"+role+"');";

        // execute sql statement
        con.query(sql, callback);
    }

    getAccountInfoByUsername(con, username, callback){
        // sql statement to get customer account information by username
        let sql = "SELECT * FROM account WHERE username='"+username+"';";

        // execute sql statement
        con.query(sql, callback);
    }

    getAccountInfo(con, username, password, callback){
        // sql statement to get customer account information by username and password
        let sql = "SELECT * FROM account WHERE username='"+username+"' AND password='"+password+"';";

        // execute sql statement
        con.query(sql, callback);
    }
}

module.exports = new SiteModel();
