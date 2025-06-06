let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class = "js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-test-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>
        `;
})

document.querySelector('.js-products-grid').innerHTML = productsHTML;

// const dropdown = document.querySelectorAll()

document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    button.addEventListener('click', () => {
        const {productId} = button.dataset;// I used destructuring to simplify it. This is the real code:  const productId = button.dataset.productId;


        let matchingItem;

        cart.forEach((item) => {
            if(productId === item.productId) {
                matchingItem = item;
            }
        });

        const addMsg = document.querySelector(`.js-added-test-${productId}`);

        // let timeout = 2000;
        let timeoutId;

        addMsg.classList.add('show-sesame');

        if(timeoutId) {
        clearTimeout(timeoutId);
    }
        timeoutId = setTimeout(() => {
            addMsg.classList.remove('show-sesame');
            timeoutId = null;           
        }, 2000);

        

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


        let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    })
});