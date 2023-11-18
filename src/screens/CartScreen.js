import { hideLoading, parseRequestUrl, rerender, showLoading } from '../utils.js';
import { getProduct } from '../api.js';
import { getCartItems, setCartItems } from '../localStorage.js';


const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if (existItem) {
        // Only throw quantity selection addToCart call
        if (forceUpdate) {
            cartItems = cartItems.map( x => x.product === existItem.product ? item : x);
        }
    } else {
        cartItems = [...cartItems, item];
    }

    // Need to update local storage first...
    setCartItems(cartItems);
                    // ... and only then re-render component!
    if (forceUpdate) {
        console.log("rerendered..");
         // Only updating local storage from inside cartScreen the UI changes!
        rerender(CartScreen);
    }
}
const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if (id === parseRequestUrl().id) {
      document.location.hash = '/cart';
    } else {
      rerender(CartScreen);
    }
  };

const CartScreen = {
    after_render: () => {
        const qtySelects = document.getElementsByClassName('qty-select');
        Array.from(qtySelects).forEach((qtySelect) => {
          qtySelect.addEventListener('change', (e) => {
            const item = getCartItems().find((x) => x.product === qtySelect.id);
            addToCart({ ...item, qty: Number(e.target.value) }, true);
          });
        });
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
          deleteButton.addEventListener('click', () => {
            removeFromCart(deleteButton.id);
          });
        });
        document.getElementById('checkout-button').addEventListener('click', () => {
          document.location.hash = '/signin';
        });
    },
    render: async ()=> {
        const request = parseRequestUrl();
        showLoading();
        if (request.id) {
            showLoading();
            const product = await getProduct(request.id);
            hideLoading();
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1
            });
        }
        const cartItems = getCartItems();
        hideLoading();
        return `
        <div class="content cart"> 
            <div class="cart-list"> 
                <ul class="cart-list-container"> 
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    ${
                        cartItems.length === 0 ?
                        '<div>Cart is Empty <a href="/#/">Go Shopping</a></div>' : 
                        cartItems.map((item)=>{
                          return  `<li>
                                        <div class="cart-image">
                                            <img src="./src/${item.image}" alt=${item.name} />
                                        </div>
                                        <div class="cart-image">
                                            <div>
                                                <a href="/#/product/${item.name}">
                                                ${item.name}
                                                </a>
                                            </div>
                                            <div>
                                                <p class="qty-label">Qty: </p> 
                                                <select class="qty-select" id="${item.product}">
                                                ${[...Array(item.countInStock).keys()].map((x) =>
                                                  item.qty === x + 1
                                                    ? `<option selected value="${x + 1}">${x + 1}</option>`
                                                    : `<option  value="${x + 1}">${x + 1}</option>`
                                                )}                               
                                                </select>
                                                <i class="fa-solid fa-trash delete-button" id="${
                                                  item.product
                                                }"></i>
                                            </div>
                                        </div>
                                        <div class="cart-price">
                                            $${item.price}
                                        </div>
                                    </li>`
                        }).join('\n')
                    }
                </ul>
            </div>
                <div class="cart-action">
                <h3>
                  Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
                  :
                  $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <button id="checkout-button" class="primary fw">
                  Proceed to Checkout
                </button>
            </div>
        </div>
        `;
    }
}

export default CartScreen;