import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "./components/Products";
import { getCategories } from "./redux/features/categoriesSlice";
import { getProducts } from "./redux/features/productsSlice";

const App = () => {
  const dispatch = useDispatch();
  const {
    isLoading: isCategoryLoading,
    errorMsg: categoryErrorMsg,
    data: categories,
  } = useSelector((state) => state.categories);

  const {
    isLoading: isProductLoading,
    errorMsg: productErrorMsg,
    data: products,
  } = useSelector((state) => state.products);

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    dispatch(getProducts(value));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div>
      <h1 className="title">Products Listing</h1>

      <div className="main-content">
        {isCategoryLoading && <p className="loading">Loading...</p>}
        {categoryErrorMsg && <p className="error-msg">{categoryErrorMsg}</p>}
        <label htmlFor="">Select your category</label>
        <select onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map(({ name }, index) => (
            <option key={index}>{name}</option>
          ))}
        </select>
        {isProductLoading && <p className="loading">Loading...</p>}
        {productErrorMsg && <p className="error-msg">{productErrorMsg}</p>}
        <Products products={products} />
      </div>
    </div>
  );
};

export default App;
