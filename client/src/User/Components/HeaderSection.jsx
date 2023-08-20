import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import banner1 from '../Images/banner1.png'
import banner2 from '../Images/banner2.png'
import banner3 from '../Images/banner3.png'

export default function HeaderSection() {

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-white mb-3">
        
          <div className="container">
            <Carousel>

              <Carousel.Item>
                {/* <Link className='text-decoration-none' to={'/products/category/mens-watches'}>                  */}
                  <img src= {banner1} alt="First slide" className='img-fluid'/>
                {/* </Link> */}
              </Carousel.Item>

              <Carousel.Item>
                {/* <Link className='text-decoration-none' to={'/products/category/mens-shoes'}>                  */}
                  <img src={banner2} alt="second slide" className='img-fluid'/>
                {/* </Link> */}
              </Carousel.Item>

              <Carousel.Item>
                {/* <Link className='text-decoration-none' to={'/products/category/mens-shirts'}>                  */}
                  <img src={banner3} alt="third slide" className='img-fluid'/>
                {/* </Link> */}
              </Carousel.Item>

            </Carousel>
          </div>
      
      </div>
    </>
  )
}
