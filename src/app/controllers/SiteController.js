const siteModel = require('../models/SiteModel');

class SiteController{
    index(req, res){
        const con = req.con;
        siteModel.getTour(con, function(err, results){
            if(err) throw err;
            let tourInfo = results[0].length == 0 ? [] : results[0];
            if(tourInfo.length != 0 && results[1].length != 0){
                // append data got from the second sql to the tourInfo array
                Object.assign(tourInfo[0], results[1][0]);
                // format price to display
                tourInfo[0]['tour_price'] = tourInfo[0]['tour_price'].toString().replace(/(?=(.{3})+$)/gm, ".");
            }

            // console.log(tourInfo);
            res.render('home', {layout: 'home_base_page', title: 'Trang chủ', tourInfo});
        });
    }

    seeDetails(req, res){
        let con = req.con;
        let tourId = req.query.tourId;
        siteModel.getDetailedTourInfo(con, tourId, function(err, results){
            if(err) throw err;
            let tourInfo = results[0];
            let destInfo = results[1];
            // format price to display
            tourInfo[0]['tour_price'] = tourInfo[0]['tour_price'].toString().replace(/(?=(.{3})+$)/gm, ".");
            res.render('tourDetails', {layout: 'user_base_page', title: tourInfo[0]['tour_name'], tourInfo, destInfo});
        });
    }
    // signIn(req, res){
    //     res.render('signin', {layout: 'user_base_page', title: 'Đăng nhập'});
    // }
    //
    // signUp(req, res){
    //     res.render('signup', {layout: 'user_base_page', title: 'Đăng ký'});
    // }
}

module.exports = new SiteController();
