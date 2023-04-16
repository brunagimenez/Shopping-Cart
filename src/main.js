import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.querySelector('.products');

const createLoading = () => {
  const loading = createCustomElement('p', 'loading', 'carregando...');
  sectionProducts.appendChild(loading);
};

const removeLoading = () => {
  sectionProducts.removeChild(sectionProducts.firstElementChild);
};

const errorApi = () => {
  const textError = 'Algum erro ocorreu, recarregue a página e tente novamente';
  const error = createCustomElement('p', 'error', textError);
  sectionProducts.appendChild(error);
};

const itensProducts = async () => {
  try {
    createLoading();
    const product = await fetchProductsList('computador');
    product.map((item) => sectionProducts.appendChild(createProductElement(item)));
    removeLoading();
  } catch (error) {
    removeLoading();
    errorApi();
  }
};
itensProducts();
