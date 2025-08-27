class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }
    
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

        if(!this.cartItems) {
            this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }];  
        }   
    }
 
    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
        }

    addedMessageTimeoutId = {}

    addToCart(productId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        const addMsg = document.querySelector(`.js-added-test-${productId}`);
        // let timeout = 2000;
        // let timeoutId;
        addMsg.classList.add('show-sesame');

            if(this.addedMessageTimeoutId[productId]) {
            clearTimeout(this.addedMessageTimeoutId[productId]);
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
            this.cartItems.push({
                productId,
                quantity, //Used the shorthand method here. This is the original code/: productId: productId,quantity: quantity   
                deliveryOptionId: '1' //Note to self i might need to change this stuff ltr to the shorthand method to, to make it:deliveryOptionId:deliveryOptionId ltr.
            })
        }

        this.saveToStorage();
    }

    removeFromCart(productId) { 
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        this.saveToStorage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;
    
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
            return cartQuantity; //24/08/2025 TODO: check if this code is valid
        });
        cartQuantity; //24/08/2025 TODO: check if this code is valid

        //TODO:UPDATE: I added saveToStorage to calculateCartQuantity function, I suspect it's part of the reson why my code calculation resets after refreshing the browser. When I come online I'll check if the code is valid.
        this.saveToStorage();
    }

    updateQuantity(productId, newQuantity) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.quantity = newQuantity;

        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
}
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);