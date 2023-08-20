import React from 'react'
import HeaderSection from '../Components/HeaderSection'
import CatagoriesSection from '../Components/CatagoriesSection'
import AllProductsPage from './AllProductsPage'
import FlashDealSection from '../Components/FlashDealSection'
import CommentsSection from '../Components/CommentsSection'
import BrandSection from '../Components/BrandSection'

export default function Home() {
  return (
    <>
      <div className="bg-light">
        <HeaderSection />
        {/* <FlashDealSection /> */}

        <div className="container">

          <div className="card bg-white mb-2 rounded-0" style={{ marginLeft: "-7px" }}>
            <div className="card-body">
              <h5 className="card-title text-danger">Brands</h5>
            </div>
          </div>
          <BrandSection />

        </div>

        <CatagoriesSection />
        {/* <CommentsSection /> */}

      </div>
    </>
  )
}
