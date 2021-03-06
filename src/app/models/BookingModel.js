class BookingModel{
    getTourInfoById(con, tourId, callback){
        // sql statements to get tour information by tour_id
        let sql = "SELECT * FROM tour WHERE tour_id='"+tourId+"';";
        sql += "SELECT tourist_destination.dest_name, tourist_destination.dest_image " +
                "FROM tourist_destination, tour_details " +
                "WHERE tourist_destination.dest_id=tour_details.dest_id " +
                "AND tour_details.tour_id='"+tourId+"' LIMIT 1;";

        // execute sql statements
        con.query(sql, callback);
    }

    getCustomerInfoByUsername(con, username, callback){
        let sql = "SELECT customer.customer_id, customer_name, customer_gender, customer_dob, customer_phone, customer_address " +
            "FROM account, customer WHERE account.customer_id=customer.customer_id AND account.username='"+username+"'";

        // execute sql statement
        con.query(sql, callback);
    }

    addInvoiceInfo(con, unitPrice, datetime, callback){
        // sql statement to insert invoice information into invoice table
        let sql = "INSERT INTO invoice (unit_price, booking_date) VALUES ('"+unitPrice+"', '"+datetime+"');";

        // execute sql statement
        con.query(sql, callback);
    }

    addCustomersInfo(con, data, callback){
        let sql = "";
        // sql statements
        for(let i = 0; i < data.fullName.length; i++){
            if(i == 0){
                let dob = data.years[i] + "-" + data.months[i] + "-" + data.days[i];
                sql += "INSERT INTO customer (customer_name, customer_gender, customer_dob, customer_phone, customer_address, booking_single_room, customer_note) " +
                "VALUES ('"+data.fullName[i]+"', '"+data.gender[i]+"', '"+dob+"', '"+data.phoneNumber+"', '"+data.address+"', '"+data.singleRoom[i]+"', '"+data.note+"');";
            }
            else{
                let dob = data.years[i] + "-" + data.months[i] + "-" + data.days[i];
                sql += "INSERT INTO customer (customer_name, customer_gender, customer_dob, booking_single_room)" +
                " VALUES ('"+data.fullName[i]+"', '"+data.gender[i]+"', '"+dob+"', '"+data.singleRoom[i]+"');";
            }
            sql += "INSERT INTO ticket (tour_id, customer_id, invoice_id) VALUES ('"+data.tourId+"', (SELECT MAX(customer_id) FROM customer), (SELECT MAX(invoice_id) FROM invoice));";
        }

        // execute sql statements
        con.query(sql, callback);
    }

    getBookingInfoById(con, tourId, callback){
        // sql statement
        // get main customer info
        let sql = "SELECT * FROM customer WHERE customer.customer_id=(SELECT MIN(customer.customer_id) "+
        "FROM customer, ticket WHERE customer.customer_id=ticket.customer_id AND ticket.tour_id='"+tourId+"');";
        sql += "SELECT * FROM tour WHERE tour_id='"+tourId+"';";
        sql += "SELECT * FROM (ticket INNER JOIN customer on customer.customer_id=ticket.customer_id) " +
                "INNER JOIN invoice ON ticket.invoice_id=invoice.invoice_id " +
                "WHERE invoice.invoice_id=(SELECT MAX(invoice_id) FROM invoice);";

        // execute sql statement
        con.query(sql, callback);
    }
}

module.exports = new BookingModel();
