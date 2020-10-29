// Empty objects to fill with form data used in the ajax request.
var getObject = {};
var postObject = {};
var editObject = {};
var currentData = {};

// Variable to store the selected table row's key id value.
var id;

// Variable to hold the created url to be used by ajax.
var url = "";

// Booleans to handle the ORDER BY functionality of the table.
var orderByMakeFlag = 1;
var orderByModelFlag = 1;
var orderByYearFlag = 1;
var orderByPriceFlag = 1;
var orderByColorFlag = 1;
var orderByMileageFlag = 1;
var orderByTypeFlag = 1;
var orderByTransmissionFlag = 1;
var orderByDriveFlag = 1;

$(document).ready(function() {
    // Monitor the screen size inorder to show/hide the search bar.
    if($(window).width() >= 992) {
        $('#collapseBtn').hide();
        $('#collapseCard').collapse('show');
    } else {
        $('#collapseBtn').show();
        $('#collapseCard').collapse('hide');
    };

    $(window).resize(function() {
        if($(window).width() > 976) {
            $('#collapseBtn').hide();
            $('#collapseCard').collapse('show');
        } else {
            $('#collapseBtn').show();
            // Bug on smart phones.
            // $('#collapseCard').collapse('hide'); 
        }
    });
});

/*********************** Add new vehicle - Button event ***********************/
$('#addNewVehicle').click(function() {

    // Clear any existing form data.
    $('#addNewMake')[0].value = "";
    $('#addNewModel')[0].value = "";
    $('#addNewYear')[0].value = "";
    $('#addNewPrice')[0].value = "";
    $('#addNewColor')[0].value = "";
    $('#addNewMileage')[0].value = "";
    $('#addNewType')[0].value = "";

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

/****************** Add vehicle modal - Submit button event *******************/
$('#addVehicleModalSubmit').click(function(event) {

    // Prevent the defualt form behavior.
    event.preventDefault();

    // Check the form for valid data.
    if($('#addNewMake').val() == "") {
        $('#addNewMake').addClass("is-invalid");
    }
    if($('#addNewModel').val() == "") {
        $('#addNewModel').addClass("is-invalid");
    }
    if($('#addNewYear').val().length != 4) {
        $('#addNewYear').addClass("is-invalid");
    }
    if($('#addNewPrice').val() == "") {
        $('#addNewPrice').addClass("is-invalid");
    }
    if($('#addNewColor').val() == "") {
        $('#addNewColor').addClass("is-invalid");
    }
    if($('#addNewMileage').val() == "") {
        $('#addNewMileage').addClass("is-invalid");
    }
    if($('#addNewType').val() == "") {
        $('#addNewType').addClass("is-invalid");
    }
    if($('#addNewTransmission').val() == "") {
        $('#addNewTransmission').addClass("is-invalid");
    }
    if($('#addNewDrivetrain').val() == "") {
        $('#addNewDrivetrain').addClass("is-invalid");
    }
    if($('#addNewDrivetrain').val() == "") {
        $('#addNewDrivetrain').addClass("is-invalid");
    }

    // If the form is completely filled out, submit it.
    if($('#addNewMake').val() != "" && $('#addNewModel').val() != "" && $('#addNewYear').val().length == 4 && $('#addNewPrice').val() != "" && $('#addNewColor').val() != "" && $('#addNewMileage').val() != "" && $('#addNewType').val() != "" && $('#addNewTransmission').val() != "" && $('#addNewDrivetrain').val() != "") {

        // Add the data to the JS object.
        postObject.make = $('#addNewMake').val().charAt(0).toUpperCase()+$('#addNewMake').val().slice(1);
        postObject.model = $('#addNewModel').val().charAt(0).toUpperCase()+$('#addNewModel').val().slice(1);
        postObject.year = $('#addNewYear').val();
        postObject.price = $('#addNewPrice').val();
        postObject.color = $('#addNewColor').val().charAt(0).toUpperCase()+$('#addNewColor').val().slice(1);
        postObject.mileage = $('#addNewMileage').val();
        postObject.type = $('#addNewType').val().charAt(0).toUpperCase()+$('#addNewType').val().slice(1);
        postObject.transmission = $('#addNewTransmission').val();
        postObject.drive = $('#addNewDrivetrain').val();

        // Submit the data the the ajax post method.
        post();

        // Close the modal from.
        $('#newVehicleModal').modal('hide');
    }
});
/************************************ END *************************************/

/************** Add new vehicle modal - Form validation functions **************
*  Purpose: For each of the form's inputs, on keyup, check that data has been  *
*           entered. If data exist, remove the invalid Bootstrap class from    *
*           the input.                                                         *
*******************************************************************************/

// Make.
$('#addNewMake').keyup(function() {
    if($('#addNewMake').val() != "") {
        $('#addNewMake').removeClass("is-invalid");
    }
});

// Model.
$('#addNewModel').keyup(function() {
    if($('#addNewModel').val() != "") {
        $('#addNewModel').removeClass("is-invalid");
    }
});

// Year.
$('#addNewYear').keyup(function() {
    if($('#addNewYear').val().length == 4) {
        $('#addNewYear').removeClass("is-invalid");
    }
});

// Price.
$('#addNewPrice').keyup(function() {
    if($('#addNewPrice').val() != "") {
        $('#addNewPrice').removeClass("is-invalid");
    }
});

// Color.
$('#addNewColor').keyup(function() {
    if($('#addNewColor').val() != "") {
        $('#addNewColor').removeClass("is-invalid");
    }
});

// Mileage.
$('#addNewMileage').keyup(function() {
    if($('#addNewMileage').val() != "") {
        $('#addNewMileage').removeClass("is-invalid");
    }
});

// Vehicle type.
$('#addNewType').keyup(function() {
    if($('#addNewType').val() != "") {
        $('#addNewType').removeClass("is-invalid");
    }
});

// Transmission.
$('#addNewTransmission').keyup(function() {
    if($('#addNewTransmission').val() != "") {
        $('#addNewTransmission').removeClass("is-invalid");
    }
});

// Drivetrain.
$('#addNewDrivetrain').keyup(function() {
    if($('#addNewDrivetrain').val() != "") {
        $('#addNewDrivetrain').removeClass("is-invalid");
    }
});
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function builds the delete vehicle modal. It creates the  *
*          'Are you sure' message and adds an click event to the submit   *
*          button. The click event passes the id for the row to the ajax  *
*          delete method.                                                 *
*                                                                         *
* Inputs:  Id for the item that has been selected for deletion.           *
*                                                                         *
* Output:  None.                                                          *
**************************************************************************/
function deleteRow(row) {
    
    // Create the modal 'Are you sure' message.
    $('#deleteModalMessage').text($(row).closest('tr')[0].cells[5].innerText+", "+$(row).closest('tr')[0].cells[3].innerText+" "+$(row).closest('tr')[0].cells[1].innerText+" "+$(row).closest('tr')[0].cells[2].innerText+".");

    // Take the row id and store it in a variable.
    id = $(row).closest('tr').attr('id');
}
/************************************ END *************************************/

/********************* Delete modal - Delete button event *********************/
$('#deleteVehicleModalSubmit').click(function() {

    // Call the delete ajax function, pass in the row's id.
    deleteVehicle(id);

    // Close the modal from.
    $('#deleteVehicleModal').modal('hide');
});
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function takes the data from the selected row and         *
*          populates the 'edit' modal form with the current data. It also *
*          takes the 'id' for the selected row and stores it in the 'id'  *
*          variable. The current data is then stored in the 'currentData' *
*          object that is used to compair new data against.               *
*                                                                         *
* Inputs:  Id for the item that has been selected for deletion.           *
*                                                                         *
* Output:  None.                                                          *
**************************************************************************/
function editRow(row) {

    // Clear any invalid warnings.
    $('#editMake').removeClass("is-invalid");
    $('#editModel').removeClass("is-invalid");
    $('#editYear').removeClass("is-invalid");
    $('#editPrice').removeClass("is-invalid");
    $('#editColor').removeClass("is-invalid");
    $('#editMileage').removeClass("is-invalid");
    $('#editType').removeClass("is-invalid");
    $('#editTransmission').removeClass("is-invalid");
    $('#editDrivetrain').removeClass("is-invalid");

    // Fill the form with the current data from the selected row.
    $('#editMake').val($(row).closest('tr')[0].cells[1].innerText);
    $('#editModel').val($(row).closest('tr')[0].cells[2].innerText);
    $('#editYear').val($(row).closest('tr')[0].cells[3].innerText);
    $('#editPrice').val($(row).closest('tr')[0].cells[4].innerText);
    $('#editColor').val($(row).closest('tr')[0].cells[5].innerText);
    $('#editMileage').val($(row).closest('tr')[0].cells[6].innerText);
    $('#editType').val($(row).closest('tr')[0].cells[7].innerText);
    $('#editTransmission').val($(row).closest('tr')[0].cells[8].innerText);
    $('#editDrivetrain').val($(row).closest('tr')[0].cells[9].innerText);

    // Take the row id and store it in a variable.
    id = $(row).closest('tr').attr('id');

    // Fill the object with the current data.
    currentData.make = $('#editMake').val();
    currentData.model = $('#editModel').val();
    currentData.year = $('#editYear').val();
    currentData.price = $('#editPrice').val();
    currentData.color = $('#editColor').val();
    currentData.mileage = $('#editMileage').val();
    currentData.type = $('#editType').val();
    currentData.transmission = $('#editTransmission').val();
    currentData.drive = $('#editDrivetrain').val();
}
/************************************ END *************************************/

/*************** Edit vehicle modal - Form validation functions ****************
*  Purpose: For each of the form's inputs, on keyup, check that data has been  *
*           entered. If data exist, remove the invalid Bootstrap class from    *
*           the input.                                                         *
*******************************************************************************/

// Make.
$('#editMake').keyup(function() {
    if($('#editMake').val() != "") {
        $('#editMake').removeClass("is-invalid");
    }
});

// Model.
$('#editModel').keyup(function() {
    if($('#editModel').val() != "") {
        $('#editModel').removeClass("is-invalid");
    }
});

// Year.
$('#editYear').keyup(function() {
    if($('#editYear').val().length != 4) {
        $('#editYear').removeClass("is-invalid");
    }
});

// Price.
$('#editPrice').keyup(function() {
    if($('#editPrice').val() != "") {
        $('#editPrice').removeClass("is-invalid");
    }
});

// Color.
$('#editColor').keyup(function() {
    if($('#editColor').val() != "") {
        $('#editColor').removeClass("is-invalid");
    }
});

// Mileage.
$('#editMileage').keyup(function() {
    if($('#editMileage').val() != "") {
        $('#editMileage').removeClass("is-invalid");
    }
});

// Vehicle type.
$('#editType').keyup(function() {
    if($('#editType').val() != "") {
        $('#editType').removeClass("is-invalid");
    }
});

// Transmission.
$('#editTransmission').keyup(function() {
    if($('#editTransmission').val() != "") {
        $('#editTransmission').removeClass("is-invalid");
    }
});

// Drivetrain.
$('#editDrivetrain').keyup(function() {
    if($('#editDrivetrain').val() != "") {
        $('#editDrivetrain').removeClass("is-invalid");
    }
});
/************************************ END *************************************/

/****************** Edit vehicle modal - Submit button event *******************/
$('#editVehicleModalSubmit').click(function(event) {

    // Prevent the defualt form behavior.
    event.preventDefault();

    // Check the form for valid data.
    if($('#editMake').val() == "") {
        $('#editMake').addClass("is-invalid");
    }
    if($('#editModel').val() == "") {
        $('#editModel').addClass("is-invalid");
    }
    if($('#editYear').val().length != 4) {
        $('#editYear').addClass("is-invalid");
    }
    if($('#editPrice').val() == "") {
        $('#editPrice').addClass("is-invalid");
    }
    if($('#editColor').val() == "") {
        $('#editColor').addClass("is-invalid");
    }
    if($('#editMileage').val() == "") {
        $('#editMileage').addClass("is-invalid");
    }
    if($('#editType').val() == "") {
        $('#editType').addClass("is-invalid");
    }
    if($('#editTransmission').val() == "") {
        $('#editTransmission').addClass("is-invalid");
    }
    if($('#editDrivetrain').val() == "") {
        $('#editDrivetrain').addClass("is-invalid");
    }

    // If the form is completely filled out, submit it.
    if($('#editMake').val() != "" && $('#editModel').val() != "" && $('#editYear').val().length == 4 && $('#editPrice').val() != "" && $('#editColor').val() != "" && $('#editMileage').val() != "" && $('#editType').val() != "" && $('#editTransmission').val() != "" && $('#editDrivetrain').val() != "") {

        // Add the 'id' to the editObject.
        editObject.id = id;

        // Determine which data has changed and add that to the editObject to be passed
        // to the ajax PUT method.
        if($('#editMake').val() != currentData.make) {
            editObject.make = $('#editMake').val().charAt(0).toUpperCase()+$('#editMake').val().slice(1);
        }
        if($('#editModel').val() != currentData.model) {
            editObject.model = $('#editModel').val().charAt(0).toUpperCase()+$('#editModel').val().slice(1);
        }
        if($('#editYear').val() != currentData.year) {
            // Remove all non-numeric characters from the string.
            editObject.year = $('#editYear').val().replace(/\D/g,'');
        }
        if($('#editPrice').val() != currentData.price) {
            // Remove all non-numeric characters from the string.
            editObject.price = $('#editPrice').val().replace(/\D/g,'');
        }
        if($('#editColor').val() != currentData.color) {
            editObject.color = $('#editColor').val().charAt(0).toUpperCase()+$('#editColor').val().slice(1);
        }
        if($('#editMileage').val() != currentData.mileage) {
            // Remove all non-numeric characters from the string.
            editObject.mileage = $('#editMileage').val().replace(/\D/g,'');
        }
        if($('#editType').val() != currentData.type) {
            editObject.type = $('#editType').val().charAt(0).toUpperCase()+$('#editType').val().slice(1);
        }
        if($('#editTransmission').val() != currentData.transmission) {
            editObject.transmission = $('#editTransmission').val();
        }
        if($('#editDrivetrain').val() != currentData.drive) {
            editObject.drive = $('#editDrivetrain').val();
        }

        // Check that data has been changed before running the ajax PUT request.
        if(!$.isEmptyObject(editObject)) {

            // Submit the data the the ajax post method.
            put();

            // Clear the editObject.
            editObject = {};
        }

        // Close the modal from.
        $('#editVehicleModal').modal('hide');

    }
});
/************************************ END *************************************/

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

    // Check if a 'vehicle type' was selected.
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

/************************ ORDER BY table header buttons ************************
*  Purpose: The following click events handle the ORDER BY functionality of    *
*           the table header buttons.                                          *
*******************************************************************************/
// Reset order by.
$('#resetBtn').click(function(event) {

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

// Order by make.
$('#orderByMake').click(function() {

    // Toggle the boolean.
    orderByMakeFlag ^= 1;

    // Remove any prior 'order by' critiria from the getObject.
    if(getObject.hasOwnProperty('orderByModel')) {
        delete getObject.orderByModel;
    }
    if(getObject.hasOwnProperty('orderByYear')) {
        delete getObject.orderByYear;
    }
    if(getObject.hasOwnProperty('orderByPrice')) {
        delete getObject.orderByPrice;
    }
    if(getObject.hasOwnProperty('orderByColor')) {
        delete getObject.orderByColor;
    }
    if(getObject.hasOwnProperty('orderByMileage')) {
        delete getObject.orderByMileage;
    }
    if(getObject.hasOwnProperty('orderByType')) {
        delete getObject.orderByType;
    }
    if(getObject.hasOwnProperty('orderByTransmission')) {
        delete getObject.orderByTransmission;
    }
    if(getObject.hasOwnProperty('orderByDrive')) {
        delete getObject.orderByDrive;
    }

    // Reset all other 'order by' flags.
    orderByModelFlag = 1;
    orderByYearFlag = 1;
    orderByPriceFlag = 1;
    orderByColorFlag = 1;
    orderByMileageFlag = 1;
    orderByTypeFlag = 1;
    orderByTransmissionFlag = 1;
    orderByDriveFlag = 1;

    // Add the ORDER BY critiria to the GET object for ajax.
    getObject.orderByMake = orderByMakeFlag;

    // Reload the table.
    get();
});

// Order by model.
$('#orderByModel').click(function() {

    // Toggle the boolean.
    orderByModelFlag ^= 1;

    // Remove any prior 'order by' critiria from the getObject.
    if(getObject.hasOwnProperty('orderByMake')) {
        delete getObject.orderByMake;
    }
    if(getObject.hasOwnProperty('orderByYear')) {
        delete getObject.orderByYear;
    }
    if(getObject.hasOwnProperty('orderByPrice')) {
        delete getObject.orderByPrice;
    }
    if(getObject.hasOwnProperty('orderByColor')) {
        delete getObject.orderByColor;
    }
    if(getObject.hasOwnProperty('orderByMileage')) {
        delete getObject.orderByMileage;
    }
    if(getObject.hasOwnProperty('orderByType')) {
        delete getObject.orderByType;
    }
    if(getObject.hasOwnProperty('orderByTransmission')) {
        delete getObject.orderByTransmission;
    }
    if(getObject.hasOwnProperty('orderByDrive')) {
        delete getObject.orderByDrive;
    }

    // Reset all other 'order by' flags.
    orderByMakeFlag = 1;
    orderByYearFlag = 1;
    orderByPriceFlag = 1;
    orderByColorFlag = 1;
    orderByMileageFlag = 1;
    orderByTypeFlag = 1;
    orderByTransmissionFlag = 1;
    orderByDriveFlag = 1;

    // Add the ORDER BY critiria to the GET object for ajax.
    getObject.orderByModel = orderByModelFlag;

    // Reload the table.
    get();
});

// Order by year.
$('#orderByYear').click(function() {

    // Toggle the boolean.
    orderByYearFlag ^= 1;

    // Remove any prior 'order by' critiria from the getObject.
    if(getObject.hasOwnProperty('orderByMake')) {
        delete getObject.orderByMake;
    }
    if(getObject.hasOwnProperty('orderByModel')) {
        delete getObject.orderByModel;
    }
    if(getObject.hasOwnProperty('orderByPrice')) {
        delete getObject.orderByPrice;
    }
    if(getObject.hasOwnProperty('orderByColor')) {
        delete getObject.orderByColor;
    }
    if(getObject.hasOwnProperty('orderByMileage')) {
        delete getObject.orderByMileage;
    }
    if(getObject.hasOwnProperty('orderByType')) {
        delete getObject.orderByType;
    }
    if(getObject.hasOwnProperty('orderByTransmission')) {
        delete getObject.orderByTransmission;
    }
    if(getObject.hasOwnProperty('orderByDrive')) {
        delete getObject.orderByDrive;
    }

    // Reset all other 'order by' flags.
    orderByMakeFlag = 1;
    orderByModelFlag = 1;
    orderByPriceFlag = 1;
    orderByColorFlag = 1;
    orderByMileageFlag = 1;
    orderByTypeFlag = 1;
    orderByTransmissionFlag = 1;
    orderByDriveFlag = 1;

    // Add the ORDER BY critiria to the GET object for ajax.
    getObject.orderByYear = orderByYearFlag;

    // Reload the table.
    get();
});

// Order by price.
$('#orderByPrice').click(function() {

    // Toggle the boolean.
    orderByPriceFlag ^= 1;

    // Remove any prior 'order by' critiria from the getObject.
    if(getObject.hasOwnProperty('orderByMake')) {
        delete getObject.orderByMake;
    }
    if(getObject.hasOwnProperty('orderByModel')) {
        delete getObject.orderByModel;
    }
    if(getObject.hasOwnProperty('orderByYear')) {
        delete getObject.orderByYear;
    }
    if(getObject.hasOwnProperty('orderByColor')) {
        delete getObject.orderByColor;
    }
    if(getObject.hasOwnProperty('orderByMileage')) {
        delete getObject.orderByMileage;
    }
    if(getObject.hasOwnProperty('orderByType')) {
        delete getObject.orderByType;
    }
    if(getObject.hasOwnProperty('orderByTransmission')) {
        delete getObject.orderByTransmission;
    }
    if(getObject.hasOwnProperty('orderByDrive')) {
        delete getObject.orderByDrive;
    }

    // Reset all other 'order by' flags.
    orderByMakeFlag = 1;
    orderByModelFlag = 1;
    orderByYearFlag = 1;
    orderByColorFlag = 1;
    orderByMileageFlag = 1;
    orderByTypeFlag = 1;
    orderByTransmissionFlag = 1;
    orderByDriveFlag = 1;

    // Add the ORDER BY critiria to the GET object for ajax.
    getObject.orderByPrice = orderByPriceFlag;

    // Reload the table.
    get();
});

// Order by color.
$('#orderByColor').click(function() {

    // Toggle the boolean.
    orderByColorFlag ^= 1;

    // Remove any prior 'order by' critiria from the getObject.
    if(getObject.hasOwnProperty('orderByMake')) {
        delete getObject.orderByMake;
    }
    if(getObject.hasOwnProperty('orderByModel')) {
        delete getObject.orderByModel;
    }
    if(getObject.hasOwnProperty('orderByYear')) {
        delete getObject.orderByYear;
    }
    if(getObject.hasOwnProperty('orderByPrice')) {
        delete getObject.orderByPrice;
    }
    if(getObject.hasOwnProperty('orderByMileage')) {
        delete getObject.orderByMileage;
    }
    if(getObject.hasOwnProperty('orderByType')) {
        delete getObject.orderByType;
    }
    if(getObject.hasOwnProperty('orderByTransmission')) {
        delete getObject.orderByTransmission;
    }
    if(getObject.hasOwnProperty('orderByDrive')) {
        delete getObject.orderByDrive;
    }

    // Reset all other 'order by' flags.
    orderByMakeFlag = 1;
    orderByModelFlag = 1;
    orderByYearFlag = 1;
    orderByPriceFlag = 1;
    orderByMileageFlag = 1;
    orderByTypeFlag = 1;
    orderByTransmissionFlag = 1;
    orderByDriveFlag = 1;

    // Add the ORDER BY critiria to the GET object for ajax.
    getObject.orderByColor = orderByColorFlag;

    // Reload the table.
    get();
});

// Order by mileage.
$('#orderByMileage').click(function() {

    // Toggle the boolean.
    orderByMileageFlag ^= 1;

    // Remove any prior 'order by' critiria from the getObject.
    if(getObject.hasOwnProperty('orderByMake')) {
        delete getObject.orderByMake;
    }
    if(getObject.hasOwnProperty('orderByModel')) {
        delete getObject.orderByModel;
    }
    if(getObject.hasOwnProperty('orderByYear')) {
        delete getObject.orderByYear;
    }
    if(getObject.hasOwnProperty('orderByPrice')) {
        delete getObject.orderByPrice;
    }
    if(getObject.hasOwnProperty('orderByColor')) {
        delete getObject.orderByColor;
    }
    if(getObject.hasOwnProperty('orderByType')) {
        delete getObject.orderByType;
    }
    if(getObject.hasOwnProperty('orderByTransmission')) {
        delete getObject.orderByTransmission;
    }
    if(getObject.hasOwnProperty('orderByDrive')) {
        delete getObject.orderByDrive;
    }

    // Reset all other 'order by' flags.
    orderByMakeFlag = 1;
    orderByModelFlag = 1;
    orderByYearFlag = 1;
    orderByPriceFlag = 1;
    orderByColorFlag = 1;
    orderByTypeFlag = 1;
    orderByTransmissionFlag = 1;
    orderByDriveFlag = 1;

    // Add the ORDER BY critiria to the GET object for ajax.
    getObject.orderByMileage = orderByMileageFlag;

    // Reload the table.
    get();
});

// Order by type.
$('#orderByType').click(function() {

    // Toggle the boolean.
    orderByTypeFlag ^= 1;

    // Remove any prior 'order by' critiria from the getObject.
    if(getObject.hasOwnProperty('orderByMake')) {
        delete getObject.orderByMake;
    }
    if(getObject.hasOwnProperty('orderByModel')) {
        delete getObject.orderByModel;
    }
    if(getObject.hasOwnProperty('orderByYear')) {
        delete getObject.orderByYear;
    }
    if(getObject.hasOwnProperty('orderByPrice')) {
        delete getObject.orderByPrice;
    }
    if(getObject.hasOwnProperty('orderByColor')) {
        delete getObject.orderByColor;
    }
    if(getObject.hasOwnProperty('orderByMileage')) {
        delete getObject.orderByMileage;
    }
    if(getObject.hasOwnProperty('orderByTransmission')) {
        delete getObject.orderByTransmission;
    }
    if(getObject.hasOwnProperty('orderByDrive')) {
        delete getObject.orderByDrive;
    }

    // Reset all other 'order by' flags.
    orderByMakeFlag = 1;
    orderByModelFlag = 1;
    orderByYearFlag = 1;
    orderByPriceFlag = 1;
    orderByColorFlag = 1;
    orderByMileageFlag = 1;
    orderByTransmissionFlag = 1;
    orderByDriveFlag = 1;

    // Add the ORDER BY critiria to the GET object for ajax.
    getObject.orderByType = orderByTypeFlag;

    // Reload the table.
    get();
});

// Order by transmission.
$('#orderByTransmission').click(function() {

    // Toggle the boolean.
    orderByTransmissionFlag ^= 1;

    // Remove any prior 'order by' critiria from the getObject.
    if(getObject.hasOwnProperty('orderByMake')) {
        delete getObject.orderByMake;
    }
    if(getObject.hasOwnProperty('orderByModel')) {
        delete getObject.orderByModel;
    }
    if(getObject.hasOwnProperty('orderByYear')) {
        delete getObject.orderByYear;
    }
    if(getObject.hasOwnProperty('orderByPrice')) {
        delete getObject.orderByPrice;
    }
    if(getObject.hasOwnProperty('orderByColor')) {
        delete getObject.orderByColor;
    }
    if(getObject.hasOwnProperty('orderByMileage')) {
        delete getObject.orderByMileage;
    }
    if(getObject.hasOwnProperty('orderByType')) {
        delete getObject.orderByType;
    }
    if(getObject.hasOwnProperty('orderByDrive')) {
        delete getObject.orderByDrive;
    }

    // Reset all other 'order by' flags.
    orderByMakeFlag = 1;
    orderByModelFlag = 1;
    orderByYearFlag = 1;
    orderByPriceFlag = 1;
    orderByColorFlag = 1;
    orderByMileageFlag = 1;
    orderByTypeFlag = 1;
    orderByDriveFlag = 1;

    // Add the ORDER BY critiria to the GET object for ajax.
    getObject.orderByTransmission = orderByTransmissionFlag;

    // Reload the table.
    get();
});

// Order by drive.
$('#orderByDrive').click(function() {

    // Toggle the boolean.
    orderByDriveFlag ^= 1;

    // Remove any prior 'order by' critiria from the getObject.
    if(getObject.hasOwnProperty('orderByMake')) {
        delete getObject.orderByMake;
    }
    if(getObject.hasOwnProperty('orderByModel')) {
        delete getObject.orderByModel;
    }
    if(getObject.hasOwnProperty('orderByYear')) {
        delete getObject.orderByYear;
    }
    if(getObject.hasOwnProperty('orderByPrice')) {
        delete getObject.orderByPrice;
    }
    if(getObject.hasOwnProperty('orderByColor')) {
        delete getObject.orderByColor;
    }
    if(getObject.hasOwnProperty('orderByMileage')) {
        delete getObject.orderByMileage;
    }
    if(getObject.hasOwnProperty('orderByType')) {
        delete getObject.orderByType;
    }
    if(getObject.hasOwnProperty('orderByTransmission')) {
        delete getObject.orderByTransmission;
    }

    // Reset all other 'order by' flags.
    orderByMakeFlag = 1;
    orderByModelFlag = 1;
    orderByYearFlag = 1;
    orderByPriceFlag = 1;
    orderByColorFlag = 1;
    orderByMileageFlag = 1;
    orderByTypeFlag = 1;
    orderByTransmissionFlag = 1;

    // Add the ORDER BY critiria to the GET object for ajax.
    getObject.orderByDrive = orderByDriveFlag;

    // Reload the table.
    get();
});

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
        url: 'api/',
        method: 'GET',
        data: getObject,
        success: function(data) {
            // Log a message apon success.
            console.log("Items received from inventory.");

            // Clear the current table.
            $('tbody').empty();

            // Output the data into the table.
            $.each(data, function(index, value) {
                $('tbody').append($('<tr>').attr('id', value.id)
                    .append($('<td><div class=\"d-flex justify-content-center\"><button id=\"editBtn\" class=\"mx-2 btn btn-sm btn-outline-primary\" data-toggle=\"modal\" data-target=\"#editVehicleModal\" onclick=\"editRow(this)\"><i class=\"fas fa-pencil-alt\"></i></span></button><button id=\"deleteBtn\" class=\"mx-2 btn btn-sm btn-outline-danger\" data-toggle=\"modal\" data-target=\"#deleteVehicleModal\" onclick=\"deleteRow(this)\"><i class=\"fas fa-trash-alt\"></i></span></button></div></td>'))
                    .append($('<td>').text(value.make))
                    .append($('<td>').text(value.model))
                    .append($('<td>').text(value.year))
                    .append($('<td>').text("$"+parseInt(value.price).toLocaleString()))
                    .append($('<td>').text(value.color))
                    .append($('<td>').text(parseInt(value.mileage).toLocaleString()))
                    .append($('<td>').text(value.type))
                    .append($('<td>').text(value.transmission))
                    .append($('<td>').text(value.drive))
                );
            })
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Log any error messages.
            console.log(xhr.status);
            console.log(thrownError);
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
        url: 'api/',
        method: 'POST',
        data: postObject,
        success: function() {
            // Log a message apon success.
            console.log("Item added to inventory.");

            // Reload the search from's select dropdowns and the table body.
            reloadSelectDropdowns();
            get();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Log any error messages.
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles ajax put request. It takes the id for    *
*          the row that will be updated.                                  *
*                                                                         *
* Inputs:  Id.                                                            *
*                                                                         *
* Output:  None.                                                          *
**************************************************************************/
function put() {

    // Create a url for the ajax request.
    $.each(editObject, function(index, value) {
        if(index == 'id') {
            url += index+"="+value;
        } else {
            url += "&"+index+"="+value;
        }
    });

    $.ajax({
        url: 'api/?'+url,
        method: 'PUT',
        data: editObject,
        success: function() {
            // Log a message apon success.
            console.log("Item updated in inventory.");

            // Reload the search from's select dropdowns and the table body.
            reloadSelectDropdowns();
            get();

            // Clear the url string.
            url = "";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Log any error messages.
            console.log(xhr.status);
            console.log(thrownError);
        }
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
function deleteVehicle(id) {
    $.ajax({
        url: 'api/?id='+id,
        method: 'DELETE',
        success: function() {
            // Log a message apon success.
            console.log("Item deleted from inventory.");

            // Reload the search from's select dropdowns and the table body.
            reloadSelectDropdowns();
            get();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Log any error messages.
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehicle  *
*          makes. The returned data is used to build the search form's    *
*          select dropdown for vehicle makes.                             *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehicle makes.           *
**************************************************************************/
function getDistinctMake() {
    $.ajax({
        url: 'api/',
        method: 'GET',
        data: {distinctMake: '1'},
        success: function(data) {
            // Fill the 'make' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectMake').append("<option value=\""+value.make+"\">"+value.make+"</option>");
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Log any error messages.
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehicle  *
*          models. The returned data is used to build the search form's   *
*          select dropdown for vehicle models.                            *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehicle models.          *
**************************************************************************/
function getDistinctColor() {
    $.ajax({
        url: 'api/',
        method: 'GET',
        data: {distinctColor: '1'},
        success: function(data) {
            // Fill the 'color' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectColor').append("<option value=\""+value.color+"\">"+value.color+"</option>");
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Log any error messages.
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehicle  *
*          types. The returned data is used to build the search form's    *
*          select dropdown for vehicle types.                             *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehicle types.           *
**************************************************************************/
function getDistinctType() {
    $.ajax({
        url: 'api/',
        method: 'GET',
        data: {distinctType: '1'},
        success: function(data) {
            // Fill the 'type' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectType').append("<option value=\""+value.type+"\">"+value.type+"</option>");
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Log any error messages.
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehicle  *
*          transmissions. The returned data is used to build the search   *
*          form's select dropdown for vehicle transmissions.              *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehicle transmissions.   *
**************************************************************************/
function getDistinctTransmission() {
    $.ajax({
        url: 'api/',
        method: 'GET',
        data: {distinctTransmission: '1'},
        success: function(data) {
            // Fill the 'transmission' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectTransmission').append("<option value=\""+value.transmission+"\">"+value.transmission+"</option>");
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Log any error messages.
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function handles the ajax get request for unique vehicle  *
*          drivetrains. The returned data is used to build the search     *
*          form's select dropdown for vehicle drivetrains.                *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  Builds the search form's dropdown for vehicle drivetrains.     *
**************************************************************************/
function getDistinctDrivetrain() {
    $.ajax({
        url: 'api/',
        method: 'GET',
        data: {distinctDrivetrain: '1'},
        success: function(data) {
            // Fill the 'drivetrain' dropdown with results.
            $.each(data, function(index, value) {
                $('#selectDrivetrain').append("<option value=\""+value.drive+"\">"+value.drive+"</option>");
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Log any error messages.
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}
/************************************ END *************************************/

/**************************************************************************
* Purpose: This function will call all of the get distinct functions      *
*          inorder to repopulate the search form's select dropdowns.      *
*                                                                         *
* Inputs:  None.                                                          *
*                                                                         *
* Output:  None.                                                          *
**************************************************************************/
function reloadSelectDropdowns() {
    // Clear the current options from the select dropdowns.
    $('#selectMake').empty();
    $('#selectColor').empty();
    $('#selectType').empty();
    $('#selectTransmission').empty();
    $('#selectDrivetrain').empty();

    // Add the 'All' option to the select dropdowns.
    $('#selectMake').append("<option value=\"All\">All</option>");
    $('#selectColor').append("<option value=\"All\">All</option>");
    $('#selectType').append("<option value=\"All\">All</option>");
    $('#selectTransmission').append("<option value=\"All\">All</option>");
    $('#selectDrivetrain').append("<option value=\"All\">All</option>");

    // Call the get distinct ajax request.
    getDistinctMake();
    getDistinctColor();
    getDistinctType();
    getDistinctTransmission();
    getDistinctDrivetrain();
}
/************************************ END *************************************/