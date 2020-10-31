// Event Listener
var container = document.querySelector('.btn-group');
var buttonClick = container && container.addEventListener('click', (event) => {
    var target = event.target;
    var handler;
    if (target.nodeName == "BUTTON" && (handler = target.getAttribute('data-act'))) {
        buttonMap[handler](event);
    }
});

var tours = [];
var checkBoxsTour = document.querySelectorAll(".chooseTour");
checkBoxsTour.forEach((item, i) => {
    item.onclick = function(){
        if(item.checked){
            tours.push(item.value);
        }
    }
});

function addTour(e) {
    e.formAction = "/manage/tour/add";
}

function updateTour(e) {
    e.formAction = "/manage/tour/update";
}

function editTour(e) {
    e.formAction = "/manage/tour/edit?id='"+tours+"'";
}

function deleteTour(e) {
    e.formAction = "/manage/tour/delete?id='"+tours+"'";
}


var dests = [];
var checkBoxsDest = document.querySelectorAll(".chooseDest");
checkBoxsDest.forEach((item, i) => {
    item.onclick = function(){
        if(item.checked){
            dests.push(item.value);
        }
    }
});

function addDest(e) {
    e.formAction = "/manage/dest/add";
}

function updateDest(e) {
    e.formAction = "/manage/dest/update";
}

function editDest(e) {
    e.formAction = "/manage/dest/edit?id='"+dests+"'";
}

function deleteDest(e) {
    e.formAction = "/manage/dest/delete?id='"+dests+"'";
}

// mapper object to hold my functions
var buttonMap = {
    btnAddTour: (event) => {
        addTour(event.target)
    },
    btnUpdateTour: (event) => {
        updateTour(event.target)
    },
    btnEditTour: (event) => {
        editTour(event.target)
    },
    btnDeleteTour: (event) => {
        deleteTour(event.target)
    },
    btnAddDest: (event) => {
        addDest(event.target)
    },
    btnUpdateDest: (event) => {
        updateDest(event.target)
    },
    btnEditDest: (event) => {
        editDest(event.target)
    },
    btnDeleteDest: (event) => {
        deleteDest(event.target)
    },
}
