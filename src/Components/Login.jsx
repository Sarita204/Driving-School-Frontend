import React, { useState } from "react";
import "../Styles/register.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import axios from "axios";
import swal from "sweetalert";

function Login() {

  const navigate = useNavigate();

  const [UEmail,setUEmail]=useState("");
  const [RPsswrd,setRPsswrd]=useState("");

  const loginUser =async ()=>{
    try {
      const config={
        url:"/user/userLogin",
        method:"post",
        baseURL:"http://localhost:9000/api",
        headers:{"content-type":"application/json"},
        data:{UEmail:UEmail,RPsswrd:RPsswrd}
      }
      let res=await axios(config);
      if(res.status==200){
        alert("Successfully login");
        sessionStorage.setItem("user",JSON.stringify(res.data.userLogin));
        window.location.assign("/")
      }
    } catch (error) {
      alert(error.response.data.error)
      console.log(error);
    }
  }

  return (
    <>
    <div className="login-bg">
      <div className="container">
      <div className="slider-btn">
                        <a href="/">
                          <Button variant="" className="sliders-btn">
                            Back
                          </Button>
                        </a>{" "}
                      </div>
        <div className="mt-5 item">
          <div className="log-0">
          
            <div
              className="urban-0"
              style={{
                backgroundImage: "url('../Assets/login.avif')",
                height: "400px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                paddingTop: "201px",
                width: "421px",
              }}
            >
              
              <div className="mobile-dif ">
                <div
                  className="mb-2"
                  style={{ fontSize: "16px", fontWeight: "500", color:"gray" }}
                >
                  Enter your Email ID
                </div>
                <div>
                  <input
                    type="text"
                    placeholder=" Enter your Email ID "
                    className="input-log mb-3"
                    value={UEmail}
                    onChange={(e)=>setUEmail(e.target.value)}
                  />
                </div>

                <div
                  className="mb-2"
                  style={{ fontSize: "16px", fontWeight: "500", color:"gray" }}
                >
                  Enter your Password
                </div>
                <div>
                  <input
                    type="text"
                    placeholder=" Enter your password"
                    className="input-log mb-3"
                    value={RPsswrd}
                    onChange={(e)=>setRPsswrd(e.target.value)}
                    required
                  />
                </div>

                <Button variant="" className="login-btn mb-1" onClick={(e)=>loginUser(e)} >
                  <a style={{ color: "white" }}>Log in</a>
                </Button>
                <p>
                  Don't have an account ? <a href="/register">Register</a>
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

export default Login;
