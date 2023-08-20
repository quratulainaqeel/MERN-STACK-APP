import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Cartcontext } from '../Context/AddToCart/context';
import Loader from '../Components/loader';

export default function AllProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  // const [loader, setloader] = useState(true)


  const { cart_state, cart_dispatch } = useContext(Cartcontext)


  useEffect(() => {
    axios.get("http://localhost:3000/api/get-all-product").then((json) => setAllProducts(json.data.Product)).catch((err) => console.log(err))
  }, [])
  // setloader(false)


  const AddToCart = (item) => {

    const payload = {
      ...item,
      Quantity: 1,
    }

    cart_dispatch(
      {
        type: "ADD_TO_CART",
        payload
      }
    )

    // Swal.fire({
    //   title: "Added to Cart!",
    //   text: "Check your Cart for Check Out",
    //   icon: "success",
    //   confirmButtonText: "Continue Shopping",
    // });
  }

  return (
    <>
      {
        // loader ? <Loader/> :
        <div className="container">
          <div className="row">
            {allProducts.map((product, index) =>
              <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={index}>
                <Card style={{ height: "370px" }}>
                  <Card.Img src={product.thumbnail} className='object-fit-contain  border rounded img-fluid' style={{ height: "200px" }} />

                  <span className="position-absolute translate-start badge bg-danger" style={{
                    padding: '5px 10px',
                    marginTop: '10px',
                    marginLeft: '-4px',
                    borderRadius: '4px'
                  }}>
                    {product.category.toUpperCase()}
                  </span>

                  <Card.Body>
                    <Link className='text-decoration-none text-dark' to={`/products/${product._id}`}>
                      <div className="brand text-center">
                        <span>Brand:  </span>
                        <span className="fw-semibold">{product.brand.length > 15 ? product.title.slice(0, 15) + '...' : product.brand}</span>
                      </div>

                      <div className="text-center">
                        {product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name}
                      </div>

                      <div className='text-center' >
                        <h5 className='text-danger fw-semibold  me-2 text-secondary'>${product.price}</h5>
                        {/* <span className='fw-semibold'>${Math.floor(product.price - product.price * (product.discountPercentage / 100))}</span> */}
                        {/* <span className='text-danger ms-2'>({product.price.toFixed(0)}% off)</span> */}

                      </div>
                    </Link>
                    <div className="d-grid">
                      <button className='btn btn-outline-danger px-5 py-2 ' disabled={cart_state.cart.some(item => item._id === product._id)} onClick={() => AddToCart(product)}>Add to Cart</button>
                    </div>
                  </Card.Body>
                </Card>

              </div>
            )}
          </div>
        </div>
      }
    </>
  )
}
