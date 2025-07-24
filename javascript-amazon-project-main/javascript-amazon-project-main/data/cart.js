export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
    }];
    
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addedMessageTimeoutId = {};

export function addToCart(productId) {
let matchingItem;

        cart.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        const addMsg = document.querySelector(`.js-added-test-${productId}`);

        // let timeout = 2000;
        // let timeoutId;

        addMsg.classList.add('show-sesame');

            if(addedMessageTimeoutId[productId]) {
            clearTimeout(addedMessageTimeoutId[productId]);
        }
            const timeoutId = setTimeout(() => {
                addMsg.classList.remove('show-sesame');
                // timeoutId = null;           
            }, 2000);
            addedMessageTimeoutId[productId] = timeoutId;
        

        

        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

        const quantity = Number(quantitySelector.value);

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            cart.push({
                productId,
                quantity, //Used the shorthand method here. This is the original code/: productId: productId,quantity: quantity   
                deliveryOptionId: '1' //Note to self i might need to change this stuff ltr to the shorthand method to, to make it:deliveryOptionId:deliveryOptionId ltr.
            })
        }

        saveToStorage();
}

export function removeFromCart(productId) { 
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
};


export function calculateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  };
  
  export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;

    saveToStorage();
  }