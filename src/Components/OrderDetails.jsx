import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Table,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { Row } from "react-bootstrap";
import "../Styles/profile.css";
import { FaLocationDot, FaPhone, FaPlus } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { BiTimer } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TbCurrentLocation } from "react-icons/tb";
import axios from "axios";
import moment from "moment/moment";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const OrderDetails = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [isVisible, setIsVisible] = useState(false);
  const [prevState, setPrevState] = useState("");
  const [nxtState, setNxtState] = useState("");

  const [isVisible1, setIsVisible1] = useState(false);
  const [Other, setOther] = useState("");

  const [show5, setShow5] = useState();
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  const [show8, setShow8] = useState();
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  const [show9, setShow9] = useState();
  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);

  const [completed, setCompleted] = useState(false);
  const [booked, setBooked] = useState(true);

  const [View, setView] = useState({});

  //integrating get  method
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

  //integrating get  method for keypoints
  const [AddBooking, setAddBooking] = useState([]);
  const getBooking = async () => {
    try {
      let res = await axios.get(
        "http://localhost:9000/api/admin/getAllBookService"
      );
      if (res.status === 200) {
        setAddBooking(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBooking();
    getAddCategory();
  }, []);

  const [rate, setrate] = useState("");
  const [comment, setcomment] = useState("");
  const makeRating = async () => {
    if (!rate) return alert("Please select rate");
    try {
      const config = {
        url: "/api/admin/Ratings",
        method: "post",
        baseURL: "http://localhost:9000",
        headers: { "content-type": "application/json" },
        data: {
          RuserName: user?.UName,
          RuserMail: user?.UEmail,
          RuserMobile: user?.UPhone,
          rate: rate,
          comment: comment,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert("Thanks for give rating");
        handleClose7();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPDF = async () => {
    // dynamic image is also adding in the PDF
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"), {
      useCORS: true,
    });
    console.log("hhhh", data);
    const img = data.toDataURL("image/png");
    console.log("ddkd1", img);
    const imgProperties = pdf.getImageProperties(img);
    console.log("ddkd2", imgProperties);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    console.log("ddkd3", pdfWidth);
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    console.log("ddkd4", pdfHeight);
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ServiceInvoice.pdf");
  };

  return (
    <div>
      <div className="Booked-history-component">
        <h3 style={{ textAlign: "center" }}>Booked Service History</h3>
        <div className="Booked-history">
          <div className="Booked-history-buttons">
            <div
              className="booked-title"
              onClick={() => {
                setCompleted(false);
                setBooked(true);
              }}
            >
              Booked Services
            </div>
            <div
              className="booked-title"
              onClick={() => {
                setCompleted(true);
                setBooked(false);
              }}
            >
              Completed Services
            </div>
          </div>
        </div>

        {/* Conditions for completed orders  */}
        {completed ? (
          <>
          <h2 style={{ textAlign: "center",color:"#080874",fontSize:"2rem",fontWeight:"700" }}>Completed Services</h2>
            {AddBooking?.filter(
              (ele) => ele?.userId === user?._id && ele?.status === "Completed"
            ).map((item, i) => {
              return (
                <div className="order-details-container">
                  <div className="row">
                  <div className="col-md-3" style={{ paddingRight: "unset" }}>
                      <div className="order-display">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12 text-center">
                              <div className="order-details">
                                <div>
                                  {/* <h5>BMW Car</h5> */}
                                  {AddCategory?.filter(
                                    (ele) => ele?.CtText === item?.ServiceName
                                  ).map((item) => {
                                    return (
                                      <img
                                        src={`http://localhost:9000/Category/${item?.CtImage}`}
                                        alt="logo"
                                        className="booked-car-img"
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="order-details">
                          <div>
                            <p>{item?.userName}</p>
                            <p>{item?.userMobile}</p>
                            <p>{item?.userMail}</p>
                          </div>
                        </div>
                        <div
                          className="order-details"
                          style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                          }}
                        >
                          <div className="view-button">
                            <Button
                              className="view"
                              onClick={() => {
                                setView(item);
                                handleShow6();
                              }}
                            >
                              View
                            </Button>
                          </div>
                          <br></br>

                          <div className="view-button">
                            <Button className="view" onClick={handleShow7}>
                              Review
                            </Button>
                          </div>
                        </div>
                            </div>
                           
                          </div>
                        </div>

                       
                       
                      </div>
                    </div>
                    <div className="col-md-9" style={{ paddingLeft: "unset" }}>
                      <div className="first-box" style={{backgroundColor:"#080874",padding:"15px"}}>
                        <div className="order-details">
                          <div className="container">
                            <div className="row mt-1 ">
                              <div className="col-md-6 order-boxes">
                                <div>
                                  <h5>Booked Date & Time</h5>
                                  <p>
                                    {" "}
                                    {moment(item.PickupDate).format(
                                      "MMM Do YYYY "
                                    )}{" "}
                                    - [{item?.PickupTime}]
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-6 order-boxes">
                                <div className="order-details">
                                  <div>
                                    <h5>Categroy</h5>
                                    {AddCategory?.filter(
                                      (ele) => ele?.CtText === item?.ServiceName
                                    ).map((item) => {
                                      return <p>{item?.CtText}</p>;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 order-boxes">
                                <div className="order-details">
                                  <div>
                                    <h5>Pick up Location</h5>
                                    <p>{item?.PickupLoc}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 order-boxes">
                                <div className="order-details">
                                  <div>
                                    <h5>Drop off Location</h5>
                                    <p>{item?.DropoffLoc}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 text-center order-boxes">
                                <div className="order-details">
                                  <div>
                                    <h5>Price</h5>
                                    {AddCategory?.filter(
                                      (ele) => ele?.CtText === item?.ServiceName
                                    ).map((item) => {
                                      return <p>₹{item?.CtPrice}</p>;
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {/* Conditions for booked orders  */}
            {booked ? (
              <>
              <h2 style={{ textAlign: "center",color:"#080874",fontSize:"2rem",fontWeight:"700" }}>Booked Services</h2>
                {AddBooking?.filter(
                  (ele) =>
                    ele?.userId === user?._id && ele?.status !== "Completed"
                ).map((item) => {
                  return (
                    <div className="order-details-container mt-2">
                  <div className="row">
                  <div className="col-md-3" style={{ paddingRight: "unset" }}>
                      <div className="order-display">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12 text-center">
                              <div className="order-details">
                                <div>
                                  {/* <h5>BMW Car</h5> */}
                                  {AddCategory?.filter(
                                    (ele) => ele?.CtText === item?.ServiceName
                                  ).map((item) => {
                                    return (
                                      <img
                                        src={`http://localhost:9000/Category/${item?.CtImage}`}
                                        alt="logo"
                                        className="booked-car-img"
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="order-details">
                          <div>
                            <p>{item?.userName}</p>
                            <p>{item?.userMobile}</p>
                            <p>{item?.userMail}</p>
                          </div>
                        </div>
                        <div
                          className="order-details"
                          style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                          }}
                        >
                          <div className="view-button">
                            <Button
                              className="view"
                              onClick={() => {
                                setView(item);
                                handleShow6();
                              }}
                            >
                              View
                            </Button>
                          </div>
                          <br></br>

                          <div className="view-button">
                            <Button className="view" onClick={handleShow7}>
                              Review
                            </Button>
                          </div>
                        </div>
                            </div>
                           
                          </div>
                        </div>

                       
                       
                      </div>
                    </div>
                    <div className="col-md-9" style={{ paddingLeft: "unset" }}>
                      <div className="first-box" style={{backgroundColor:"#080874",padding:"15px"}}>
                        <div className="order-details">
                          <div className="container">
                            <div className="row mt-1 ">
                              <div className="col-md-6 order-boxes">
                                <div>
                                  <h5>Booked Date & Time</h5>
                                  <p>
                                    {" "}
                                    {moment(item.PickupDate).format(
                                      "MMM Do YYYY "
                                    )}{" "}
                                    - [{item?.PickupTime}]
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-6 order-boxes">
                                <div className="order-details">
                                  <div>
                                    <h5>Categroy</h5>
                                    {AddCategory?.filter(
                                      (ele) => ele?.CtText === item?.ServiceName
                                    ).map((item) => {
                                      return <p>{item?.CtText}</p>;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 order-boxes">
                                <div className="order-details">
                                  <div>
                                    <h5>Pick up Location</h5>
                                    <p>{item?.PickupLoc}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 order-boxes">
                                <div className="order-details">
                                  <div>
                                    <h5>Drop off Location</h5>
                                    <p>{item?.DropoffLoc}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 text-center order-boxes">
                                <div className="order-details">
                                  <div>
                                    <h5>Price</h5>
                                    {AddCategory?.filter(
                                      (ele) => ele?.CtText === item?.ServiceName
                                    ).map((item) => {
                                      return <p>₹{item?.CtPrice}</p>;
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {/* Invoice Moadl after completed */}
        <Modal
          size="lg"
          show={show6}
          onHide={handleClose6}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <h4 style={{ textAlign: "center", color: "#080874" }}>
            Booked Service History
          </h4>
          <Modal.Body>
            <div id="pdf" className="p-3">
              <Row>
                <div
                  className="col-lg-12 mb-3"
                  style={{ display: "flex", height: "10rem" }}
                >
                  <div className="invoice-header">
                    {/* <img src={loginlogo} alt="" className='modal-logo' /> */}
                    <img
                      src="../Assets/logo.png"
                      alt="logo"
                      style={{ height: "165px" }}
                    />
                  </div>
                  <div className="invoice-header">
                    <p style={{ textAlign: "right" }}>
                      {" "}
                      #104, 1, Singapura Main Rd, <br></br>
                      Vidyaranyapura, Bengaluru, <br></br>
                      Karnataka 560097<br></br>
                      123@gmail.com <br></br>
                      valuepro.com{" "}
                    </p>
                  </div>
                </div>
              </Row>

              <Row>
                <div className="col-lg-12 mb-3 invoice-details">
                  <div className="invoice-header">
                    <div>
                      <h4>Bill To</h4>
                    </div>
                    <hr></hr>
                    <div>
                      <p>
                        {View?.PickupLoc}
                        <br></br>
                        +91 {View?.userMobile}
                      </p>
                    </div>
                  </div>
                  <div className="invoice-header">
                    <div>
                      <h4>Service Details</h4>
                    </div>
                    <hr></hr>
                    <div>
                      <b>Booked Service date:</b> {View?.PickupDate}
                      <br></br>
                      <b>Booked Service Time:</b>
                      {View?.PickupTime} <br></br>
                      <b>Booked Vehical :</b>
                      {View?.ServiceName}
                      <br></br>
                      <b>Status:</b>
                      {View?.status}
                      <br></br>
                    </div>
                  </div>
                </div>
              </Row>
              <Row>
                <div>
                  <div>
                    <Table responsive className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Sl. No</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Booked Date & Time</th>
                          {/* <th scope="col">Booked Time</th> */}
                          <th scope="col">Pick up Location</th>
                          <th scope="col">Drop Location</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          {/* <th scope="row">12343453</th> */}
                          <td>{View?.userName}</td>
                          <th scope="row">{View?.createdAt}</th>
                          <td>{View?.PickupLoc}</td>
                          <td>{View?.DropoffLoc}</td>
                          <td>
                            <b>
                              {AddCategory?.filter(
                                (ele) => ele?.CtText === View?.ServiceName
                              ).map((item) => {
                                return <p>{item?.CtPrice}</p>;
                              })}
                            </b>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="download" onClick={createPDF}>
              Download Invoice
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Review Modal  */}
        <Modal show={show7} onHide={handleClose7} style={{ zIndex: "9999999" }}>
          <Modal.Header closeButton></Modal.Header>
          <h4 style={{ textAlign: "center", color: "#080874" }}>Review Here</h4>
          <Modal.Body>
            <div
              id="form"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content align-items-center">
                  <div className="card-body text-center">
                    <img
                      src=" https://i.imgur.com/d2dKtI7.png"
                      height="100"
                      width="100"
                    />
                    <div className="comment-box text-center">
                      <h4>Add a Review</h4>
                      <div className="rating">
                        <input
                          type="radio"
                          name="rating"
                          value="5"
                          id="5"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="5">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="4"
                          id="4"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="4">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="3"
                          id="3"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="3">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="2"
                          id="2"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="2">☆</label>
                        <input
                          type="radio"
                          name="rating"
                          value="1"
                          id="1"
                          onChange={(e) => setrate(e.target.value)}
                        />
                        <label for="1">☆</label>
                      </div>
                      <div className="comment-area">
                        {" "}
                        <textarea
                          class="form-control"
                          placeholder="what is your view?"
                          rows="4"
                          onChange={(e) => setcomment(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="text-center mt-4">
                        {" "}
                        <button
                          class="btn btn-success send px-5"
                          onClick={makeRating}
                        >
                          Send <i class="fa fa-long-arrow-right ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Revisit Modal  */}
        <Modal
          size="lg"
          show={show8}
          onHide={handleClose8}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-11">
                  <h8 style={{ color: "#083a87" }}>
                    <FaLocationDot onClick={handleShow3} />
                  </h8>{" "}
                  &nbsp;
                  <h8>123</h8>
                </div>

                <div className="col-md-1 text-end">
                  <h8 style={{ fontSize: "20px" }}>
                    <IoIosArrowForward onClick={handleShow3} />
                  </h8>
                </div>
                <div className="col-md-12">
                  <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mb-3">
                  <div>
                    <h4>When should the professional arrive?</h4>
                    <h7>Your service will take approx. 1 hr and 15 mins</h7>
                  </div>
                </div>
                <br />
              </div>

              <div className="col-md-12">
                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-11">
                        <h7>
                          {" "}
                          <BiTimer /> Express
                        </h7>
                        <br />
                        <h8>In 90-120 minutes</h8>
                        <br />
                        <h8>Unavailable at the moment</h8>
                      </div>

                      <div
                        className="col-md-1 "
                        style={{ textAlign: "center", marginTop: "30px" }}
                      >
                        <Form.Check type="radio" aria-label="radio 1" />
                      </div>
                    </div>

                    <br />
                  </Card.Body>
                </Card>

                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-11 mb-4">
                        <h7 style={{ fontWeight: "bold" }}>
                          Get service later
                        </h7>
                        <br />
                        <h8>Service at the earliest available time slot</h8>
                        <br />
                      </div>

                      <div
                        className="col-md-1 "
                        style={{ textAlign: "center" }}
                      >
                        <Form.Check type="radio" aria-label="radio 1" />
                      </div>
                      <br />
                      <div className="row d-flex gap-3">
                        <div className="col-md-1 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                              padding: "8px",
                            }}
                          >
                            <h8>Fri</h8>
                            <br />
                            <h8>05</h8>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-1 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                              padding: "8px",
                            }}
                          >
                            <h8>Sat</h8>
                            <br />
                            <h8>06</h8>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-1 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                              padding: "8px",
                            }}
                          >
                            <h8>Sun</h8>
                            <br />
                            <h8>07</h8>
                          </div>
                        </div>

                        <div className="col-md-12 mb-3">
                          <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                        </div>
                      </div>

                      <h5>Select start time of service</h5>
                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.00 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.30 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.00 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.30 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.00 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.30 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.00 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.30 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />
                    </div>

                    <br />
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "#080874",
                color: "white",
                width: "100%",
                padding: "8px",
              }}
              onClick={handleClose8}
            >
              Confirm Revisit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit  */}
        <Modal
          size="lg"
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#080874" }}>Location </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "unset" }}>
            <div
              className="container-fluid"
              style={{ paddingLeft: "unset", paddingRight: "unset" }}
            >
              <div
                className="row"
                style={{ paddingLeft: "unset", paddingRight: "unset" }}
              >
                <div
                  className="col-md-6"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31090.264129437837!2d77.53480077779398!3d13.081241386031335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae229f7a8debe1%3A0x4d80f1d259c7e7ac!2sVidyaranyapura%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1702035015935!5m2!1sen!2sin"
                    style={{
                      width: "100%",
                      // marginTop: "2rem",
                      height: "450px",
                    }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="col-md-6">
                  <div style={{ padding: "8px" }}>
                    <button
                      style={{
                        backgroundColor: "white",
                        padding: "8px",
                        color: "#080874",
                        // height: "160%",
                        border: "1px solid #083a87",
                        marginBottom: "10px",
                      }}
                      onClick={() => {
                        handleShow8();
                      }}
                    >
                      Change
                    </button>

                    <h5>Singapura Main Rd</h5>
                    <h7>
                      Singapura Main Rd, opp. Indian Oil Petrol Pumb, Singapura
                      Village, Singapura, Bengaluru, Karnataka 560097, India
                    </h7>
                    <h2
                      style={{
                        borderBottom: "1px dotted black",
                        marginTop: "1rem",
                      }}
                    ></h2>

                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        {/* <Form.Label>
                      <IoTimeSharp /> &nbsp; Slot
                    </Form.Label> */}
                        <Form.Control
                          type="password"
                          placeholder="House/Flat Number*"
                        />
                      </Form.Group>
                    </Form>

                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        {/* <Form.Label>
                      <IoTimeSharp /> &nbsp; Slot
                    </Form.Label> */}
                        <Form.Control
                          type="password"
                          placeholder="Landmark (Optional)"
                        />
                      </Form.Group>
                    </Form>

                    <h7>Save as</h7>
                    <div className="row">
                      <div className="col-md-2">
                        <div
                          className="time"
                          style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "8px",
                          }}
                        >
                          <h8>Home</h8>
                        </div>
                      </div>
                      &nbsp;
                      <div className="col-md-2">
                        <div
                          className="time"
                          style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "8px",
                          }}
                        >
                          <h8>Other</h8>
                        </div>
                      </div>
                    </div>

                    <button
                      style={{
                        padding: "8px",
                        width: "100%",
                        marginTop: "2.5rem",
                        backgroundColor: "#080874",
                        color: "white",
                        width: "100%",
                        border: "none",
                      }}
                    >
                      Update Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Delete  */}
        <Modal
          show={show2}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#080874" }}>
              Delete Address{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h7>Are you sure you want to delete address?</h7>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "white",
                border: "1px solid #083a87",
                // color: "white",
              }}
              onClick={handleClose2}
            >
              No, go back
            </Button>

            <Button
              variant=""
              style={{
                backgroundColor: "#083a87",
                border: "1px solid #083a87",
                color: "white",
              }}
            >
              Yes, delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Slot  */}
        <Modal
          size="lg"
          // show={show6}
          // onHide={handleClose6}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-11">
                  <h8
                    style={{ color: "#083a87" }}
                    onClick={() => {
                      handleShow3();
                    }}
                  >
                    <FaLocationDot />
                  </h8>{" "}
                  &nbsp;
                  <h8>123</h8>
                </div>

                <div className="col-md-1 text-end">
                  <h8
                    style={{ fontSize: "20px" }}
                    onClick={() => {
                      handleShow3();
                    }}
                  >
                    <IoIosArrowForward />
                  </h8>
                </div>
                <div className="col-md-12">
                  <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mb-3">
                  <div>
                    <h4>When should the professional arrive?</h4>
                    <h7>Your service will take approx. 1 hr and 15 mins</h7>
                  </div>
                </div>
                <br />
              </div>

              <div className="col-md-12">
                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-11">
                        <h7>
                          {" "}
                          <BiTimer /> Express
                        </h7>
                        <br />
                        <h8>In 90-120 minutes</h8>
                        <br />
                        <h8>Unavailable at the moment</h8>
                      </div>

                      <div
                        className="col-md-1 "
                        style={{ textAlign: "center", marginTop: "30px" }}
                      >
                        <Form.Check type="radio" aria-label="radio 1" />
                      </div>
                    </div>

                    <br />
                  </Card.Body>
                </Card>

                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-11 mb-4">
                        <h7 style={{ fontWeight: "bold" }}>
                          Get service later
                        </h7>
                        <br />
                        <h8>Service at the earliest available time slot</h8>
                        <br />
                      </div>

                      <div
                        className="col-md-1 "
                        style={{ textAlign: "center" }}
                      >
                        <Form.Check type="radio" aria-label="radio 1" />
                      </div>
                      <br />
                      <div className="row d-flex gap-3">
                        <div className="col-md-1 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                              padding: "8px",
                            }}
                          >
                            <h8>Fri</h8>
                            <br />
                            <h8>05</h8>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-1 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                              padding: "8px",
                            }}
                          >
                            <h8>Sat</h8>
                            <br />
                            <h8>06</h8>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-1 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                              padding: "8px",
                            }}
                          >
                            <h8>Sun</h8>
                            <br />
                            <h8>07</h8>
                          </div>
                        </div>

                        <div className="col-md-12 mb-3">
                          <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                        </div>
                      </div>

                      <h5>Select start time of service</h5>
                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.00 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.30 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.00 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.30 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.00 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.30 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.00 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{ position: "relative" }}
                          >
                            <div
                              style={{
                                border: "1px solid #80808033",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <h6>7.30 AM</h6>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: "-11px",
                                right: "0px",
                                backgroundColor: "#FFF6E3",
                                color: "#DCAC4C",
                              }}
                            >
                              <h8>+ Rs.100</h8>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />

                      <div className="row d-flex gap-3 mt-3">
                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.00 AM</h6>
                          </div>
                        </div>
                        <br />

                        <div className="col-md-2 text-center">
                          <div
                            className="time"
                            style={{
                              border: "1px solid #80808033",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <h6>7.30 AM</h6>
                          </div>
                        </div>

                        <br />
                      </div>
                      <br />
                    </div>

                    <br />
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "#083a87",
                border: "1px solid #083a87",
                color: "white",
                width: "100%",
                padding: "8px",
              }}
            >
              Proceed to checkout
            </Button>
          </Modal.Footer>
        </Modal>

        {/* SavedAddress  */}
        <Modal
          show={show3}
          onHide={handleClose3}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "9999999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#080874" }}>
              Saved Addresses{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h8
                    style={{ color: "#080874", cursor: "pointer" }}
                    onClick={() => {
                      handleShow8();
                    }}
                  >
                    <FaPlus />
                  </h8>{" "}
                  &nbsp;
                  <h8
                    style={{ color: "#080874", cursor: "pointer" }}
                    onClick={() => {
                      handleShow8();
                    }}
                  >
                    Add another address
                  </h8>
                  {/* <h8 style={{justifyContent:"end"}}><IoArrowForward /></h8> */}
                </div>

                <div className="col-md-12 mt-3">
                  <h2 style={{ borderBottom: "1px dotted black" }}></h2>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-md-1">
                  <Form.Check type="radio" aria-label="radio 1" />
                </div>
                <div className="col-md-9">
                  <h5>Home</h5>
                  <h7>
                    123, Singapura Main Rd, Singapura Village, Singapura,
                    Bengaluru, Karnataka 560097, India
                  </h7>
                </div>
                <div className="col-md-2 text-center ">
                  <HiOutlineDotsVertical
                    onClick={() => setPrevState(!prevState)}
                  />

                  {prevState ? (
                    <>
                      <div
                        style={{
                          border: "1px solid #80808026",
                          borderRadius: "5px",
                          padding: "8px",
                          display: "block",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        <h6
                          onClick={() => {
                            handleShow4();
                          }}
                        >
                          Edit
                        </h6>
                        {/* <br/> */}
                        <h6
                          onClick={() => {
                            handleShow2();
                          }}
                        >
                          Delete
                        </h6>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <br />
              <hr />
              <br />

              <div className="row">
                <div className="col-md-1">
                  <Form.Check type="radio" aria-label="radio 1" />
                </div>
                <div className="col-md-9">
                  <h5>Home</h5>
                  <h7>
                    123, Singapura Main Rd, Singapura Village, Singapura,
                    Bengaluru, Karnataka 560097, India
                  </h7>
                </div>
                <div className="col-md-2 text-center ">
                  <HiOutlineDotsVertical
                    onClick={() => setNxtState(!nxtState)}
                  />

                  {nxtState ? (
                    <>
                      <div
                        style={{
                          border: "1px solid #80808026",
                          borderRadius: "5px",
                          padding: "8px",
                          display: "block",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        <h6
                          onClick={() => {
                            handleShow4();
                          }}
                        >
                          Edit
                        </h6>
                        {/* <br/> */}
                        <h6
                          onClick={() => {
                            handleShow2();
                          }}
                        >
                          Delete
                        </h6>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              style={{
                backgroundColor: "#080874",
                color: "white",
              }}
            >
              Okay
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default OrderDetails;
