import React, { useEffect, useState } from 'react'
import CategoryModal from '../Components/CategoryModal'
import axios from 'axios'
import PagesLoader from '../Components/PagesLoader'
import { RiDeleteBin6Line } from 'react-icons/ri'
import UpdateModal from '../Components/UpdateCategoryModal'
import { Navigate } from 'react-router-dom'

export default function Orders() {
  const [order, setorder] = useState([])
  const [loader, setloader] = useState(true)

  useEffect(() => {
    axios.get('/api/get-all-order')
      .then((json) => {
        setorder(json.data.orders)
        setloader(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {
        loader ? <PagesLoader /> :
          <div className="container">
            <div className="rounded d-flex justify-content-between bg-light p-2 my-3 border border-danger">
              <span className='fs-4 fw-semibold text-dark'>Order Details</span>
              {/* <CategoryModal recalldata={setorder} /> */}
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">CustomerName</th>
                  <th scope="col">Tracking_ID</th>
                  <th scope="col">Status</th>

                </tr>
              </thead>
              <tbody>
                {
                  order.map((val, key) =>
                    <tr key={key} className='align-middle'>
                      <th scope="row">{key + 1}</th>
                      <td>{val.customerName}</td>
                      <td>{val.order_at}</td>
                      <td>Delivered</td>


                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
      }
    </>
  )
}
