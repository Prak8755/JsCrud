let data = JSON.parse(localStorage.getItem("data")) || [];

const table = document.querySelector(".data_table");
const updateBtn = document.querySelector(".updateBtn");
const addBtn = document.querySelector(".addBtn");

//to add or create  and validation for if product already exist using filter method
// function createData() {
//   const productName = document.querySelector("#productName").value;
//   const productQty = document.querySelector("#productQty").value;

//   if (
//     productName === "" ||
//     productQty === "" ||
//     productQty === "Tap to Change quantity"
//   ) {
//     if (productName === "") {
//       alert("Please enter Product name ");
//       return;
//     }
//     if (productQty === "Tap to Change quantity") {
//       alert("Please enter quantity first");
//       return;
//     }
//   } else {
//     let filterArr = data.filter(
//       (data) => data.productName.toLowerCase() === productName.toLowerCase()
//     );
//     if (filterArr.length > 0) {
//       alert("oops you have added same product , add quantity instead");
//       return;
//     } else {
//       let newObj = { productName: productName, qty: productQty };
//       data.push(newObj);
//       localStorage.setItem("data", JSON.stringify(data));
//       showData();
//       document.querySelector("#productName").value = "";
//       document.querySelector("#productQty").value = "Tap to Change quantity";

//       document.querySelector(".addMsg").classList.remove("hidden");
//       setTimeout(() => {
//         document.querySelector(".addMsg").classList.add("hidden");
//       }, 2000);
//     }
//   }
// }

//to show data on initial page load



//validation for checking if product already exist with findIndex method
function createData() {
  const productName = document.querySelector("#productName").value;
  const productQty = document.querySelector("#productQty").value;

  if (
    productName === "" ||
    productQty === "" ||
    productQty === "Tap to Change quantity"
  ) {
    if (productName === "") {
      alert("Please enter Product name ");
      return;
    }
    if (productQty === "Tap to Change quantity") {
      alert("Please enter quantity first");
      return;
    }
  } else {
    let index = data.findIndex(
      (product) =>
        product.productName.toLowerCase() === productName.toLowerCase()
    );
    if (index >= 0) {
      alert("oops product already added , change quantity instead");
      return;
    }

    let newObj = { productName: productName, qty: productQty };
    data.push(newObj);
    localStorage.setItem("data", JSON.stringify(data));
    showData();
    document.querySelector("#productName").value = "";
    document.querySelector("#productQty").value = "Tap to Change quantity";

    document.querySelector(".addMsg").classList.remove("hidden");
    setTimeout(() => {
      document.querySelector(".addMsg").classList.add("hidden");
    }, 2000);
  }
}

function showData() {
  let html = "";
  data.map(
    (e, i) =>
      (html += `<tr>
        <td>${i + 1}</td>
        <td>${e.productName}</td>
        <td>${e.qty}</td>
        
        <td class='d-flex gap-4'><button class='btn btn-secondary' onclick='handleEdit(${i})'>Edit</button><button class=' btn btn-danger' onclick='handleDlt(${i})'>Delete</button></td>
        </tr>`)
  );

  table.innerHTML = html;
}
showData();
//this key is to update product when edit btn  is clicked then it will be passed to update function
let key;

//to edit functionality
function handleEdit(id) {
  key = id;
  const currProduct = data[id];
  const { productName, qty } = currProduct;

  document.querySelector("#productName").value = productName;
  document.querySelector("#productQty").value = qty;

  addBtn.classList.add("hidden");

  updateBtn.classList.remove("hidden");
}

//to delete product
function handleDlt(id) {
  data.splice(id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  showData();
}

//to update product
function updateData(e) {
  const productName = document.querySelector("#productName").value;
  const qty = document.querySelector("#productQty").value;

  if (productName === "" || qty === "" || qty === "Tap to Change quantity") {
    if (productName === "") {
      alert("Please enter Product name ");
      return;
    }
    if (qty === "Tap to Change quantity") {
      alert("Please enter quantity first");
      return;
    }
  }

  let newObj = { productName: productName, qty: qty };
  data[key] = newObj;
  localStorage.setItem("data", JSON.stringify(data));
  showData();
  document.querySelector("#productName").value = "";
  document.querySelector("#productQty").value = "Tap to Change quantity";
  addBtn.classList.remove("hidden");
  updateBtn.classList.add("hidden");

  document.querySelector(".updateMsg").classList.remove("hidden");
  setTimeout(() => {
    document.querySelector(".updateMsg").classList.add("hidden");
  }, 2000);
}

