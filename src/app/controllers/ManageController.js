const manageModel = require('../models/ManageModel');

class ManageController{
    /* Functions handler for Admin page */
    index(req, res){
        res.render('manage', {layout: 'admin_base_page', title: 'Admin'});
    }

    /* Functions handler for Tour page */
    tour(req, res){
        const con = req.con;
        manageModel.getTour(con, function(err, results, fields){
            if(err) throw err;
            let tourInfo = results[0].length == 0 ? [] : results[0];
            let destInfo = results[1].length == 0 ? [] : results[1];
            res.render('tour', {layout: 'admin_base_page', title: 'Tour', tourInfo, destInfo});
        });
    }

    submitTourInfo(req, res){
        const con = req.con;
        const data = req.body;
        manageModel.addTour(con, data, function(err){
            if(err) throw err;
            res.redirect('/manage/tour');
        });
    }

    deleteTourInfo(req, res){
        const con = req.con;
        const tours = req.query.id;
        manageModel.deleteTour(con, tours, function(err){
            if(err) throw err;
            res.redirect('/manage/tour');
        });
    }

    editTourInfo(req, res){
        const con = req.con;
        const tourId = req.query.id;
        manageModel.editTour(con, tourId, function(err, results){
            if(err) throw err;
            let tourInfo = results[0].length == 0 ? [] : results[0];
            let destInfo = results[1].length == 0 ? [] : results[1];
            res.render('editTour', {layout: 'admin_base_page', title: 'Chỉnh sửa Tour', tourInfo, destInfo});
        });
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
        manageModel.editDest(con, destId, function(err, rows){
            if(err) throw err;
            let destInfo = rows.length == 0 ? [] : rows;
            res.render('editDest', {layout: 'admin_base_page', title: 'Chỉnh sửa địa điểm tham quan', destInfo});
        });
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
