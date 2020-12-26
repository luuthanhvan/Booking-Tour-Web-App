function selectedItem(options){
    for(let i = 1; i < options.length; i++){
        if(options[i].selected === true)
            return true;
    }
    return false;
}

function validateSignupForm(){
    let username = document.forms["signupForm"]["username"].value;
	let password1 = document.forms["signupForm"]["password1"].value;
	let password2 = document.forms["signupForm"]["password2"].value;
	let fullname = document.forms["signupForm"]["fullname"].value;
    let phoneNumber = document.forms["signupForm"]["phoneNumber"].value;
    let address = document.forms["signupForm"]["address"].value;
    let day = document.getElementById("day");
    let month = document.getElementById("month");
    let year = document.getElementById("year");

    let checked = false;
    let reUsername = /^[A-Za-z][A-Za-z0-9]{6,15}$/;
    let rePassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/;

    if(username.length == 0){
        document.getElementById("usernameErr").innerHTML = "* Trường Tên đăng nhập không được bỏ trống.";
        checked = true;
    }
    else if(!username.match(reUsername)){
		document.getElementById("usernameErr").innerHTML = "* Tên đăng nhập: bắt đầu phải là chữ cái, theo sau có thể là chữ cái hoặc là số; dài từ 6 đến 15 ký tự.";
		checked = true;
	}

    if(password1.length == 0){
        document.getElementById("password1Err").innerHTML = "* Trường Mật khẩu không được bỏ trống.";
        checked = true;
    }
    else if(!password1.match(rePassword)){
		document.getElementById("password1Err").innerHTML = "* Mật khẩu: phải có ít nhất 1 chữ số; ít nhất một kí tự thường và hoa; phải chứa kí tự đặc biệt và có độ dài từ 8 đến 24 kí tự. Ví dụ: Plqkwx@0111";
		checked = true;
	}

    if(password2.length == 0){
        document.getElementById("password2Err").innerHTML = "* Trường Nhập lại mật khẩu không được bỏ trống.";
        checked = true;
    }

    if(password1 != password2){
		document.getElementById("password2Err").innerHTML = "* Hai mật khẩu phải khớp nhau.";
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
    else if(!phoneNumber.match(/^[0-9]{10}$/)){
        document.getElementById("phoneNumErr").innerHTML = "* Trường Số điện thoại không được chứa chữ cái hoặc ký tự đặc biệt và có độ dài tối đa là 10 chữ số.";
        checked = true;
    }

    if(address.length == 0){
        document.getElementById("addressErr").innerHTML = "* Trường Địa chỉ không được bỏ trống.";
        checked = true;
    }

    if(!selectedItem(day.options)){
        document.getElementById("dayErr").innerHTML = "* Vui lòng chọn Ngày sinh.";
        checked = true;
    }

    if(!selectedItem(month.options)){
        document.getElementById("monthErr").innerHTML = "* Vui lòng chọn Tháng sinh.";
        checked = true;
    }

    if(!selectedItem(year.options)){
        document.getElementById("yearErr").innerHTML = "* Vui lòng chọn Năm sinh.";
        checked = true;
    }

    return !checked;
}

function validateBookingForm(){
    let checked = false;
    let fullNames = document.getElementsByName("fullName[]");
    let phoneNumber = document.forms["bookingForm"]["phoneNumber"].value;
    let address = document.forms["bookingForm"]["address"].value;

    let days = document.getElementsByName("days[]");
    let months = document.getElementsByName("months[]");
    let years = document.getElementsByName("years[]");

    let nbCustomers = document.forms["bookingForm"]["nbCustomers"].value;

    fullNames.forEach((name, index) => {
        // console.log(name.value, index);
        if(name.value.length == 0){
            let id = "fullnameErr" + index.toString();
            document.getElementById(id).innerHTML = "* Trường Họ tên không được bỏ trống.";
            checked = true;
        }
    });

    if(phoneNumber.length == 0){
        document.getElementById("phoneNumberErr").innerHTML = "* Trường Số điện thoại không được bỏ trống.";
        checked = true;
    }
    else if(!phoneNumber.match(/^[0-9]{10}$/)){
        document.getElementById("phoneNumberErr").innerHTML = "* Trường Số điện thoại không được chứa chữ cái hoặc ký tự đặc biệt và có độ dài tối đa là 10 chữ số.";
        checked = true;
    }

    if(address.length == 0){
        document.getElementById("addressErr").innerHTML = "* Trường Địa chỉ không được bỏ trống.";
        checked = true;
    }

    for(let i = 0; i < days.length; i++){
        if(!selectedItem(days[i].options)){
            let id = "dayErr" + i.toString();
            document.getElementById(id).innerHTML = "* Vui lòng chọn Ngày sinh.";
            checked = true;
        }
    }

    for(let i = 0; i < months.length; i++){
        if(!selectedItem(months[i].options)){
            let id = "monthErr" + i.toString();
            document.getElementById(id).innerHTML = "* Vui lòng chọn Tháng sinh.";
            checked = true;
        }
    }

    for(let i = 0; i < years.length; i++){
        if(!selectedItem(years[i].options)){
            let id = "yearErr" + i.toString();
            document.getElementById(id).innerHTML = "* Vui lòng chọn Năm sinh.";
            checked = true;
        }
    }

    if(nbCustomers.length != 0 && !nbCustomers.match(/^[0-9]$/)){
        document.getElementById("nbCustomersErr").innerHTML = "* Trường Số người đi cùng không được chứa chữ cái hoặc ký tự đặc biệt.";
        checked = true;
    }

    return !checked;
}
