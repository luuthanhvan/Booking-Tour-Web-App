const bookingModel = require('../models/BookingModel');

class BookingController{
    index(req, res){
        let con = req.con;
        let tourId = req.query.tourId;
        // console.log(tourId.toString());
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
}

module.exports = new BookingController();
