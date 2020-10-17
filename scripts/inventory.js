// Empty objects to fill with form data used in the ajax request.
var getObject = {};
var postObject = {};

// Add vehical button event.
$('#addNewVehical').click(function() {

    // Clear any existing form data.
    $('#addNewMake')[0].value = "";
    $('#addNewModel')[0].value = "";
    $('#addNewYear')[0].value = "";
    $('#addNewPrice')[0].value = "";
    $('#addNewColor')[0].value = "";
    $('#addNewMileage')[0].value = "";
    $('#addNewType')[0].value = "";
    $('#addNewTransmission')[0].value = "";
    $('#addNewDrivetrain')[0].value = "";

    // Clear any invalid warnings.
    $('#addNewMake').removeClass("is-invalid");
    $('#addNewModel').removeClass("is-invalid");
    $('#addNewYear').removeClass("is-invalid");
    $('#addNewPrice').removeClass("is-invalid");
    $('#addNewColor').removeClass("is-invalid");
    $('#addNewMileage').removeClass("is-invalid");
    $('#addNewType').removeClass("is-invalid");
    $('#addNewTransmission').removeClass("is-invalid");
    $('#addNewDrivetrain').removeClass("is-invalid");
});

// Add vehical modal submit button event.
$('#addVehicalModalSubmit').click(function(event) {

    event.preventDefault();

    // Check the form for valid data.
    if($('#addNewMake')[0].value == "") {
        $('#addNewMake').addClass("is-invalid");
    }
    if($('#addNewModel')[0].value == "") {
        $('#addNewModel').addClass("is-invalid");
    }
    if($('#addNewYear')[0].value == "") {
        $('#addNewYear').addClass("is-invalid");
    }
    if($('#addNewPrice')[0].value == "") {
        $('#addNewPrice').addClass("is-invalid");
    }
    if($('#addNewColor')[0].value == "") {
        $('#addNewColor').addClass("is-invalid");
    }
    if($('#addNewMileage')[0].value == "") {
        $('#addNewMileage').addClass("is-invalid");
    }
    if($('#addNewType')[0].value == "") {
        $('#addNewType').addClass("is-invalid");
    }
    if($('#addNewTransmission')[0].value == "") {
        $('#addNewTransmission').addClass("is-invalid");
    }
    if($('#addNewDrivetrain')[0].value == "") {
        $('#addNewDrivetrain').addClass("is-invalid");
    }
    if($('#addNewMake')[0].value != "" && $('#addNewModel')[0].value != "" && $('#addNewYear')[0].value != "" && $('#addNewPrice')[0].value != "" && $('#addNewColor')[0].value != "" && $('#addNewMileage')[0].value != "" && $('#addNewType')[0].value != "" && $('#addNewTransmission')[0].value != "" && $('#addNewDrivetrain')[0].value != "") {

        // Add the data to the JS object.
        postObject.make = $('#addNewMake')[0].value;
        postObject.model = $('#addNewModel')[0].value;
        postObject.year = $('#addNewYear')[0].value;
        postObject.price = $('#addNewPrice')[0].value;
        postObject.color = $('#addNewColor')[0].value;
        postObject.mileage = $('#addNewMileage')[0].value;
        postObject.type = $('#addNewType')[0].value;
        postObject.transmission = $('#addNewTransmission')[0].value;
        postObject.drive = $('#addNewDrivetrain')[0].value;

        // Submit the data.
        post();

        // Update the table.
        window.setTimeout(get, 2000);

        // Close the modal from.
        $('#newVehicalModal').modal('hide');
    }
});

// Add vehical modal form validation function.
$('#addNewMake').keyup(function() {
    if($('#addNewMake')[0].value != "") {
        $('#addNewMake').removeClass("is-invalid");
    }
});

$('#addNewModel').keyup(function() {
    if($('#addNewModel')[0].value != "") {
        $('#addNewModel').removeClass("is-invalid");
    }
});

$('#addNewYear').keyup(function() {
    if($('#addNewYear')[0].value != "") {
        $('#addNewYear').removeClass("is-invalid");
    }
});

$('#addNewPrice').keyup(function() {
    if($('#addNewPrice')[0].value != "") {
        $('#addNewPrice').removeClass("is-invalid");
    }
});

$('#addNewColor').keyup(function() {
    if($('#addNewColor')[0].value != "") {
        $('#addNewColor').removeClass("is-invalid");
    }
});

$('#addNewMileage').keyup(function() {
    if($('#addNewMileage')[0].value != "") {
        $('#addNewMileage').removeClass("is-invalid");
    }
});

$('#addNewType').keyup(function() {
    if($('#addNewType')[0].value != "") {
        $('#addNewType').removeClass("is-invalid");
    }
});

$('#addNewTransmission').keyup(function() {
    if($('#addNewTransmission')[0].value != "") {
        $('#addNewTransmission').removeClass("is-invalid");
    }
});

$('#addNewDrivetrain').keyup(function() {
    if($('#addNewDrivetrain')[0].value != "") {
        $('#addNewDrivetrain').removeClass("is-invalid");
    }
});

function editRow(row) {
    console.log($(row).closest('tr').attr('id'));
}

function deleteRow(row) {
    console.log($(row).closest('tr').attr('id'));
}

// Search form clear button event.
$('#clearBtn').click(function(event) {

    event.preventDefault();

    // Clear all inputs and set all selects to 'All'.
    $('#selectMake')[0].value = 'All';
    $('#selectColor')[0].value = 'All';
    $('#selectType')[0].value = 'All';
    $('#selectTransmission')[0].value = 'All';
    $('#selectDrivetrain')[0].value = 'All';
    $('#inputModel')[0].value = '';
    $('#inputFromYear')[0].value = '';
    $('#inputToYear')[0].value = '';
    $('#inputFromPrice')[0].value = '';
    $('#inputToPrice')[0].value = '';
    $('#inputFromMileage')[0].value = '';
    $('#inputToMileage')[0].value = '';

    // Empty the ajax data object.
    getObject = {};

    // Run the ajax get request.
    get();
});

// Search form search button event.
$('#searchBtn').click(function(event) {

    event.preventDefault();

    // Check what form data was filled in. Then, build the 'data' object for the ajax request based on that.

    // Check if a 'make' was selected.
    if($('#selectMake')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectMake')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'make'.from the object
        delete getObject.make;
    } else {
        // If a 'make' was selected, add 'make' to the object to be used in the ajax 'data'.
        getObject.make = $('#selectMake')[0].value;
    }

    // Check if a 'color' was selected.
    if($('#selectColor')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectColor')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'color'.from the object
        delete getObject.color;
    } else {
        // If a 'color' was selected, add 'color' to the object to be used in the ajax 'data'.
        getObject.color = $('#selectColor')[0].value;
    }

    // Check if a 'vehical type' was selected.
    if($('#selectType')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectType')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'type'.from the object
        delete getObject.type;
    } else {
        // If a 'type' was selected, add 'type' to the object to be used in the ajax 'data'.
        getObject.type = $('#selectType')[0].value;
    }

    // Check if a 'transmission' was selected.
    if($('#selectTransmission')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectTransmission')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'transmission'.from the object
        delete getObject.transmission;
    } else {
        // If a 'transmission' was selected, add 'transmission' to the object to be used in the ajax 'data'.
        getObject.transmission = $('#selectTransmission')[0].value;
    }

    // Check if a 'drivetrain' was selected.
    if($('#selectDrivetrain')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectDrivetrain')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'drivetrain'.from the object
        delete getObject.drive;
    } else {
        // If a 'drivetrain' was selected, add 'drivetrain' to the object to be used in the ajax 'data'.
        getObject.drive = $('#selectDrivetrain')[0].value;
    }

    // Check if a 'model' was entered.
    if($('#inputModel')[0].value != '') {
        getObject.model = $('#inputModel')[0].value;
    } else {
        delete getObject.model;
    }

    // Check if a 'from year' was entered.
    if($('#inputFromYear')[0].value != '') {
        getObject.yearFrom = $('#inputFromYear')[0].value;
    } else {
        delete getObject.yearFrom;
    }

    // Check if a 'to year' was entered.
    if($('#inputToYear')[0].value != '') {
        getObject.yearTo = $('#inputToYear')[0].value;
    } else {
        delete getObject.yearTo;
    }

    // Check if a 'from price' was entered.
    if($('#inputFromPrice')[0].value != '') {
        getObject.priceFrom = $('#inputFromPrice')[0].value;
    } else {
        delete getObject.priceFrom;
    }

    // Check if a 'to price' was entered.
    if($('#inputToPrice')[0].value != '') {
        getObject.priceTo = $('#inputToPrice')[0].value;
    } else {
        delete getObject.priceTo;
    }

    // Check if a 'from mileage' was entered.
    if($('#inputFromMileage')[0].value != '') {
        getObject.mileageFrom = $('#inputFromMileage')[0].value;
    } else {
        delete getObject.mileageFrom;
    }

    // Check if a 'to mileage' was entered.
    if($('#inputToMileage')[0].value != '') {
        getObject.mileageTo = $('#inputToMileage')[0].value;
    } else {
        delete getObject.mileageTo;
    }

    // Run the ajax get request.
    get();
});

function get() {
    $.ajax({
        url: 'api/inventory',
        method: 'GET',
        data: getObject,
        success: function(data) {

            // Clear the current table.
            $('tbody').empty();

            // Output the data into the table.
            $.each(data, function(index, value) {
                $('tbody').append($('<tr>').attr('id', value.id)
                    .append($('<td>').text(value.make))
                    .append($('<td>').text(value.model))
                    .append($('<td>').text(value.year))
                    .append($('<td>').text("$"+value.price))
                    .append($('<td>').text(value.color))
                    .append($('<td>').text(value.mileage))
                    .append($('<td>').text(value.type))
                    .append($('<td>').text(value.transmission))
                    .append($('<td>').text(value.drive))
                    .append($('<td><div class=\"d-flex\"><button id=\"editBtn\" class=\"mx-2 btn btn-sm btn-outline-primary\" onclick=\"editRow(this)\"><i class=\"fas fa-pencil-alt\"></i></span></button><button id=\"deleteBtn\" class=\"mx-2 btn btn-sm btn-outline-danger\" onclick=\"deleteRow(this)\"><i class=\"fas fa-trash-alt\"></i></span></button></div></td>'))
                    
                );
            })
        }
    });
}

function post() {
    $.ajax({
        url: 'api/inventory',
        method: 'POST',
        data: postObject
    });
}

function getDistinctMake() {
    $.ajax({
        url: 'api/inventory',
        method: 'GET',
        data: {distinctMake: '1'},
        success: function(data) {
            // Fill the 'make' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectMake').append("<option value=\""+value.make+"\">"+value.make+"</option>");
            });
        }
    });
}

function getDistinctColor() {
    $.ajax({
        url: 'api/inventory',
        method: 'GET',
        data: {distinctColor: '1'},
        success: function(data) {
            // Fill the 'color' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectColor').append("<option value=\""+value.color+"\">"+value.color+"</option>");
            });
        }
    });
}

function getDistinctType() {
    $.ajax({
        url: 'api/inventory',
        method: 'GET',
        data: {distinctType: '1'},
        success: function(data) {
            // Fill the 'type' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectType').append("<option value=\""+value.type+"\">"+value.type+"</option>");
            });
        }
    });
}

function getDistinctTransmission() {
    $.ajax({
        url: 'api/inventory',
        method: 'GET',
        data: {distinctTransmission: '1'},
        success: function(data) {
            // Fill the 'transmission' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectTransmission').append("<option value=\""+value.transmission+"\">"+value.transmission+"</option>");
            });
        }
    });
}

function getDistinctType() {
    $.ajax({
        url: 'api/inventory',
        method: 'GET',
        data: {distinctType: '1'},
        success: function(data) {
            // Fill the 'type' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectType').append("<option value=\""+value.type+"\">"+value.type+"</option>");
            });
        }
    });
}

function getDistinctDrivetrain() {
    $.ajax({
        url: 'api/inventory',
        method: 'GET',
        data: {distinctDrivetrain: '1'},
        success: function(data) {
            // Fill the 'drive' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectDrivetrain').append("<option value=\""+value.drive+"\">"+value.drive+"</option>");
            });
        }
    });
}