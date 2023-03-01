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
                    Andijon Davlat Universiteti
                </div>
                <div data-aos="zoom-in" className="second_name">
                    OLIY TAʼLIM VA UNING SIFATINI TAʼMINLASH, OLIY TA'LIM TIZIMIGA OID TAKLIF, 
                    TASHABBUS VA MAVJUD MUAMMOLAR YECHIMIGA OID TAKLIFLARNI TOʻGʻRIDAN-TOʻGʻRI YUBORISH BOʻYICHA
                </div>
                <div data-aos="zoom-in" className="third_name">
                    INTERAKTIV PORTAL
                </div>
                <div className="col-12">
                <div className="for_big_width">
                    <div className="row"> 
                            <div className="col-6  first_col-6"><CompleteForm/></div>
                            <div className="col-6 second_col_6">
                                <div className="for_img">
                                    <img className="for_main_img" data-aos="zoom-in-left" src="images/contact-us.svg" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row for_min_width">
                        <div className="col-12">
                            <div className="for_img">
                                <img className="for_main_img" data-aos="zoom-in-left" src="images/contact-us.svg" alt=""/>
                            </div>
                        </div>
                        <div className="col-12 for_min_width_second"><CompleteForm/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;