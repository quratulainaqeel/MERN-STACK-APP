import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import baner_01 from '../Images/baner_01.png'
// import baner_02 from '../Images/baner_02.jpg'

// import baner_01 

export default function HeaderSection() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-white">
        
          <div className="container">
            <Carousel>

              <Carousel.Item>
                <Link className='text-decoration-none' to={'/products/category/mens-watches'}>                 
                  <img src={baner_01} alt="First slide" className='img-fluid' style={{objectFit:'contain'}} />
                </Link>
              </Carousel.Item>

              <Carousel.Item>
                <Link className='text-decoration-none' to={'/products/category/mens-shoes'}>                 
                  <img src={baner_01} alt="second slide" className='img-fluid' height={'70vh'}/>
                </Link>
              </Carousel.Item>

              <Carousel.Item>
                <Link className='text-decoration-none' to={'/products/category/mens-shirts'}>                 
                  <img src={baner_01} alt="third slide" className='img-fluid'/>
                </Link>
              </Carousel.Item>

            </Carousel>
          </div>
      
      </div>
  )
}
