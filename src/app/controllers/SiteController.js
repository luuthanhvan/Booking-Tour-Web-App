const siteModel = require('../models/SiteModel');
const md5 = require('md5');

class SiteController{
    index(req, res){
        // console.log("Home: ", req.session);
        const con = req.con;
        siteModel.getTour(con, function(err, results){
            if(err) throw err;
            let tourInfo = results.length == 0 ? [] : results;
            // console.log(tourInfo);

            // format tour price before send it to client
            if(tourInfo.length != 0){
                for(let i = 0; i < tourInfo.length; i++){
                    tourInfo[i]['tour_price'] = tourInfo[i]['tour_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }
            }

            res.render('home', {layout: 'home_base_page', title: 'Trang chủ', tourInfo});
        });
    }

    seeDetails(req, res){
        // console.log("Tour details: ", req.session);
        let con = req.con;
        let tourId = req.query.tourId;
        siteModel.getDetailedTourInfo(con, tourId, function(err, results){
            if(err) throw err;
            let tourInfo = results[0];
            let destInfo = results[1];
            // format price to display
            tourInfo[0]['tour_price'] = tourInfo[0]['tour_price'].toString().replace(/(?=(.{3})+$)/gm, ".");
            // format date to displat
            tourInfo[0]['tour_date_go'] = tourInfo[0]['tour_date_go'].getDate() + "/" + (tourInfo[0]['tour_date_go'].getMonth()+1) + "/" + tourInfo[0]['tour_date_go'].getFullYear();
            res.render('tourDetails', {layout: 'user_base_page', title: tourInfo[0]['tour_name'], tourInfo, destInfo});
        });
    }

    searchTour(req, res){
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
            res.render('results', {layout: 'user_base_page', title: 'Kết quả tìm kiếm', tourInfo});
        });
    }

    diplaySignupPage(req, res){
        res.render('signup', {layout: 'user_base_page', title: 'Đăng ký'});
    }

    addCustomerInfo(req, res, next){
        const con = req.con;
        let data = req.body;
        // console.log(data);
        siteModel.submitCustomerInfo(con, data, function(err, results){
            if (err) throw err;
            next();
        });
    }

    addAccountInfo(req, res){
        const con = req.con;
        let username = req.body.username;
        // console.log(req.body.password1);
        let encryptedPasswd = md5(req.body.password1);
        // console.log(encryptedPasswd);

        siteModel.submitAccountInfo(con, username, encryptedPasswd, req.body.role, function(err, results){
            if (err) throw err;
            res.redirect('/sign-up');
            // res.render('temp', {layout: 'user_base_page', title: 'Temp page'});
        });
    }

    displaySigninPage(req, res){
        res.render('signin', {layout: 'user_base_page', title: 'Đăng nhập'});
    }

    existedUser(req, res){
        const con = req.con;
        let username = req.query.username;
        // console.log(username);
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

    invalidPassword(req, res, next){
        const con = req.con;
        let username = req.body.username;
        let encryptedPasswd = md5(req.body.password);

        siteModel.getAccountInfo(con, username, encryptedPasswd, function(err, result){
            if (err) throw err;

            let accountInfo = result.length == 0 ? [] : result;
            // console.log(accountInfo);

            if(accountInfo.length > 0){
                next();
            }
            else{
                res.send("Mật khẩu không đúng!");
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
        // console.log(req.session);
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
