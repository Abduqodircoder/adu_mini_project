import React, { useEffect, useState } from 'react';
import { Select, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from "aos"
import axios from "axios";
import {BaseUrl} from "./BaseUrl";

function CompleteForm(props) {

    const [select, setSelect] = useState([
        {
            value: "O'quv jarayoni bo'yicha",
            label: "O'quv jarayoni bo'yicha",
        },
        {
            value: "Ilmiy jarayon bo'yicha",
            label: "Ilmiy jarayon bo'yicha",
        },
        {
            value: "Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha",
            label: "Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha",
        },
        {
            value: "Kadrlar tizimi bo'yicha",
            label: "Kadrlar tizimi bo'yicha",
        },
        {
            value: "Innovatsion g'oya va takliflarga oid",
            label: "Innovatsion g'oya va takliflarga oid",
        },
        {
            value: "Ta'lim sifatini oshirish bo'yicha",
            label: "Ta'lim sifatini oshirish bo'yicha",
        },
        {
            value: "Sirtqi ta'lim  bo'yicha",
            label: "Sirtqi ta'lim  bo'yicha",
        },
        {
            value: "Magistratura bo'yicha",
            label: "Magistratura bo'yicha",
        },
        {
            value: "Moddiy-texnik baza bilan ta'minlash bo'yicha",
            label: "Moddiy-texnik baza bilan ta'minlash bo'yicha",
        },
        {
            value: "Shaxsiy muammo va takliflar ",
            label: "Shaxsiy muammo va takliflar ",
        },
        {
            value: "Umumiy",
            label: "Umumiy",
        },
    ])

    const handleChange = (value) => {
        setCategory(value.label)
    };

    const {TextArea} = Input;
    const [category, setCategory] = useState("")
    const [muammo, setMuammo] = useState("")
    const [muammo_yechimi, setMuammo_yechimi] = useState("")
    const [muammo_natija, setMuammo_natija] = useState("")
    const [muallif, setMuallif] = useState("")
    const [muallif_info, setMuallif_info] = useState("")
    const [file, setFile] = useState([])
    const [text, setText] = useState(false)
    const [succes, setSucces] = useState(false)


    useEffect(() => {
        AOS.init(
            {
                duration: 1000
            }
        )
    })

    useEffect(() => {
        notify();
    }, [text]);

    const notify = () => {
        if (text === "" && succes === ""){} else if(text === "Ma'lumot yuklandi"){
            toast.success(text)
        }
        else {
            toast.error(text)
        }
        setText("")
        setSucces("")
    };

    const addDataUser = () => {
        if (
          category.trim().length > 0 &&
          muammo.trim().length > 0 &&
          muammo_yechimi.trim().length > 0 &&
          muammo_natija.trim().length > 0 &&
          muallif.trim().length > 0 &&
          muallif_info.trim().length > 0
        ) {
          const my_form_data = new FormData();
          my_form_data.append("category", category);
          my_form_data.append("muammo", muammo);
          my_form_data.append("muammo_natija", muammo_natija);
          my_form_data.append("muammo_yechimi", muammo_yechimi);
          my_form_data.append("muallif", muallif);
          my_form_data.append("muallif_info", muallif_info);
          my_form_data.append("qushimcha_file", file);
          axios
            .post(BaseUrl + "/api/taklifs", my_form_data)
            .then((res) => {
              if (res.status === 201) {
                console.log(res.data);
                setText(res.data.message);
                setCategory("");
                setMuammo("");
                setMuammo_yechimi("");
                setMuammo_natija("");
                setMuallif("");
                setMuallif_info("");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setText("Iltimos fo'rmani to'liq to'ldiring");
        }
      };


    return (
        <>
            <div>
                <ToastContainer />
                {/*{JSON.stringify({muammo, muammo_yechimi, muammo_natija, muallif, muallif_info})}*/}
                <div data-aos="zoom-in-right">
                    <label className="for_label" htmlFor=""> Taklif, tashabbus va mavjud muammolar yechimi taklif
                        etilayotgan sohani tanlang</label>
                    <div>
                        <Select className="for_select mt-2" labelInValue style={{width: 120,}} onChange={handleChange}
                                options={select}/>
                    </div>
                </div>
                <div data-aos="zoom-in-right" className="mt-5">
                    <label className="for_label" htmlFor="">Mavjud muammolar</label>
                    <div><TextArea value={muammo} onChange={(e) => setMuammo(e.target.value)} className="for_textarea" rows={4}/></div>
                </div>
                <div data-aos="zoom-in-right" className="mt-5">
                    <label className="for_label" htmlFor="">Taklif, tashabbus va mavjud muammolar yechimiga oid
                        tavsiya(lar)</label>
                    <div><TextArea value={muammo_yechimi} onChange={(e) => setMuammo_yechimi(e.target.value)} className="for_textarea" rows={4}/></div>
                </div>
            </div>
            <div className="d-block">
                <div className="second_form_bottom_child">
                    <div data-aos="zoom-in-right" className="mt-5">
                        <label className="for_label_bottom mt-5" htmlFor="">Taklif, tashabbus va mavjud muammolar yechimidan
                            kutilayotgan natija(lar)</label>
                        <div><TextArea value={muammo_natija} onChange={(e) => setMuammo_natija(e.target.value)} className="for_textarea_bottom" rows={4}/></div>
                    </div>
                    <div data-aos="zoom-in-right" className="mt-5">
                        <label className="for_label_bottom" htmlFor="">Taklif, tashabbus va mavjud muammolar yechimiga
                            oid tavsiya muallifi</label>
                        <div><TextArea value={muallif} onChange={(e) => setMuallif(e.target.value)} className="for_textarea_bottom" rows={4}/></div>
                    </div>
                    <div data-aos="zoom-in-right" className="mt-5">
                        <label className="for_label_bottom" htmlFor="">Muallif rekvizitlari (tel. raqami, manzili va
                            h.k.)</label>
                        <div><TextArea value={muallif_info} onChange={(e) => setMuallif_info(e.target.value)} className="for_textarea_bottom" rows={4}/></div>
                    </div>
                    <div data-aos="zoom-in-right" className="mt-5">
                        <label className="for_label_bottom" htmlFor="">Qoʻshimcha materiallar (elektron fayllar,
                            foto-video materiallar va h.k.) biriktirish (yuklash)</label>
                        <input onChange={(e) => setFile(e.target.files[0])} type="file" className="form-control ant-input"/>
                    </div>
                    <div data-aos="fade-up" className="big_button" style={{display:"flex", justifyContent:"center"}}>
                        <button  onClick={addDataUser} className="for_button mb-5 mt-5">Jo'natish</button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default CompleteForm;