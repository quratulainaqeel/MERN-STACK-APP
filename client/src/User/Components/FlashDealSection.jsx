import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'

export default function FlashDealSection() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then(json => setAllProducts(json.data.products))
  }, []);

  // Get unique categories
  const uniqueCategories = [...new Set(allProducts.map(product => product.category))];

  // Shuffle the array to get random products
  const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());

  // Get 8 products with different categories
  const filteredProducts = shuffledProducts.filter((product, index) => {
    return uniqueCategories.includes(product.category) && index < 8;
  });

  return (
    <div className="container mt-4">
      <div className="card bg-white mb-2 rounded-0" style={{ marginLeft: "-7px" }}>
        <div className="card-body d-flex">
        <FontAwesomeIcon icon={faBolt} color='#dc3545' className='fs-4 me-2' />
          <h5 className="card-title text-danger fw-semibold ">Flash Deals</h5>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {filteredProducts.map((product, index) => (
            <div className="col-md-3 my-3" key={index}>
              <Link className='text-decoration-none' to={`/products/${product.id}`}>
                <Card>
                  <Card.Img src={product.thumbnail} className='object-fit-cover border rounded img-fluid' style={{ height: "180px" }} />

                  <span className="position-absolute translate-start badge bg-danger" style={{
                    padding: '5px 10px',
                    marginTop: '10px',
                    marginLeft: '-4px',
                    borderRadius: '4px'
                  }}>
                    {product.category.toUpperCase()}
                  </span>

                  <Card.Body>
                    <div className="brand text-center">
                      <span>Brand:  </span>
                      <span className="fw-semibold">{product.brand}</span>
                    </div>

                    <div className="text-center">
                      {product.title}
                    </div>

                    <div className='text-center' >
                      <span className='text-decoration-line-through me-2 text-secondary'>${product.price}</span>
                      <span className='fw-semibold'>${Math.floor(product.price - product.price * (product.discountPercentage / 100))}
                      </span>
                      <span className='text-danger ms-2'>({product.discountPercentage.toFixed(0)}% off)</span>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
