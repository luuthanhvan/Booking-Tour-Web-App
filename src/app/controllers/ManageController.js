const manageModel = require('../models/ManageModel');

class ManageController{
    /* Functions handler for Admin page */
    index(req, res){
        res.render('manage', {layout: 'admin_base_page', title: 'Admin'});
    }

    /* Functions handler for Tour page */
    // get all tour and dest info and render tour page
    tour(req, res){
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
                        tourInfo[i]['tour_date_go'] = tourInfo[i]['tour_date_go'].getDate() + "/" + (tourInfo[i]['tour_date_go'].getMonth()+1) + "/" + tourInfo[i]['tour_date_go'].getFullYear();
                        // convert a string like 1000000 -> 1.000.000
                        tourInfo[i]['tour_price'] = tourInfo[i]['tour_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        tourInfo[i]['tour_surcharge'] = tourInfo[i]['tour_surcharge'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    }
                }

                /* append { key: value } to [ RowDataPacket {
                                                tour_id: 'tour1',
                                                tour_name: 'Du lịch Hà Nội - Lào Cai',
                                                tour_price: 7129000,
                                                tour_vehicle: 'Máy bay',
                                                tour_date_go: '5/11/2020',
                                                tour_time: '3 ngày 2 đêm',
                                                tour_dest_start: 'HG_001',
                                                tour_dest_end: 'Hà Nội, Sa pa (Lào Cai)',
                                                tour_max_customer: 25,
                                                tour_min_customer: 20,
                                                tour_description: 'abc',
                                                tour_status: 1 }] */

                if(results[3].length != 0){
                    for(let i = 0; i < results[3].length; i++){
                        Object.assign(tourInfo[i], results[3][i]);
                    }
                }
                /* Result after append:
                    [ RowDataPacket {
                        tour_id: 'tour1',
                        tour_name: 'Du lịch Hà Nội - Lào Cai',
                        tour_price: 7129000,
                        tour_vehicle: 'Máy bay',
                        tour_date_go: '5/11/2020',
                        tour_time: '3 ngày 2 đêm',
                        tour_dest_start: 'HG_001',
                        tour_dest_end: 'Hà Nội, Sa pa (Lào Cai)',
                        tour_max_customer: 25,
                        tour_min_customer: 20,
                        tour_description: 'abc',
                        tour_status: 1,
                        destinationName: 'Hoàng Thành Thăng Long, Đèo Ô Quy Hồ' } ]
                */
                // console.log(tourInfo);
                res.render('tour', {layout: 'admin_base_page', title: 'Tour', tourInfo, destInfo, destCity});
            }
        });
    }

    submitTourInfo(req, res){
        const con = req.con;
        // get data from form and pass it to addTour()
        const data = req.body;

        // format date
        let date = data.dateGo.split("/"); // [dd, mm, yyyy]
        data.dateGo = date[2] + "-" + date[1] + "-" + date[0]; // 'yyyy-mm-dd'
        // format tour price and surcharge
        data.tourPrice = data.tourPrice.includes(".") == true ? data.tourPrice.split(".").join("") : data.tourPrice.split(",").join("");
        data.tourSurcharge = data.tourSurcharge.includes(".") == true ? data.tourSurcharge.split(".").join("") : data.tourSurcharge.split(",").join("");

        // console.log(data);
        manageModel.addTour(con, data, function(err){
            if(err) throw err;
            res.redirect('/manage/tour');
        });
    }

    deleteTourInfo(req, res){
        const con = req.con;
        // get all tours id from checkbox (checked) and pass it to deleteTour()
        const tours = req.query.id;
        if(tours === "''"){
            let message = "Bạn chưa chọn tour cần xóa.";
            res.send(message);
        }
        else{
            manageModel.deleteTour(con, tours, function(err){
                if(err) throw err;
                res.redirect('/manage/tour');
            });
        }
    }

    editTourInfo(req, res){
        const con = req.con;
        const tourId = req.query.id;
        if(tourId === "''"){
            let message = "Bạn chưa chọn tour cần chỉnh sửa.";
            res.send(message);
        }
        else{
            manageModel.editTour(con, tourId, function(err, results){
                if(err) throw err;
                let destCity = results[0].length == 0 ? [] : results[0];
                let tourInfo = results[1].length == 0 ? [] : results[1];
                let destInfo = results[2].length == 0 ? [] : results[2];

                // Processing: format date go, tour price, tour surcharge and tour description before send to client
                if(tourInfo.length != 0){
                    for(let i = 0; i < tourInfo.length; i++){
                        tourInfo[i]['tour_date_go'] = tourInfo[i]['tour_date_go'].getDate() + "/" + (tourInfo[i]['tour_date_go'].getMonth()+1) + "/" + tourInfo[i]['tour_date_go'].getFullYear();
                        // convert a string like 1000000 -> 1.000.000
                        tourInfo[i]['tour_price'] = tourInfo[i]['tour_price'].toString().replace(/(?=(.{3})+$)/gm, ".");
                        tourInfo[i]['tour_surcharge'] = tourInfo[i]['tour_surcharge'].toString().replace(/(?=(.{3})+$)/gm, ".");
                    }
                }

                res.render('editTour', {layout: 'admin_base_page', title: 'Chỉnh sửa Tour', destCity, tourInfo, destInfo});
            });
        }
    }

    updateTourInfo(req, res){
        const con = req.con;
        const data = req.body;

        // console.log(data);
        // format date
        let date = data.dateGo.split("/"); // [dd, mm, yyyy]
        data.dateGo = date[2] + "-" + date[1] + "-" + date[0]; // 'yyyy-mm-dd'

        data.tourPrice = data.tourPrice.includes(".") == true ? data.tourPrice.split(".").join("") : data.tourPrice.split(",").join("");
        data.tourSurcharge = data.tourSurcharge.includes(".") == true ? data.tourSurcharge.split(".").join("") : data.tourSurcharge.split(",").join("");

        manageModel.updateTour(con, data, function(err){
            if(err) throw err;
            res.redirect('/manage/tour');
        });
    }

    /* Functions handler for Tourist Destination page */
    dest(req, res){
        const con = req.con;
        manageModel.getDest(con, function(err, rows){
            if(err) throw err;
            let destInfo = rows.length == 0 ? [] : rows;
            res.render('destination', {layout: 'admin_base_page', title: 'Địa điểm tham quan', destInfo});
        });
    }

    submitDestInfo(req, res){
        const con = req.con;
        const data = req.body;
        const pathToImg = "/files_uploaded/"+req.file.filename;
        manageModel.addDest(con, data, pathToImg, function(err){
            if(err) throw err;
            res.redirect('/manage/dest');
        });
    }

    deleteDestInfo(req, res){
        const con = req.con;
        const dests = req.query.id;
        if(dests === "''"){
            let message = "Bạn chưa chọn địa điểm cần xóa.";
            res.send(message);
        }
        else{
            manageModel.deleteDest(con, dests, function(err){
                if(err) throw err;
                res.redirect('/manage/dest');
            });
        }
    }

    editDestInfo(req, res){
        const con = req.con;
        const destId = req.query.id;
        if(destId === "''"){
            let message = "Bạn chưa chọn địa điểm cần chỉnh sửa.";
            res.send(message);
        }
        else{
            manageModel.editDest(con, destId, function(err, rows){
                if(err) throw err;
                let destInfo = rows.length == 0 ? [] : rows;
                res.render('editDest', {layout: 'admin_base_page', title: 'Chỉnh sửa địa điểm tham quan', destInfo});
            });
        }
    }

    updateDestInfo(req, res){
        const con = req.con;
        const data = req.body;
        // console.log(data);
        const pathToImg = "/files_uploaded/"+req.file.filename;
        manageModel.updateDest(con, data, pathToImg, function(err){
            if(err) throw err;
            res.redirect('/manage/dest');
        });
    }
}

module.exports = new ManageController();
