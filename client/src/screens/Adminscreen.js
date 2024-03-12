import React, { useState, useEffect, Component } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Swal from 'sweetalert2';

const { TabPane } = Tabs;

// Bookings List Component

export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = (await axios.post("/api/bookings/getallbookings")).data;
                setBookings(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1 className='text-center'>Bookings</h1><br />
                {loading && <Loader />}

                <table className='table table-dark table-bordered '>
                    <thead>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>Room Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? <Loader /> : (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.type}</td>
                                <td>{booking.totalamount}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))}

                    </tbody>

                </table>

            </div>
        </div>
    );
}

// END of Bookings List Component





// Rooms List Component

export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("/api/rooms/getallrooms"); // Change to GET request
                const data = response.data;
                setRooms(data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching rooms:", error);
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1 className='text-center'>Rooms</h1><br />
                {loading && <Loader />}

                <table className='table table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th>Room Name</th>
                            <th>Rooms Id</th>
                            <th>Bed</th>
                            <th>Room Type</th>
                            <th>Max Count</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? <Loader /> : (rooms.map(room => {
                            return (
                                <tr>
                                    <td>{room.name}</td>
                                    <td>{room._id}</td>
                                    <td>{room.bad}</td>
                                    <td>{room.type}</td>
                                    <td>{room.maxcount}</td>
                                    <td>{room.rentperday}</td>
                                </tr>
                            );
                        }))}
                    </tbody>

                </table>

            </div>
        </div>
    );
}

// END of Rooms List Component





// Users List Component

export function Users() {
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users/getallusers"); // Change to GET request
                const data = response.data;
                setusers(data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (

        <div className='row'>

            <div className='col-md-12'>

                <h1 className='text-center'>Users</h1><br />
                {loading && <Loader />}

                <table className='table table-dark table-bordered'>

                    <thead>

                        <tr>
                            <th>User Name</th>
                            <th>User Id</th>
                            <th>User Email</th>
                            <th>Is Admin</th>
                        </tr>

                    </thead>

                    <tbody>

                        {users && (users.map(user => {

                            return <tr>
                                <td>{user.name}</td>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                            </tr>

                        }))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

// END of Users List Component





// Add-Rooms List Component

export function Addroom() {

    const [loading, setLoading] = useState(false);
    const [name, setname] = useState('')
    const [rentperday, setrentperday] = useState()
    const [maxcount, setmaxcount] = useState()
    const [description, setdescription] = useState()
    const [type, settype] = useState()
    const [imageurl, setimageurl] = useState()

    async function addRoom() {

        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            type,
            imageurl,
        }

        try {

            setLoading(true)
            const result = await (await axios.post('/api/rooms/addroom', newroom)).data
            console.log(result);
            setLoading(false)
            Swal.fire('Congratulation', 'Your New Room Added Successfully', 'success').then(result => {
                window.location.href = '/home'
            })

        } catch (error) {

            console.log(error);
            setLoading(false)
            Swal.fire('Oops', 'Smething Wrong', 'error')

        }

    }

    return (

        <div className='row ts'>

            <div className='col-md-5'>

                {loading && <Loader />}

                <input type='text' className='form-control' placeholder='Enter Room Name'
                    value={name} onChange={(e) => { setname(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Rent Per Day'
                    value={rentperday} onChange={(e) => { setrentperday(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Max Count'
                    value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }}
                />


            </div>

            <div className='col-md-5'>

                <input type='text' className='form-control' placeholder='Enter Room Type'
                    value={type} onChange={(e) => { settype(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Image URL'
                    value={imageurl} onChange={(e) => { setimageurl(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='Description'
                    value={description} onChange={(e) => { setdescription(e.target.value) }}
                />

                <div className='text-right'>

                    <button className='btn btn-primary mt-3' onClick={addRoom}>Add Room</button>

                </div>

            </div>

        </div>

    )

}

// END of Add-Rooms List Component





function Adminscreen() {

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = '/home';
        }

    }, [])

    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h1 className='text-center mb-4' style={{ fontSize: '35px' }}><b>Admin Panel</b></h1>
            <Tabs defaultActiveKey='1'>
                <TabPane tab='Bookings' key='1'>
                    <Bookings />
                </TabPane>
                <TabPane tab='Rooms' key='2'>
                    <Rooms />
                </TabPane>
                <TabPane tab='Add Room' key='3'>
                    <Addroom />
                </TabPane>
                <TabPane tab='Users' key='4'>
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Adminscreen;
