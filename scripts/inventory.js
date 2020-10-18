// Constants
const TIMER_DELAY = 1000;

// Empty objects to fill with form data used in the ajax request.
var getObject = {};
var postObject = {};
var deleteObject = {};

/*********************** Add new vehical - Button event ***********************/
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
/************************************ END *************************************/

/****************** Add vehical modal - Submit button event *******************/
$('#addVehicalModalSubmit').click(function(event) {

    // Prevent the defualt form behavior.
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

    // If the form is completely filled out, submit it.
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

        // Submit the data the the ajax post method.
        post();

        // Update the table.
        window.setTimeout(get, TIMER_DELAY);

        // Close the modal from.
        $('#newVehicalModal').modal('hide');
    }
});
/************************************ END *************************************/

/************** Add new vehical modal - Form validation functions **************
*  Purpose: For each of the form's inputs, on keyup, check that data has been  *
*           entered. If data exist, remove the invalid Bootstrap class from    *
*           the input.                                                         *
*******************************************************************************/

// Make.
$('#addNewMake').keyup(function() {
    if($('#addNewMake')[0].value != "") {
        $('#addNewMake').removeClass("is-invalid");
    }
});

// Model.
$('#addNewModel').keyup(function() {
    if($('#addNewModel')[0].value != "") {
        $('#addNewModel').removeClass("is-invalid");
    }
});

// Year.
$('#addNewYear').keyup(function() {
    if($('#addNewYear')[0].value != "") {
        $('#addNewYear').removeClass("is-invalid");
    }
});

// Price.
$('#addNewPrice').keyup(function() {
    if($('#addNewPrice')[0].value != "") {
        $('#addNewPrice').removeClass("is-invalid");
    }
});

// Color.
$('#addNewColor').keyup(function() {
    if($('#addNewColor')[0].value != "") {
        $('#addNewColor').removeClass("is-invalid");
    }
});

// Mileage.
$('#addNewMileage').keyup(function() {
    if($('#addNewMileage')[0].value != "") {
        $('#addNewMileage').removeClass("is-invalid");
    }
});

// Vehical type.
$('#addNewType').keyup(function() {
    if($('#addNewType')[0].value != "") {
        $('#addNewType').removeClass("is-invalid");
    }
});

// Transmission.
$('#addNewTransmission').keyup(function() {
    if($('#addNewTransmission')[0].value != "") {
        $('#addNewTransmission').removeClass("is-invalid");
    }
});

// Drivetrain.
$('#addNewDrivetrain').keyup(function() {
    if($('#addNewDrivetrain')[0].value != "") {
        $('#addNewDrivetrain').removeClass("is-invalid");
    }
});
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function builds the delete vehical modal. It creates the  *
*          'Are you sure' message and adds an click event to the submit   *
*          button. The click event passes the id for the row to the ajax  *
*          delete method.                                                 *
*                                                                         *
* Inputs:  Id for the item that has been selected for deletion.           *
*                                                                         *
* Output:  None.                                                          *
**************************************************************************/
function deleteRow(row) {
    $('#deleteModalMessage').text($(row).closest('tr')[0].cells[4].innerText+", "+$(row).closest('tr')[0].cells[2].innerText+" "+$(row).closest('tr')[0].cells[0].innerText+" "+$(row).closest('tr')[0].cells[1].innerText);
    // $(row).closest('tr').attr('id')

    $('#deleteVehicalModalSubmit').click(function() {

        // Call the delete ajax function, pass in the row's id.
        deleteVehical($(row).closest('tr').attr('id'));

        // Close the modal from.
        $('#deleteVehicalModal').modal('hide');

        // Update the table.
        window.setTimeout(get, TIMER_DELAY);
    });
}
/************************************ END *************************************/

function editRow(row) {
    console.log($(row).closest('tr')[0].cells[0].innerText);
}

/********************** Search form - Clear button event ***********************/
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
/************************************ END *************************************/

/********************* Search form - Search button event **********************/
$('#searchBtn').click(function(event) {

    // Prevent the defualt form behavior.
    event.preventDefault();

    // Check what form data was filled in. Then, build the 'data' object for the ajax request based on that.

    // Check if a 'make' was selected.
    if($('#selectMake')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectMake')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'make' from the object
        delete getObject.make;
    } else {
        // If a 'make' was selected, add 'make' to the object to be used in the ajax 'data'.
        getObject.make = $('#selectMake')[0].value;
    }

    // Check if a 'color' was selected.
    if($('#selectColor')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectColor')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'color' from the object
        delete getObject.color;
    } else {
        // If a 'color' was selected, add 'color' to the object to be used in the ajax 'data'.
        getObject.color = $('#selectColor')[0].value;
    }

    // Check if a 'vehical type' was selected.
    if($('#selectType')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectType')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'type' from the object
        delete getObject.type;
    } else {
        // If a 'type' was selected, add 'type' to the object to be used in the ajax 'data'.
        getObject.type = $('#selectType')[0].value;
    }

    // Check if a 'transmission' was selected.
    if($('#selectTransmission')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectTransmission')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'transmission' from the object
        delete getObject.transmission;
    } else {
        // If a 'transmission' was selected, add 'transmission' to the object to be used in the ajax 'data'.
        getObject.transmission = $('#selectTransmission')[0].value;
    }

    // Check if a 'drivetrain' was selected.
    if($('#selectDrivetrain')[0].value == 'undefined') {
        console.log("Undefined");
    } else if($('#selectDrivetrain')[0].value == 'All') {
        // If 'All' is selected in the form, delete 'drivetrain' from the object
        delete getObject.drive;
    } else {
        // If a 'drivetrain' was selected, add 'drivetrain' to the object to be used in the ajax 'data'.
        getObject.drive = $('#selectDrivetrain')[0].value;
    }

    // Check if a 'model' was entered.
    if($('#inputModel')[0].value != '') {
        // If data is entered, add that data to the getObject for the ajax method.
        getObject.model = $('#inputModel')[0].value;
    } else {
        // If no data is entered, delete any existing data for that paramater in the object.
        delete getObject.model;
    }

    // Check if a 'from year' was entered.
    if($('#inputFromYear')[0].value != '') {
        // If data is entered, add that data to the getObject for the ajax method.
        getObject.yearFrom = $('#inputFromYear')[0].value;
    } else {
        // If no data is entered, delete any existing data for that paramater in the object.
        delete getObject.yearFrom;
    }

    // Check if a 'to year' was entered.
    if($('#inputToYear')[0].value != '') {
        // If data is entered, add that data to the getObject for the ajax method.
        getObject.yearTo = $('#inputToYear')[0].value;
    } else {
        // If no data is entered, delete any existing data for that paramater in the object.
        delete getObject.yearTo;
    }

    // Check if a 'from price' was entered.
    if($('#inputFromPrice')[0].value != '') {
        // If data is entered, add that data to the getObject for the ajax method.
        getObject.priceFrom = $('#inputFromPrice')[0].value;
    } else {
        // If no data is entered, delete any existing data for that paramater in the object.
        delete getObject.priceFrom;
    }

    // Check if a 'to price' was entered.
    if($('#inputToPrice')[0].value != '') {
        // If data is entered, add that data to the getObject for the ajax method.
        getObject.priceTo = $('#inputToPrice')[0].value;
    } else {
        // If no data is entered, delete any existing data for that paramater in the object.
        delete getObject.priceTo;
    }

    // Check if a 'from mileage' was entered.
    if($('#inputFromMileage')[0].value != '') {
        // If data is entered, add that data to the getObject for the ajax method.
        getObject.mileageFrom = $('#inputFromMileage')[0].value;
    } else {
        // If no data is entered, delete any existing data for that paramater in the object.
        delete getObject.mileageFrom;
    }

    // Check if a 'to mileage' was entered.
    if($('#inputToMileage')[0].value != '') {
        // If data is entered, add that data to the getObject for the ajax method.
        getObject.mileageTo = $('#inputToMileage')[0].value;
    } else {
        // If no data is entered, delete any existing data for that paramater in the object.
        delete getObject.mileageTo;
    }

    // Run the ajax get request.
    get();
});
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles all ajax get request. Upon success,      *
*          build the html table body from data in the returned json       *
*          object                                                         *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the html table body.                                    *
**************************************************************************/
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
                    .append($('<td><div class=\"d-flex\"><button id=\"editBtn\" class=\"mx-2 btn btn-sm btn-outline-primary\" data-toggle=\"modal\" data-target=\"#editVehicalModal\" onclick=\"editRow(this)\"><i class=\"fas fa-pencil-alt\"></i></span></button><button id=\"deleteBtn\" class=\"mx-2 btn btn-sm btn-outline-danger\" data-toggle=\"modal\" data-target=\"#deleteVehicalModal\" onclick=\"deleteRow(this)\"><i class=\"fas fa-trash-alt\"></i></span></button></div></td>'))
                    
                );
            })
        }
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles all ajax post request.                   *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  None.                                                          *
**************************************************************************/
function post() {
    $.ajax({
        url: 'api/inventory',
        method: 'POST',
        data: postObject
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles ajax delete request. It takes the id for *
*          the row that will be deleted.                                  *
*                                                                         *
* Inputs:  Id.                                                            *
*                                                                         *
* Output:  None.                                                          *
**************************************************************************/
function deleteVehical(id) {
    $.ajax({
        url: 'api/inventory/?id='+id,
        method: 'DELETE'
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehical  *
*          makes. The returned data is used to build the search form's    *
*          select dropdown for vehical makes.                             *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehical makes.           *
**************************************************************************/
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
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehical  *
*          models. The returned data is used to build the search form's   *
*          select dropdown for vehical models.                            *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehical models.          *
**************************************************************************/
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
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehical  *
*          types. The returned data is used to build the search form's    *
*          select dropdown for vehical types.                             *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehical types.           *
**************************************************************************/
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
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehical  *
*          transmissions. The returned data is used to build the search   *
*          form's select dropdown for vehical transmissions.              *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehical transmissions.   *
**************************************************************************/
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
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehical  *
*          types. The returned data is used to build the search form's    *
*          select dropdown for vehical types.                             *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehical types.           *
**************************************************************************/
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
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehical  *
*          drivetrains. The returned data is used to build the search     *
           form's select dropdown for vehical drivetrains.                *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehical drivetrains.     *
**************************************************************************/
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
/************************************ END *************************************/