import { ProductAPI } from '../products/API';

const refs = {
  selectEl: document.querySelector('.category-choice'),
  productListEl: document.querySelector('.products__list'),
};

document.addEventListener('DOMContentLoaded', onDocumentLoad);
refs.selectEl.addEventListener('change', onSelectElChange);

const productAPI = new ProductAPI();
console.log(productAPI.getCategories());

function onDocumentLoad() {
  productAPI.getCategories().then(res => {
    renderOption(res);
  });
}

function createOption(arr) {
  return arr.map(el => {
    return `
        <option value="${el}">${el}</option>
        `;
  });
}
function renderOption(arr) {
  const markup = createOption(arr).join('');
  refs.selectEl.innerHTML = markup;
}

function onSelectElChange() {
  const value = refs.selectEl.value;
  console.log(value);

  productAPI.getProductsByCat(value).then(res => {
    renderProducts(res.results);
  });
}
function createProducts(arr) {
  return arr.map(el => {
    const { category, img, name, popularity, price, size, _id } = el;
    return `
    <li class="products__item" data-id="${_id}">
        <div class="products__item-inner">
          <img
            class="products__item-img"
            src="${img}"
            alt="${name}"
            width="295"
          />
          </div>
          <h4 class="products__item-title">${name}</h4>
          <div class="products__item-info">
            <div class="products__item-wrapper">
              <h5 class="products__item-label">Category:</h5>
              <p class="products__item-text">${category}</p>
              <h5 class="products__item-label">Size:</h5>
              <p class="products__item-text">${size}</p>
            </div>
            <h5 class="products__item-label">Popularity:</h5>
            <p class="products__item-text">${popularity}</p>
          </div>
          <div class="products__item-buy">
            <p class="products__item-price">$${price}</p>
            <a href="#" class="products__item-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M2.70078 0.900002C2.46209 0.900002 2.23317 0.994823 2.06439 1.16361C1.8956 1.33239 1.80078 1.56131 1.80078 1.8C1.80078 2.0387 1.8956 2.26761 2.06439 2.4364C2.23317 2.60518 2.46209 2.7 2.70078 2.7H3.79878L4.07328 3.7998C4.07601 3.81246 4.07901 3.82507 4.08228 3.8376L5.30448 8.7246L4.50078 9.5274C3.36678 10.6614 4.16958 12.6 5.77338 12.6H13.5008C13.7395 12.6 13.9684 12.5052 14.1372 12.3364C14.306 12.1676 14.4008 11.9387 14.4008 11.7C14.4008 11.4613 14.306 11.2324 14.1372 11.0636C13.9684 10.8948 13.7395 10.8 13.5008 10.8H5.77338L6.67338 9.9H12.6008C12.7679 9.89991 12.9316 9.85331 13.0738 9.7654C13.2159 9.6775 13.3307 9.55177 13.4054 9.4023L16.1054 4.0023C16.1739 3.86512 16.2063 3.7127 16.1994 3.55951C16.1925 3.40631 16.1466 3.25742 16.066 3.12696C15.9854 2.9965 15.8728 2.88879 15.7388 2.81407C15.6049 2.73935 15.4541 2.70008 15.3008 2.7H5.65278L5.37378 1.5813C5.32503 1.38668 5.21264 1.21393 5.05447 1.09049C4.8963 0.967053 4.70142 0.900007 4.50078 0.900002H2.70078ZM14.4008 14.85C14.4008 15.208 14.2585 15.5514 14.0054 15.8046C13.7522 16.0578 13.4088 16.2 13.0508 16.2C12.6927 16.2 12.3494 16.0578 12.0962 15.8046C11.843 15.5514 11.7008 15.208 11.7008 14.85C11.7008 14.492 11.843 14.1486 12.0962 13.8954C12.3494 13.6422 12.6927 13.5 13.0508 13.5C13.4088 13.5 13.7522 13.6422 14.0054 13.8954C14.2585 14.1486 14.4008 14.492 14.4008 14.85ZM5.85078 16.2C6.20882 16.2 6.5522 16.0578 6.80538 15.8046C7.05855 15.5514 7.20078 15.208 7.20078 14.85C7.20078 14.492 7.05855 14.1486 6.80538 13.8954C6.5522 13.6422 6.20882 13.5 5.85078 13.5C5.49274 13.5 5.14936 13.6422 4.89619 13.8954C4.64301 14.1486 4.50078 14.492 4.50078 14.85C4.50078 15.208 4.64301 15.5514 4.89619 15.8046C5.14936 16.0578 5.49274 16.2 5.85078 16.2Z"
                  fill="#E8E8E2"
                />
              </svg>
            </a>
          </div>
        </li>
    `;
  });
}
function renderProducts(arr) {
  const markup = createProducts(arr).join('');
  refs.productListEl.innerHTML = markup;
}
