import React, { useEffect, useState } from "react";
import "../Styles/categories.css";
import { MdContactSupport } from "react-icons/md";
import axios from "axios"
import parse from "html-react-parser"
import Aos from "aos";

const About = () => {
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => {
    setShow5(true);
  };

  //integrating get method
  const [Addaboutus, setAddaboutus] = useState([]);
  const getAddaboutus = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getaboutus");
      if (res.status === 200) {
        setAddaboutus(res.data.getaboutus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddaboutus();
    Aos.init();
  }, [])
  
  return (
    <div>
      <div className="bg-img">
        <div>
          <h2 className="headding">ABOUT US</h2>
        </div>
        <div className="fixed-icon">
          <div style={{ borderBottom: "1px solid white" }}>
            <a href="tel:1234567890" target="_new">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 204.000000 192.000000"
                preserveAspectRatio="xMidYMid meet"
                width="43px"
                height="43px"
              >
                <g
                  transform="translate(0.000000,192.000000) scale(0.100000,-0.100000)"
                  fill="white"
                  stroke="none"
                >
                  <path
                    d="M982 1599 c3 -9 27 -17 65 -21 70 -8 180 -48 238 -88 127 -87 225
-268 225 -416 0 -24 5 -34 15 -34 34 0 9 148 -46 268 -21 48 -49 85 -107 141
-100 99 -201 148 -331 159 -52 4 -63 2 -59 -9z"
                  />
                  <path
                    d="M615 1511 c-22 -10 -55 -35 -74 -54 -57 -60 -53 -150 14 -339 43
-121 97 -210 176 -294 147 -158 301 -258 457 -299 79 -20 97 -19 150 6 56 27
102 96 102 151 0 33 -5 42 -42 68 -73 53 -184 110 -214 110 -18 0 -42 -12 -64
-31 -19 -16 -42 -34 -50 -39 -26 -14 -72 14 -164 100 -66 63 -96 101 -122 152
-19 37 -34 76 -34 86 0 10 15 31 34 45 52 42 62 76 41 139 -9 29 -32 86 -51
126 -46 95 -79 110 -159 73z"
                  />
                  <path
                    d="M960 1441 c0 -11 17 -16 82 -25 108 -14 258 -135 297 -240 11 -30 24
-83 28 -116 9 -67 26 -81 31 -24 4 48 -33 168 -68 218 -74 107 -201 186 -311
194 -39 3 -59 1 -59 -7z"
                  />
                  <path
                    d="M940 1277 c0 -10 15 -17 48 -22 121 -17 213 -110 231 -233 3 -25 12
-47 20 -50 11 -4 13 6 8 50 -14 138 -120 245 -262 265 -36 5 -45 3 -45 -10z"
                  />
                </g>
              </svg>
            </a>
          </div>

          <div style={{ borderBottom: "1px solid white" }}>
            <a href={"https://www.whatsapp.com/"} target="_new">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                viewBox="0,0,256,256"
                width="43px"
                height="43px"
              >
                <g transform="translate(51.2,51.2) scale(0.6,0.6)">
                  <g
                    fill="white "
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style={{ mixBlendMode: "normal" }}
                  >
                    <g transform="scale(5.12,5.12)">
                      <path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </div>

          <div style={{ padding: "4px" }}>
            <a href="#" target="_new" onClick={handleShow5}>
              <MdContactSupport style={{ fontSize: "35px", color: "white" }} />
            </a>
          </div>
        </div>
      </div>
{Addaboutus?.map((val,i)=>{
  return(
<div className="about-display" >
        <div className="title">
          <h3 className="about-title">{val?.Abouttitle}</h3>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 text-center"  data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false">
              <img
                src={`http://localhost:9000/Aboutus/${val?.AbImg}`}
                alt=""
                style={{ width: "302px", height: "195px" }}
              />
            </div>
            <div className="col-md-9" data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false">
              {/* <div className="about-display-container"> */}
              <div className="about-img-container">
                <div>
                  <p style={{ lineHeight: "30px" ,textAlign:"justify"}}>
                   {parse(`<div>${val?.AboutDesc?.slice(0,700)}</div>`)}
                  </p>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="col-md-12" data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false">
              <p style={{lineHeight: "30px",textAlign:"justify"}}>
              {parse(`<div>${val?.AboutDesc?.slice(700)}</div>`)}
              </p>
            </div>
          </div>
        </div>
      </div>
  )
})}
      
    </div>
  );
};

export default About;
