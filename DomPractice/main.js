let nameField = document.getElementById('name');
let inputForm = document.getElementById('inputForm')
let tableBody = document.getElementById('tableBody');
let srNo = 0
let required = document.querySelector('required');
let deleteBut = document.querySelector('deleteBut');

let items = []

inputForm.addEventListener('submit', submitForm)

nameField.addEventListener('keyup', checkFormValidation)

tableBody.addEventListener('click', removeRow)

function submitForm(e) {
    e.preventDefault()

    if (tableBody.children.length > 0) {
        tableBody.innerHTML = ''
    }
    if (nameField.value !== '') {
        items.push(nameField.value)
        updateTable()
    } else {
        AddValidationMessage()
    }
}

function updateTable() {
    for (let i = 0; i < items.length; i++) {
        let tr = document.createElement('tr')
        tableBody.appendChild(tr)
        updateValue(tr, items[i])
    }
    clearField()
}

function updateValue(tr, item) {

    let tdOfSrNo = document.createElement('td')
    tdOfSrNo.classList = "tdItems"

    tdOfSrNo.appendChild(document.createTextNode(items.indexOf(item) + 1))

    let tdOfName = document.createElement('td')
    tdOfName.classList = "tdItems "

    tdOfName.appendChild(document.createTextNode(item))

    let tdOfAction = document.createElement('td')
    tdOfAction.classList = "tdItems text-truncate"

    let closeBut = document.createElement('button')
    closeBut.classList = 'deleteBut bg-danger text-white border-0 px-2'

    closeBut.appendChild(document.createTextNode('X'))
    tdOfAction.appendChild(closeBut)



    tr.appendChild(tdOfSrNo)
    tr.appendChild(tdOfName)
    tr.appendChild(tdOfAction)




    // let tr = document.createElement('tr')
    // let tdOfSrNo = document.createElement('td')
    // let tdOfName = document.createElement('td')
    // let tdOfAction = document.createElement('td')
    // tableBody.appendChild(tr)
    // for (let i = 0; i < items.length; i++) {

    //     tdOfSrNo.classList = "tdItems"

    //     tdOfSrNo.appendChild(document.createTextNode(items.length))




    //     tdOfName.classList = "tdItems"

    //     tdOfName.appendChild(document.createTextNode(items[i]))




    //     tdOfAction.classList = "tdItems text-truncate"

    //     let closeBut = document.createElement('button')
    //     closeBut.classList = 'deleteBut bg-danger text-white border-0 px-2'

    //     closeBut.appendChild(document.createTextNode('X'))
    //     tdOfAction.appendChild(closeBut)



    // }
    // tr.appendChild(tdOfSrNo)
    // tr.appendChild(tdOfName)
    // tr.appendChild(tdOfAction)
    // clearField()


}

function clearField() {
    nameField.value = ''
}

function AddValidationMessage() {
    nameField.style.border = '1px solid red';
    const nextSibling = nameField.nextElementSibling
    if (nextSibling && nextSibling.classList.contains('required')) {
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
    const nextSibling = nameField.nextElementSibling
    if (nextSibling && nextSibling.classList.contains('required')) {
        nameField.nextElementSibling.remove()
    }
}

function checkFormValidation() {
    if (nameField.value !== '') {
        removeValidationMessage();
    } else {
        AddValidationMessage()
    }
}

function removeRow(e) {
    if (e.target.classList.contains('deleteBut')) {
        if (confirm('Do you want to delete the record?')) {
            let tr = e.target.parentElement.parentElement;
            tableBody.removeChild(tr)
            items.splice(1, 1)


            if (tableBody.children.length > 0) {
                tableBody.innerHTML = ''
            }
            updateTable();
        }
    }
}

