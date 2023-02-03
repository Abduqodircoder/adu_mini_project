import React, {useEffect} from 'react';
import CompleteForm from "../../completeForm";
import AOS from "aos";
import "aos/dist/aos.css"
import "../../main.css"

function Main(props) {

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
                <div data-aos="fade-down" className="first_name">
                    Andijon Qishloq xojaligi va agro texnalogiyalarti instituti
                </div>
                <div data-aos="zoom-in" className="second_name">
                    OLIY TAʼLIM VA UNING SIFATINI TAʼMINLASH, ILM-FAN VA INNOVATSIYALAR, OLIY ATTESTATSIYA
                    VA DAVLAT TEST TIZIMIGA OID TAKLIF, T
                    ASHABBUS VA MAVJUD MUAMMOLAR YECHIMIGA OID TAVSIYALARNI TOʻGʻRIDAN-TOʻGʻRI YUBORISH BOʻYICHA
                </div>
                <div data-aos="zoom-in" className="third_name">
                    INTERAKTIV PORTAL
                </div>
                <div className="col-12">
                    <div data-aos="flip-up" className="big_main_img">
                        <img className="main_img" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ" alt=""/>
                    </div>
                </div>
                <div className="col-12 for_col_12">
                    <div data-aos="fade-up" className="big_button">
                       <div>
                           <CompleteForm/>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;