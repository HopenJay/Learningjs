export const cart = [

];

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