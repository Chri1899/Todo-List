let stateArr = {
    
}

const table = document.getElementById("data-table");
const todoBox = document.getElementById("todo");
const dateBox = document.getElementById("date");
const radioButtons = document.querySelectorAll("input[type='radio']");

window.addEventListener("load", loadData());


function loadData() {
    const getData = localStorage.getItem("data");
    if (getData == null) {
        console.log("empty");
        return;
    }
    
    stateArr = JSON.parse(getData);
    for (const key in stateArr) {
        createTableRow(stateArr[key], key)
    }
    console.log("loaded")
}

function saveData() {
    const stateJSON = JSON.stringify(stateArr);
    localStorage.setItem("data", stateJSON)
    console.log("saved")
}

function getTodo() {
    return todoBox.value;
}

function getDate() {
    return dateBox.value;
}

function getRadioValue() {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            return radioButton.value;
        }
    }
    return false;
}

function getRadioValue() {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            return radioButton.value;
        }
    }
    return false;
}

function handleInput() {
    if (getRadioValue() == false) {
        window.alert("Bitte wählen Sie einen Ort aus.");
        clearInputs();
        return;
    }

    if (getTodo() == "") {
        window.alert("Ungültige Eingabe.");
        clearInputs();
        return;
    }

    if (getDate() == "") {
        window.alert("Ungültiges Datum");
        clearInputs();
        return;
    }

    const tableIndex = table.rows.length;
    const dataObj = {
        "id": tableIndex,
        "todo": getTodo(),
        "date": getDate(),
        "place": getRadioValue(),
        "state": true
    }
    
    createTableRow(dataObj, tableIndex)
    stateArr[tableIndex] = dataObj;
    clearInputs();
}

function createTableRow(dataObj, tableIndex) {
    let newRow = table.insertRow()
    const newDataArray = Object.entries(dataObj)
    let i = 0
    for (const key in dataObj) {
        const newCell = newRow.insertCell(i);
        if (key == "state") {
            newCell.appendChild(addCheckButton(dataObj["id"]));
            newCell.appendChild(addDeleteButton(dataObj["id"]));
            if (dataObj[key] == false) {
                checkNote(dataObj["id"]);
            }
        } else {
            newCell.innerHTML = [dataObj[key]];
        }
        i++;
    }
}

function addCheckButton(rowIndex) {
    const checkButton = document.createElement("button");
    checkButton.setAttribute("onclick", "checkNote("+rowIndex+")");
    checkButton.setAttribute("class", "check-button");
    checkButton.innerHTML = "Check";
    return checkButton;
}

function addDeleteButton(rowIndex) {
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "deleteNote("+rowIndex+")");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.innerHTML = "Delete";
    return deleteButton;
}

function clearInputs() {
    todoBox.value = "";
    dateBox.value = ""
    for (const radioButton of radioButtons) {
        radioButton.checked = false;
    }
}

function checkNote(rowIndex) {
    const checkedRow = table.rows[rowIndex];
    const childs = checkedRow.childNodes;

    for (const child of childs) {
        if (!child.hasAttribute("class", "checked")) {
            child.setAttribute("class", "checked");
            if (child.childNodes.length == 2) {
                child.childNodes[0].innerHTML = "Uncheck";
                stateArr[rowIndex]["state"] = false;
            }
        } else {
            child.removeAttribute("class", "checked");
            if (child.childNodes.length == 2) {
                child.childNodes[0].innerHTML = "Check"
                stateArr[rowIndex]["state"] = true;
            }
        }
    }
}

function deleteNote(rowIndex) {
    table.deleteRow(rowIndex);
    delete stateArr[rowIndex];
}

