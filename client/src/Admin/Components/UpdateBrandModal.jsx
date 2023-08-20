import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ModalLoader from './ModalLoader';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AiOutlineEdit } from 'react-icons/ai'


export default function UpdateBrandModal({ recalldata, brandname }) {
    const [show, setShow] = useState(false);
    const [BrandImage, setBrandImage] = useState(null)
    const [loader, setloader] = useState(false)

    const handleClose = () => {
        setShow(false);
    }

    const UpdateBrand = (e) => {
        e.preventDefault();
        setloader(true)

        const storageRef = ref(storage, `Images/Brand${BrandImage.name}`);
        uploadBytes(storageRef, BrandImage).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    const payload = {
                        BrandName: brandname,
                        BrandImage: url
                    };

                    axios.put('/api/update-brand', payload)
                        .then((json) => {
                            recalldata(json.data.Brand);
                            setloader(false);
                            handleClose();

                            Swal.fire({
                                title: "Brand Updated Successfully!",
                                text: "The brand has been updated successfully.",
                                icon: "success",
                                confirmButtonText: "OK",
                                timer: 2000
                            });
                        })
                        .catch((err) => console.log(err));

                })
                .catch((error) => {
                    console.log(error);
                    setloader(false);
                });
        });


        console.log({ brandname })
    }
    return (
        <>
            <div className="btn btn-dark ms-1" onClick={() => {
                setShow(true)
            }}>
                <AiOutlineEdit />
            </div>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateBrand}>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Brand Image
                            </label>
                            <input className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) => setBrandImage(e.target.files[0])}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    {loader ? <ModalLoader /> : null}
                </Modal.Body>
            </Modal>
        </>
    );
}