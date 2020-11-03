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
                let destInfo = results[0];
                // get tour info from the first sql statement
                let tourInfo = results[1].length == 0 ? [] : results[1];
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
                if(results[2].length != 0)
                    Object.assign(tourInfo[0], results[2][0]);
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
                // get dest info from the first sql statement -> display dest name, address in select-option tag
                // let destInfo = results[2].length == 0 ? [] : results[2];
                res.render('tour', {layout: 'admin_base_page', title: 'Tour', tourInfo, destInfo});
            }
        });
    }

    submitTourInfo(req, res){
        const con = req.con;
        // get data from form and pass it to addTour()
        const data = req.body;
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
                let tourInfo = results[0].length == 0 ? [] : results[0];
                let destInfo = results[1].length == 0 ? [] : results[1];
                res.render('editTour', {layout: 'admin_base_page', title: 'Chỉnh sửa Tour', tourInfo, destInfo});
            });
        }
    }

    updateTourInfo(req, res){
        const con = req.con;
        const data = req.body;
        // console.log(data);
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
