import React from 'react';
import { Link } from 'react-router-dom';

function Landingscreen() {
    return (

        <div className='row landing'>

            <div className='col-md-12 text-center typewriter'>

                <h2 className='hi1 mt-3' style={{ color: 'white', fontSize: '80px' }}>The Paradise Club</h2>
                <h1 className='hi2' style={{ color: 'white', marginTop: '30px' }}>" Welcome to The Paradise Club "</h1>
                <Link to='/home'>
                    <button className='btn btn-light mt-5 welcome_text'> Get Start ➡️ </button>
                </Link>

            </div>

        </div>

    )
}

export default Landingscreen;