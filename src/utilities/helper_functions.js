function getCurrentDatetime(){
    let today = new Date();
    return today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + " " +
                    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

function formatTimeToDisplay(time){
    return  time.getHours() + ":" + time.getMinutes();
}

function formatDateToDisplay(date){
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
}

function formatDateToInsert(date){
    let dateFormatted = date.split("/"); // [dd, mm, yyyy]
    dateFormatted = dateFormatted[2] + "-" + dateFormatted[1] + "-" + dateFormatted[0]; // 'yyyy-mm-dd'
    return dateFormatted;
}

function formatPriceToDisplay(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatPriceToInsert(price){
    let priceFormatted = price.includes(".") == true ? price.split(".").join("") : price.split(",").join("");
    return priceFormatted;
}

function calTotalPrice(data){
    let tourPrice = parseInt(data.tourPrice.split(".").join(""));
    let tourSurcharge = parseInt(data.tourSurcharge.split(".").join(""));

    // console.log(tourPrice);
    // console.log(tourSurcharge);

    let currentYear = new Date().getFullYear();
    let years = data.years;
    let rooms = data.singleRoom;
    let totalPrice = 0;

    for(let i = 0; i < years.length; i++){
        let year = parseInt(years[i]);
        let room = parseInt(rooms[i]);
        let age = currentYear - year;

        if(age >= 12)
            totalPrice += tourPrice;
        else if(age < 12 && age >= 5)
            totalPrice += (tourPrice * (75/100));
        else if(age < 5 && age >= 2)
            totalPrice += (tourPrice * (50/100));
        else if(age < 2 && age > 0)
            totalPrice += (tourPrice * (25/100));

        if(room == 1)
            totalPrice += tourSurcharge;
    }

    return totalPrice;
}

module.exports = {
    getCurrentDatetime,
    formatTimeToDisplay,
    formatDateToDisplay,
    formatDateToInsert,
    formatPriceToDisplay,
    formatPriceToInsert,
    calTotalPrice,
}
