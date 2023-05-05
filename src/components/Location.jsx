import React from 'react';
import './Location.css'


const Location = ({current}) => {

    






    return (
        <>
        <div class="container-fluid">
            <div class="row firstrow" id="forfirstdiv">
                <div class="col-sm-6" style={{color:"white"}}>
                    <br /><br /><h1 id="firstmedia" style={{fontSize:"30px"}}>{current.city},{current.country}</h1>
                    <br /><p style={{fontSize:"20px"}}>{current.date}</p>
                    <br /><p style={{fontSize:"20px"}}>Population:{current.population}</p>


                </div>
            </div>


        </div>
            
        </>
    );
}

export default Location;
