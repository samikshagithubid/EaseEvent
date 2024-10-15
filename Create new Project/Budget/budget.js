// Function to enable editing on hover and blur events
function makeItemEditable(item) {
    const priceElement = item.querySelector('.price');

    item.addEventListener('mouseenter', () => {
        priceElement.contentEditable = true; // Make price editable
        priceElement.focus(); // Focus on the price
        priceElement.style.backgroundColor = 'lightyellow'; // Highlight when editing
    });

    priceElement.addEventListener('blur', () => {
        const enteredPrice = priceElement.textContent.replace('₹', '').trim();
        if (!isNaN(enteredPrice) && enteredPrice !== '') {
            const itemName = item.querySelector('span').textContent.trim();
            localStorage.setItem(itemName, enteredPrice); // Save price to localStorage
            priceElement.textContent = `₹${parseFloat(enteredPrice).toFixed(2)}`; // Format as currency
        } else {
            priceElement.textContent = '₹0.00'; // Reset to default if invalid
        }
        priceElement.contentEditable = false; // Disable editing after focus lost
        priceElement.style.backgroundColor = ''; // Remove highlight
    });

    // Add event listener for click to allow editing
    priceElement.addEventListener('click', () => {
        priceElement.contentEditable = true; // Make price editable
        priceElement.focus(); // Focus on the price
        priceElement.style.backgroundColor = 'lightyellow'; // Highlight when editing
    });
}

// Function to delete an item
function deleteItem(event) {
    event.preventDefault();
    const item = event.target.closest('.item');
    const itemName = item.querySelector('span').textContent.trim();

    if (item) {
        item.remove(); // Remove the item from the DOM
        localStorage.removeItem(itemName); // Remove from localStorage
    }
}
// Function to add new item
function addNewItem(event) {
    event.preventDefault();

    const newItem = document.createElement('div');
    newItem.classList.add('item');

    // Create delete button with Font Awesome icon
    const deleteButton = document.createElement('a');
    deleteButton.href = "#";
    deleteButton.classList.add('delete-item');
    
    // Add Font Awesome icon
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Use trash icon

    deleteButton.addEventListener('click', deleteItem); // Attach delete event listener

    // Create editable item and price
    const itemName = document.createElement('span');
    itemName.contentEditable = true;
    itemName.textContent = "New Item";

    const priceElement = document.createElement('span');
    priceElement.classList.add('price');
    priceElement.textContent = "₹0.00";

    // Append delete button, item name, and price to the new item
    newItem.appendChild(itemName); // Add item name first
    newItem.appendChild(deleteButton); // Add delete button next
    newItem.appendChild(priceElement); // Add price last

    // Insert new item before the add new item link
    const category = event.target.closest('.category');
    category.insertBefore(newItem, event.target); // Insert the new item before the add new item link

    // Make the new item editable
    makeItemEditable(newItem);
}

// Hover effect to allow editing price for existing items
const items = document.querySelectorAll('.item');
items.forEach(item => {
    const itemKey = item.innerText.trim();
    const savedPrice = localStorage.getItem(itemKey);
    if (savedPrice) {
        item.querySelector('.price').textContent = `₹${parseFloat(savedPrice).toFixed(2)}`;
    }
    makeItemEditable(item);
});

// Add new item functionality
const addItemButtons = document.querySelectorAll('.add-item');
addItemButtons.forEach(button => {
    button.addEventListener('click', addNewItem);
});

// Set value functionality
const setValueButton = document.querySelector('.set-value');
const budgetValueDisplay = document.querySelector('.budget-value span');

setValueButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newBudget = prompt("Enter your budget:");
    if (!isNaN(newBudget) && newBudget !== '' && newBudget >= 0) {
        localStorage.setItem('budget', newBudget); // Save budget to localStorage
        budgetValueDisplay.textContent = `₹${parseFloat(newBudget).toFixed(2)}`; // Update displayed budget
    } else {
        alert("Please enter a valid number.");
    }
});

// Load initial budget from localStorage if it exists
const savedBudget = localStorage.getItem('budget');
if (savedBudget) {
    budgetValueDisplay.textContent = `₹${parseFloat(savedBudget).toFixed(2)}`; // Set initial budget display
}



// Add new category functionality
document.getElementById('add-category-btn').addEventListener('click', function(event) {
    event.preventDefault();
    const categoryInput = document.querySelector('.category-input');
    const categoryName = categoryInput.value.trim();

    if (categoryName) {
        const newCategory = document.createElement('div');
        newCategory.classList.add('category');
        newCategory.innerHTML = `
            <h4>${categoryName}</h4>
            <div class="item-container">
                <!-- New items will be added here -->
            </div>
            <a href="#" class="add-item">+ Add New Item</a>
            <a href="#" class="deleteitem1">- Delete Item</a>
        `;

        // Insert the new category above the add-category div
        const addCategoryDiv = document.querySelector('.add-category');
        addCategoryDiv.parentNode.insertBefore(newCategory, addCategoryDiv);

        // Clear the input
        categoryInput.value = '';

        // Add event listeners for the new add item and delete item buttons
        newCategory.querySelector('.add-item').addEventListener('click', addNewItem);
        newCategory.querySelector('.deleteitem1').addEventListener('click', deleteItem);
    } else {
        alert("Please enter a category name.");
    }
});
