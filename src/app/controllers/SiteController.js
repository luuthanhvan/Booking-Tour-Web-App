const helperFunctions = require('../../utilities/helper_functions');
const siteModel = require('../models/SiteModel');
const md5 = require('md5');

class SiteController{
    index(req, res){
        const con = req.con;
        siteModel.getTour(con, function(err, results){
            if(err) throw err;
            let tourInfo = results.length == 0 ? [] : results;
            // format tour price before send it to client
            if(tourInfo.length != 0){
                for(let i = 0; i < tourInfo.length; i++){
                    tourInfo[i]['tour_price'] = helperFunctions.formatPriceToDisplay(tourInfo[i]['tour_price']);
                }
            }

            res.render('home', {layout: 'home_base_page', title: 'Trang chủ', tourInfo});
        });
    }

    seeDetails(req, res){
        // console.log("Tour details: ", req.session);
        const con = req.con;

        // tourId is a string like 'tour1' so I need remove ''
        let tourId = req.query.tourId.slice(1, req.query.tourId.length-1);

        siteModel.getTourInfoById(con, tourId, function(err, results){
            if(err) throw err;
            let tourInfo = results[0];
            let destInfo = results[1];

            // format tour price and tour date go before send it to client
            tourInfo[0]['tour_price'] = helperFunctions.formatPriceToDisplay(tourInfo[0]['tour_price']);
            tourInfo[0]['tour_date_go'] = helperFunctions.formatDateToDisplay(tourInfo[0]['tour_date_go']);

            res.render('tour_details', {layout: 'user_base_page', title: tourInfo[0]['tour_name'], tourInfo, destInfo});
        });
    }

    searchTour(req, res){
        const con = req.con;
        let destAddress = req.body.destAddress;

        siteModel.getTourInfoByDestAddress(con, destAddress, function(err, result){
            if(err) throw err;

            let tourInfo = result.length == 0 ? [] : result;

            // console.log(result);

            if(tourInfo.length != 0){
                for(let i = 0; i < tourInfo.length; i++){
                    // format tour price before send it to client
                    tourInfo[i]['tour_price'] = helperFunctions.formatPriceToDisplay(tourInfo[i]['tour_price']);
                }
            }

            res.render('results', {layout: 'user_base_page', title: 'Kết quả tìm kiếm', tourInfo});
        });
    }

    diplaySignupPage(req, res){
        res.render('signup', {layout: 'user_base_page', title: 'Đăng ký'});
    }

    existedUser(req, res){
        const con = req.con;
        let username = req.query.username;

        siteModel.getAccountInfoByUsername(con, username, function(err, result){
            if (err) throw err;
            let accountInfo = result.length == 0 ? [] : result;
            if (accountInfo.length > 0){
                res.send("Tài khoản đã tồn tại!");
            }
            else {
                res.send("");
            }
        });
    }

    didNotExistUser(req, res){
        const con = req.con;
        let username = req.query.username;

        siteModel.getAccountInfoByUsername(con, username, function(err, result){
            if (err) throw err;
            let accountInfo = result.length == 0 ? [] : result;
            if (accountInfo.length == 0){
                res.send("Tài khoản không tồn tại!");
            }
            else {
                res.send("");
            }
        });
    }

    addCustomerInfo(req, res, next){
        const con = req.con;
        let data = req.body;
        siteModel.submitCustomerInfo(con, data, function(err, results){
            if (err) throw err;
            next();
        });
    }

    addAccountInfo(req, res){
        const con = req.con;
        let username = req.body.username;
        // encrypt password before insert it to database
        let encryptedPasswd = md5(req.body.password1);

        siteModel.submitAccountInfo(con, username, encryptedPasswd, req.body.role, function(err, results){
            if (err) throw err;
            res.redirect('/sign-up');
        });
    }

    displaySigninPage(req, res){
        res.render('signin', {layout: 'user_base_page', title: 'Đăng nhập'});
    }

    invalidPassword(req, res, next){
        const con = req.con;
        let username = req.body.username;
        let encryptedPasswd = md5(req.body.password);

        siteModel.getAccountInfo(con, username, encryptedPasswd, function(err, result){
            if (err) throw err;

            let accountInfo = result.length == 0 ? [] : result;

            if(accountInfo.length > 0){
                next();
            }
            else{
                res.send("<h1>Mật khẩu không đúng!</h1><button><a href='/sign-in'>Đăng nhập lại</a></button>");
            }
        });
    }

    setSession(req, res, next){
        const con = req.con;
        let username = req.body.username;
        siteModel.getAccountInfoByUsername(con, username, function(err, result){
            if (err) throw err;
            let accountInfo = result.length == 0 ? [] : result;
            // set session
            req.session.user = {
                username: accountInfo[0]['username'],
                role: accountInfo[0]['role'],
            };
            next();
        });
    }

    signin(req, res){
        let userRole = req.session.user.role;
        if(userRole == 1){ // admin
            res.redirect("/manage");
        }
        else{ // customer
            res.redirect("/");
        }
    }
}

module.exports = new SiteController();
