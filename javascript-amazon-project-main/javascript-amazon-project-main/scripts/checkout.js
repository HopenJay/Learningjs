import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js'

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                    Update
                  </span>                  
                  <input type="text" class="quantity-input  js-trial js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}" tabindex = "0">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add("is-editing-quantity");

  })
})

// My former code that gave me a fucking headache due to some mismatched logic.
/*
document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove("is-editing-quantity");

    const savedNumber = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

    let newQuantity = savedNumber;
    // Giving limit to newQuantity;
    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    if (newQuantity >= 0 && newQuantity < 1000) {
      updateQuantity(productId, newQuantity);
      quantityLabel.innerHTML = newQuantity;
    } else {
      quantityLabel.innerHTML = alert('item exceeds limit');
      container.classList.add("is-editing-quantity");
    }
    

    updateCartQuantity();
  })
});

// U see dis shit I will try it when I'm in a right frame of mind
    document.querySelectorAll('.quantity-input').forEach((link) => {
      link.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        document.querySelectorAll('.js-save-quantity-link').forEach((save) => {const productId = save.dataset.productId
              const savedNumber = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
              
              let newQuantity = savedNumber;
              // Giving limit to newQuantity;
              const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
              if (newQuantity >= 0 && newQuantity < 1000) {
                updateQuantity(productId, newQuantity);
                quantityLabel.innerHTML = newQuantity;
              } else {
                quantityLabel.innerHTML = alert('item exceeds limit');
                container.classList.add("is-editing-quantity");
              }
              
              updateCartQuantity();
              const container = document.querySelector(`.js-cart-item-container-${productId}`);
              container.classList.remove('is-editing-quantity')
    }
  )
      }
    })
  })
*/

// My present code. Taken from @ayids on github:

document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
  const productId = link.dataset.productId;
  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

  // Click event
  link.addEventListener('click', () => {
    // ThequantityInput variable is passed as an argument to give handleUpdateQuantity function to access it
    handleUpdateQuantity(productId, quantityInput);
  });

  // Keydown event
  quantityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleUpdateQuantity(productId,quantityInput);
    }
  });
});

// The function for the handleUpdateQuantity
function handleUpdateQuantity(productId, quantityInput) {
  const newQuantity = Number(quantityInput.value);

  if (newQuantity <= 0 || newQuantity >= 1000) {
    alert('Quantity must be at least 1 andless than 1000');
    return; // early return
  }

  updateQuantity(productId, newQuantity);

  const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
  quantityLabel.innerHTML = newQuantity;

  updateCartQuantity();

  const container =document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');
}


document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
       updateCartQuantity();
    });
});



function updateCartQuantity() {
  
  document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;
  // for this stuff supersimpledev made use of a const cartQuantity to put the function into it. Just thought to leave mine the way it is just for maintaining the originality.
};

updateCartQuantity();
// The code below was not needed I completely mistook 14e but I'm going to live the code as a proof of my thinking outside the box. Also remeber I also needed to add a parameter in the updateCartQuantity in delete link function
// function updateCartQuantity(dom) {
//     let cartQuantity = 0;

//     cart.forEach((cartItem) => {
//         cartQuantity += cartItem.quantity;
//     });

//     dom.innerHTML = `${cartQuantity} items`;
//   }

//   updateCartQuantity(document.querySelector('.js-return-to-home-link'));