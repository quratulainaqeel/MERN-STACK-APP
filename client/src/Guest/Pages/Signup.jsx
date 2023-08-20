import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Sigup() {

    // const [FormData, setFormData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     phonNo: '',
    //     password: '',
    //     retypePassword: '',
    //     DOB: '',
    //     Gender: ''
    // })
    // const { firstName, lastName, email, phonNo, password, retypePassword, DOB, Gender } = FormData

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [username, setusername] = useState("")

    const Handlevent = (e) => {
        e.preventDefault();
        const payload = {
            username: username,
            email: email,
            password: password
        }
        axios.get('http://localhost:3000/api/get-all-user')
            .then((response) => {
                const users = response.data.User;

                const userExists = users.some(user => user.email === email);

                if (userExists) {
                    Swal.fire({
                        title: 'User Already Exists',
                        text: 'The provided email is already associated with an existing user.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        timer: 3000,
                    });
                }
                else {
                    const payload = {
                        username: username,
                        email: email,
                        password: password
                    };

                    axios.post('http://localhost:3000/api/signup', payload)
                        .then(json => {
                            console.log(json.data);

                        })
                        .catch(error => {
                            console.error(error);
                        });
                    Swal.fire({
                        title: 'Registration Successful!',
                        text: 'Your account has been created successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 3000,
                    })
                }
            })
            .catch(error => {
                console.error(error);
                // Show an error message using SweetAlert for API error
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while retrieving user data.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });

        setemail('')
        setpassword('')
        setusername('')

    }

    return (
        <>
            <div className="container  d-flex justify-content-center align-items-center " style={{ width: '100vw', height: '100vh' }}>
                {/* <img src="https://img.freepik.com/free-vector/security-concept-illustration_114360-497.jpg?w=740&t=st=1692175005~exp=1692175605~hmac=21bcebcfd7c3f88286ebe46ca2a1b3463f70d1ef47e45095dba5267d5e90974a" alt="" className='image-fluid ms-auto ' width={'45%'} height={'70%'}/> */}
                <div className='bg-light p-5 rounded'>
                    <h3 className='text-center mb-4'>Create your Account</h3>
                    <form onSubmit={Handlevent}>
                        <div className=" mb-3">

                            <div className="container">
                                <label className='form-label' htmlFor="\">Username</label>
                                <input type="text" name="" id=""
                                    placeholder='Enter Userame'
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                    required
                                />
                            </div>

                            {/* <div className="container">
                                <label className='form-label' htmlFor="\">Last Name</label>
                                <input type="text" placeholder='Enter Last Name' className="form-control" value={lastName} onChange={(e) => setFormData({ ...FormData, lastName: e.target.value })
                                } />
                            </div> */}

                        </div>

                        <div className=" mb-3">
                            <div className="container">
                                <label className='form-label' htmlFor="\">Email</label>
                                <input type="email"
                                    placeholder='Enter your Email'
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* <div className="container">
                                <label className='form-label' htmlFor="\">Phone No</label>
                                <input type='number'
                                    placeholder='Enter Phome number'
                                    className="form-control"
                                    value={phonNo}
                                    onChange={(e) => setFormData({ ...FormData, phonNo: e.target.value })}
                                    required
                                />
                            </div> */}
                        </div>

                        <div className="  mb-3">

                            <div className="container">
                                <label className='form-label' htmlFor="\">Password</label>
                                <input type="password"
                                    placeholder='Create new Password'
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* <div className="container">
                                <label className='form-label' htmlFor="\">Retype Password</label>
                                <input type="password"
                                    placeholder='Retype Password'
                                    className="form-control"
                                    value={retypePassword}
                                    onChange={(e) => setFormData({ ...FormData, retypePassword: e.target.value })}
                                    required
                                />
                            </div> */}

                        </div>

                        {/* <div className=" d-flex mb-3">

                            <div className="container">
                                <label className='form-label' >Date of birth</label>
                                <input type="date"
                                    className="form-control"
                                    value={DOB}
                                    onChange={(e) => setFormData({ ...FormData, DOB: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="container">
                                <label className='form-label' >Gender</label>

                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios2"
                                        defaultValue="option2"
                                        value="male"
                                        onChange={(e) => setFormData({ ...FormData, Gender: e.target.value })}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="exampleRadios2"> Male</label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" defaultValue="option3"
                                        value={"female"}
                                        onChange={(e) => setFormData({ ...FormData, Gender: e.target / value })}
                                        required
                                    />
                                    <label className="form-check-label"> Female</label>
                                </div>

                            </div>

                        </div> */}

                        <div className="d-grid col-12 mx-auto mt-4">
                            <button className="btn btn-danger p-2" type='submit'>Sign Up</button>
                        </div>
                    </form>

                    <Link className='nav-link text-danger text-end' to="/login"><small><span className='text-dark'>Already a member ?</span> Login</small></Link>

                </div>
            </div>
        </>
    )
}