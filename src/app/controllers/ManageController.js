const manageModel = require('../models/ManageModel');

class ManageController{
    /* Functions handler for Admin page */
    index(req, res){
        res.render('manage', {layout: 'admin_base_page', title: 'Admin'});
    }

    /* Functions handler for Tour page */
    tour(req, res){
        const con = req.con;
        manageModel.getTour(con, function(err, rows, fields){
            if(err) throw err;
            let tourInfo = rows.length == 0 ? [] : rows;
            res.render('tour', {layout: 'admin_base_page', title: 'Tour', tourInfo});
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

    /* Functions handler for Tourist Destination page */
    dest(req, res){
        const con = req.con;
        manageModel.getDest(con, function(err, rows){
            if(err) throw err;
            let destInfo = rows.length == 0 ? [] : rows;
            res.render('destination', {layout: 'admin_base_page', title: 'Địa điểm tham quan', destInfo: rows});
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
        manageModel.deleteDest(con, dests, function(err){
            if(err) throw err;
            res.redirect('/manage/dest');
        });
    }
}

module.exports = new ManageController();
