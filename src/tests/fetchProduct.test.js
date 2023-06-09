import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1405519561");
  });

  it('A função é uma estrutura de dados igual ao objeto "produto" ', async () => {
    const functionProduct = await fetchProduct ('MLB1405519561');
    console.log(product);
    expect(functionProduct).toEqual(product);
   });

  it('Ao chamar a função sem argumento, retorna um erro ', () => {
    expect(async() => {await fetchProduct()}).rejects.toThrow(new Error('ID não informado'));
  });

  
});