import React, { useState } from 'react';
import Location from '../components/Location';
import Temperature from '../components/Temperature';
import Week from '../components/Week';
import "./Home.css"
import axios from 'axios';
import Loading from '../components/Loading';


const Home = () => {
    // const [search,SetSearch]=useState({})

    const[state,SetState]=useState({
        value:"",
        current:{},
        weekInfo:[],
        loading:false,
        error:false



    })
    // console.log(inputs);

    const changeInput=(event)=>{
        SetState({
            ...state,
            value:event.target.value
        })
        
        // const value=event.target.value

        // SetInput({inputs,[name]:value})
        // console.log(inputs)
    }

    const changeClick=()=>{

        SetState({
            ...state,
            loading:true
        })


      

        
        
    axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${state.value}&units=metric&cnt=7&appid=d94bcd435b62a031771c35633f9f310a`).then(data=>{
        console.log("heredata===>",data)

        // const datas=data.data
        const months=['January','February','March','April','May','June','July','August','September','October','November','December']
        const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        
        const Currentdate= new Date()
        console.log("currentdate==>",Currentdate);
    
        console.log("currentday==>",Currentdate.getDay());
        console.log("month==>",Currentdate.getMonth());
        const date= `${days[Currentdate.getDay()]} ${Currentdate.getDate()} ${months[Currentdate.getMonth()]}`
        console.log("Datee===>",date);
        

        const sunset=new Date(data.data.list[0].sunset*1000).toLocaleTimeString().slice(0,4)
        const sunrise=new Date(data.data.list[0].sunrise*1000).toLocaleTimeString().slice(0,4)




        const current={
            city:data.data.city.name,
            country:data.data.city.country,
            population:data.data.city.population,
            timezone:data.data.city.timezone,
            date,
            sunrise,
            sunset,
            Temperature:data.data.list[0].temp.day,
            humidity:data.data.list[0].humidity,
            rain:data.data.list[0].rain,
            pressure:data.data.list[0].pressure,
            wind:data.data.list[0].speed,
            description:data.data.list[0].weather[0].description,

        }
        console.log("current==>",current)

        console.log("weekinfoo==>",data.data.list[0].weather[0])

        const day=`${days[Currentdate.getDay()]}`
        
        const weekData=data.data.list
        console.log(weekData);
        const weekInfo=weekData.map((weekdetails) => {
        return{
            day:new Date(weekdetails.dt*1000).toLocaleString('en-Us',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).slice(0,3),
            main:weekdetails.weather[0].main,
            description:weekdetails.weather[0].description,
            icn:weekdetails.weather[0].icon,
            min:weekdetails.temp.min,
            max:weekdetails.temp.max

        }
        
    })
    console.log("weekdetails",weekInfo);


    SetState({
        ...state,
        current,
        weekInfo,
        loading:false,
        error:false
    })
    




    }).catch((err)=>{
        console.log("error",err);
        SetState({
        ...state,
        loading:false,
        err:true,
        current:{},
        weekInfo:[]

        })
        
   })

}

    console.log(state.current.city);
    
    console.log("state.loading",state.loading)

    
    
    return (
        <>

    {/* {state.loading===true? <Loading /> :<>bye</> } */}
    
    
        <div class="container-fluid" id="bgg"><br />
            <div class="col-sm-12"  >
                
                
                <div id="forbar"  style={{display:"flex",justifyContent:"center"}}>
                <input name='name' onChange={changeInput}  type="search" placeholder="Search" style={{borderRadius:"9px",width:"30vh"}} />
                <button class="btn btn-outline-success" onClick={changeClick} style={{color:"white"}} type="submit">Search</button>
                </div><br />
                {state.loading===true? <Loading /> : 
                <div>
                    {state.current.city!==undefined ?  
                    <div>

                        <div class="col-sm-12" style={{display:"flex"}}>
                            
                            <div class="col-sm-5 container-fluid" style={{flex:"1"}}><Location current={state.current} /></div>
                            <div class="col-sm-5 container-fluid" style={{flex:"1"}}><Temperature current={state.current} /></div>
                            
                            
                        </div><br /><br />
                
                        <div class="col-sm-12">
                            <div><Week weekdata={state.weekInfo} /></div>
                        </div>
                    </div>
                    : state.err? 
                
                    <h5 style={{textAlign:"center"}}>Sorry!!!! we don't have any information on specified location</h5>
                
                    :
                    <div>

                    </div>
                    }

                </div>

                }

               


            </div>



        </div>
            


        </>
    );
}

export default Home;
