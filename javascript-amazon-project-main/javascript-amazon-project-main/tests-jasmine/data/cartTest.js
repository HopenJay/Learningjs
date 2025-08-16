import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {

    beforeEach(() => {
        // Mock localStorage
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([]);
      });

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

        loadFromStorage();
    });

    it('adds an existing product to the cart', () => {
        // TODO: You can write the logic for incrementing quantity here later

        cart.push({
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
        });

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);

    });

    it('adds a new product to the cart', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);

        // Optional: Verify DOM interaction happened
        expect(document.querySelector).toHaveBeenCalled();
        // expect(document.querySelector().classList.add).toHaveBeenCalled(); TODO will ask chatgpt abt this ltr when I switch on my phone. 
        // TODO update: Probably may not come back to this code the test works well now and I got what I needed.
    });
});

// localStorage.clear();
