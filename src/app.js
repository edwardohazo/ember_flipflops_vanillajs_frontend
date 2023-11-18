import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import SignInScreen from './screens/SignInScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import Header from './components/Header.js';
import {parseRequestUrl, showLoading, hideLoading} from './utils.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import './components/slider.js';


// ROUTES OBJECT
const routes = {
    '/products/:id': ProductScreen,
    '/order/:id': OrderScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/signin': SignInScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
    '/placeorder': PlaceOrderScreen,
    '/': HomeScreen,
}

const router = async () => {
    showLoading();
    // GETTIN URL LOCATION
    const request = parseRequestUrl();
    // CREATING THE ROUTE
    const parseUrl = 
            (request.resource ? `/${request.resource}` : `/`) +
            (request.id ? '/:id' : '') +
            (request.verb ? `/${request.verb}` : '')
    
    // SELECTING SCREEN FROM ROUTES OBJECT
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById("header-container");
    header.innerHTML = await Header.render();
    await Header.after_render();
    // APP MAIN CONTAINER TAKEN FROM HTML FILE
    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render();

    if (screen.after_render) await screen.after_render();
    hideLoading();
}

window.addEventListener("load", ()=>{
    router(router);
});
window.addEventListener("hashchange", ()=>{
    router(router);
});