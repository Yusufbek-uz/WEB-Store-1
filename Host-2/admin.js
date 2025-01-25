const API_URL = "https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/webstore";

async function fetchProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    renderProducts(products);
}

function renderProducts(products) {
    const tableBody = document.getElementById("product-table-body");
    tableBody.innerHTML = "";
    products.forEach(product => {
        const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td><img src="${product.image}" alt="${product.name}" width="50" height="50"></td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>$${product.price}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                        </td>
                    </tr>
                `;
        tableBody.innerHTML += row;
    });
}

async function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);
    const image = document.getElementById("image").value;

    const newProduct = { name, description, price, stock, image };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    });

    fetchProducts();
    document.getElementById("addProductForm").reset();
}

async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
}

async function editProduct(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();
    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
    document.getElementById("image").value = product.image;

    await deleteProduct(id);
}

document.getElementById("addProductForm").addEventListener("submit", addProduct);
fetchProducts();




async function arrCh(products) {
    const arr = [
        {
            id: 'myChart1',
            type: 'bar',
            cord: [8, 10, 5, 7, 6, 4]
        },
    ];
}



// async function chart() {
//     const response = await fetch(API_URL);
//     const products = await response.json();

//     products.forEach(data => {
//         const ctx = document.getElementById(data.id);
//         new Chart(ctx, {
//             type: data.bar,
//             data: {
//                 labels: data.name,
//                 datasets: [{
//                     label: 'Stock',
//                     data: data.stock,
//                     borderWidth: 1,
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         display: false,
//                         position: 'top'
//                     }
//                 },
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });
//     });
// }

async function chart() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const products = await response.json();

        const dataArray = Array.isArray(products) ? products : [products];
        const labels = dataArray.map(product => product.name);
        const stockData = dataArray.map(product => product.stock);

        let ctx = document.getElementById('chart');
        if (!ctx) {
            const canvas = document.createElement('canvas');
            canvas.id = 'chart';
            document.body.appendChild(canvas);
            ctx = canvas;
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Stock',
                    data: stockData,
                    borderWidth: 1,
                    backgroundColor: '#106b65ea',
                    borderColor: '#156963',
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

chart();


const arr = [
    {
        id: 'myChart2',
        type: 'line',
        cordlar: [0, 10, 10, 35, 30, 26, 35, 40, 75, 55, 60, 65]
    },
];
const lable = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Decabr'];

arr.forEach(data => {
    const ctx = document.getElementById(data.id);
    new Chart(ctx, {
        type: data.type,
        data: {
            labels: lable,
            datasets: [{
                label: 'Sotilgan',
                data: data.cordlar,
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});