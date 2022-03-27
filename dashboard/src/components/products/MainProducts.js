import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
