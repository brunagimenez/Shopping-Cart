export const fetchProduct = async (ProductID) => {
  if (!ProductID) {
    throw new Error('ID não informado');
  }
  const url = `https://api.mercadolibre.com/items/${ProductID}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (QUERY) => {
  if (!QUERY) {
    throw new Error('Termo de busca não informado');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};
