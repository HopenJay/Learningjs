import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
      const productId = cartItem.productId;

      const matchingProduct = getProduct(productId);

      const deliveryOptionId = cartItem.deliveryOptionId;

      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const dateString = calculateDeliveryDate(deliveryOption);

      cartSummaryHTML += `
            <div class="cart-item-container js-cart-item js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name js-product-name-${matchingProduct.id}">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price js-product-price-${matchingProduct.id}">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                      Update
                    </span>                  
                    <input type="text" class="quantity-input  js-trial js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}" tabindex = "0">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ``;
    deliveryOptions.forEach((deliveryOption) => {
     const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  }

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
      renderPaymentSummary();
    });

    // Keydown event
    quantityInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleUpdateQuantity(productId,quantityInput);
        renderPaymentSummary();
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

        //   const container = document.querySelector(`.js-cart-item-container-${productId}`);
        //   container.remove();
        // updateCartQuantity();
// I regenerated the HTML
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      });
  });

  function updateCartQuantity() {
    
    document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;
    // for this stuff supersimpledev made use of a const cartQuantity to put the function into it. Just thought to leave mine the way it is just for maintaining the originality.
  };

  updateCartQuantity(); //TODO: 19/08/2025 Don't forget to uncomment this function I commented it to test things out in jasmine
  //TODO: UPDATE 20/08/2025 was through with and commited the integration test so I uncommented the updateCartQuantity function
  // The code below was not needed I completely mistook 14e but I'm going to live the code as a proof of my thinking outside the box. Also remeber I also needed to add a parameter in the updateCartQuantity in delete link function
  // function updateCartQuantity(dom) {
  //     let cartQuantity = 0;
  
  //     cart.forEach((cartItem) => {
  //         cartQuantity += cartItem.quantity;
  //     });
  
  //     dom.innerHTML = `${cartQuantity} items`;
  //   }
  
  //   updateCartQuantity(document.querySelector('.js-return-to-home-link'));
  document.querySelectorAll('.js-delivery-option').forEach((element) => { 
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}