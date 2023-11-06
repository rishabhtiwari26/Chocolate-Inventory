const form = document.getElementById('myForm');
form.addEventListener('submit', handleFormSubmission);

async function handleFormSubmission(event) {
    event.preventDefault();     
    const data = {
        itemName: getInputValue('item'),
        itemDescription: getInputValue('description'),
        itemPrice: getInputValue('price'),
        itemQuantity: getInputValue('quantity'),
    };

    try {
        
        await createItem(data);
        resetFormInputs();
        
    } catch (error) {
        
        console.error("Error creating a new item:", error);
    }
}


function getInputValue(inputId) {
    return document.getElementById(inputId).value;
}


async function createItem(itemData) {
    try {
        await axios.post('https://crudcrud.com/api/ed55cb22601c4a13a9c3bf519510ceb1/data', itemData);

        
        
    } catch (error) {
        
        throw new Error("Error creating a new item:", error);
    }
}


function resetFormInputs() {
    const inputIds = ['item', 'description', 'price', 'quantity'];
    inputIds.forEach((inputId) => {
        document.getElementById(inputId).value = '';
    });
}


window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('https://crudcrud.com/api/ed55cb22601c4a13a9c3bf519510ceb1/data');
        response.data.forEach((user) => {
            showUser(user);
        });
    } catch (error) {
        
        console.error("Error fetching existing items:", error);
    }
});


function showUser(user) {
    
    const listItem = document.createElement('li');
    const itemList = document.getElementById('itemList');
    itemList.appendChild(listItem);

    
    listItem.innerHTML = `${user.itemName} ${user.itemDescription} price:${user.itemPrice} quantity:${user.itemQuantity}`;

    
    createBuyButton(listItem, user, 1);
    createBuyButton(listItem, user, 2);
    createBuyButton(listItem, user, 3);
}


function createBuyButton(parentElement, user, quantity) {
    const button = document.createElement('button');
    button.innerHTML = `Buy ${quantity}`;
    parentElement.appendChild(button);

    button.addEventListener('click', async () => {
        try {
            await buy(user, quantity);
        } catch (error) {
            
            console.error("Error updating user data:", error);
        }
    });
}


async function buy(user, quantity) {
    user.itemQuantity = parseInt(user.itemQuantity) - parseInt(quantity);
    if (user.itemQuantity>0){
        try {
            const response = await axios.put(`https://crudcrud.com/api/ed55cb22601c4a13a9c3bf519510ceb1/data/${user._id}`, {
                itemName: user.itemName,
                itemDescription: user.itemDescription,
                itemPrice: user.itemPrice,
                itemQuantity: user.itemQuantity
            });
    
            
            function updateList(){}
        } catch (error) {
            
            console.error("Error updating user data:", error);
        }
    }
    else{
        console.error('Not in stock')
    }
    
}
