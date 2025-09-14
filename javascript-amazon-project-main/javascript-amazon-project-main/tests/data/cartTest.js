import {cart} from '../../data/cart-class.js';

describe('test suite: addToCart', () => {

    beforeEach(() => {
        // Mock localStorage
      spyOn(localStorage, 'setItem');

      // Mock querySelector to prevent null.classList errors
      spyOn(document, 'querySelector').and.callFake((selector) => {
        // If it’s the quantity input, return a fake input with a value
          if (typeof selector === 'string' && selector.startsWith('.js-quantity-selector-')) {
            return {
              value: '1', // simulate user entering "1"
              classList: {
                add: jasmine.createSpy('add'),
                remove: jasmine.createSpy('remove'),
                contains: jasmine.createSpy('contains').and.returnValue(false)
              }
            };
          }

          // Otherwise return a default fake element
          return {
            classList: {
              add: jasmine.createSpy('add'),
              remove: jasmine.createSpy('remove'),
              contains: jasmine.createSpy('contains').and.returnValue(false)
            }
          };
        });

        cart.cartItems = [];
    });

    it('adds an existing product to the cart', () => {
        // TODO: You can write the logic for incrementing quantity here later
        
        cart.cartItems.push({
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
        });

        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }]));

    });

    it('adds a new product to the cart', () => {
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(1);

        // Optional: Verify DOM interaction happened
        expect(document.querySelector).toHaveBeenCalled();
        
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }]));//TODO: 8/9/2025. I think I might have a ptoblem with this 1
        // expect(document.querySelector().classList.add).toHaveBeenCalled(); TODO will ask chatgpt abt this ltr when I switch on my phone. 
        // TODO update: Probably may not come back to this code the test works well now and I got what I needed.
    });
});

describe('test suite: remove from cart', () => {
  beforeEach(() => {
    //Mock local storage
    spyOn(localStorage, 'setItem');
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([]);
    // });
    // loadFromStorage();
    cart.cartItems = [];
  })

  it('removes a product in the cart', () => {
    cart.cartItems.push({
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
        });
        
          cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
          
          expect(
            cart.cartItems.length
          ).toEqual(0);

          expect(
            localStorage.setItem
          ).toHaveBeenCalledTimes(1);

          expect(
            localStorage.setItem
          ).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
  })

  it('removes a product that is not in the cart', () => {
    cart.cartItems.push({
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
        });

    cart.removeFromCart('jahnfja snnjdjdansanx');
    
    expect(
      cart.cartItems.length
    ).toEqual(1);
    
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);
    
    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });
})

describe('test suite: updates delivery option', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  beforeEach(() => {
    //Mock local Storage
    spyOn(localStorage, 'setItem');
    // spyOn(localStorage, 'getItem').and.callFake(() => {
    //   return JSON.stringify([]);
    // });
    // loadFromStorage();
    cart.cartItems = [];
  })

  it('update the delivery option', () => {
    expect(
      cart.cartItems.length
    ).toEqual(0);
    
    cart.cartItems.push({
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
        });

    expect(
      cart.cartItems.length
    ).toEqual(1);
    cart.updateDeliveryOption(productId1, '3');
    
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '3'
    }]));
  });

  it('update the delivery option of a product that is not in the cart', () => {
    cart.cartItems.push({
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
        });
    cart.updateDeliveryOption('eejejejeeeee', '3')
  }) 
  // TODO: 24/08/2025 i DON'T KNOW HOW TO DO THIS TEST CASE. I WILL CHECK OUT HIS SOLUTION FOR EXERCISE 16L. VIDEO LENGTH: 17:36:15 UPDATE: I'VE FINALLY DONE IT

  // TODO: and also 16m. Video length: 17:36:23
  it('does nothing if delivery option does not exist', () => {
    cart.cartItems.push({
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
        });

    cart.updateDeliveryOption(productId1, 'does not exist');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
//TODO: update 27/08/2025. I've finally done 16m to.