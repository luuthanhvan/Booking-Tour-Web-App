const helperFunctions = require('../../utilities/helper_functions');
const manageModel = require('../models/ManageModel');

class ManageController{
    /* Functions handler for Admin page */
    index(req, res){
        // console.log("Manage:", req.session);
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                res.render('manage', {layout: 'admin_base_page', title: 'Admin'});
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    /* Functions handler for Tour page */
    // get all tour and dest info and render tour page
    tour(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                manageModel.getTour(con, function(err, results, fields){
                    if(err) throw err;
                    if(results[0].length == 0){
                        let message = "Chưa có địa điểm nào được nhập. Bạn cần nhập thông về địa điểm trước khi nhập thông tin tour.";
                        res.send(message);
                    }
                    else{
                        let destCity = results[0];
                        // get dest info from the first sql statement -> display dest name, address in select-option tag
                        let destInfo = results[1];
                        // get tour info from the last sql statement
                        let tourInfo = results[2].length == 0 ? [] : results[2];

                        // console.log(tourInfo[0]['tour_price'].toLocaleString()); // eg: 1000000 -> 1,000,000

                        // Processing: format date go, tour price, tour surcharge and tour description before send to client
                        if(tourInfo.length != 0){
                            for(let i = 0; i < tourInfo.length; i++){
                                tourInfo[i]['tour_date_go'] = helperFunctions.formatDateToDisplay(tourInfo[i]['tour_date_go']);
                                tourInfo[i]['tour_price'] = helperFunctions.formatPriceToDisplay(tourInfo[i]['tour_price']);
                                tourInfo[i]['tour_surcharge'] = helperFunctions.formatPriceToDisplay(tourInfo[i]['tour_surcharge']);
                            }
                        }

                        if(results[3].length != 0){
                            for(let i = 0; i < results[3].length; i++){
                                Object.assign(tourInfo[i], results[3][i]);
                            }
                        }

                        res.render('tour', {layout: 'admin_base_page', title: 'Tour', tourInfo, destInfo, destCity});
                    }
                });
            }
            else {
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    submitTourInfo(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                // get data from form and pass it to addTour()
                let data = req.body;

                // Processing: format date go, tour price, tour surcharge and tour description before insert it to database
                data.dateGo = helperFunctions.formatDateToInsert(data.dateGo);
                data.tourPrice = helperFunctions.formatPriceToInsert(data.tourPrice);
                data.tourSurcharge = helperFunctions.formatPriceToInsert(data.tourSurcharge);

                // console.log(data);
                manageModel.addTour(con, data, function(err){
                    if(err) throw err;
                    res.redirect('/manage/tour');
                });
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    deleteTourInfo(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                // get all tour ids from checkbox (checked) and pass it to deleteTour()
                const tourIds = req.query.id;
                if(tourIds === "''"){
                    let message = "Bạn chưa chọn tour cần xóa.";
                    res.send(message);
                }
                else{
                    manageModel.deleteTourByTourIds(con, tourIds, function(err){
                        if(err) throw err;
                        res.redirect('/manage/tour');
                    });
                }
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    editTourInfo(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let tourId = req.query.id;
                if(tourId === "''"){
                    let message = "Bạn chưa chọn tour cần chỉnh sửa.";
                    res.send(message);
                }
                else{
                    tourId = tourId.slice(1, tourId.length-1);
                    manageModel.editTourById(con, tourId, function(err, results){
                        if(err) throw err;
                        let destCity = results[0].length == 0 ? [] : results[0];
                        let tourInfo = results[1].length == 0 ? [] : results[1];
                        let destInfo = results[2].length == 0 ? [] : results[2];

                        // Processing: format date go, tour price, tour surcharge and tour description before send to client
                        if(tourInfo.length != 0){
                            for(let i = 0; i < tourInfo.length; i++){
                                tourInfo[i]['tour_date_go'] = helperFunctions.formatDateToDisplay(tourInfo[i]['tour_date_go']);
                                tourInfo[i]['tour_price'] = helperFunctions.formatPriceToDisplay(tourInfo[i]['tour_price']);
                                tourInfo[i]['tour_surcharge'] = helperFunctions.formatPriceToDisplay(tourInfo[i]['tour_surcharge']);
                            }
                        }

                        res.render('editTour', {layout: 'admin_base_page', title: 'Chỉnh sửa Tour', destCity, tourInfo, destInfo});
                    });
                }
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    updateTourInfo(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let data = req.body;

                // console.log(data.tourPrice.split(".").join(""));

                // Processing: format date go, tour price, tour surcharge and tour description before insert it to database
                data.dateGo = helperFunctions.formatDateToInsert(data.dateGo);
                data.tourPrice = helperFunctions.formatPriceToInsert(data.tourPrice);
                data.tourSurcharge = helperFunctions.formatPriceToInsert(data.tourSurcharge);

                manageModel.updateTour(con, data, function(err){
                    if(err) throw err;
                    res.redirect('/manage/tour');
                });
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    /* Functions handler for Tourist Destination page */
    dest(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                manageModel.getDest(con, function(err, rows){
                    if(err) throw err;
                    let destInfo = rows.length == 0 ? [] : rows;
                    res.render('destination', {layout: 'admin_base_page', title: 'Địa điểm tham quan', destInfo});
                });
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    submitDestInfo(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                const data = req.body;
                const pathToImg = "/files_uploaded/"+req.file.filename;
                manageModel.addDest(con, data, pathToImg, function(err){
                    if(err) throw err;
                    res.redirect('/manage/dest');
                });
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    deleteDestInfo(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                const destIds = req.query.id;
                if(destIds === "''"){
                    let message = "Bạn chưa chọn địa điểm cần xóa.";
                    res.send(message);
                }
                else{
                    manageModel.deleteDestByDestIds(con, destIds, function(err){
                        if(err) throw err;
                        res.redirect('/manage/dest');
                    });
                }
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    editDestInfo(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let destId = req.query.id;
                if(destId === "''"){
                    let message = "Bạn chưa chọn địa điểm cần chỉnh sửa.";
                    res.send(message);
                }
                else{
                    destId = destId.slice(1, destId.length-1);
                    manageModel.editDestById(con, destId, function(err, rows){
                        if(err) throw err;
                        let destInfo = rows.length == 0 ? [] : rows;
                        res.render('editDest', {layout: 'admin_base_page', title: 'Chỉnh sửa địa điểm tham quan', destInfo});
                    });
                }
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }

    updateDestInfo(req, res){
        if(req.session.user){
            let userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                const data = req.body;
                // console.log(data);
                const pathToImg = "/files_uploaded/"+req.file.filename;
                manageModel.updateDest(con, data, pathToImg, function(err){
                    if(err) throw err;
                    res.redirect('/manage/dest');
                });
            }
            else{
                res.send("Vui lòng đăng nhập bằng tài khoản Admin!");
            }
        }
        else{
            res.send("Forbident");
        }
    }
}

module.exports = new ManageController();
