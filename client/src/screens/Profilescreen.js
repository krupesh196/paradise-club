import React, { useEffect, useState } from "react";
import { Tabs } from 'antd';
import { TabsProps } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';
import { Divider, Space, Tag } from 'antd';

const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {

        if (!user) {
            window.location.href = '/login'
        }

    })

    return (
        <div className="ml-5 mt-5">

            <Tabs>

                <TabPane tab='Profile' key='1'>

                    <div className="bs">
                        <h1>My Profile</h1>

                        <hr />

                        <p><b>Name :</b> {user.name}</p>
                        <p><b>Email :</b> {user.email}</p>
                        <p><b>Admin :</b> {user.isAdmin ? 'YES' : 'NO'}</p>
                    </div>

                </TabPane>
                <TabPane tab='Booking' key='2'>
                    <MyBookings />
                </TabPane>

            </Tabs>

        </div>
    )
}

export default Profilescreen;



export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setloading(true)
                const rooms = await axios.post('/api/bookings/getbookingsbyuserid/', { userid: user._id });
                setbookings(rooms.data);
                setloading(false)

            } catch (error) {
                console.log(error);
                setloading(false)
                seterror(error)
            }
        };

        fetchBookings();

        return () => {

        };
    }, [user._id]);



    async function cancelBooking(bookingid, roomid) {

        try {
            setloading(true)
            const result = (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(result);
            setloading(false)
            Swal.fire('Congrats', 'Your Booking has been cancelled', 'success').then(result => {
                window.location.reload();
            })
        } catch (error) {
            console.log(error);
            setloading(false)
            Swal.fire('Oops', 'Something Wrong', 'error')
        }

    }

    return (
        <div>

            <div className="row">

                <div className="col-md-6">

                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {

                        return (
                            <div className="bs">
                                <h1 className="text-center">My Booking</h1>

                                <hr />

                                <p><b>Room Name : </b>{booking.room}</p>
                                <p><b>Booking Id :</b> {booking._id}</p>
                                <p><b>Room Type :</b> {booking.type}</p>
                                <p><b>Amount :</b> {booking.totalamount}</p>
                                <p><b>Status :</b> {""}
                                    {booking.status == 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                                </p>

                                {booking.status !== 'cancelled' && (
                                    <div className="text-right">
                                        <button className="btn btn-primary" onClick={() => { cancelBooking(booking._id, booking.roomid) }}>CANCEL BOOKING</button>
                                    </div>
                                )}

                            </div>
                        )
                    }))}

                </div>

            </div>

        </div>
    );
}