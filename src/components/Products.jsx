/* eslint-disable react/prop-types */
const Products = ({ products }) => {
  return (
    <div className="products-list">
      {products.map(({ image, name }) => {
        return (
          <div key={name} className="product">
            <img src={image} alt={name} className="image" />
            <h4 className="product-name">{name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
