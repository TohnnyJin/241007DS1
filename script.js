import { products } from './data.js';

function createTable(products) {
    // Different elements
    const stock = document.querySelector('#stock');
    const searchValue = document.querySelector('#search').value.toLowerCase();

    // Remove the content of the table
    const table = document.querySelector("table");
    table.innerHTML = '';

    // Create name category
    const tableHead = document.createElement('tr');
    tableHead.innerHTML = `
        <th>Name</th>
        <th>Price</th>
    `;
    table.appendChild(tableHead);

    // Create product list
    products.forEach(item => {
        // The products start with the 
        if (item.name.toLowerCase().startsWith(searchValue)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}</td>
            `;
            // If the checkbox is checked, don't add out of stock products
            if (stock.checked && !item.stocked) {
            } else if (!item.stocked) { // If the product is out of stock, add a class to the row
                row.classList.add('out-of-stock');
                table.appendChild(row);
            } else {
                table.appendChild(row);
            }
        }
    });
}

// When the checkbox change, update the table
document.querySelector('#stock').addEventListener('change', () => {
    createTable(products);
});

// When the input change, update the table
document.querySelector('#search').addEventListener('input', () => {
    createTable(products);
});

// Create the table when the page loads
createTable(products);