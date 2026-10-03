//Function to load products from LocalStorage and display them in the table
function loadProductTable() {
    let products = JSON.parse(localStorage.getItem('products')) || []; //Search and found products from LocalStorage
    const tableBody = document.querySelector('#productsTable tbody');
    tableBody.innerHTML = ''; //Clear the table before adding new products
    document.getElementById('productCount').textContent = 'Productos registrados: ' + products.length;

    products.forEach((product, index) => {
        //Create a table row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td><button class="delete-btn" data-id="${product.id}">Delete</button></td>
        `;
        
        //Append the row to the table
        tableBody.appendChild(row);
    });

    //Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteProduct);
    });
}

// Function to add a new product
function addProduct() {
    const name = document.getElementById('name').value.trim();
    const price = parseFloat(document.getElementById('price').value);

    // Validate inputs
    if (!name || /\d/.test(name) || isNaN(price) || price <= 0) {
    alert("Please enter a valid name (without numbers) and price.");
    return;
    }

    //Create the new product with unique ID
    let products = JSON.parse(localStorage.getItem('products')) || []; // || [] is used to provide a default value in case the first part (localStorage.getItem('products')) returns null or undefined
    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1, // Assign an incremental ID
        name: name,
        price: price
    };

    //Add the new product to the products array
    products.push(newProduct);

    //Save the updated array (products) to LocalStorage
    localStorage.setItem('products', JSON.stringify(products));

    //Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';

    //Update the table with the new product
    loadProductTable();
}

//Function to delete a product
function deleteProduct(event) {
    const productId = parseInt(event.target.getAttribute('data-id')); // Get the product ID from the button's data attribute
    let products = JSON.parse(localStorage.getItem('products')) || [];

    //Filter out the product with the corresponding ID
    products = products.filter(product => product.id !== productId);

    // Save the updated list back to LocalStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Reload the product table to reflect changes
    loadProductTable();
}

//Event listener for the button click
document.getElementById('addProduct').addEventListener('click', addProduct);

//Load products when the page loads
loadProductTable();


// ===== Modo oscuro =====
const themeToggle = document.getElementById('themeToggle');

function applyTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
}

// Cargar la preferencia guardada al abrir la página
applyTheme(localStorage.getItem('theme') === 'dark');

// Cambiar de tema al hacer clic y guardar la preferencia
themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


document.getElementById('name').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[0-9]/g, '');
});

