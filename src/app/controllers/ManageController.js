const manageModel = require('../models/ManageModel');

class ManageController{
    index(req, res){
        res.render('manage', {layout: 'admin_base_page', title: 'Admin'});
    }

    tour(req, res){
        res.render('tour', {layout: 'admin_base_page', title: 'Tour'});
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

    // getTourInfo(req, res){
    //     const con = req.con;
    //     const data = req.body;
    //     manageModel.add(con, data, function(err){
    //         if(err) throw err;
    //         res.render('tour', {layout: 'admin_base_page', title: 'Tour'});
    //     });
    // }

    dest(req, res){
        res.render('destination', {layout: 'admin_base_page', title: 'Địa điểm tham quan'});
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
