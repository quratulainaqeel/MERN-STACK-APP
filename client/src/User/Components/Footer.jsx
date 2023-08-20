import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
export default function Footer() {
  return (
    <>
      <footer
        className="card text-center text-white pt-5 pb-5 bg-dark mt-3"
      >
        <h1 className="card-title p-4 text-WHITE fw-bold" data-aos="fade-up">
          Bonik.
        </h1>
        <em className="card-text" data-aos="fade-up">
          Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi
          fuga maxime saepe commodi placeat.
        </em>
        <div
          className="container"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay={300}
          data-aos-offset={0}
        >
          <div className="row">
            <div>
              <small>© Copyright Bocor. All Rights Reserved</small>
            </div>
            <div>
              <small>
                Designed by <span className="text-danger"> Quratulain</span>
              </small>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}
