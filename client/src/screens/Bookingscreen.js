import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

function Bookingscreen() {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();

    const { roomid, fromdate, todate } = useParams();

    useEffect(() => {
        console.log("fromdate:", fromdate);
        console.log("todate:", todate);
        const fetchData = async () => {

            if (!localStorage.getItem('currentUser')) {
                window.location.reload = '/login'
            }

            try {
                setloading(true);
                const data = (await axios.post('/api/rooms/getroombyid', { roomid, fromdate, todate })).data;
                setroom(data);
                setloading(false);
            } catch (error) {
                setloading(false);
                seterror(true);
            }
        };

        fetchData();

    }, [roomid, fromdate, todate]);


    async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            room,
            roomid,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            token,
        }

        try {
            setloading(true);
            const result = await axios.post('/api/bookings/bookroom', bookingDetails);
            setloading(false);
            Swal.fire('Congratulation', 'Your Room Booked Successfully', 'success').then(result => {
                window.location.href = '/profile';
            })
        } catch (error) {
            setloading(false)
            Swal.fire('OOPS', 'Something Wrong', 'error')
        }
    }

    let totalamount = room ? room.rentperday : 0;

    return (
        <div className="m-5">

            {loading ? (<Loader />) : room ? (<div>

                <div className="row justify-content-center mt-5 bs">

                    <div className="col-md-6">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className="bigimg" />
                    </div>

                    <div className="col-md-6">

                        <div style={{ textAlign: "right" }}>

                            <b>
                                <h1>Booking Details</h1>
                                <hr />

                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                                <p>Bed : {room.bad}</p>
                                <p>Max Count : {room.maxcount}</p>
                                <p>Room Type : {room.type}</p>
                            </b>

                        </div>

                        <div style={{ textAlign: "right", marginTop: '60px' }}>

                            <b>
                                <h1>Amount</h1>
                                <hr />

                                <p>Rent : {room.rentperday}  </p>
                                <p>Total Amount : {room.rentperday} </p>
                            </b>

                        </div>

                        <div style={{ float: "right" }}>

                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency="INR"
                                stripeKey="pk_test_51OmZRFSDo4RCNv1uz6dX4jocjjq5HtsEPaPKC3yAHVNmOrGfwvKS98ffgsLkDUWJmF0aGaCBpLW815q5aBpk9HoL00t5ZUajdU"
                            >

                                <button className="btn btn-primary">
                                    Pay Now
                                </button>

                            </StripeCheckout>

                        </div>

                    </div>

                </div>

            </div>) : (<Error />)}

        </div>
    );
}

export default Bookingscreen;
