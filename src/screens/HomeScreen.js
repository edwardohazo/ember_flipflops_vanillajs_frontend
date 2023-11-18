import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
import Rating from '../components/Rating.js';
import { showLoading, hideLoading } from '../utils.js';
import {apiUrl} from '../config.js';

const HomeScreen = {
    after_render: async () => {

      showLoading();
      const response = await axios(`${apiUrl}/api/products/`, {
        header: {
          'Content-Type': 'application/json',         
        }
      });
      hideLoading();

      if (!response || response.status !== 200) {
        return `<div>Error in getting data</div>`;
      }

      const products = response.data;

      const addButtons = document.querySelectorAll(".add-button");
      addButtons.forEach(($button, index) => {
        $button.addEventListener("click", () => {
          document.location.hash = `/cart/${products[index]._id}`;
        })
      });
    },
    render: async ()=> {
        showLoading();
        const response = await axios(`${apiUrl}/api/products/`, {
          header: {
            'Content-Type': 'application/json',         
          }
        });
        hideLoading();

        if (!response || response.status !== 200) {
          return `<div>Error in getting data</div>`;
        }
        const products = response.data;

        return `  
        <div id="homeScreenContainer">
        <div class="paralax-container" id="header">
          <div class="img-header">
            <div class="welcome">
              <span>
                <a href="#shop" class="shop-link">
                  GO SHOP!
                </a>
              </span>
              <img class="disk" src="" alt="" />
            </div>
          </div>
  
          <div class="skew-abajo"></div>
        </div>
        <section class="about-me">
          <div class="info-container">
            <div class="sibillingContainer">
              <div class="socialMediaContainerSibilling"></div>
              <div class="socialMediaContainer">
                <ul class="socialMediaContainer__list">
                  <li class="socialMediaContainer__list-item">
                    <a class="socialMediaContainer__list-item-a">
                      <i class="fa-brands fa-facebook socialMediaContainer__list-item-facebookIcon"></i>
                    </a>
                  </li>
                  <li class="socialMediaContainer__list-item">
                    <a class="socialMediaContainer__list-item-a">
                      <i class="fa-brands fa-instagram socialMediaContainer__list-item-igIcon"></i>
                    </a>
                  </li>
                  <li class="socialMediaContainer__list-item">
                    <a class="socialMediaContainer__list-item-a">
                      <i class="fa-brands fa-linkedin socialMediaContainer__list-item-linkedinIcon"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <h1 data-dark>About us:</h1>
            <p data-dark>
              We are mexican flip flop factory If you are searching quality for
              distribution and personal wearing we invite you to know our flip
              flops with unique models for all. Fllip flops are escencial in our
              beach trips, pool partys, weekends in your home and more. Its an
              excelent product to satisfy multiple needs.
            </p>
          </div>
        </section>


        <ul id="shop" class="products">
        ${(products.map( (product) =>  
           `<li>            
              <div class="product">
              <a href="/#/products/${product._id}">
              <img src="./src/${product.image}" alt="${product.name}" />
              </a> 
              <button class="fw primary add-button">Add to Cart</button>
              <div class="product-name">
                  <a href="/#/product/5">
                     ${product.name}
                  </a>
              </div>
              <div class="product-rating">${Rating.render({
                value: product.rating,
                text: `${product.numReviews} reviews`
              })}
              </div>
              <div class="product-brand">
                     ${product.brand}
              </div>
              <div class="product-price">
                     ${product.price}
              </div>
              </div> 
            </li>
           `
          )).join("")}
        </ul>
        
        <section id="session1" class="section">
          <div class="slider">
            <div class="slider-slides">
              <div class="slider-slide active">
                <img src='./images/flipflops-style3.png' alt="Javascript" />
              </div>
              <div class="slider-slide">
                <img src='./images/flipflops-style1.png' alt="CSS" />
              </div>
              <div class="slider-slide">
                <img src='/images/flipflops-style2.png' alt="HTML" />
              </div>
              <div class="slider-slide">
                <img src='/images/flipflops-style4.png' alt="MERN" />
              </div>
              <div class="slider-btns">
                <a class="prev" href="#">
                  &laquo;
                </a>
                <a class="next" href="#">
                  &raquo;
                </a>
              </div>
            </div>
          </div>
        </section>
    
      </div>
      `;
    }
}

export default HomeScreen;
