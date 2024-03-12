import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useNavigate } from 'react-router-dom';

function Loginscreen() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    const Error = ({ message }) => {
        return <div style={{ backgroundColor: 'red', color: 'white', padding: '20px', fontSize: '30px', marginRight: '10px', width: '100%', textAlign: 'center' }}>{message}</div>;
    };

    const navigate = useNavigate();

    async function Login() {

        const user = {
            email,
            password,
        }

        try {
            setloading(true)
            const result = (await axios.post('/api/users/login', user)).data
            setloading(false)
            localStorage.setItem("currentUser", JSON.stringify(result));
            navigate('/home');

        } catch (error) {
            console.log(error);
            setloading(false)
            seterror(true)
        }

    }

    return (
        <div>

            {loading && (<Loader />)}

            <div className='row justify-content-center mt-5'>

                <div className='col-md-5 mt-5'>

                    {error && (<Error message='Invalid Credentionals' />)}

                    <div className='bs'>

                        <h2>Login</h2>

                        <input type='text' className='form-control' placeholder='email'
                            value={email} onChange={(e) => { setemail(e.target.value) }} />

                        <input type='password' className='form-control' placeholder='password'
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />

                        <button className='btn btn-primary mt-3' onClick={Login}>Login</button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Loginscreen;