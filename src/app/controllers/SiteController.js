class SiteController{
    index(req, res){
        res.render('home', {layout: 'user_base_page', title: 'Trang chu'});
    }

    signIn(req, res){
        res.render('signin', {layout: 'user_base_page', title: 'Đăng nhập'});
    }

    signUp(req, res){
        res.render('signup', {layout: 'user_base_page', title: 'Đăng ký'});
    }
}

module.exports = new SiteController();