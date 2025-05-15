import React, { useState, useEffect } from "react";
import "../Styles/register.css";
import { Button } from "react-bootstrap";
import axios from "axios";

function Register() {
  
 
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);

  const formdata = new FormData();
  const [UImg, setUImg] = useState("");
  const [UName, setUName] = useState("");
  const [UPhone, setUPhone] = useState("");
  const [UEmail, setUEmail] = useState("");
  const [UAddress, setUAddress] = useState("");
  const [RPsswrd, setRPsswrd] = useState("");
  const [RCPasswrd, setRCPasswrd] = useState("");

  const AddUser = async () => {
    formdata.append("UImg", UImg);
    formdata.append("UName", UName);
    formdata.append("UPhone", UPhone);
    formdata.append("UEmail", UEmail);
    formdata.append("UAddress", UAddress);
    formdata.append("RPsswrd", RPsswrd);
    formdata.append("RCPasswrd", RCPasswrd);


    try {
      if (!UImg) {
        return alert("Please Select the file");
      }
      if (!UName) {
        return alert("Please add Name");
      }
      if (!UPhone) {
        return alert("Please add Phone number");
      }
      if (!UEmail) {
        return alert("Please add Email ID");
      }
      if (!UAddress) {
        return alert("Please add Address");
      }
      if (!RPsswrd) {
        return alert("Please add password");
      }
      if (!RCPasswrd) {
        return alert("Please add confirm password");
      }
      const config = {
        url: "/user/user",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAdduser();
        handleClose();
        window.location.assign("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
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

  //delete method
  const [Data, setData] = useState("");


  //update method
  const [Data1, setData1] = useState("");
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (item) => {
    setShow3(true);
    setData1(item);
    setUName(item?.UName);
    setUPhone(item?.UPhone);
    setUEmail(item?.UEmail);
    setUAddress(item?.UAddress);
  };


  // };
  useEffect(() => {
    getAdduser();
  }, []);
  console.log(Adduser);

  return (
    <>
      <div className="register-bg">
        <div className="container">
        <div className="slider-btn">
                        <a href="/login">
                          <Button variant="" className="sliders-btn">
                            Back
                          </Button>
                        </a>{" "}
                      </div>
          <div className=" item">
         
            <div className="log-0">
           
              <div
                className="urban-0"
                style={{
                  backgroundImage: "url('../Assets/login.avif')",
                  height: "716px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  paddingTop: "201px",
                  width: "450px",
                }}
              >
                <div className="mobile-dif">
                  <div>
                  <input
                      type="file"
                      placeholder="Choose profile"
                      className="input-log mb-3"
                      style={{resize:"none"}}
                      onChange={(e) => setUImg(e.target.files[0])}
                    />
                    
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      className="input-log mb-3"
                      onChange={(e) => setUName(e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Enter your Phone no"
                      className="input-log mb-3"
                      onChange={(e) => setUPhone(e.target.value)}
                    />

                    <input
                      type="email"
                      placeholder="Enter your mail ID"
                      className="input-log mb-3"
                      onChange={(e) => setUEmail(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="Enter your Address"
                      className="input-log mb-3"
                      onChange={(e) => setUAddress(e.target.value)}
                    />

                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input-log mb-3"
                      onChange={(e) => setRPsswrd(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Enter your confirm password"
                      className="input-log mb-3"
                      onChange={(e) => setRCPasswrd(e.target.value)}
                    />
                  </div>
                  <Button variant="" className="login-btn" onClick={AddUser}>
                    <a style={{ color: "white" }}>Register</a>
                  </Button>
                  <p>
                    Already have an account ? <a href="/login">Login</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
