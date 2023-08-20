import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function CommentsSection() {

    const [comments, setcomments] = useState([])

    useEffect(() => {
        axios.get('https://dummyjson.com/comments').then(json => setcomments(json.data.comments))
    }, [])

    return (
        <>
            <div className="container">

                <div className="text-center my-5">
                    <h2>Reviews</h2>
                    <p className="text-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam inventore ea ut eum nulla, suscipit labore doloremque. Qui consequuntur facere cupiditate, quis harum porro veniam et a, quidem, sed at!</p>
                </div>

                

                    <Carousel data-bs-theme="dark" controls={false} >
                    {comments.map((val, key) =>
                        <Carousel.Item key={key}>
                            <Card className='m-5 p-5'>
                                <Card.Body>
                                    <Card.Title>{val.user.username}</Card.Title>
                                    <Card.Text>
                                       {val.body}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                        )}
                    </Carousel>


                

            </div>
        </>
    )
}
