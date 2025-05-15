import React, { useState, useEffect } from "react";
import "../Styles/header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FaRegUserCircle} from "react-icons/fa"
import { MdOutlineArrowDropDown } from "react-icons/md";

function Header() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const logOut = () => {
    
   alert("Successfully Logout");
  
   sessionStorage.removeItem("user");
   window.location.assign("/");
   
 };
  const navigate = useNavigate();
  
 
  //integrating get  method
  const [Adduser, setAdduser] = useState([]);
  const getAdduser = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/user/getuser");
      if (res.status === 200) {
        setAdduser(res.data.getuser);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdduser();
  }, []);
  console.log(Adduser);

  

  return (
    <>
      <div
        className="headers"
        style={{
          position: "sticky",
          top: "0px",
          zIndex: "9999999",
          backgroundColor: "white",
        }}
      >
        {["xl"].map((expand) => (
          <Navbar
            key={expand}
            expand={expand}
            style={{ padding: "0px", background: "#080874" }}
          >
            <Container fluid style={{ padding: "5px 20px" }}>
              <div className="d-flex gap-2">
                <a href="/" className="tail-text">
                  <img src="../Assets/logo.png" alt="Logo" className="logo" />
                </a>
                <div className="H_logo">
                  <h4
                    className="mb-0 text-uppercase"
                    style={{ margin: "10px 0px" }}
                  >
                    Sri Venkateshwara
                  </h4>
                  <p className="inter-national" style={{ margin: "0px 0px" }}>
                    Motor Driving School
                  </p>
                </div>
              </div>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                style={{backgroundColor:"white"}}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                style={{height:"14rem"}}
              >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body style={{ padding: "27px 64px" }}>
                  <Nav
                    className="justify-content-end flex-grow-1 pe-3"
                    style={{ alignItems: "center" }}
                  >
                    {/* <Nav.Link href="/services" className="tail-text">
              SERVICES
            </Nav.Link>
            <Nav.Link href="/contactus" className="tail-text">
              CONTACT US
            </Nav.Link> */}
                 

                  {/* <div className="navbar-right-content">
                     <Nav.Link
                      href="/login"
                      className="tail-text"
                      style={{
                        color: "#083a87 ",
                        borderRadius: "12px",
                        padding: "12px 8px",
                        background: "white",
                      }}
                    >
                      Login/Register
                    </Nav.Link>

                      <div className="dropdown">
                      <Nav.Link
                        href=""
                        className="tail-text"
                        style={{
                          color: "#083a87 ",
                          borderRadius: "12px",
                          padding: "12px 8px",
                          background: "white",
                        }}
                      > 
                        My account
                      </Nav.Link>
                      <div className="dropdown-content">
                        <a href="/profile">Profile</a>
                        <p
                          style={{
                            borderBottom: "1px solid lightgray",
                            margin: "5px",
                          }}
                        ></p>
                        <a href="/orderdetails">Booking History</a>
                        <p
                          style={{
                            borderBottom: "1px solid lightgray",
                            margin: "5px",
                          }}
                        ></p>
                        <a href="/">Logout</a>
                      </div>
                    </div>
                  </div> */}
                  {user ? (
              <li className="nav-item dropdown">
                
                 <div style={{color:"#2A9DF4",cursor:"pointer"}}>
                 {user?.profile ? (
                    <img
                      src={`https://localhost:9000/User/${user?.profile}`}
                      style={{
                        borderRadius: "100%",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  ) : (
                    <FaRegUserCircle
                      style={{
                        borderRadius: "100%",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  )}{" "}
                  {user?.UName} <MdOutlineArrowDropDown />
                 </div>
              
                 <div className="dropdown">
                      {/* <Nav.Link
                        href=""
                        className="tail-text"
                        style={{
                          color: "#083a87 ",
                          borderRadius: "12px",
                          padding: "12px 8px",
                          background: "white",
                        }}
                      > 
                        My account
                      </Nav.Link> */}
                      <div className="dropdown-content">
                        <a href="/profile">Profile</a>
                        <p
                          style={{
                            borderBottom: "1px solid lightgray",
                            margin: "5px",
                          }}
                        ></p>
                        <a href="/orderdetails">Booking History</a>
                        <p
                          style={{
                            borderBottom: "1px solid lightgray",
                            margin: "5px",
                          }}
                        ></p>
                        <a href="" onClick={()=>{logOut()}} >Logout</a>
                      </div>
                    </div>
               
              </li>
            ) : (
              <li className="nav-item">
               
               <Nav.Link
                      href="/login"
                      className="tail-text"
                      style={{
                        color: "#083a87 ",
                        borderRadius: "12px",
                        padding: "12px 8px",
                        background: "white",
                      }}
                    >
                      Login/Register
                    </Nav.Link>
                
              </li>
            )}
             </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    </>
  );
}

export default Header;
