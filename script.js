document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCounter = document.getElementById("contador-productos");
  const totalElement = document.querySelector(".total-pagar");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productName = this.getAttribute("data-name");
      const productPrice = parseFloat(this.getAttribute("data-price"));
      const product = { name: productName, price: productPrice, quantity: 1 };

      addProductToCart(product);
      displayCart();
      updateCartCounter();
      updateTotal();
    });
  });

  function addProductToCart(product) {
    const existingProduct = cart.find((p) => p.name === product.name);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push(product);
    }
  }

  function displayCart() {
    const containerCartProducts = document.querySelector(
      ".container-cart-products"
    );
    containerCartProducts.innerHTML = ""; // Clear previous products

    cart.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "cart-product";
      productElement.innerHTML = `
          <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.name}</p>
            <span class="precio-producto-carrito">$${
              product.price * product.quantity
            }</span>
          </div>`;
      containerCartProducts.appendChild(productElement);
    });
  }

  function updateCartCounter() {
    const totalItems = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    cartCounter.textContent = totalItems;
  }

  function updateTotal() {
    const total = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    totalElement.textContent = `$${total}`;
  }
});
document.getElementById("titulo").addEventListener("mouseover", function () {
  this.style.color = "red";
});

document.getElementById("titulo").addEventListener("mouseout", function () {
  this.style.color = "white";
});
