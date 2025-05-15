import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../Styles/profile.css";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

// profile
import Offcanvas from "react-bootstrap/Offcanvas";
// import user from "../images/logo.png";
import { Container, Form, InputGroup, Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [UName, setUName] = useState("");
  const [UPhone, setUPhone] = useState("");
  const [UEmail, setUEmail] = useState("");
  const [UAddress, setUAddress] = useState("");
  const [UImg,setUImg] = useState("");

  // User profile modal
  const [show5, setShow5] = useState();
  const [show6, setShow6] = useState();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibles, setIsVisibles] = useState(false);

  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const editRegUser = async () => {
    try {
      const config = {
        url: "/user/edituser",
        method: "put",
        baseURL: "http://localhost:9000/api",

        headers: { "content-type": "multipart/form-data" },
        data: {
          UName: UName,
          UEmail: UEmail,
          UPhone: UPhone,
          UAddress: UAddress,
          UImg:UImg,
          id: user?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Updated");
        // getUserbyId();
        sessionStorage.setItem("user", JSON.stringify(res.data.success));
        handleClose5();

        setUName("");
        setUPhone("");
        setUEmail("");
        setUAddress("");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const [RPsswrd, setRPsswrd] = useState("");
  const [RCPasswrd, setRCPasswrd] = useState("");
  const editRegUserPassword = async () => {
    try {
      const config = {
        url: "/user/edituser",
        method: "put",
        baseURL: "http://localhost:9000/api",

        headers: { "content-type": "multipart/form-data" },
        data: {
          RPsswrd: RPsswrd,
          RCPasswrd: RCPasswrd,
          id: user?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Successfully Updated");
        // getUserbyId();
        sessionStorage.setItem("user", JSON.stringify(res.data.success));
        handleClose6();

        setRPsswrd("");
        setRCPasswrd("");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="add-gr">
        <div>
          <div className="myaccount-component">
            <div className="profile-container">
              {/* <FaUserCircle style={{width:"100%", height:"200px"}}/> */}
              <img
                src={`http://localhost:9000/UserList/${user?.UImg}`}
                alt=""
                style={{ width: "273px", height: "218px", marginLeft: "57px" }}
              />
              <p
                className="user-name"
                style={{
                  color: "#080874",
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                {user?.UName}
              </p>
              {/* <div className='location-container'>
                < IoLocationSharp  style={{width:"24px", height:"24px", color:"#080874"}}/>
                <p className="location-name">IN, {user?.UAddress}</p>
              </div> */}
            </div>

            <div className="profile-container-2">
              <div className="profile-content-display">
                <div className="profile-user-deatils">
                  <p className="profile-user-subtitle">
                    <span
                      style={{
                        color: "#080874",
                        fontSize: "18px",
                        fontWeight: "400",
                      }}
                    >
                      Name
                    </span>{" "}
                    : {user?.UName}
                  </p>
                  <p className="profile-user-subtitle">
                    <span
                      style={{
                        color: "#080874",
                        fontSize: "18px",
                        fontWeight: "400",
                      }}
                    >
                      Email ID
                    </span>{" "}
                    : {user?.UEmail}
                  </p>
                  <p className="profile-user-subtitle">
                    <span
                      style={{
                        color: "#080874",
                        fontSize: "18px",
                        fontWeight: "400",
                      }}
                    >
                      Phone no
                    </span>{" "}
                    : {user?.UPhone}
                  </p>
                  <p className="profile-user-subtitle">
                    <span
                      style={{
                        color: "#080874",
                        fontSize: "18px",
                        fontWeight: "400",
                      }}
                    >
                      Address
                    </span>{" "}
                    : {user?.UAddress}
                  </p>
                </div>
              </div>
              <div>
                <div className="edit-change-button">
                  <Button
                    variant=""
                    className="header-search"
                    onClick={handleShow5}
                    style={{ background: "#080874", color: "white" }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant=""
                    className="header-search"
                    style={{
                      width: "auto",
                      background: "#080874",
                      color: "white",
                    }}
                    onClick={handleShow6}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Edit profile modal */}
          <Modal
            show={show5}
            onHide={handleClose5}
            style={{ zIndex: "9999999" }}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <h4 style={{ textAlign: "center", color: "#080874" }}>
                Edit Your Profile
              </h4>
              <Row>
              <div className="col-lg-12 mb-3" name="edit-profile-details">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setUImg(e.target.files[0])}
                  />
                </div>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user?.UName}
                    value={UName}
                    onChange={(e) => setUName(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user?.UPhone}
                    value={UPhone}
                    onChange={(e) => setUPhone(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user?.UEmail}
                    value={UEmail}
                    onChange={(e) => setUEmail(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user?.UAddress}
                    value={UAddress}
                    onChange={(e) => setUAddress(e.target.value)}
                  />
                </div>
              </Row>

              <div className="mb-4">
                <Button
                  variant=" "
                  className="header-search"
                  style={{
                    background: "#080874",
                    color: "white",
                    width: "100%",
                  }}
                  onClick={() => {editRegUser()}}
                >
                  Update
                </Button>
                {isVisible && (
                  <div className="popup-content">
                    Profile Update Successfully
                  </div>
                )}
              </div>
            </Modal.Body>
          </Modal>

          {/* Set password modal  */}
          <Modal
            show={show6}
            onHide={handleClose6}
            style={{ zIndex: "9999999" }}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <h4 style={{ textAlign: "center", color: "#080874" }}>
                Set New Password
              </h4>
              <Row>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user?.RPsswrd}
                    onChange={(e) => setRPsswrd(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <input
                    type="text"
                    className="form-control"
                    // placeholder={CryptoJS.AES.encrypt(
                    //   user?.RCPasswrd,
                    //   RCPasswrd
                    // ).toString()}
                    placeholder={user?.RCPasswrd}
                    onChange={(e) => setRCPasswrd(e.target.value)}
                  />
                </div>
              </Row>

              <div className="mb-4">
                <Button
                  variant=" "
                  className="header-search"
                  style={{
                    background: "#080874",
                    color: "white",
                    width: "100%",
                  }}
                  onClick={() => editRegUserPassword()}
                >
                  Set Password
                </Button>
                {isVisibles && (
                  <div className="popup-content">
                    Password Changed Successfully
                  </div>
                )}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Profile;
