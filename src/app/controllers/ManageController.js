const manageModel = require('../models/ManageModel');

class ManageController{
    /* Function handler for Admin page */
    index(req, res){
        res.render('manage', {layout: 'admin_base_page', title: 'Admin'});
    }

    /* Function handler for Tour page*/
    tour(req, res){
        const con = req.con;
        manageModel.getTour(con, function(err, rows){
            if(err) throw err;
            // console.log(rows);
            if(rows.length == 0){
                res.render('tour', {layout: 'admin_base_page', title: 'Tour', data: []});
            }
            else{
                res.render('tour', {layout: 'admin_base_page', title: 'Tour', data: rows});
            }
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

    editTour(req, res){
        res.render('editTour', {layout: 'admin_base_page', title: 'Sửa tour'});
    }

    deleteTour(req, res){
        res.render('deleteTour', {layout: 'admin_base_page', title: 'Xóa tour'});
    }

    listTour(req, res){
        res.render('tours', {layout: 'admin_base_page', title: 'Danh sách tour'});
    }

    /* Function handler for Tourist Destination page */
    dest(req, res){
        const con = req.con;
        manageModel.getDest(con, function(err, rows){
            if(err) throw err;
            if(rows.length == 0){
                res.render('destination', {layout: 'admin_base_page', title: 'Địa điểm tham quan', data: []});
            }
            else{
                res.render('destination', {layout: 'admin_base_page', title: 'Địa điểm tham quan', data: rows});
            }
        });
    }

    submitDestInfo(req, res){
        const con = req.con;
        const data = req.body;
        manageModel.addDest(con, data, function(err){
            if(err) throw err;
            res.redirect('/manage/dest');
        });
    }

    editDest(req, res){
        res.render('editDest', {layout: 'admin_base_page', title: 'Sửa địa điểm'});
    }

    deleteDest(req, res){
        res.render('deleteDest', {layout: 'admin_base_page', title: 'Xóa địa điểm'});
    }

    listDest(req, res){
        res.render('destinations', {layout: 'admin_base_page', title: 'Danh sách địa điểm tham quan'});
    }
}

module.exports = new ManageController();
