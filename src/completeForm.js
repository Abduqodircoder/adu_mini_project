import React, {useEffect, useState} from 'react';
import { Select, Input  } from 'antd';
import AOS from "aos"

function CompleteForm(props) {

    const [select, setSelect] = useState([
        {
            value:"O'quv jarayoni bo'yicha",
            label: "O'quv jarayoni bo'yicha",
        },
        {
            value:"Ilmiy jarayon bo'yicha",
            label: "Ilmiy jarayon bo'yicha",
        },
        {
            value:"Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha",
            label: "Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha",
        },
        {
            value:"Kadrlar tizimi bo'yicha",
            label: "Kadrlar tizimi bo'yicha",
        },
        {
            value:"Innovatsion g'oya va takliflarga oid",
            label: "Innovatsion g'oya va takliflarga oid",
        },
        {
            value:"Ta'lim sifatini oshirish bo'yicha",
            label: "Ta'lim sifatini oshirish bo'yicha",
        },
        {
            value:"Sirtqi ta'lim  bo'yicha",
            label: "Sirtqi ta'lim  bo'yicha",
        },
        {
            value:"Magistratura bo'yicha",
            label: "Magistratura bo'yicha",
        },
        {
            value:"Moddiy-texnik baza bilan ta'minlash bo'yicha",
            label: "Moddiy-texnik baza bilan ta'minlash bo'yicha",
        },
        {
            value:"Shaxsiy muammo va takliflar ",
            label: "Shaxsiy muammo va takliflar ",
        },
        {
            value:"Umumiy",
            label: "Umumiy",
        },
        ])

    const handleChange = (value) => {
        setLabel(value.label)
    };

    const [value, setValue] = useState("")
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
       <>
         <div>
             <div data-aos="zoom-in-right">
                 <label className="for_label" htmlFor=""> Taklif, tashabbus va mavjud muammolar yechimi taklif etilayotgan sohani tanlang</label>
                 <div>
                     <Select className="for_select mt-2" labelInValue style={{width: 120,}} onChange={handleChange} options={select}/>
                 </div>
             </div>
             <div data-aos="zoom-in-right" className="mt-5">
                 <label className="for_label" htmlFor="">Taklif va tashabbuslar</label>
                 <div> <TextArea className="for_textarea" rows={4} /></div>
             </div>
             <div data-aos="zoom-in-right" className="mt-5">
                 <label className="for_label" htmlFor="">Shikoyatlar uchun</label>
                 <div> <TextArea className="for_textarea" rows={4} /></div>
             </div>
             <div data-aos="zoom-in-right" className="mt-5">
                 <label className="for_label" htmlFor="">Muammo va kamchiliklar</label>
                 <div> <TextArea className="for_textarea" rows={4} /></div>
             </div>
         </div>
       </>
    );
}

export default CompleteForm;