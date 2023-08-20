import React, { useContext, useEffect, useState, } from 'react'
import { json, useParams } from 'react-router-dom'
import axios from 'axios';
import ReactStars from 'react-stars'
import Swal from 'sweetalert2';
import ImageSection from '../Components/ImageSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Cartcontext } from '../Context/AddToCart/context';

export default function Product() {

  const { _id } = useParams()
  const [product, setproduct] = useState(null)
  const [review, setreview] = useState("")
  const [rating, setrating] = useState(0)
  const [Quantity, setQuantity] = useState(1)

  const { cart_state, cart_dispatch } = useContext(Cartcontext)

  useEffect(() => {
    axios.get(`http://localhost:3000/api/get-product-by-id?_id=${_id}`)
      .then((json) => setproduct(json.data.Product)).catch((err) => console.log(err))
  }, [_id])

  const ratingChanged = (newRating) => setrating(newRating)

  const decrease = () => setQuantity(Quantity - 1)
  const increase = () => setQuantity(Quantity + 1)

  const AddToCart = (item) => {
    const totalPrice = Quantity * item.price

    const payload = {
      ...product,
      Quantity,
      totalPrice
    }

    cart_dispatch(
      {
        type: "ADD_TO_CART",
        payload
      }
    )
    Swal.fire({
      title: "Added to Cart!",
      text: "Check your Cart for Check Out",
      icon: "success",
      confirmButtonText: "Continue Shopping",
    });
  };
  if (!product) {
    return <div className='text-center text-danger fs-4'>Loading...</div>;
  }
  const submitReview = () => {
    const payload = {
      rating: rating,
      review: review
    }
    console.log(payload)


    Swal.fire({
      title: 'Sucessfully Submitted!',
      text: 'Thanks for reviewing our product',
      icon: 'success',
      confirmButtonText: 'OK'
    })
  }
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 ">
            {
              product?.images?.length > 0 && <ImageSection images={product.images} />
            }
          </div>
          
          <div className="col-md-5 ">
            <div className="container">
              <div>
                <h1>{product.name} </h1>
                <p className='text-secondary'>{product.description}</p>

                <div className='d-flex'>
                  <span className='text-danger'>Brand:  <span className='text-dark'>{product.brand}</span></span>
                  <div style={{ borderLeft: "2px solid #dc3545", height: "20px" }} className='mt-1 mx-2'></div>
                  <span className='text-danger'>Category:  <span className='text-dark'>{product.category}</span></span>

                </div>
              </div>

              <div className="text-danger mt-2 ">
                <h3>${product.price}</h3>
              </div>



              <div>
                <ReactStars
                  count={5}
                  size={24}
                  edit={false}
                  value={product.rating}
                  color2={'#ffd700'} />
              </div>

              <div >
                <span className='fw-semibold'>Quantity</span>
                <button disabled={Quantity <= 1 || cart_state.cart.some(item => item._id === product._id)} onClick={() => decrease()} className='btn btn-dark m-3 px-3'>-</button>
                {Quantity}
                <button onClick={() => increase()} disabled={cart_state.cart.some(item => item._id === product._id)} className='btn btn-dark m-3 px-3'>+</button>
              </div>

              <div className=' mb-5'>
                <Link to={''}>
                  <button className='btn btn-outline-danger px-5 py-2 rounded-0' disabled={cart_state.cart.some(item => item._id === product._id)} onClick={() => AddToCart(product)}>
                    <FontAwesomeIcon icon={faCartShopping} className='me-2 ' />
                    Add to cart
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>

        <div className='mt-5 text-center'>
          <h2>Review us</h2>
          <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam doloribus ut</p>
        </div>

        <div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: 100 }}
              defaultValue={review}
              onChange={(e) => setreview(e.target.value)}
            />
            <label htmlFor="floatingTextarea2">Comments</label>
          </div>
        </div>

        <div className="mt-3">
          Rate Us:
          <div className="d-flex align-items-center">
            <ReactStars
              count={5}
              size={24}
              onChange={ratingChanged}
              value={rating}
              color2={'#ffd700'} />

            <div className='ms-3'>({rating})</div>

          </div>
        </div>
        <button className='btn btn-dark my-3' onClick={submitReview}>Submit Reviews</button>

      </div>
    </>

  )
}