import { getProduct } from "../api";
import {hideLoading, parseRequestUrl, showLoading} from '../../utils';
import Ratings from '../components/Ratings';



const ProductScreen = {
  after_render: async() => {
    const request = parseRequestUrl();

    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`; 
 
    });

  },

    render: async() => {
         const request = parseRequestUrl();
         showLoading();
         const product = await getProduct(request.id);
         if(product.error){
            return `
            <h2 style="display: flex; align-self: center;">
              ${product.error} 
            </h2>`
         }
  
         hideLoading();

         return `
            <div class="content" style="width:100%;">
               <div style="color:#b64606; margin-top: 6rem;">   
                  <a href="/#/" style="color:#b64606">Voltar</a> 
               </div>

               <div class="details">
                  <div class="details-image">
                     <img src="${product.image}" alt="${product.name}"/>
                  </div> 
                   <div class="details-info"> 
                   <div class="details-action">
                      <ul>
                      <li>
                       <h1>${product.name}</h1>
                       <p style="color: #808080;">${product.brand}</p>
                        </li>
                        <li>
                            ${
                                Ratings.render({
                                value: product.rating,
                                text: `${product.numReviews} avaliações`,
                              })}
                        </li>

                         <li class="product-price">
                            Preço: R$ ${product.price} à vista
                            
                         </li>
                         <p style="margin-bottom: 3rem;">Ou em 6x sem juros</p>
                         <li>
                            Status: 
                            ${
                              product.countInStock > 0
                               ? `<span class="success">Disponível</span>`
                               : `<span class="error">Indisponível</span>` 
                            } 
                         </li>
                        
                         <li>
                         ${
                            product.countInStock !== 0
                            ? ` 
                            <button id="add-button" class="primary">
                                Comprar
                                <i class="fas fa-cart-arrow-down"></i>
                             </button>`
                            : `
                             <button id="add-button" class="primary" disabled>
                               Comprar
                               <i class="fas fa-cart-arrow-down"></i>
                             </button>
                            `
                             } 
                         </li>
                      </ul>
                   </div>

                   <ul>
 
                   <li style="margin-top: 3rem;">
                      Descrição do produto:
                      <p style="padding-top: 1rem; 
                         font-weight: 400; color: grey;"
                      >
                      ${product.description}
                      </p>
                   </li>
               </ul>

                   </div>

               </div>
            </div>
         `
    },
};

export default ProductScreen;