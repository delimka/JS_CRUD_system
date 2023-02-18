

function getShipment () {
  return  JSON.parse(localStorage.getItem("shipments")) || [];
}

// Filling the table with rows

function createTable(data) {
    var table = document.getElementById("table__data");


    table.innerHTML = "";

    for (var i = 0; i < data.length; i++) {

        var row = `<tr data-id='${data[i].id}'>
                            <th>${data[i].orderNo}</th>
                            <th>${moment(data[i].date).format('MM/D/YYYY')}</th>
                            <th>${data[i].customer}</th>
                            <th>${data[i].trackingNo}</th>
                            <th>${data[i].status}</th>
                            <th>${data[i].consignee}</th>
                            <th>
          <button id='btnEditId_${i}' class='btn btn-info' onclick='showEditRow(${data[i].id}, this)'>Edit</button>
         <button id='btnViewId_${i}' class='btn btn-info' onclick='showEditRow(${data[i].id}, this)'>View</button>
        <button id='btnDeleteId_${i}' class='btn btn-danger'  onclick='deleteRow(${i})'>Delete</button>
        </th>
      </tr>`;

        table.innerHTML += row;
    }
}


// 3. Delete func
function deleteRow(index) {
    var result = confirm("Want to delete?");
    let data = getShipment();
    if(result)
    {
        data.splice(index, 1);


        localStorage.setItem("shipments", JSON.stringify(data));


        createTable(data);
    }

}

    /* 4. Edit or View particular row from the table*/

function showEditRow(id, buttonElement) {

    getShipment();

// Find the shipment with the given id
    let index = parseInt(buttonElement.id.split("_")[1]);
    let shipmentToEdit = originalData[index];

    if (shipmentToEdit) {
// Hide the table
        document.getElementById("full_table").style.display = "none";
        document.getElementById("add_shipment").style.display = "none";
        document.getElementById("search_container").style.display = "none";
// Show the form
        document.getElementById("form").style.display = "block";
// Set the values of the form fields
        let orderNoo = document.getElementById("orderNo");
            orderNoo.value = shipmentToEdit.orderNo;
        let datee = document.getElementById("date");
            datee.value = shipmentToEdit.date;
        let customerr = document.getElementById("customer");
            customerr.value = shipmentToEdit.customer;
        let trackingNoo = document.getElementById('trackingNo');
            trackingNoo.value = shipmentToEdit.trackingNo;
        let statuss = document.getElementById('status');
            statuss.value = shipmentToEdit.status;
        let consigneee = document.getElementById('consignee');
            consigneee.value = shipmentToEdit.consignee;


        // Determine if the form should be in edit or view mode
        let formMode = buttonElement.id.includes("btnEditId") ? "edit" : "view";

        if (formMode === "edit") {
            orderNoo.disabled = true;
            datee.disabled = true;
            customerr.disabled = false;
            trackingNoo.disabled = false;
            statuss.disabled = false;
            consigneee.disabled = false;


        }
    }
}

function saveEdit(){
    try {
       getShipment()
        // Get the id of the shipment to be edited
        let orderNo = document.getElementById("orderNo").value;
        // Find the shipment with the given id
        let shipmentIndex = originalData.findIndex(shipment => shipment.orderNo === orderNo);

        if (shipmentIndex === -1) {
            throw new Error("Shipment not found.");
        }
        // Update the shipment values with the values from the form
        originalData[shipmentIndex].customer = document.getElementById("customer").value;
        originalData[shipmentIndex].trackingNo = document.getElementById("trackingNo").value;
        originalData[shipmentIndex].status = document.getElementById("status").value;
        originalData[shipmentIndex].consignee = document.getElementById("consignee").value;
        // Save the updated data back to local storage
        localStorage.setItem("shipments", JSON.stringify(originalData));

        document.getElementById("form").style.display = "none";

        document.getElementById("full_table").style.display = "block";
    } catch (error) {
        console.error(error);
        alert("An error occurred while saving the shipment. Please try again later.");
    }
}


function cancelEdit() {
    // Hide the form
    document.getElementById("form").style.display = "none";
    // Show the table
    document.getElementById("full_table").style.display = "block";

}


// Generate random orderNo

function genOrderNo() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let orderNo = "";
    for (let i = 0; i < 2; i++) {
        orderNo += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    orderNo += "-";
    for (let i = 0; i < 6; i++) {
        orderNo += Math.floor(Math.random() * 10);
    }
    orderNo += "-";
    for (let i = 0; i < 8; i++) {
        orderNo += Math.floor(Math.random() * 10);
    }
    orderNo += "-";
    for (let i = 0; i < 8; i++) {
        orderNo += Math.floor(Math.random() * 10);
    }
    return orderNo;
}



// Add function
function addShipment() {

    let orderNo = genOrderNo();
    document.getElementById("addOrderNo").value = orderNo;

    // This function checks if the generated order number already exists in the originalData array
    const orderNos = originalData.map((shipment) => shipment.orderNo);
    if (orderNos.includes(orderNo)) {

        return genOrderNo();
    } else {

        orderNo = genOrderNo();
    }


    const date = document.getElementById("addDate").value;
    const customer = document.getElementById("addCustomer").value;
    const trackingNo = document.getElementById("addTrackingNo").value;
    const status = document.getElementById("addStatus").value;
    const consignee = document.getElementById("addConsignee").value;

    if ( !date || !customer || !trackingNo || !status || !consignee) {
        alert("All fields are required.");
        return
    }


    // Create a new shipment object with the data
    const newShipment = {
        orderNo: orderNo,
        date: date,
        customer: customer,
        trackingNo: trackingNo,
        status: status,
        consignee: consignee
    };


        originalData.unshift(newShipment);
        localStorage.setItem("shipments", JSON.stringify(originalData));
        createTable(originalData);


        document.getElementById("addDate").value = '';
        document.getElementById("addCustomer").value = '';
        document.getElementById("addTrackingNo").value = '';
        document.getElementById("addStatus").value = '';
        document.getElementById("addConsignee").value = '';


}

