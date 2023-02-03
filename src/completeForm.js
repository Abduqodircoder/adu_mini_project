import React, {useEffect, useState} from 'react';
import { Select, Input  } from 'antd';
import AOS from "aos"

function CompleteForm(props) {

    const [select, setSelect] = useState([
        {
            value:"first",
            label: "O'quv jarayoni bo'yicha",
        },
        {
            value:"second",
            label: "Ilmiy jarayon bo'yicha",
        },
        {
            value:"third",
            label: "Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha",
        },
        {
            value:"fourth",
            label: "Kadrlar tizimi bo'yicha",
        },
        {
            value:"fives",
            label: "Ta'lim sifatini oshirish bo'yicha",
        },
        {
            value:"six",
            label: "Ta'lim sifatini oshirish bo'yicha",
        },
        {
            value:"seven",
            label: "Sirtqi ta'lim  bo'yicha",
        },
        {
            value:"eight",
            label: "Magistratura bo'yicha",
        },
        {
            value:"nine",
            label: "Moddiy-texnik baza bilan ta'minlash bo'yicha",
        },
        {
            value:"ten",
            label: "Shaxsiy muammo va takliflar ",
        },
        {
            value:"eleven",
            label: "Umumiy",
        },
        ])

    const handleChange = (value) => {
        setLabel(value.label)
    };

    const [textarea, seTextarea] = useState("")
    const [textarea2, seTextarea2] = useState("")
    const [textarea3, seTextarea3] = useState("")
    const [label, setLabel] = useState("")
    const { TextArea } = Input;



    useEffect(()=>{
        AOS.init(
            {
            duration:1000
        }
        )
    })


    return (
         <div className="container">
             <div className="row">
                 <div className="col-12">
                     <div data-aos="zoom-in">
                         <label className="for_label" htmlFor="">
                             Taklif, tashabbus va mavjud muammolar yechimi taklif etilayotgan sohani tanlang
                         </label>
                         <div>
                             <Select
                                 className="for_select mt-2"
                                 labelInValue style={{width: 120,}}
                                 onChange={handleChange} options={select}
                             />
                         </div>
                     </div>
                     <div data-aos="zoom-in" className="mt-5">
                         <label className="for_label" htmlFor="">Taklif va tashabbuslar</label>
                         <div> <TextArea onChange={(e)=>seTextarea(e.target.value)} className="for_textarea" rows={4} /></div>
                     </div>
                     <div data-aos="zoom-in" className="mt-5">
                         <label className="for_label" htmlFor="">Shikoyatlar uchun</label>
                         <div> <TextArea onChange={(e)=>seTextarea2(e.target.value)} className="for_textarea" rows={4} /></div>
                     </div>
                     <div data-aos="zoom-in" className="mt-5">
                         <label className="for_label" htmlFor="">Muammo va kamchiliklar</label>
                         <div> <TextArea onChange={(e)=>seTextarea3(e.target.value)} className="for_textarea" rows={4} /></div>
                     </div>
                     <div data-aos="zoom-in"  className="big_button2">
                         <button onClick={()=>{console.log(label, textarea3, textarea2, textarea)}} className="for_button">Jo'natish</button>
                     </div>
                 </div>
             </div>
         </div>
    );
}

export default CompleteForm;