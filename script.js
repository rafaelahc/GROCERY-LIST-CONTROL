
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

// const formatter = new Intl.NumberFormat('pt-PT', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
// });

// const formatNumber = (number) => formatter.format(number);

function currencyFormat(value) {
    return value.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseCurrencyValue(value) {
    return parseFloat(value).toFixed(2); // Arredonda para duas casas decimais
}

const validateInputsAndPushArray = () => {
    const value = parseFloat(inputAddNewValue.value.replace(',', '.'));

    if (inputAddNewDescription.value !== "" && !isNaN(value)) {
        const newItem =
        {
            desc: inputAddNewDescription.value,
            value: value
        }
    
        arrayItems.push(newItem);   
        return true;

    } else {
        return false;
    }   

    
}


const listItems = () => {
    containerList.innerHTML = " ";
    arrayItems.forEach(items => {
        let newListItems = document.createElement('div');
        newListItems.classList.add('card-list-items');

        newListItems.innerHTML = `
            <input type="text" class="description" value="${items.desc}" readonly>
            <span class="currency">€</span>
            <input type="text" class="value" value="${currencyFormat(items.value)}" readonly>
            <div class="btn-group">
                <button onclick="deleteItem('${arrayItems.indexOf(items)}')" class="btn-delete"><i class="fa-solid fa-circle-xmark"></i></button>
            </div>
        `
        containerList.appendChild(newListItems);        

        updateTotal();
    })
    containerList.scrollTop = containerList.scrollHeight;
}

let total = 0;

const updateTotal = () => {
    total = 0;
    arrayItems.forEach(item => {
        console.log(item);
        total += item.value
    });

    totalDisplay.value = currencyFormat(total);
}


const addItemsToList = () => {
    
    let result = validateInputsAndPushArray();
    if (result === true) {

        setStorage();
        listItems();
        inputAddNewDescription.value = '';
        inputAddNewValue.value = ''; 
    } else {
        if (inputAddNewDescription.value !== "") {
            return inputAddNewValue.focus();
        }
        return inputAddNewDescription.focus();
        
    }
      
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