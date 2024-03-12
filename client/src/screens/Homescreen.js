import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import 'antd/dist/antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function Homescreen() {

    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);

    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();

    const [duplicaterooms, setDuplicaterooms] = useState([]);
    const [searchkey, setSearchKey] = useState('');
    const [type, settype] = useState('all')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get('/api/rooms/getallrooms')).data;
                setrooms(data);
                setloading(false);
            } catch (error) {
                console.error(error);
                seterror(true);
                setloading(false);
            }
        };

        fetchData();

    }, []);

    // function filterByDate(dates) {
    //     setfromdate(moment(dates[0]).format('DD-MM-YYYY'));
    //     settodate(moment(dates[1]).format('DD-MM-YYYY'));
    // }


    // function filterBySearch() {
    //     const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()));
    //     setrooms(temprooms);
    // }

    return (
        <div className='container'>

            {/* <div className='row mt-5 bs'>
                <div className='col-md-2'>

                </div>

                <div className='col-md-5'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='🔍 Search Rooms'
                        value={searchkey}
                        onChange={(e) => { setSearchKey(e.target.value) }}
                        onKeyUp={filterBySearch}
                    />
                </div>

                <div className='col-md-3'>
                    <select className='form-control'>
                        <option value='all'>All</option>
                        <option value='pFremium'>Premium</option>
                        <option value='deluxe'>Deluxe</option>
                        <option value='luxury'>Luxury</option>
                    </select>
                </div>

            </div> */}

            <div className='row justify-content-center mt-3'>

                {loading ? (<></>) : rooms.length > 0 ? (rooms.map(room => (
                    <div className='col-md-9 mt-2' key={room.id}>
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>
                ))) : (<></>)}

            </div>

        </div>
    )
}

export default Homescreen;
