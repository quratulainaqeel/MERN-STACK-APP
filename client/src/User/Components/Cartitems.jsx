import React from 'react'
import { useState, useContext } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { Cartcontext } from '../Context/AddToCart/context'
import { GlobalContext } from '../../Context/Context'
import { decodeToken } from 'react-jwt'
import axios from 'axios'
import ModalLoader from './ModalLoader'
import Swal from 'sweetalert2'

export default function Cartitems() {
  const { cart_state, cart_dispatch } = useContext(Cartcontext)
  const { state, dispatch } = useContext(GlobalContext)
  const user = decodeToken(state.token)
  const [address, setaddress] = useState("")
  const [contact, setcontact] = useState("")
  const [loader, setloader] = useState(false)

  const total = cart_state?.cart?.reduce((accumulator, product) => accumulator + (product.price * product.Quantity), 0)

  const IncreaseQuantity = (_id, newQuantity) => {
    const payload = {
      _id,
      Quantity: newQuantity
    }
    // console.log(payload)
    cart_dispatch(
      {
        type: 'INCREASE_QUANTITY',
        payload
      }
    );
  };

  const DecreaseQuantity = (_id, newQuantity) => {
    const payload = {
      _id,
      Quantity: newQuantity
    }
    // console.log(payload)
    cart_dispatch(
      {
        type: 'DECREASE_QUANTITY',
        payload
      }
    );
  };


  const deleteProduct = (_id) => {
    return cart_dispatch({
      type: 'DELETE_ITEM',
      payload: _id
    })
  }

  const Checkout = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Confirm Checkout',
      text: 'Are you sure you want to proceed with the checkout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setloader(true)
        const payload = {
          items: cart_state.cart,
          totalBill: total,
          customerAddress: address,
          customerContact: contact,
          customerName: user.username,
          customerEmail: user.email
        }
        axios.post('/api/create-order', payload).then(json => {
          console.log(json.data);
          setloader(false)
        Swal.fire('Order Placed!', 'Your order has been placed successfully.', 'success');


        })
          .catch(error => { console.error(error); });
      }
    })


  }

  return (
    <>
      <div className="container">
        <div className="text-center my-5">
          <h2>Shopping Cart</h2>
          <p className="text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius totam nostrum voluptatibus culpa accusamus.
          </p>
        </div>
        <div className='d-flex justify-content-end mb-2'>
          <div className="btn btn-danger px-4 py-2 "
            onClick={() =>
              cart_dispatch(
                {
                  type: "CLEAR_CART"
                }
              )
            }
          >Clear Cart</div>

        </div>
        {cart_state?.cart?.map((val, key) => (
          <div className="card mb-3 shadow-sm border border-danger w-100" key={key} style={{ height: '29vh' }} >
            <div className="row g-0">
              <div className="col-md-3">
                <img
                  src={val.thumbnail}
                  className="img-fluid rounded-start bg-outline-danger object-fit-contain"
                  style={{
                    width: '100%',
                    height: '28vh',
                    objectFit: 'cover',
                  }}
                  alt="cart-image"
                />
              </div>

              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">
                    {val.name}
                  </h5>
                  <p className="card-text">
                    {val?.description?.length > 100 ? val.description.slice(0, 100) + '...' : val.description}
                  </p>
                  <span className="fw-bold text-danger">$ {val.Quantity * val.price}</span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="my-3 d-flex align-items-center justify-content-center">
                  <div>
                    <button disabled={val.Quantity <= 1} onClick={() => DecreaseQuantity(val._id, val.Quantity + 1)} className='btn btn-outline-dark m-3 px-3'>-</button>

                    {val.Quantity}

                    <button onClick={() => IncreaseQuantity(val._id, val.Quantity + 1)} className='btn btn-outline-dark m-3 px-3'>+</button>
                  </div>
                  <button className="btn btn-danger" onClick={() => deleteProduct(val._id)}>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="border border-dark border-3 bg-light px-5 py-3 rounded d-flex justify-content-around align-items-center">
          <h6>Total</h6>
          <div className='text-danger'>{total}</div>
        </div>

        <form onSubmit={Checkout}>
          <div className="row mt-4">
            <div className="col">
              <input type="text" className="form-control" placeholder="Address" required
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Contact No" required
                onChange={(e) => setcontact(e.target.value)}
              />
            </div>
          </div>
          <div className="container mt-3 d-flex justify-content-center">
            <button className="  btn btn-dark" type="submit" >CheckOut</button>
          </div>
        </form>



        {loader ? <ModalLoader /> : null}
      </div>

    </>

  )
}