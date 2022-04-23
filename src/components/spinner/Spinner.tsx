import React from "react";
import './spinner.scss';

const Spinner = ({ size }) => {
    return (
        <div className='spinner' style={{ width: size, height: size }}>
            <div className="spinner__fishes"></div>
        </div>
    );
}

export default Spinner;