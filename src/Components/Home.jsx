import React, { useState, useEffect } from "react";
import "../Styles/home.css";
import Carousel from "react-bootstrap/Carousel";
import { Button, Row, Modal, Form, Card, Container } from "react-bootstrap";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { FaBusSimple } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaMotorcycle } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { TbBus } from "react-icons/tb";
import { FaQuoteLeft } from "react-icons/fa6";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { MdContactSupport } from "react-icons/md";
import Aos from "aos";
import parse from "html-react-parser";
import axios from "axios";
import { Category } from "@mui/icons-material";

const Home = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: false,
    dots: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };

  const [Car, setCar] = useState(true);
  const [Bike, setBike] = useState(true);
  const [Bus, setBus] = useState(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => {
    setShow3(true);
  };

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => {
    setShow4(true);
  };

  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => {
    setShow5(true);
  };

  const navigate = useNavigate();

  // const [Flight, setFlight] = useState(true);
  // const [Hotels, setHotels] = useState(false);
  // const [Trains, setTrains] = useState(false);
  // const [Bus, setBus] = useState(false);
  // const [Childrens, setChildrens] = useState(0);

  useEffect(() => {
    Aos.init();
    // window.scroll(0, 0);
  });

  
  //post API for category enquiry
  const [CUName, setCUName] = useState("");
  const [CUPhone, setCUPhone] = useState("");
  const [CUEmail, setCUEmail] = useState("");
  const [CUMessage, setCUMessage] = useState("");
  const [CatName, setCatName] = useState("");
 
  const AddCategoryEnquiry = async () => {

    try {
      if(!CUName){
        alert("Please enter the name");
      }
      if(!CUPhone){
        alert("Please enter Phone no");
      }
      if(!CUEmail){
        alert("Please enter your mail")
      }
      if(!CatName){
        alert("Please select the category")
      }
      if(!CUMessage){
        alert("Please enter your message")
      }
     
      const config = {
        url: "/user/Categoryenquiry",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "Content-type": "application/json" },
        data: {
          CatName: CatName,
          CUName: CUName,
          CUPhone: CUPhone,
          CUEmail: CUEmail,
          CUMessage: CUMessage,
        },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert(res.data.success);
          handleClose4();
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  // integrating post method for bookings
  const [userName, setuserName] = useState("");
  const [userMail, setuserMail] = useState("");
  const [userMobile, setuserMobile] = useState("");
  const [PickupLoc, setPickupLoc] = useState("");
  const [PickupDate, setPickupDate] = useState("");
  const [PickupTime, setPickupTime] = useState("");
  const [DropoffLoc, setDropoffLoc] = useState("");
  const [DropoffDate, setDropoffDate] = useState("");
  const [DropoffTime, setDropoffTime] = useState("");
  const [servicedata, setservicedata] = useState({});
  const handleShow2 = (item) => {
    setShow2(true);
    setservicedata(item)
  };
console.log("servicedata?.CtText",servicedata);
  const Addbookings = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        alert("Please login first");
        window.location.assign("/login");
        return;
      }
      if (!userName) {
        return alert("Please enter user name");
      }
      if (!userMail) {
        return alert("Please enter user mail");
      }
      if (!userMobile) {
        return alert("Please enter user mobile no");
      }
      if (!PickupLoc) {
        return alert("Please enter pick up location");
      }
      if (!PickupDate) {
        return alert("Please select the pick up date");
      }
      if (!PickupTime) {
        return alert("Please select the pick up time");
      }
      if (!DropoffLoc) {
        return alert("Please enter dropoff location");
      }
      if (!DropoffDate) {
        return alert("Please select the Dropoff date");
      }
      if (!DropoffTime) {
        return alert("Please select the Dropoff time");
      }

      const config = {
        url: "/admin/AddBookService",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "application/json" },
        data: {
          ServiceName: servicedata,
          userName:userName,
          userMail:userMail,
          userMobile:userMobile,
          PickupLoc:PickupLoc,
          PickupDate: PickupDate,
          PickupTime: PickupTime,
          DropoffLoc:DropoffLoc,
          DropoffDate: DropoffDate,
          DropoffTime: DropoffTime,
          userId:user?._id,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        // getkeypoints();
        handleClose2();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  //integrating get method
  const [AddGraph, setAddGraph] = useState([]);
  const getAddGraph = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getgraph");
      if (res.status === 200) {
        setAddGraph(res.data.getgraph);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //integrating get  method
  const [Addkeypoints, setAddCkeypoints] = useState([]);
  const getkeypoints = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getkeypoints");
      if (res.status === 200) {
        setAddCkeypoints(res.data.getkeypoints);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //integrating get  method for category list
  const [AddCategory, setAddCategory] = useState([]);
  const getAddCategory = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getcategory");
      if (res.status === 200) {
        setAddCategory(res.data.getcategory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //integrating get  method
  const [AddTestimonial, setAddTestimonial] = useState([]);
  const getAddTestimonial = async () => {
    try {
      let res = await axios.get(
        "http://localhost:9000/api/admin/gettestimonial"
      );
      if (res.status === 200) {
        setAddTestimonial(res.data.gettestimonial);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddGraph();
    getAddTestimonial();
    getAddCategory();
    getkeypoints();
  }, []);
  // useEffect(() => {
  //   const User = JSON.parse(sessionStorage.getItem("user"));
  //   if (!User) {
  //     alert("Please login first");
  //     window.location.assign("/");
  //   } else {
  //     window.location.assign("/login")
  //   }
  // }, []);


  return (
    <div>
      {/* slider banner  */}
      <div>
        <div>
          <Carousel fade>
            {AddGraph?.map((val, i) => {
              return (
                <Carousel.Item>
                  <img
                    src={`http://localhost:9000/Homegraph/${val?.GrImage}`}
                    alt="df"
                    text="first slide"
                    className="slider-img"
                  />
                  <Carousel.Caption
                    data-aos="fade-right"
                    data-aos-duration="3000"
                  >
                    <div
                      className="text-content"
                      data-aos="fade-right"
                      data-aos-duration="3000"
                    >
                      <h2>{val?.GrText}</h2>
                      <div className="slider-btn">
                        <a href="#bookbtns">
                          <Button variant="" className="sliders-btn">
                            Book Now
                          </Button>
                        </a>{" "}
                      </div>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
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
            <a href="" target="_new" >
              <MdContactSupport style={{ fontSize: "35px", color: "white" }} onClick={(e)=>{e.preventDefault();handleShow5();}}/>
            </a>
          </div>
        </div>
      </div>

      {/* second banner  */}

      <div id="bookbtns">
        <div >
          <div className="title">
            <h3 className="about-title">OUR TOP CATEGORIES</h3>

            <div className="buton">
              <Button
                variant=""
                className="filter-btns"
                onClick={(e) => {
                  e.preventDefault();
                  setBike(true);
                  setCar(false);
                  setBus(false);
                }}
              >
                Motor Cycle
              </Button>

              <Button
                variant=""
                className="filter-btns"
                onClick={(e) => {
                  e.preventDefault();
                  setBike(false);
                  setCar(true);
                  setBus(false);
                }}
              >
                Car
              </Button>

              <Button
                variant=""
                className="filter-btns"
                onClick={(e) => {
                  e.preventDefault();
                  setBike(false);
                  setCar(false);
                  setBus(true);
                }}
              >
                Bus
              </Button>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
        >
          <div className="about-display mt-2 mb-4">
            <Container>
              <div className="about-display-container mt-3">
                <div id="cards_landscape_wrap-2">
                  <div className="service-cards">
                    {Car ? (
                      <>
                      {AddCategory?.filter((ele)=>ele?.CtText==="FOUR WHEELER BOOKING").map((item,i)=>{
                        return(
                          <> <div class="card-flyer mb-2">
                          <div class="text-box">
                            <div class="image-box">
                              <div className="wdnj">
                                <img
                                  src={`http://localhost:9000/Category/${item?.CtImage}`}
                                  alt=""
                                  className="homepage-service-img"
                                />
                              </div>
                            </div>

                            <div class="text-container mt-2 mb-2">
                              <h6>{item?.CtText}</h6>
                              <p style={{fontSize:"15px",color:"white",fontWeight:"bold"}}>₹ {item?.CtPrice}/-</p>
                            </div>
                            <div className="" style={{ padding: "0px 12px" }}>
                              <div className="book-enquiry-btns mb-2">
                                <Button
                                  variant=""
                                  className="booknow-btn"
                                  onClick={(e)=>{e.preventDefault();handleShow2(item?.CtText);}}
                                >
                                  Book Now
                                </Button>

                                <Button
                                  variant=""
                                  className="enquiry-btn"
                                  onClick={handleShow5}
                                >
                                  Enquiry
                                </Button>
                              </div>
                              <div className="book-enquiry-btns">
                                <Button variant="" className="call-btn">
                                  <a
                                    href="tel:1234567890"
                                    target="_new"
                                    style={{
                                      color: "white",
                                      textDecoration: "none",
                                    }}
                                  >
                                    Call
                                  </a>
                                </Button>
                                <Button variant="" className="whatsapp-btn">
                                  <a
                                    href={"https://www.whatsapp.com/"}
                                    target="_new"
                                    style={{
                                      color: "black",
                                      textDecoration: "none",
                                    }}
                                  >
                                    Whatsapp
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div></>
                        )
                      })}
                       
                      </>
                    ) : (
                      <></>
                    )}

                    {Bike ? (
                      <>
                       {AddCategory?.filter((ele)=>ele?.CtText==="TWO WHEELER BOOKING").map((item,i)=>{
                        return(
                          <> <div class="card-flyer mb-2">
                          <div class="text-box">
                            <div class="image-box">
                              <div className="wdnj">
                                <img
                                  src={`http://localhost:9000/Category/${item?.CtImage}`}
                                  alt=""
                                  className="homepage-service-img"
                                />
                              </div>
                            </div>

                            <div class="text-container mt-2 mb-2">
                              <h6>{item?.CtText}</h6>
                              <p style={{fontSize:"15px",color:"white",fontWeight:"bold"}}>₹ {item?.CtPrice}/-</p>
                            </div>
                            <div className="" style={{ padding: "0px 12px" }}>
                              <div className="book-enquiry-btns mb-2">
                                <Button
                                  variant=""
                                  className="booknow-btn"
                                  onClick={()=>handleShow2(item?.CtText)}
                                >
                                  Book Now
                                </Button>

                                <Button
                                  variant=""
                                  className="enquiry-btn"
                                  onClick={handleShow5}
                                >
                                  Enquiry
                                </Button>
                              </div>
                              <div className="book-enquiry-btns">
                                <Button variant="" className="call-btn">
                                  <a
                                    href="tel:1234567890"
                                    target="_new"
                                    style={{
                                      color: "white",
                                      textDecoration: "none",
                                    }}
                                  >
                                    Call
                                  </a>
                                </Button>
                                <Button variant="" className="whatsapp-btn">
                                  <a
                                    href={"https://www.whatsapp.com/"}
                                    target="_new"
                                    style={{
                                      color: "black",
                                      textDecoration: "none",
                                    }}
                                  >
                                    Whatsapp
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div></>
                        )
                      })}
                      </>
                    ) : (
                      <></>
                    )}

                    {Bus ? (
                      <>
                       {AddCategory?.filter((ele)=>ele?.CtText==="SIX WHEELER BOOKING").map((item,i)=>{
                        return(
                          <> <div class="card-flyer mb-2">
                          <div class="text-box">
                            <div class="image-box">
                              <div className="wdnj">
                                <img
                                  src={`http://localhost:9000/Category/${item?.CtImage}`}
                                  alt=""
                                  className="homepage-service-img"
                                />
                              </div>
                            </div>

                            <div class="text-container mt-2 mb-2">
                              <h6>{item?.CtText}</h6>
                              <p style={{fontSize:"15px",color:"white",fontWeight:"bold"}}>₹ {item?.CtPrice}/-</p>
                            </div>
                            <div className="" style={{ padding: "0px 12px" }}>
                              <div className="book-enquiry-btns mb-2">
                                <Button
                                  variant=""
                                  className="booknow-btn"
                                  onClick={()=>handleShow2(item?.CtText)}
                                >
                                  Book Now
                                </Button>

                                <Button
                                  variant=""
                                  className="enquiry-btn"
                                  onClick={handleShow5}
                                >
                                  Enquiry
                                </Button>
                              </div>
                              <div className="book-enquiry-btns">
                                <Button variant="" className="call-btn">
                                  <a
                                    href="tel:1234567890"
                                    target="_new"
                                    style={{
                                      color: "white",
                                      textDecoration: "none",
                                    }}
                                  >
                                    Call
                                  </a>
                                </Button>
                                <Button variant="" className="whatsapp-btn">
                                  <a
                                    href={"https://www.whatsapp.com/"}
                                    target="_new"
                                    style={{
                                      color: "black",
                                      textDecoration: "none",
                                    }}
                                  >
                                    Whatsapp
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div></>
                        )
                      })}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>

      {/* trail card 2 */}
      {/* <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <div className="about-display mt-2 mb-4">
          <Container>
            <div className="about-display-container mt-3">
              <div id="cards_landscape_wrap-2">
                <div className="service-cards">
                  <div class="card-flyer mb-2">
                    <div class="text-box">
                      <div class="image-box">
                        <div className="wdnj">
                          <img
                            src="../Assets/motorbike.png"
                            alt=""
                            className="homepage-service-img"
                          />
                        </div>
                      </div>

                      <div class="text-container mt-2 mb-2">
                        <h6>Two Wheeler Booking</h6>
                      </div>
                      <div className="" style={{ padding: "0px 12px" }}>
                        <div className="book-enquiry-btns mb-2">
                          <Button
                            variant=""
                            className="booknow-btn"
                            onClick={handleShow2}
                          >
                            Book Now
                          </Button>

                          <Button
                            variant=""
                            className="enquiry-btn"
                            onClick={handleShow5}
                          >
                            Enquiry
                          </Button>
                        </div>
                        <div className="book-enquiry-btns">
                          <Button variant="" className="call-btn">
                            <a
                              href="tel:1234567890"
                              target="_new"
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              Call
                            </a>
                          </Button>
                          <Button variant="" className="whatsapp-btn">
                            <a
                              href={"https://www.whatsapp.com/"}
                              target="_new"
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              Whatsapp
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-flyer mb-2">
                    <div class="text-box">
                      <div class="image-box">
                        <div className="wdnj">
                          <img
                            src="../Assets/caricon.png"
                            alt=""
                            className="homepage-service-img"
                          />
                        </div>
                      </div>

                      <div class="text-container mt-2 mb-2">
                        <h6>Four Wheeler Booking</h6>
                      </div>
                      <div className="" style={{ padding: "0px 12px" }}>
                        <div className="book-enquiry-btns mb-2">
                          <Button
                            variant=""
                            className="booknow-btn"
                            onClick={handleShow3}
                          >
                            Book Now
                          </Button>

                          <Button
                            variant=""
                            className="enquiry-btn"
                            onClick={handleShow5}
                          >
                            Enquiry
                          </Button>
                        </div>
                        <div className="book-enquiry-btns">
                          <Button variant="" className="call-btn">
                            <a
                              href="tel:1234567890"
                              target="_new"
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              Call
                            </a>
                          </Button>
                          <Button variant="" className="whatsapp-btn">
                            <a
                              href={"https://www.whatsapp.com/"}
                              target="_new"
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              Whatsapp
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-flyer mb-2">
                    <div class="text-box">
                      <div class="image-box">
                        <div className="wdnj">
                          <img
                            src="../Assets/busicon.png"
                            alt=""
                            className="homepage-service-img"
                          />
                        </div>
                      </div>

                      <div class="text-container mt-2 mb-2">
                        <h6>Two Wheeler Booking</h6>
                      </div>
                      <div className="" style={{ padding: "0px 12px" }}>
                        <div className="book-enquiry-btns mb-2">
                          <Button
                            variant=""
                            className="booknow-btn"
                            onClick={handleShow4}
                          >
                            Book Now
                          </Button>

                          <Button
                            variant=""
                            className="enquiry-btn"
                            onClick={handleShow5}
                          >
                            Enquiry
                          </Button>
                        </div>
                        <div className="book-enquiry-btns">
                          <Button variant="" className="call-btn">
                            <a
                              href="tel:1234567890"
                              target="_new"
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              Call
                            </a>
                          </Button>
                          <Button variant="" className="whatsapp-btn">
                            <a
                              href={"https://www.whatsapp.com/"}
                              target="_new"
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              Whatsapp
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div> */}

      {/* Testimonials  */}
      <div
        className="container mt-4 mb-5 "
        data-aos="fade-up"
        data-aos-duration="3000"
      >
        <div className="title">
          <h3 className="about-title">WHAT PEOPLE SAY</h3>
        </div>
        <div
          className="container"
          style={{ boxShadow: "none", background: "none" }}
        >
          <div className="cate-0">
            <OwlCarousel className="owl-theme" loop margin={5} nav {...options}>
              {AddTestimonial?.map((item, i) => {
                return (
                  <div class="item">
                    <Card
                      className="text-center"
                      style={{ margin: "0", height: "15rem" }}
                    >
                      <Card.Header>
                        <FaQuoteLeft
                          style={{ color: "#10398c", margin: "10px 0px" }}
                        />
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          {parse(`<div>${item.TDesc}</div>`)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  );
                })}

              {/* <div class="item">
                <Card className="text-center" style={{ margin: "0" }}>
                  <Card.Header>
                    <FaQuoteLeft
                      style={{ color: "#10398c", margin: "10px 0px" }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <div>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.{" "}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div class="item">
                <Card className="text-center" style={{ margin: "0" }}>
                  <Card.Header>
                    <FaQuoteLeft
                      style={{ color: "#10398c", margin: "10px 0px" }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <div>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.{" "}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div class="item">
                <Card className="text-center">
                  <Card.Header>
                    <FaQuoteLeft
                      style={{ color: "#10398c", margin: "10px 0px" }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <div>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.{" "}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div class="item">
                <Card className="text-center">
                  <Card.Header>
                    <FaQuoteLeft
                      style={{ color: "#10398c", margin: "10px 0px" }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <div>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.{" "}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div class="item">
                <Card className="text-center" style={{ margin: "0" }}>
                  <Card.Header>
                    <FaQuoteLeft
                      style={{ color: "#10398c", margin: "10px 0px" }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <div>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.{" "}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div> */}
            </OwlCarousel>
          </div>
        </div>
      </div>

      {/* bike booking modal  */}
      <Modal
        show={show2}
        onHide={handleClose2}
        style={{ zIndex: "99999999" }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#083a87" }}>Book Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <h3 className="text-center p-2">Book Your Journey And Make It Safe!</h3>
            <div className="mainsrchbox mt-3">
              <div>
                {" "}
                <div className="cotent-card">
                  <ul className="ul-text">
                    {Addkeypoints?.map((item, i) => {
                      return <li>{parse(`<div>${item?.keypoints}</div>`)}</li>
                    })}

                    {/* <li>Every Day Travelling Time Starts with 6 AM to 6 PM.</li>
                    <li>They can Travel Maximum 1.400KM Distance.</li>
                    <li>We Have all the Documents</li>
                    <li>RC, DL, Insurence and Ect..</li> */}
                  </ul>
                </div>
              </div>
              <Row className="mb-3 ">
              <div className="col-md-4">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>Name</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="text" placeholder="Enter your name" onChange={(e)=>setuserName(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>Email ID</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="text" placeholder="Enter your email" onChange={(e)=>setuserMail(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>Phone No</span>
                    </div>
                    <div className="jourret">
                      <div className="journey">
                        <Form.Control type="text" placeholder="Enter your mobile no" onChange={(e)=>setuserMobile(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
              <Row className="mb-3 ">
              <div className="col-md-4">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>PickUP Location</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="text" placeholder="Enter the location" onChange={(e)=>setPickupLoc(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="searchboxx ">
                    <div className="fromm">
                      <span>PICKUP DATE</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="date" onChange={(e)=>setPickupDate(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>PICKUP TIME</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="time" onChange={(e)=>setPickupTime(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>

              <Row>
              <div className="col-md-4">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>DropOff Location</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="text" placeholder="Enter the location"onChange={(e)=>setDropoffLoc(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="jourret">
                    <div className="journey ">
                      <span>DROPOFF DATE</span>
                      <Form.Control type="date" onChange={(e)=>setDropoffDate(e.target.value)}/>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>DROPOFF TIME</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="time" onChange={(e)=>setDropoffTime(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{
              background: "#080874 ",
              color: "white",
            }}
            onClick={Addbookings}
          >
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>

      {/* car booking modal  */}
      <Modal
        show={show3}
        onHide={handleClose3}
        style={{ zIndex: "99999999" }}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#083a87" }}>Book Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <h3 className="text-center p-2">Book Your Car Journey</h3>
            <div className="mainsrchbox mt-3">
              <div>
                {" "}
                <div className="cotent-card">
                  <ul className="ul-text">
                    <li>
                      Customer Can Take the Vehical upto 10 Day Travelling.{" "}
                    </li>
                    <li>Every Day Travelling Time Starts with 6 AM to 6 PM.</li>
                    <li>They can Travel Maximum 1.400KM Distance.</li>
                    <li>We Have all the Documents</li>
                    <li>RC, DL, Insurence and Ect..</li>
                  </ul>
                </div>
              </div>
              <Row className="mb-3 ">
                <div className="col-md-6 ">
                  <div className="searchboxx ">
                    <div className="fromm">
                      <span>PICKUP DATE</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="date" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>PICKUP TIME</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="time" />
                      </div>
                    </div>
                  </div>
                </div>
              </Row>

              <Row>
                <div className="col-md-6">
                  <div className="jourret">
                    <div className="journey ">
                      <span>DROPOFF DATE</span>
                      <Form.Control type="date" />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>DROPOFF TIME</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="time" />
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{
              background: "#080874 ",
              color: "white",
            }}
            onClick={handleClose3}
          >
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>

      {/* bus booking modal  */}
      <Modal
        show={show4}
        onHide={handleClose4}
        style={{ zIndex: "99999999" }}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#083a87" }}>Book Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <h3 className="text-center p-2">Book Your Bus Journey</h3>
            <div className="mainsrchbox mt-3">
              <div>
                {" "}
                <div className="cotent-card">
                  <ul className="ul-text">
                    <li>
                      Customer Can Take the Vehical upto 10 Day Travelling.{" "}
                    </li>
                    <li>Every Day Travelling Time Starts with 6 AM to 6 PM.</li>
                    <li>They can Travel Maximum 1.400KM Distance.</li>
                    <li>We Have all the Documents</li>
                    <li>RC, DL, Insurence and Ect..</li>
                  </ul>
                </div>
              </div>
              <Row className="mb-3 ">
                <div className="col-md-6 ">
                  <div className="searchboxx ">
                    <div className="fromm">
                      <span>PICKUP DATE</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="date" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>PICKUP TIME</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="time" />
                      </div>
                    </div>
                  </div>
                </div>
              </Row>

              <Row>
                <div className="col-md-6">
                  <div className="jourret">
                    <div className="journey ">
                      <span>DROPOFF DATE</span>
                      <Form.Control type="date" />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="searchboxx">
                    <div className="fromm">
                      <span>DROPOFF TIME</span>
                    </div>
                    <div className="jourret">
                      <div className="journey ">
                        <Form.Control type="time" />
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{
              background: "#080874 ",
              color: "white",
            }}
            onClick={handleClose4}
          >
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>

      {/* enquiry form  */}
      <Modal
        show={show5}
        onHide={handleClose5}
        style={{ zIndex: "99999999" }}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#083a87" }}>Enquiry Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="vi_0"
                  onChange={(e) => setCUName(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Phone</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter Phone no"
                  onChange={(e) => setCUPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Email</label>
                <input
                  type="email"
                  className="vi_0"
                  placeholder="Enter Email id"
                  onChange={(e) => setCUEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12 mb-3">
              <label className="fw-bold">Booking Option:</label>
              <select
                className="vi_0"
                onChange={(e) => setCatName(e.target.value)}
              >
                {AddCategory?.map((val, i) => {
                  return 
                  <option value={val?.CtText}>{val?.CtText}</option>;
                })}
              </select>
            </div>
            <div className="col-lg-12 mb-3">
              <label className="fw-bold">Message :</label>
              <textarea
                className="form-control"
                placeholder="Tell Us Your Query.."
                id="floatingTextarea"
                onChange={(e) => setCUMessage(e.target.value)}
              ></textarea>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{
              background: "#080874 ",
              color: "white",
            }}
            onClick={AddCategoryEnquiry}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
