function selectedItem(options){
    for(let i = 1; i < options.length; i++){
        if(options[i].selected === true)
            return true;
    }
    return false;
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

    if(nbCustomers.length != 0 && !nbCustomers.match(/[0-9]$/)){
        document.getElementById("nbCustomersErr").innerHTML = "* Trường Số người đi cùng không được chứa chữ cái hoặc ký tự đặc biệt.";
        checked = true;
    }

    return !checked;
}
