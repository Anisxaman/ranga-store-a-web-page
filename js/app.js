const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {

  console.log(products);

  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product p-2 rounded-3 me-3 mt-4" style="height:600px; background:#fbfcfd;"  >
      <div>
    <img class="product-image img-fluid" src=${image}></img>
      </div>
      <div>
      <div>
        <h4 class="mt-3">Mens Casual Premium Slim Fit T-Shirts </h4>
        <p class="mt-2 "><span class="fw-bold">Category:</span> men's clothing</p>
        <br>
        <h2><span class="text-danger">Price:</span> $ 22.3</h2>
       </div>

        <div class="d-flex justify-content-between mt-2 mb-2 ps-3 pe-3">
          <h5 class="mt-3"><span class="text-danger">Rating:</span>${product.rating.rate}</h5>
          <h5 class="mt-3"><span class="text-danger">Rating count:</span>${product.rating.count}</h5>
    
         
    
        </div>
    </div>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  // document.getElementById(id).innerText = Math.round(value);
  document.getElementById(id).innerText =value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {

  // const price=document.getElementById("price").value;
  // console.log(price);

  const grandTotal = getInputValue("price") + getInputValue("delivery-charge")+getInputValue("total-tax");
    console.log(grandTotal);
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
