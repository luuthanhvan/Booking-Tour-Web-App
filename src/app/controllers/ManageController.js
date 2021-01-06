const helperFunctions = require('../../utilities/helper_functions');
const manageModel = require('../models/ManageModel');

const errorMessage = "<h1>403 - Forbidden</h1><p>You don't have permission to access / on this server</p><button><a href='/sign-in'>Đăng nhập</a></button>";
const signinMessage = "<h1>Vui lòng đăng nhập bằng tài khoản Admin!<h1><button><a href='/sign-in'>Đăng nhập lại</a></button>";

class ManageController{
    /* Functions handler for Admin page */
    index(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                res.render('manage', {layout: 'admin_base_page', title: 'Admin'});
            }
            else{
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    /* Functions handler for Tour page */
    // get all tour and dest info and render tour page
    tour(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                manageModel.getTour(con, function(err, results, fields){
                    if(err) throw err;
                    if(results[0].length == 0){
                        res.send("<h1>Chưa có địa điểm nào được nhập. Bạn cần nhập thông về địa điểm trước khi nhập thông tin tour.</h1></button><a href='/manage/dest'>Nhập địa điểm</a></button>");
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
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    submitTourInfo(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                // get data from form and pass it to addTour()
                let data = req.body;

                // console.log(data);

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
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    prepareToDetele(req, res, next){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                // get tour id from checkbox (checked)
                let tourId = req.query.id;

                if(tourId === "''"){
                    res.send("<h1>Bạn chưa chọn Tour cần xóa.</h1><button><a href='/manage/tour'>Quay lại</a></button>");
                }
                else if(tourId.split(",").length > 1){
                    res.send("<h1>Bạn chỉ được phép xóa 1 Tour!</h1><button><a href='/manage/tour'>Quay lại</a></button>");
                }
                else{
                    tourId = tourId.slice(1, tourId.length-1);
                    manageModel.getTicketInfoByTourId(con, tourId, function(err, result){
                        if (err) throw err;

                        if(result.length > 0){
                            res.send("<h1>Tour đã được đặt, không được phép xóa!</h1><button><a href='/manage/tour'>Quay lại</a></button>");
                        }
                        else{
                            next();
                        }
                    });
                }
            }
            else{
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    deleteTourInfo(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                // get tour id from checkbox (checked)
                let tourId = req.query.id.slice(1, req.query.id.length-1);
                manageModel.deleteTourByTourId(con, tourId, function(err){
                    if(err) throw err;
                    res.redirect('/manage/tour');
                });
            }
            else{
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    editTourInfo(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let tourId = req.query.id;
                if(tourId === "''"){
                    res.send("<h1>Bạn chưa chọn tour cần chỉnh sửa.</h1><button><a href='/manage/tour'>Quay lại</a></button>");
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
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    updateTourInfo(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let data = req.body;

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
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    /* Functions handler for Tourist Destination page */
    dest(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                manageModel.getDest(con, function(err, rows){
                    if(err) throw err;
                    let destInfo = rows.length == 0 ? [] : rows;
                    res.render('destination', {layout: 'admin_base_page', title: 'Địa điểm tham quan', destInfo});
                });
            }
            else{
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    submitDestInfo(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let data = req.body;
                const pathToImg = "/files_uploaded/"+req.file.filename;
                manageModel.addDest(con, data, pathToImg, function(err){
                    if(err) throw err;
                    res.redirect('/manage/dest');
                });
            }
            else{
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    deleteDestInfo(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let destIds = req.query.id;
                if(destIds === "''"){
                    res.send("<h1>Bạn chưa chọn địa điểm cần xóa.</h1><button><a href='/manage/dest'>Quay lại</a></button>");
                }
                else{
                    manageModel.deleteDestByDestIds(con, destIds, function(err){
                        if(err) throw err;
                        res.redirect('/manage/dest');
                    });
                }
            }
            else{
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    editDestInfo(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let destId = req.query.id;
                if(destId === "''"){
                    res.send("<h1>Bạn chưa chọn địa điểm cần chỉnh sửa.</h1><button><a href='/manage/dest'>Quay lại</a></button>");
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
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    updateDestInfo(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let data = req.body;
                // console.log(data);
                const pathToImg = "/files_uploaded/"+req.file.filename;
                manageModel.updateDest(con, data, pathToImg, function(err){
                    if(err) throw err;
                    res.redirect('/manage/dest');
                });
            }
            else{
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    // post(req, res){
    //     res.render("post", {layout: 'admin_base_page', title: 'Bài viết'});
    // }
    //
    // submitPost(req, res){
    //     // if(req.session.user){
    //     //     const userRole = req.session.user.role;
    //     //
    //     //     if(userRole == 1){ // admin
    //             const con = req.con;
    //             // get data from form and pass it to addTour()
    //             let data = req.body;
    //             console.log(data);
    //             // manageModel.addPost(con, data, function(err){
    //             //     if(err) throw err;
    //             //     res.redirect('/manage/post');
    //             // });
    //     //     }
    //     //     else{
    //     //         res.send(signinMessage);
    //     //     }
    //     // }
    //     // else{
    //     //     res.status(403).send(errorMessage);
    //     // }
    // }

    tourBooking(req, res){
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                manageModel.getAllTourBookingInfo(con, function(err, result){
                    if (err) throw err;
                    let tourBookingInfo = result.length == 0 ? [] : result;
                    // format date before send it to client
                    for(let i = 0; i < tourBookingInfo.length; i++)
                        tourBookingInfo[i]['tour_date_go'] = helperFunctions.formatDateToDisplay(tourBookingInfo[i]['tour_date_go']);

                    res.render("tour_booking", {layout: 'admin_base_page', title: 'Quản lý đặt tour', tourBookingInfo});
                });
            }
            else{
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }

    tourBookingDetails(req, res){
        // console.log(req.query.tourId);
        if(req.session.user){
            const userRole = req.session.user.role;

            if(userRole == 1){ // admin
                const con = req.con;
                let tourId = req.query.tourId;

                manageModel.getTourBookingDetailsById(con, tourId, function(err, results){
                    if (err) throw err;
                    let tourBookingDetails = results[0].length == 0 ? [] : results[0];
                    let tourInfo = results[1].length == 0 ? [] : results[1];
                    // console.log(tourInfo);

                    // format date before send it to client
                    for(let i = 0; i < tourBookingDetails.length; i++){
                        tourBookingDetails[i]['customer_dob'] = helperFunctions.formatDateToDisplay(tourBookingDetails[i]['customer_dob']);
                        tourBookingDetails[i]['booking_date'] = helperFunctions.formatDateToDisplay(tourBookingDetails[i]['booking_date']);

                        if(tourBookingDetails[i]['booking_single_room'] == 0)
                            Object.assign(tourBookingDetails[i], {price: helperFunctions.formatPriceToDisplay(tourInfo[0]['tour_price'])});
                        else
                            Object.assign(tourBookingDetails[i], {price: helperFunctions.formatPriceToDisplay(tourInfo[0]['tour_price'] + tourInfo[0]['tour_surcharge'])});
                    }


                    let title = 'Danh sách khách hàng đặt tour ' + tourInfo[0]['tour_name'];
                    res.render("tour_booking_details", {layout: 'admin_base_page', title, tourBookingDetails});
                });
            }
            else{
                res.send(signinMessage);
            }
        }
        else{
            res.status(403).send(errorMessage);
        }
    }
}

module.exports = new ManageController();
