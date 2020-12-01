function validateSignupForm(){
    let username = document.forms["signupForm"]["username"].value;
	let password1 = document.forms["signupForm"]["password1"].value;
	let password2 = document.forms["signupForm"]["password2"].value;
	let fullname = document.forms["signupForm"]["fullname"].value;
    let phoneNumber = document.forms["signupForm"]["phoneNumber"].value;
    let address = document.forms["signupForm"]["address"].value;

    let checked = false;

    if(username.length == 0){
        document.getElementById("usernameErr").innerHTML = "* Trường Tên đăng nhập không được bỏ trống.";
        checked = true;
    }

    if(password1.length == 0){
        document.getElementById("password1Err").innerHTML = "* Trường Mật khẩu không được bỏ trống.";
        checked = true;
    }

    if(password2.length == 0){
        document.getElementById("password2Err").innerHTML = "* Trường Nhập lại mật khẩu không được bỏ trống.";
        checked = true;
    }

    if(fullname.length == 0){
        document.getElementById("fullnameErr").innerHTML = "* Trường Họ và tên không được bỏ trống.";
        checked = true;
    }

    if(phoneNumber.length == 0){
        document.getElementById("phoneNumErr").innerHTML = "* Trường Số điện thoại không được bỏ trống.";
        checked = true;
    }

    if(address.length == 0){
        document.getElementById("addressErr").innerHTML = "* Trường Địa chỉ không được bỏ trống.";
        checked = true;
    }

    let reUsername = /^[A-Za-z][A-Za-z0-9]{5,14}$/;
    let rePassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%?/~_^&(){}[]:-=|;<>,.]).{8,24}$/;

    if(username.length != 0 && !username.match(reUsername)){
		document.getElementById("usernameErr").innerHTML = "* Tên đăng nhập: bắt đầu phải là chữ cái, theo sau có thể là chữ cái hoặc là số; dài từ 6 đến 15 ký tự.";
		checked = true;
	}

	if(password1.length != 0 && !password1.match(rePassword)){
		document.getElementById("password1Err").innerHTML = "* Mật khẩu: bắt đầu phải là chữ cái; ít nhất 1 chữ số; ít nhất một kí tự thường và hoa; phải chứa kí tự đặc biệt và có độ dài từ 8 đến 24 kí tự.";
		checked = true;
	}

	if(password1 != password2){
		document.getElementById("password2Err").innerHTML = "* Hai mật khẩu phải khớp nhau.";
		checked = true;
	}

    return !checked;
}
