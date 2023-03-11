import React from "react";
import "../../components/admin/chart.css"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartS = () =>{
  

  const data = [
    {
      name: "Barcha murojaatlar",
      pv: 1400,
    },
    {
      name: "Ko'rib chiqilgan murojaatlar",
      pv:100,
    },
    {
      name: 'Bajarilgan murojaatlar',
      pv: 100,
    },
  ];

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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{padding:"10px"}} className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
          <p className="desc" >Andijon Davlat Universiteti</p>
        </div>
      );
    }
  
    return null;
  };

    return(
       <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="pv" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    )
}

export default ChartS;