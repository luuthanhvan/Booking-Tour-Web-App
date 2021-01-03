const helperFunctions = require('../../utilities/helper_functions');
const bookingModel = require('../models/BookingModel');

class BookingController{
    index(req, res){
        // console.log("Booking: ", req.session);
        const con = req.con;
        // tourId is a string like 'tour1' so I need remove ''
        let tourId = req.query.tourId.slice(1, req.query.tourId.length-1);

        // console.log(tourId);
        bookingModel.getTourInfoById(con, tourId, function(err, results){
            if(err) throw err;
            let tourInfo = results[0];
            let destInfo = results[1];

            // format price before send it to client
            tourInfo[0]['tour_price'] = helperFunctions.formatPriceToDisplay(tourInfo[0]['tour_price']);
            tourInfo[0]['tour_surcharge'] = helperFunctions.formatPriceToDisplay(tourInfo[0]['tour_surcharge']);

            // format tour date go before send it to client
            tourInfo[0]['tour_date_go'] = helperFunctions.formatDateToDisplay(tourInfo[0]['tour_date_go']);

            res.render('booking', {layout: 'user_base_page', title: 'Đặt tour', tourInfo, destInfo});
        });
    }

    addInvoiceInfo(req, res, next){
        const con = req.con;
        let data = req.body;
        let datetime = helperFunctions.getCurrentDatetime();
        let totalPrice = helperFunctions.calTotalPrice(data);

        bookingModel.submitInvoiceInfo(con, totalPrice, datetime, function(err, results){
            if (err) throw err;
            next();
        });
    }

    addCustomersInfo(req, res, next){
        const con = req.con;
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

        bookingModel.getBookingInfoById(con, tourId, function(err, results){
            let mainCustomerInfo = results[0].length == 0 ? [] : results[0];
            let tourInfo = results[1].length == 0 ? [] : results[1];
            let bookingInfo = results[2].length == 0 ? [] : results[2];

            // format date and time before send it to client
            let date = helperFunctions.formatDateToDisplay(bookingInfo[0]['invoice_date']);
            let time = helperFunctions.formatTimeToDisplay(bookingInfo[0]['invoice_date']);
            let note = bookingInfo[0]['customer_note'];

            // format price before send it to client
            let totalPrice = helperFunctions.formatPriceToDisplay(bookingInfo[0]['unit_price']);
            let tourPriceWithSurcharge = tourInfo[0]['tour_price'] + tourInfo[0]['tour_surcharge'];

            mainCustomerInfo[0]['customer_dob'] = helperFunctions.formatDateToDisplay(mainCustomerInfo[0]['customer_dob']);

            for(let i = 0; i < bookingInfo.length; i++){
                // format customers dob to display
                bookingInfo[i]['customer_dob'] = helperFunctions.formatDateToDisplay(bookingInfo[i]['customer_dob']);

                // add ticket price for each customer
                if(bookingInfo[i]['booking_single_room'] == 1){
                    Object.assign(bookingInfo[i], {price: helperFunctions.formatPriceToDisplay(tourPriceWithSurcharge)});
                }
                else{
                    Object.assign(bookingInfo[i], {price: helperFunctions.formatPriceToDisplay(tourInfo[0]['tour_price'])});
                }
            }

            res.render('booking_details', {layout: 'user_base_page', title: 'Chi tiết đặt tour', mainCustomerInfo, bookingInfo, date, time, note, totalPrice, tourInfo});
        });
    }
}

module.exports = new BookingController();
