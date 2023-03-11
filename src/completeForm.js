import React, { useEffect, useState } from 'react';
import { Select, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from "aos"
import axios from "axios";
import {BaseUrl} from "./BaseUrl";

function CompleteForm(props) {

    // const [select, setSelect] = useState([
    //     {
    //         value: "O'quv jarayoni bo'yicha",
    //         label: "O'quv jarayoni bo'yicha",
    //     },
    //     {
    //         value: "Ilmiy jarayon bo'yicha",
    //         label: "Ilmiy jarayon bo'yicha",
    //     },
    //     {
    //         value: "Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha",
    //         label: "Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha",
    //     },
    //     {
    //         value: "Kadrlar tizimi bo'yicha",
    //         label: "Kadrlar tizimi bo'yicha",
    //     },
    //     {
    //         value: "Innovatsion g'oya va takliflarga oid",
    //         label: "Innovatsion g'oya va takliflarga oid",
    //     },
    //     {
    //         value: "Ta'lim sifatini oshirish bo'yicha",
    //         label: "Ta'lim sifatini oshirish bo'yicha",
    //     },
    //     {
    //         value: "Sirtqi ta'lim  bo'yicha",
    //         label: "Sirtqi ta'lim  bo'yicha",
    //     },
    //     {
    //         value: "Magistratura bo'yicha",
    //         label: "Magistratura bo'yicha",
    //     },
    //     {
    //         value: "Moddiy-texnik baza bilan ta'minlash bo'yicha",
    //         label: "Moddiy-texnik baza bilan ta'minlash bo'yicha",
    //     },
    //     {
    //         value: "Shaxsiy muammo va takliflar ",
    //         label: "Shaxsiy muammo va takliflar ",
    //     },
    //     {
    //         value: "Umumiy",
    //         label: "Umumiy",
    //     },
    // ])

    // const handleChange = (value) => {
    //     setCategory(value.label)
    // };

    const {TextArea} = Input;
    const [category, setCategory] = useState("")
    const [muammo, setMuammo] = useState("")
    const [muammo_natija, setMuammo_natija] = useState("")
    const [muallif, setMuallif] = useState("")
    const [muallif_info, setMuallif_info] = useState("")
    const [file, setFile] = useState([])
    const [text, setText] = useState(false)


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
        if (text === ""){} else if(text === "Ma'lumot yuklandi"){
            toast.success(text)
        }
        else {
            toast.error(text)
        }
        setText("")
    };

    const addDataUser = () => {
        if (
          category.trim().length > 0 &&
          muammo.trim().length > 0 &&
          muammo_natija.trim().length > 0 &&
          muallif.trim().length > 0 &&
          muallif_info.trim().length > 0
        ) {
          const taklifs = new FormData();
          taklifs.append("category", category);
          taklifs.append("muammo", muammo);
          taklifs.append("muammo_natija", muammo_natija);
          taklifs.append("muallif", muallif);
          taklifs.append("muallif_info", muallif_info);
          taklifs.append("qushimcha_file", file);
          axios
            .post(BaseUrl + "/api/taklifs", taklifs)
            .then((res) => {
              if (res.status === 201) {
                console.log(res.data);
                setText(res.data.message);
                setCategory("");
                setMuammo("");
                setMuammo_natija("");
                setMuallif("");
                setMuallif_info("");
              }
            })
            .catch((err) => {
              console.log(err);
              if(err.response.status === 500){
                setText(err.response.status + err.response.statusText)
                // console.log(taklifs.get("qushimcha_file"))
              }
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
                    <label className="for_label" htmlFor="">Yuborayotgan Taklif, tashabbus yoki mavjud muammoyingiz qaysi sohaga tegishli?</label>
                    <div>
                        <input placeholder="(Namuna) Karrupsiya, O'quv ishlari, Moddiy-texnik..." value={category} style={{boxShadow:"none"}} className="form-control" type="text" onChange={(e)=>{setCategory(e.target.value)}}/>
                    </div>
                </div>
                <div data-aos="zoom-in-right" className="mt-5">
                    <label className="for_label" htmlFor="">Taklif, tashabbus yoki mavjud muammoyingizni izohlab yozing</label>
                    <div><TextArea  value={muammo} onChange={(e) => setMuammo(e.target.value)} className="for_textarea form-control" rows={4}/></div>
                    <div data-aos="zoom-in-right" className="mt-5">
                        <label className="for_label_bottom" htmlFor="">Agar Taklif, tashabbus yoki mavjud muammoyingiz fayl holatida bo'lsa, (bu yerga) yuklang</label>
                        <input onChange={(e) => setFile(e.target.files[0])} type="file" className="form-control ant-input mt-2"/>
                    </div>
                    <div data-aos="zoom-in-right" className="mt-5">
                        <label className="for_label mt-5" htmlFor="">Taklif, tashabbus yoki mavjud muammoyingiz yechimidan
                            kutilayotgan natija(lar)</label>
                        <div><TextArea value={muammo_natija} onChange={(e) => setMuammo_natija(e.target.value)} className="for_textarea form-control" rows={4}/></div>
                    </div>
                </div>
            </div>
            <div className="d-block">
                <div className="second_form_bottom_child">
                    <div data-aos="zoom-in-right" className="mt-5">
                        <label className="for_label_bottom" htmlFor="">Ism va familiyangiz</label>
                        <div><input style={{boxShadow:"none"}} className="form-control " type="text" value={muallif} onChange={(e) => setMuallif(e.target.value)} /></div>
                    </div>
                    <div data-aos="zoom-in-right" className="mt-5">
                        <label className="for_label_bottom" htmlFor="">Muallif rekvizitlari (<i>telefon raqam va manzil</i>)</label>
                        <div><input style={{boxShadow:"none"}} className="form-control " type="text" value={muallif_info} onChange={(e) => setMuallif_info(e.target.value)}/></div>
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