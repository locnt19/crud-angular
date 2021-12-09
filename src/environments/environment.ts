export const environment = {
  production: false,
  route: {
    products: 'products',
    productDetail: 'product/:id'
  },
  endpoint: {
    products: 'http://localhost:3000/products',
    product: 'http://localhost:3000/products/{product_id}'
  },
  paginate: {
    page: 1,
    limit: 8
  }
};
