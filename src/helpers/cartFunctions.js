import { fetchProduct } from "./fetchFunctions";

/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

  export const getSavedCartPrices = async (idToRemove) => {
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  
    if (idToRemove) {
      cartProducts = cartProducts.filter(id => id !== idToRemove);
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  
    if (cartProducts.length === 0) {
      // Se não houver produtos no carrinho, exibir preço total como zero e sair da função
      document.querySelector('.total-price').textContent = "0";
      return;
    }
  
    try {
      const pricePromises = cartProducts.map(id => fetchProduct(id).then(data => data.price));
      const prices = await Promise.all(pricePromises);
      const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);
      document.querySelector('.total-price').textContent = totalPrice.toFixed(2);
    } catch (error) {
      console.error(error);
    }
  };  


/**
 * Função que adiciona um preço dos produtos que são add ao carrinho.
 */

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = [...getSavedCartIDs()];
  const indexProduct = cartProducts.indexOf(id);
  cartProducts.splice(indexProduct, 1);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};
