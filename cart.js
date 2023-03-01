let cart = JSON.parse(localStorage.getItem('cart')) || {};

      function addProduct(title, price) {
        if (title in cart) {
          cart[title]['quantity'] += 1;
        } else {
          cart[title] = {'price': price, 'quantity': 1};
        }

        // save cart to browser storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // update cart display
        displayCart();
      }

      function displayCart() {
        let cartItems = document.querySelector('.cart-items');
        let cartTotal = document.querySelector('.total');

        cartItems.innerHTML = '';
        cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;

        for (let title in cart) {
          let quantity = cart[title]['quantity'];
          let total = (cart[title]['price'] * quantity).toFixed(2);

          // create HTML element for cart item
          let li = document.createElement('li');
          li.textContent = `${title} x ${quantity} - $${total}`;
          cartItems.appendChild(li);
        }
      }

      function getCartTotal() {
        let total = 0;

        for (let title in cart) {
          total += cart[title]['price'] * cart[title]['quantity'];
        }

        return total;
      }

      // attach click event listener to all "add-to-cart" buttons
      let addToCartButtons = document.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach(button => {
        let title = button.dataset.title;
        let price = parseFloat(button.dataset.price);

        button.addEventListener('click', () => {
          addProduct(title, price);
        });
      });

      // display initial cart contents
      displayCart();
