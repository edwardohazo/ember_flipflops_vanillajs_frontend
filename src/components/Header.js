import { getUserInfo } from "../localStorage.js";

const Header = {
    render: () => {
        const {name} = getUserInfo();
        return `
            <div class="brand">
                <a href="/#" >EMBER | flip flops</a> 
            </div>
            <div>
                ${
                  name ? `<a href="/#/profile">${name}</a>` :
                  `<a href="/#/signin">Sign-In</a>`
                } 
                <a href="/#/cart">Cart</a>  
            </div>`;
    },
    after_render: () => {}
}

export default Header;