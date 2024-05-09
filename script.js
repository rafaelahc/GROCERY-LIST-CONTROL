
/* Container da lista */
const containerList = document.querySelector('.list-items');


/* Total */
const totalDisplay = document.querySelector('.total-display');


/* Button add */
const btnAdd = document.querySelector('.btn-add');


/* list items */
const listDescription = document.querySelector('.description');
const listValue = document.querySelector('.value');


/* Inputs description and values from new list */
const inputAddNewDescription = document.querySelector('#input-add-description');
const inputAddNewValue = document.querySelector('#input-add-value');


/* Array list items */
let arrayItems = [];

/* __________________________________________________________________________________ */

/* FUNÇÕES */
const validateInputsAndPushArray = () => {
    if (inputAddNewDescription.value.trim() === "" && inputAddNewValue.value.trim() === "") {
       return inputAddNewDescription.focus();
    }

    const newItem =
    {
        desc: inputAddNewDescription.value,
        value: parseFloat(inputAddNewValue.value).toFixed(2)
    }

    arrayItems.push(newItem);
}

const listItems = () => {
    containerList.innerHTML = " ";
    arrayItems.forEach(items => {
        let newListItems = document.createElement('div');
        newListItems.classList.add('card-list-items');

        newListItems.innerHTML = `
            <input type="text" class="description" value="${items.desc}" readonly>
            <span class="currency">€</span>
            <input type="text" class="value" value="${items.value}" readonly>
            <div class="btn-group">
                <button onclick="deleteItem('${arrayItems.indexOf(items)}')" class="btn-delete"><i class="fa-regular fa-circle-xmark"></i></button>
            </div>
        `
        containerList.appendChild(newListItems);        

        updateTotal();
    })

}

let total = 0;

const updateTotal = () => {
    total = 0;
    arrayItems.forEach(item => {
        total += parseFloat(item.value);
    });

    totalDisplay.value = parseFloat(total).toFixed(2);
}


const addItemsToList = () => {
    validateInputsAndPushArray();
    listItems();
    setStorage();
    inputAddNewDescription.value = '';
    inputAddNewValue.value = '';       
}

const deleteItem = (index) => {
    arrayItems.splice(index, 1);
    setStorage();
    removeStorage();
    listItems();
    updateTotal();
}

btnAdd.addEventListener('click', addItemsToList);

/* LOCAL STORAGE */

const setStorage = () => {
    localStorage.setItem('itemsDB', JSON.stringify(arrayItems));
}

const getStorage = () => {
    const items = localStorage.getItem('itemsDB'); 

    if (items) {
       arrayItems = JSON.parse(items);
       listItems();
    }
}


const removeStorage = () => {
    localStorage.removeItem('itemsDB');
}


getStorage();