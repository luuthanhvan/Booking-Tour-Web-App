class ManageModel{
    add(con, data, callback) {
        // console.log(data);
        // var sql = "INSERT INTO tour VALUES ('01', 'ABC', 25, 20, 2000000, 1, 'mo ta abc');";
        var sql = "INSERT INTO tour VALUES ('"+data.tourId+"', '"+data.tourName+"', '"+data.maxCustomer+"', '"+data.minCustomer+"', '"+data.tourPrice+"', '"+data.status+"', '"+data.tourDescription+"');";
        con.query(sql, callback);
    }
}

module.exports = new ManageModel();