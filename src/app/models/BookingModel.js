class BookingModel{
    getTour(con, tourId, callback){
        // sql statements
        let sql = "SELECT * FROM tour WHERE tour_id='"+tourId+"';";
        sql += "SELECT tourist_destination.dest_name, tourist_destination.dest_image " +
                "FROM tourist_destination, tour_details " +
                "WHERE tourist_destination.dest_id=tour_details.dest_id " +
                "AND tour_details.tour_id='"+tourId+"' LIMIT 1;";

        // execute sql statements
        con.query(sql, callback);
    }

    submitInvoiceInfo(con, unitPrice, datetime, callback){
        // sql statement
        let sql = "INSERT INTO invoice (unit_price, invoice_date) VALUES ('"+unitPrice+"', '"+datetime+"');";
        // execute sql statement
        con.query(sql, callback);
    }

    submitCustomersInfo(con, data, callback){
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
            sql += "INSERT INTO ticket (tour_id, customer_id, invoice_id) VALUES ('"+data.tourId+"', (SELECT MAX(customer_id) FROM customer LIMIT 1), (SELECT MAX(invoice_id) FROM invoice));";
        }

        // execute sql statements
        con.query(sql, callback);
    }

    getBookingInfo(con, tourId, callback){
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

    /*
    getInfo(con, callback){
        // sql statements
        // get main customer info
        let sql = "SELECT * FROM customer WHERE customer.customer_id=(SELECT MIN(customer.customer_id) "+
        "FROM customer, ticket WHERE customer.customer_id=ticket.customer_id AND ticket.tour_id='tour_0001');";
        sql += "SELECT * FROM tour WHERE tour_id='tour_0001';";
        sql += "SELECT * FROM (ticket INNER JOIN customer on customer.customer_id=ticket.customer_id) " +
                "INNER JOIN invoice ON ticket.invoice_id=invoice.invoice_id " +
                "WHERE invoice.invoice_id=(SELECT MAX(invoice_id) FROM invoice);";

        // execute sql statements
        con.query(sql, callback);
    }*/
}

module.exports = new BookingModel();
