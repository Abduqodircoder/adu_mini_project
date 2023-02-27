import React, {useEffect} from "react"
import "./main.css"
import CompleteForm from "./completeForm";
import AOS from "aos";
import "aos/dist/aos.css"

function App() {

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
            OLIY TAʼLIM VA UNING SIFATINI TAʼMINLASH, ILM-FAN VA INNOVATSIYALAR, OLIY ATTESTATSIYA
            VA DAVLAT TEST TIZIMIGA OID TAKLIF, T
            ASHABBUS VA MAVJUD MUAMMOLAR YECHIMIGA OID TAVSIYALARNI TOʻGʻRIDAN-TOʻGʻRI YUBORISH BOʻYICHA
          </div>
          <div data-aos="zoom-in" className="third_name">
            INTERAKTIV PORTAL
          </div>
          <div className="col-12">
           <div className="row">
             <div className="col-6 first_col-6"><CompleteForm/></div>
               <div className="col-6 second_col_6">
                   <div className="for_img">
                       <img className="for_main_img" data-aos="zoom-in-left" src="images/contact-us.svg" alt=""/>
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
                  <div data-aos="fade-up" className="big_button">
                      <button className="for_button">Jo'natish</button>
                  </div>
          </div>
        </div>
      </div>
  );
}

export default App;
