import { hideLoading, parseRequestUrl, showLoading } from '../utils.js';
import { getProduct } from '../api.js';
import Rating from '../components/rating.js';
import { apiUrl } from '../config.js';

const ProductScreen = {
  after_render: async () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener(
      'click',
      () => {
        document.location.hash = `/cart/${request.id}`;
      }
    );
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
    <div class="content">
      <div class="back-to-result">
        <a href="/#/">Back to result </a>
        </div>
      <div class="details">
          <div class="details-image">
            <img src="${apiUrl}${product.image}" alt="${product.name}"/>
          </div>
          <div class="details-info">
            <ul>
              <li>
                <h1>${product.name}</h1>
              </li>
              <li>
                ${Rating.render({ 
    value: product.rating, 
    text: `${product.numReviews} reviews` 
  })}
              </li>
              <li>
                  Price: <strong>$${product.price}</strong>
              </li>
              <li>
                Description:
                <div>
                  ${product.description || product.name}
                </div>
              </li>
            </ul>
            </div>
          <div class="details-action">
              <ul>
              <li>
                Price: $${product.price}
              </li>
              <li>
                Status:
                  ${product.countInStock > 0 ? '<span class="success">In Stock</span>' : '<span class="error">None in stock</span>'}
                </li>
              <li>
                <button id="add-button" class="fw primary">Add to Cart</button>
              </li>
              </ul>
            </div>
      </div>
    </div>
`;
  },
};
export default ProductScreen;
