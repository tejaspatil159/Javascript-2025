let nameField = document.getElementById('name');
let tableBody = document.getElementById('tableBody');
let srNo = 0
let required = document.querySelector('required');

document.addEventListener('submit', submitForm)

document.addEventListener('keyup', checkFormValidation)

function submitForm(e) {
    e.preventDefault()
    if (nameField.value !== '') {
        addToTable()
    } else {
        AddValidationMessage()
    }
}

function addToTable() {
    srNo += 1;
    let tr = document.createElement('tr')

    let tdOfSrNo = document.createElement('td')
    tdOfSrNo.classList = "tdItems"

    tdOfSrNo.appendChild(document.createTextNode(srNo))

    let tdOfName = document.createElement('td')
    tdOfName.classList = "tdItems"

    tdOfName.appendChild(document.createTextNode(nameField.value))

    let tdOfAction = document.createElement('td')
    tdOfAction.classList = "tdItems"



    tr.appendChild(tdOfSrNo)
    tr.appendChild(tdOfName)
    tr.appendChild(tdOfAction)

    tableBody.appendChild(tr)

    clearField()

}

function clearField() {
    nameField.value = ''
}

function AddValidationMessage() {

    nameField.style.border = '1px solid red';
    const nextSibling = nameField.nextElementSibling
    if (nextSibling && nextSibling.classList('required')) {
        return
    } else {
        let p = document.createElement('p')
        p.classList = 'required'
        p.appendChild(document.createTextNode("Name is Required"))
        nameField.after(p)
    }

}

function removeValidationMessage() {
    nameField.style.border = ''
    nameField.nextElementSibling.remove()
}

function checkFormValidation() {
    if (nameField.value !== '') {
        removeValidationMessage();
    } else {
        AddValidationMessage()
    }
}

