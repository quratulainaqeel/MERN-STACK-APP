import React, { useEffect } from 'react'
import { FiHome } from 'react-icons/fi'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { SiBrandfolder } from 'react-icons/si'
import {BsCart3} from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {

  const location = useLocation()

  const NavItems = [
    {
      tab: "Home",
      url: "/",
      icon: <FiHome />, 
      
      
    },
    {
      tab: "Categorys",
      url: "/category",
      icon: <BiCategory />
    },
    {
      tab: "Brands",
      url: "/brand",
      icon: <SiBrandfolder />
    },
    {
      tab: "Products",
      url: "/product",
      icon: <BsCart3/>
    },
    {
      tab: "Orders",
      url: "/orders",
      icon: <MdProductionQuantityLimits />
    }
  ]

  return (
    <>
      <div className="d-flex justify-content-between">
        <span className='text-light fs-3 '>Admin</span>
      </div>
      <ul className="nav flex-column mt-3">
        {
          NavItems.map((val, key) =>

            <li className={`nav-item p-2 ${location.pathname == val.url ? 'bg-danger rounded' : null}`} key={key}>
              <Link className="nav-link text-white d-flex align-items-center gap-2 " to={val.url}>
                {val.icon}
                {val.tab}
              </Link>
            </li>
          )}
      </ul>
    </>
  )
}