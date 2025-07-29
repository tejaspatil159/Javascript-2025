let nameField = document.getElementById('name');
let inputForm = document.getElementById('inputForm')
let tableBody = document.getElementById('tableBody');
let required = document.querySelector('required');
let deleteBut = document.querySelector('deleteBut');
let editBut = document.querySelector('editBut')
let submitBut = document.querySelector('#submitBut')
let filterField = document.querySelector('#filter');

let items = []
let filterItems = []

inputForm.addEventListener('submit', submitForm)

nameField.addEventListener('keyup', checkFormValidation)

tableBody.addEventListener('click', buttonClick)

filterField.addEventListener('input', filterList)

function submitForm(e) {
    e.preventDefault()

    if (tableBody.children.length > 0) {
        if (nameField.value !== '') {
            tableBody.innerHTML = ''
        }
    }
    if (nameField.value !== '') {
        items.push(nameField.value)
        updateTable(true, false, false)

        if (submitBut.innerText === 'Update') {
            submitBut.innerText = 'Submit'
        }
    } else {
        AddValidationMessage()
    }
}

function updateTable(action, disable, isFilteration) {
    let item = isFilteration ? filterItems : items
    for (let i = 0; i < item.length; i++) {
        let tr = document.createElement('tr')
        tableBody.appendChild(tr)
        updateValue(tr, i, item[i], disable)
    }
    if (action) {
        clearField()
    }
}

function updateValue(tr, index, item, disable) {
    let tdOfSrNo = document.createElement('td')
    tdOfSrNo.classList = "tdItems"

    tdOfSrNo.appendChild(document.createTextNode(index + 1))

    let tdOfName = document.createElement('td')
    tdOfName.classList = "tdItems "

    tdOfName.setAttribute('title', item)
    tdOfName.appendChild(document.createTextNode(item))

    let tdOfAction = document.createElement('td')
    tdOfAction.classList = "tdItems text-truncate"

    let editBut = document.createElement('button')
    editBut.classList = 'editBut bg-success text-white border-0 px-2 mx-2'

    editBut.appendChild(document.createTextNode('Edit'))
    tdOfAction.appendChild(editBut)

    let closeBut = document.createElement('button')
    closeBut.classList = 'deleteBut bg-danger text-white border-0 px-2'

    closeBut.appendChild(document.createTextNode('X'))
    tdOfAction.appendChild(closeBut)




    tr.appendChild(tdOfSrNo)
    tr.appendChild(tdOfName)
    tr.appendChild(tdOfAction)

    if (disable) {
        editBut.setAttribute('disabled', '')
        closeBut.setAttribute('disabled', '')
    }





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

function buttonClick(e) {
    let but = e.target
    if (but.classList.contains('deleteBut')) {
        let tr = e.target.parentElement.parentElement;
        if (confirm('Do you want to delete this record?')) {
            tableBody.removeChild(tr)
            items.splice(items.indexOf((e.target.parentElement.previousSibling).innerText), 1)

            tableBody.innerHTML = ''

            updateTable(true, false, false);
        }
    }

    if (but.classList.contains('editBut')) {
        let tr = e.target.parentElement.parentElement;
        nameField.value = (e.target.parentElement.previousSibling).innerText
        tableBody.removeChild(tr)
        items.splice(items.indexOf((e.target.parentElement.previousSibling).innerText), 1)

        tableBody.innerHTML = ''

        updateTable(false, true, false);
        submitBut.innerText = 'Update'
    }
}

// function removeRow(e) {
//     let tr = e.target.parentElement.parentElement;
//     if (e.target.classList.contains('deleteBut')) {
//         if (confirm('Do you want to delete this record?')) {
//             tableBody.removeChild(tr)
//             items.splice(items.indexOf((e.target.parentElement.previousSibling).innerText), 1)

//             tableBody.innerHTML = ''

//             updateTable(true, false);
//         }
//     }
//     // else {
//     //     tableBody.removeChild(tr)
//     //     items.splice(items.indexOf((e.target.parentElement.previousSibling).innerText), 1)

//     //     tableBody.innerHTML = ''

//     //     updateTable();
//     // }
// }

// function editElement(e) {
//     nameField.value = (e.target.parentElement.previousSibling).innerText
//     removeRow(e)
// }

function filterList(e) {
    let filterValue = e.target.value;
    if (filterValue) {
        filterItems = items.filter(a => a.toLowerCase().includes(filterValue.toLowerCase()))

        tableBody.innerHTML = ''
        updateTable(false, false, true)
    } else {
        tableBody.innerHTML = ''
        updateTable(false, false, false)
    }

}
