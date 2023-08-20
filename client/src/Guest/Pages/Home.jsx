import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../Component/SearchBar'
import Cart from '../Component/Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import Navigationbar from '../Component/Navigationbar'
import Footer from '../Component/Footer'
import HeaderSection from '../Component/HeaderSection'
import CategorySection from '../Component/CategorySection'
import BrandSection from '../Component/BrandSection'


export default function Home() {
  return (

    <div className="bg-light sticky-top  ">
      <div className="container pt-3 d-flex align-items-center ">

        <Link className='text-decoration-none d-flex' to={'/'}>
          <FontAwesomeIcon icon={faBagShopping} color='#dc3545' className='fs-2 pe-1' />
          <h2 className='text-danger '>Bonik</h2>
        </Link>

        <SearchBar />
        <Cart />
      </div>
      <Navigationbar />
      <HeaderSection />
      <BrandSection/>
      <CategorySection />
      <Footer />

    </div>
  )
}
