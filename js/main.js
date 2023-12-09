var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var searchInput = document.getElementById("search");

/* This is to get all input to deal with them{ONE SHOT} */
var inputReset = document.getElementsByClassName("form-control");

var addButton = document.getElementById("btnAdd");
var updateButton = document.getElementById("btnUpdate");

/* this Global variable will hole the row index of the array to update when needed */
var currentIndex = 0;

//Array to fill with the objects of products
var productArray = [];

//To retrieve the array in the table on the screen
/* JSON.parse to get the string from the local storage then reconvert it into  */
if (JSON.parse(localStorage.getItem("product") != null)) {
  productArray = JSON.parse(localStorage.getItem("product"));
  displayProduct();
}

//Main Function when I click th eadd button
addButton.onclick = function () {
  addProduct();
  displayProduct();
  resetInputtoNull();
};

updateButton.onclick = function () {
  updateProduct();
  displayProduct();
  resetInputtoNull();
};

//Collect the product data then push into the array
function addProduct() {
  var productDataCollection = {
    productName: productNameInput.value,
    productPrice: productPriceInput.value,
    productCategory: productCategoryInput.value,
    productDescription: productDescriptionInput.value,
  };
  productArray.push(productDataCollection);

  /* - after push the product in the array I need to store it in the local storage
     - thus we setItem in the local storage
     - to setItem I need a variable which is called "Key" ==> "productKey"
     - THE Problem is "local storage ONLY read the strings therfore I use "JSON.strigfy (productArray)"
  */
  localStorage.setItem("product", JSON.stringify(productArray));
}

//Diplay the objects of the array in the table
function displayProduct() {
  var tableRows = "";
  for (var i = 0; i < productArray.length; i++) {
    tableRows += `
    <tr>
        <td>${i + 1}</td>
        <td>${productArray[i].productName}</td>
        <td>${productArray[i].productPrice}</td>
        <td>${productArray[i].productCategory}</td>
        <td>${productArray[i].productDescription}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="retrieveProductInfo(${i})" class="btn btn-warning">Update</button></td>
    </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = tableRows;
}

//delet product from the array
function deleteProduct(index) {
  productArray.splice(index, 1);

  //update the localstorage
  localStorage.setItem("product", JSON.stringify(productArray));
  displayProduct(); //You have to call the function "display" again to display the updated table after deleting from the array
}

//Reset the inputs to Null to write again
function resetInputtoNull() {
  for (var i = 0; i < inputReset.length; i++) {
    inputReset[i].value = "";
  }
}

searchInput.onkeyup = function () {
  var tableRows = "";
  var val = searchInput.value;
  for (var i = 0; i < productArray.length; i++) {
    if (productArray[i].productName.toLowerCase().includes(val.toLowerCase())) {
      tableRows += `
    <tr>
        <td>${i + 1}</td>
        <td>${productArray[i].productName}</td>
        <td>${productArray[i].productPrice}</td>
        <td>${productArray[i].productCategory}</td>
        <td>${productArray[i].productDescription}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        <td><button class="btn btn-warning">Update</button></td>
    </tr>
    `;
    }
  }
  document.getElementById("tableBody").innerHTML = tableRows;
};

function retrieveProductInfo(indextoUpdate) {
  productName.value = productArray[indextoUpdate].productName;
  productPrice.value = productArray[indextoUpdate].productPrice;
  productCategory.value = productArray[indextoUpdate].productCategory;
  productDescription.value = productArray[indextoUpdate].productDescription;
  currentIndex = indextoUpdate;
}

function updateProduct() {
  var productDataCollection = {
    productName: productNameInput.value,
    productPrice: productPriceInput.value,
    productCategory: productCategoryInput.value,
    productDescription: productDescriptionInput.value,
  };
  productArray[currentIndex] = productDataCollection;

  localStorage.setItem("product", JSON.stringify(productArray));
}

/* Examples to learn Validation

  1- ^[A-Z]{1}[a-z]{3,6}$ --> start with ONLY 1 Captial letter then ONLY from 3 to 6 small letters
 
    ---Accept only the phrase web design or web development---
  2- ^web [development design]$
  This REGEX is NOT correct because [] gives us range d or e or v and so on
  
  To solve this isuue:
  ===>> ^web (development|design)$

  3-to accept age range from 20 to 80 ONLY
  ==> ^([2-7][0-9]|80)$

  4-to accept Mobile numbers
  ^01[0125][0-9]{8}$
      OR
  ^(010|011|012|015)[0-9]{8}$
 */

//===========================/*Application Validation */===========================//

//Validate Product Name Input//
var ProductNameAlert = document.getElementById("nameAlert");

productNameInput.onkeyup = function () {
  var productNameRegex = /^[A-Z][a-z]{3,8}$/;
  if (!productNameRegex.test(productNameInput.value)) {
    addButton.disabled = "true"; // inactivate the button if the REGEX returns false
    productNameInput.classList.add("is-invalid"); //make the input red to warn users
    productNameInput.classList.remove("is-valid");
    ProductNameAlert.classList.remove("d-none");
  } else {
    addButton.removeAttribute("disabled");
    productNameInput.classList.add("is-valid"); //make the input green with true sign
    productNameInput.classList.remove("is-invalid");
    ProductNameAlert.classList.add("d-none");
  }
};
