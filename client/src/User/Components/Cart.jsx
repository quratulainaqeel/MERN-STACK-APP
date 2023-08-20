import Button from 'react-bootstrap/Button';
import { Offcanvas } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { Cartcontext } from '../Context/AddToCart/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Cartitems from './Cartitems';
import { Link } from 'react-router-dom';

export default function Cart() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cart_state, cart_dispatch } = useContext(Cartcontext)

  console.log(cart_state)
  return (
    <>
      <Link to={'/cartitems'}>
        <Button onClick={handleShow} className="btn-light">
          <div className='position-relative'>
            <FontAwesomeIcon icon={faCartShopping} color='black' className='fs-2' />
            <span className="position-absolute translate-middle badge rounded-pill bg-danger">

              {cart_state?.cart?.length||0}

              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
        </Button>
      </Link>

      {/* <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body> */}
      {/* {
            cart_state?.cart?.map((val, key) => <Cartitems key={key} data = {val}/>)
          } */}
      {/* <Cartitems/> */}
      {/* </Offcanvas.Body>
        <div>
          total Amount
        </div>
      </Offcanvas> */}
    </>
  )
}
