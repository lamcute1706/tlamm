// API URL
const apiUrl = "https://6717a745b910c6a6e0294dfb.mockapi.io/api/v1/Hotel";


// ========================
// GET DATA
// ========================

function getProducts(callback) {

fetch(apiUrl)

.then(response => response.json())

.then(data => callback(null, data))

.catch(error => callback(error, null));

}


// ========================
// SHOW DATA
// ========================

function handleProducts(error, data) {

if (error) {

console.error("Lỗi khi lấy dữ liệu:", error);

}

else {

const productTableBody = document.getElementById("productTableBody");

productTableBody.innerHTML = "";

data.forEach(product => {

const row = `

<tr class="text-center align-middle">

<td>${product.id}</td>

<td>${product.name}</td>

<td>
<img src="${product.img}" style="width:80px">
</td>

<td>${product.description}</td>

<td>${product.location}</td>

<td>${product.bookingdate}</td>

<td>$${product.price}</td>

<td>

<button onclick="deleteHotel(${product.id})" class="btn btn-danger btn-sm">
Delete
</button>

</td>

</tr>

`;

productTableBody.innerHTML += row;

});

}

}


// ========================
// ADD DATA
// ========================

function addHotelToAPI(hotelData, callback) {

fetch(apiUrl, {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify(hotelData)

})

.then(response => response.json())

.then(data => callback(null, data))

.catch(error => callback(error, null));

}


// CLICK CREATE

document.getElementById("addHotel").addEventListener("click", function () {

const newHotel = {

name: "Demo Hotel",

img: "https://picsum.photos/200",

description: "Hotel demo",

location: "Da Nang",

bookingdate: "2026-03-12",

price: 100

};

addHotelToAPI(newHotel, handleAddHotel);

});


function handleAddHotel(error, data) {

if (error) {

console.error("Lỗi khi thêm:", error);

}

else {

console.log("Thêm thành công:", data);

getProducts(handleProducts);

}

}


// ========================
// DELETE DATA
// ========================

function deleteHotelFromAPI(id, callback) {

fetch(apiUrl + "/" + id, {

method: "DELETE"

})

.then(response => response.json())

.then(data => callback(null, data))

.catch(error => callback(error, null));

}


function deleteHotel(id) {

if (confirm("Bạn có chắc muốn xóa?")) {

deleteHotelFromAPI(id, handleDeleteHotel);

}

}


function handleDeleteHotel(error, data) {

if (error) {

console.error("Lỗi khi xóa:", error);

}

else {

console.log("Xóa thành công");

getProducts(handleProducts);

}

}


// ========================
// LOAD DATA
// ========================

getProducts(handleProducts);