
const search = document.getElementById('search');
const price = document.getElementById('price');
const qoldiq = document.getElementById('qoldiq');
const cards = document.getElementById('cards');
let card = [];

async function getCard() {
    try {
        const javob = await fetch("https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/webstore");
        if (!javob.ok) throw new Error("Failed to fetch data");
        card = await javob.json();
        cardView(card);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// search.addEventListener("input", () => {
//     const searchTerm = search.value.toLowerCase();
//     const filteredCards = card.filter(item => item.name.toLowerCase().includes(searchTerm));
//     cardView(filteredCards);
// });

// qoldiq.addEventListener("input", () => {
//     const stockLimit = parseInt(qoldiq.value, 10);
//     const filteredCards = card.filter(item => item.stock <= stockLimit);
//     cardView(filteredCards);
// });

// price.addEventListener("input", () => {
//     const priceLimit = parseFloat(price.value);
//     const filteredCards = card.filter(item => item.price <= priceLimit);
//     cardView(filteredCards);
// });


function cardView(data) {
    if (!Array.isArray(data)) {
        console.error("Data is not an array");
        return;
    }

    cards.innerHTML = "";
    data.forEach(e => {
        const div = document.createElement("div");
        div.setAttribute("data-id", e.id);
        div.innerHTML = `
        <div class="card" data-aos="flip-down">
            <img src="${e.image}" alt="" width="200">
            <h1>${e.name}</h1>
            <hr>
            <p class="text">${e.description}</p>
            <h2>Price: <span><b>${e.price}</b> $</span></h2>
            <button class="buy-btn" id="buy">Buy</button>
            <span class="stock" id="qoldi" title="Stock">${e.stock}</span>
        </div>
        `;

        const buyB = div.querySelector('.buy-btn');
        buyB.addEventListener('click', async () => {
            if (e.stock > 0) {
                e.stock--;
                await updateStock(e.id, e.stock);
                div.querySelector('.stock').textContent = e.stock;
            } else {
                alert("Bu tavardan boshqa qolmadi !!");
            }
        });

        cards.appendChild(div);
    });
}

search.addEventListener("input", () => {
    const inp = search.value.toLowerCase();
    card.filter(e =>
        e.name.toLowerCase().includes(search.value.toLowerCase().trim())
    );
    cardView(inp);
});


async function updateStock(id, stock) {
    await fetch(`https://676a7c4f863eaa5ac0de89cf.mockapi.io/api/first/webstore/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock }),
    });
}

getCard();   //--------------------------->>>>






// async function fetchA() {
//     const response = await fetch('https://fakestoreapi.com/products');
//     prod = await response.json();
//     display(prod);
// }

// n1.addEventListener("change", () => {
//     if (n1.value === "Barchasi") {
//         display(prod);
//     } else {
//         const filtered = prod.filter(e => e.category.toLowerCase().includes(n1.value.toLowerCase()));
//         display(filtered);
//     }
// });

// n2.addEventListener("change", () => {
//     let qilingan = [];
//     if (n2.value === "↓") {
//         qilingan = [...prod].sort((a, b) => a.price - b.price);
//     } else if (n2.value === "↑") {
//         qilingan = [...prod].sort((a, b) => b.price - a.price);
//     } else {
//         qilingan = prod;
//     }
//     display(qilingan);
// });

// inp.addEventListener("input", () => {
//     const res = prod.filter(e =>
//         e.title.toLowerCase().includes(inp.value.toLowerCase().trim())
//     );
//     display(res);
// });

// function display(prod) {
//     const cardsContainer = document.getElementById('cards');
//     cardsContainer.innerHTML = '';
//     prod.forEach(data => {
//         const card = document.createElement('div');
//         card.className = 'card';
//         card.innerHTML = `
//             <img src="${data.image}" alt="${data.title}" width="200">
//             <h2>${data.title}</h2>
//             <p>Kategoriya: ${data.category}</p>
//             <h4>Narxi: ${data.price}</h4>
//         `;
//         cardsContainer.appendChild(card);
//     });
// }

// setTimeout(fetchA(), 2000);




// const arr = [
//     {
//         id: 'myChart2',
//         type: 'line',
//         cordlar: [0,10,10,35,30,26,35,40,75,55,60,65]
//     },
//     { id: 'myChart3',
//         type: 'doughnut',
//         cordlar: [14, 9, 9, 6, 10, 5] },
// ];
// const lable = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Decabr'];

// arr.forEach(data => {
//     const ctx = document.getElementById(data.id);
//     new Chart(ctx, {
//         type: data.type,
//         data: {
//             labels: lable,
//             datasets: [{
//                 label: 'Sotilgan',
//                 data: data.cordlar,
//                 borderWidth: 1,
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     display: false,
//                     position: 'top'
//                 }
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// });
