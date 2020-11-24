const bookingModel = require('../models/BookingModel');

class BookingController{
    index(req, res){
        let con = req.con;
        // tourId is a string like 'tour1' so I need remove ''
        let tourId = req.query.tourId.slice(1, req.query.tourId.length-1);
        // console.log(tourId);
        bookingModel.getTour(con, tourId, function(err, results){
            if(err) throw err;
            let tourInfo = results[0];
            let destInfo = results[1];
            // format price and surcharge to display
            tourInfo[0]['tour_price'] = tourInfo[0]['tour_price'].toString().replace(/(?=(.{3})+$)/gm, ".");
            tourInfo[0]['tour_surcharge'] = tourInfo[0]['tour_surcharge'].toString().replace(/(?=(.{3})+$)/gm, ".");
            // console.log(tourInfo[0]['tour_price']);

            res.render('booking', {layout: 'user_base_page', title: 'Đặt tour', tourInfo, destInfo});
        });
    }

    addInvoiceInfo(req, res, next){
        let con = req.con;
        let data = req.body;
        let today = new Date();
        let date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let datetime = date + " " + time;

        bookingModel.submitInvoiceInfo(con, data, datetime, function(err, results){
            if (err) throw err;
            next();
        });
    }

    addCustomersInfo(req, res, next){
        let con = req.con;
        let data = req.body;
        // console.log(data);
        /* example data:
            { fullName: [ 'Lưu Thanh Vân', 'Nguyễn Thị Kim Anh', 'Nguyễn Thị Lan Anh' ],
              phoneNumber: [ '0857333039' ],
              gender: [ '0', '0', '0' ],
              days: [ '31', '12', '16' ],
              months: [ '7', '8', '8' ],
              years: [ '1999', '1999', '1999' ],
              singleRoom: [ '1', '1', '1' ],
              note: 'test' }
        */
        bookingModel.submitCustomersInfo(con, data, function(err, results){
            if (err) throw err;
            next();
        });
    }

    showBookingInfo(req, res){
        let con = req.con;
        let tourId = req.body.tourId;

        bookingModel.getBookingInfo(con, tourId, function(err, results){
            let mainCustomerInfo = results[0].length == 0 ? [] : results[0];
            let mainCustomerDOB = mainCustomerInfo[0]['customer_dob'];
            // format main customer dob to display
            mainCustomerInfo[0]['customer_dob'] = mainCustomerDOB.getDate() + "/" + (mainCustomerDOB.getMonth()+1) + "/" + mainCustomerDOB.getFullYear();

            let tourInfo = results[1].length == 0 ? [] : results[1];
            let tourPrice = tourInfo[0]['tour_price'];
            let surcharge = tourInfo[0]['tour_surcharge'];
            let tourPriceWithSurcharge = tourPrice + surcharge;

            let bookingInfo = results[2].length == 0 ? [] : results[2];
            for(let i = 0; i < bookingInfo.length; i++){
                let customerDOB = bookingInfo[i]['customer_dob'];
                // format customers dob to display
                bookingInfo[i]['customer_dob'] = customerDOB.getDate() + "/" + (customerDOB.getMonth()+1) + "/" + customerDOB.getFullYear();
                // add ticket price for each customer
                if(bookingInfo[i]['booking_single_room'] == 1){
                    Object.assign(bookingInfo[i], {price: tourPriceWithSurcharge});
                }
                else{
                    Object.assign(bookingInfo[i], {price: tourPrice});
                }
            }
            let datetime = bookingInfo[0]['invoice_date'];
            // separate and format datetime get from database to display
            let date = datetime.getDate() + "/" + (datetime.getMonth()+1) + "/" + datetime.getFullYear();
            let time = datetime.getHours() + ":" + datetime.getMinutes();

            let note = bookingInfo[0]['customer_note'];
            let totalPrice = bookingInfo[0]['unit_price'];

            res.render('bookingDetails', {layout: 'user_base_page', title: 'Chi tiết đặt tour', mainCustomerInfo, bookingInfo, date, time, note, totalPrice, tourInfo});
        });
    }

    /*
    tempFuntionHandler(req, res){
        let con = req.con;
        bookingModel.getInfo(con, function(err, results){
            let mainCustomerInfo = results[0].length == 0 ? [] : results[0];
            let mainCustomerDOB = mainCustomerInfo[0]['customer_dob'];
            // format main customer dob to display
            mainCustomerInfo[0]['customer_dob'] = mainCustomerDOB.getDate() + "/" + (mainCustomerDOB.getMonth()+1) + "/" + mainCustomerDOB.getFullYear();

            let tourInfo = results[1].length == 0 ? [] : results[1];
            let tourPrice = tourInfo[0]['tour_price'];
            let surcharge = tourInfo[0]['tour_surcharge'];
            let tourPriceWithSurcharge = tourPrice + surcharge;

            let bookingInfo = results[2].length == 0 ? [] : results[2];
            for(let i = 0; i < bookingInfo.length; i++){
                let customerDOB = bookingInfo[i]['customer_dob'];
                // format customers dob to display
                bookingInfo[i]['customer_dob'] = customerDOB.getDate() + "/" + (customerDOB.getMonth()+1) + "/" + customerDOB.getFullYear();
                // add ticket price for each customer
                if(bookingInfo[i]['booking_single_room'] == 1){
                    Object.assign(bookingInfo[i], {price: tourPriceWithSurcharge});
                }
                else{
                    Object.assign(bookingInfo[i], {price: tourPrice});
                }
            }
            let datetime = bookingInfo[0]['invoice_date'];
            // separate and format datetime get from database to display
            let date = datetime.getDate() + "/" + (datetime.getMonth()+1) + "/" + datetime.getFullYear();
            let time = datetime.getHours() + ":" + datetime.getMinutes();

            let note = bookingInfo[0]['customer_note'];
            let totalPrice = bookingInfo[0]['unit_price'];

            res.render('temp', {layout: 'user_base_page', title: 'Temp page', mainCustomerInfo, bookingInfo, date, time, note, totalPrice, tourInfo});
        });
    }*/
}

module.exports = new BookingController();
