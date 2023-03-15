import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../BaseUrl";
import "../../components/admin/chart.css"
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartS = () =>{
  

  // const data = [
  //   {
  //     name: "Barcha murojaatlar",
  //     pv: 1400,
  //   },
  //   {
  //     name: "Ko'rib chiqilgan murojaatlar",
  //     pv:100,
  //   },
  //   {
  //     name: 'Bajarilgan murojaatlar',
  //     pv: 100,
  //   },
  // ];

  // const getIntroOfPage = (label) => {
  //   if (label === 'Barcha takliflar') {
  //     return "Page A is about men's clothing";
  //   }
  //   if (label === 'Page B') {
  //     return "Page B is about women's dress";
  //   }
  //   if (label === 'Page C') {
  //     return "Page C is about women's bag";
  //   }
  //   if (label === 'Page D') {
  //     return 'Page D is about household goods';
  //   }
  //   if (label === 'Page E') {
  //     return 'Page E is about food';
  //   }
  //   if (label === 'Page F') {
  //     return 'Page F is about baby food';
  //   }
  //   return '';
  // };

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div style={{padding:"10px"}} className="custom-tooltip">
  //         <p className="label">{`${label} : ${payload[0].value}`}</p>
  //         {/* <p className="intro">{getIntroOfPage(label)}</p> */}
  //         <p className="desc" >Andijon Davlat Universiteti</p>
  //       </div>
  //     );
  //   }
  
  //   return null;
  // };

  const [statistic, setStatistic] = useState([])

  const getStatistic = () =>{
    axios.get(BaseUrl +"/api/admin",{
      headers:{
        "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
    }
    }).then((res)=>{
      console.log(res.data)
      setStatistic(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }
  
  useEffect(()=>{
    getStatistic()
  },[])

    return(
       <div className="container" style={{}}>
        <div className="row">
          <div className="col-12 shadow" style={{fontSize:"25px", fontWeight:"bold", height:"50px", display:"flex", alignItems:"center", justifyContent:"center"}}>Andijon davlat universiteti murojaatlari</div>
        </div>
         <div className="row mt-5" style={{display:"flex", justifyContent:"space-between"}}>
           <div style={{borderRadius:"8px",padding:"10"}} className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 shadow">
             <div className="card mb-2" style={{display:"flex", height:"220px", alignItems:"center", justifyContent:"center"}}>
              <div className="card-body text-center">
                <p style={{fontSize:"50px",fontWeight:"bold"}}>{statistic.all}</p>
                <hr/>
                <h3>Barcha murojaatlar</h3>
              </div>
             </div>
           </div>
           <div style={{borderRadius:"8px",padding:"10"}} className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 shadow">
             <div className="card mb-2" style={{display:"flex", height:"220px", alignItems:"center", justifyContent:"center"}}>
              <div className="card-body text-center" >
                <p style={{fontSize:"50px",fontWeight:"bold"}}>{statistic.done}</p>
                <hr/>
                <h3>Bajarilgan murojaatlar</h3>
              </div>
             </div>
           </div>
           <div style={{borderRadius:"8px",padding:"10"}} className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 shadow">
             <div className="card mb-2" style={{display:"flex", height:"220px", alignItems:"center", justifyContent:"center"}}>
              <div className="card-body text-center" >
                <p style={{fontSize:"50px",fontWeight:"bold"}}>{statistic.fails}</p>
                <hr/>
                <h3>Ko'rib chiqilgan murojaatlar</h3>
              </div>
             </div>
           </div>
         </div>
       </div>
    )
}

export default ChartS;