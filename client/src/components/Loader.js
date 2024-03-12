import React, { useState } from 'react';
import RingLoader from "react-spinners/RingLoader";

function Loader() {

    let [loading, setLoading] = useState(true);

    return (
        <div style={{ marginTop: '200px', marginLeft: '650px' }}>

            <div className="sweet-loading">

                <RingLoader
                    color='#36d7b7'
                    loading={loading}
                    cssOverride=''
                    size={150}
                />
            </div>

        </div>
    )
}

export default Loader;