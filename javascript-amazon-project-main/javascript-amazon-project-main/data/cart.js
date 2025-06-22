export let cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];

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
                quantity //Used the shorthand method here. This is the original code/: productId: productId,quantity: quantity   
            })
        }
}

export function removeFromCart(productId) { 
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
}