import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import moment from "moment/moment";

const AdminBookings = () => {
  const [show, setShow] = useState();
  const [show4, setShow4] = useState();
  const [show10, setShow10] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const handleClose10 = () => setShow10(false);
  const handleShow10 = () => setShow10(true);

  const [show5, setShow5] = useState();
  const [show6, setShow6] = useState();
  const handleClose5 = () => setShow5(false);
  // const handleShow5 = () => setShow5(true);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);
  const handleChange = (e, editor) => {
    const data = editor.getData();
    setkeypoints(data);
  };
  // integrating post method for keypoints
  const [keypoints, setkeypoints] = useState("");
  const [keycategory, setkeycategory] = useState("");
  const AddKeypoints = async () => {
    try {
      if (!keycategory) {
        return alert("Please select the category");
      }
      if (!keypoints) {
        return alert("Please add keypoints");
      }

      const config = {
        url: "/admin/keypoints",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "application/json" },
        data: {
          keypoints: keypoints,
          keycategory: keycategory,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getkeypoints();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  //integrating get  method for keypoints
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
  //integrating get  method for keypoints
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

  //delete method for keypoints
  const [Data, setData] = useState("");
  const Deletekeypoints = async () => {
    try {
      const config = {
        url: "admin/Deletekeypoints/" + Data,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getkeypoints();
          handleClose4();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method for keypoints
  const [Data1, setData1] = useState("");
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (item) => {
    setShow3(true);
    setData1(item);
    setkeycategory(item?.keycategory);
    setkeypoints(item?.keypoints);
  };

  const editkeypoints = async (e) => {
    e.preventDefault();
    // if (!GrImage) {
    //   alert("Select the image");
    // } else {
    //   formdata.append("CtImage", CtImage);
    //   formdata.append("CtText", CtText);
    //   formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editkeypoints",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
        data: {
          keycategory: keycategory,
          keypoints: keypoints,
          id: Data1?._id,
        },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Updated");
          handleClose3();
          getkeypoints();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddCategory();
    getkeypoints();
  }, []);
  console.log(AddCategory);

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
  const handleShow5 = (item) => {
    setShow5(true);
    setservicedata(item);
  };

  const Addbookings = async () => {
    try {
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
          ServiceName: servicedata?.CtText,
          userName:userName,
          userMail:userMail,
          userMobile:userMobile,
          PickupLoc:PickupLoc,
          PickupDate: PickupDate,
          PickupTime: PickupTime,
          DropoffLoc:DropoffLoc,
          DropoffDate: DropoffDate,
          DropoffTime: DropoffTime,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getkeypoints();
        handleClose5();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
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
  //delete method for keypoints
  const [Data3, setData3] = useState("");
  const DeleteBookings = async () => {
    try {
      const config = {
        url: "admin/deleteBookService/" + Data3,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getBooking();
          handleClose6();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  useEffect(() => {
    getBooking();
  }, []);

  const [editid, seteditid] = useState("")
  const [status, setstatus] = useState("");
  const makeStatusChangeContactUs = async () => {
    try {
      const config = {
        url: "/admin/makeStatusChangebookings",
        method: "put",
        baseURL: "http://localhost:9000/api",
        headers: {
          "Content-Type": "application/json",
        },

        data: {
          id: editid,
          status: status,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        alert(`${res?.data?.success}`);
        handleClose10();
        getBooking();
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error);
    }
  };

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Addkeypoints.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Addkeypoints.length / recordsperpage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  function changePage(id) {
    setCurrentpage(id);
  }

  function prevpage() {
    if (currenpage !== firstIndex) {
      setCurrentpage(currenpage - 1);
    }
  }

  function nextpage() {
    if (currenpage !== lastIndex) {
      setCurrentpage(currenpage + 1);
    }
  }
  // pagination for bookings
  const [currenpage1, setCurrentpage1] = useState(1);
  const recordsperpage1 = 5;
  const lastIndex1 = currenpage1 * recordsperpage1;
  const firstIndex1 = lastIndex1 - recordsperpage1;
  const records1 = AddBooking.slice(firstIndex1, lastIndex1);
  const npages1 = Math.ceil(AddBooking.length / recordsperpage1);
  const numbers1 = [...Array(npages1 + 1).keys()].slice(1);

  function changePage1(id) {
    setCurrentpage1(id);
  }

  function prevpage1() {
    if (currenpage1 !== firstIndex1) {
      setCurrentpage1(currenpage1 - 1);
    }
  }

  function nextpage1() {
    if (currenpage1 !== lastIndex1) {
      setCurrentpage1(currenpage1 + 1);
    }
  }
  const [Keypoints, setKeypoints] = useState(true);
  const [bookings, setbookings] = useState(false);

  
  return (
    <div>
      <div className="col-lg-4 d-flex justify-content-center">
        <div class="input-group ">
          <span class="input-group-text" id="basic-addon1">
            <BsSearch />
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            aria-describedby="basic-addon1"
          />
        </div>
      </div>

      <div className="customerhead p-2">
        <div className="d-flex gap-2">
          <button
            className="admin-add-btn"
            onClick={() => {
              setKeypoints(true);
              setbookings(false);
            }}
          >
            KeyPoints
          </button>
          <button
            className="admin-add-btn"
            onClick={() => {
              setKeypoints(false);
              setbookings(true);
            }}
          >
            Bookings
          </button>
        </div>
        {Keypoints ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="header-c ">Key Points</h2>
              {AddKeypoints?.length !==0?(<> <button className="admin-add-btn" onClick={handleShow}>
                Add keypoints
              </button></>):(<></>)}
             
            </div>

            <div className="mb-3">
              <Table
                responsive
                bordered
                style={{ width: "-webkit-fill-available" }}
              >
                <thead>
                  <tr>
                    <th>S.No</th>
                    {/* <th>Category Name</th> */}
                    <th>Keypoints</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 + firstIndex}</td>

                        {/* <td>{item?.keycategory}</td> */}

                        <td>{parse(`<div>${item?.keypoints}</div>`)}</td>

                        <td>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <BiSolidEdit
                                className="text-success"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => handleShow3(item)}
                              />{" "}
                            </div>
                            <div>
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShow4();
                                  setData(item?._id);
                                }}
                              />{" "}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <></>
        )}
        {bookings ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="header-c ">Bookings</h2>
              <button className="admin-add-btn" onClick={handleShow5}>
                Add Bookings
              </button>
            </div>

            <div className="mb-3">
              <Table
                responsive
                bordered
                style={{ width: "-webkit-fill-available" }}
              >
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Category Name</th>
                    <th>Name</th>
                    <th>Mail</th>
                    <th>Phone</th>
                    <th>PickUp Location</th>
                    <th>PickUp Date & Time</th>
                    <th>Dropoff Location</th>
                    <th>DropOff Date & Time</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records1?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 + firstIndex1}</td>

                        <td>{item?.ServiceName}</td>
                        <td>{item?.userName}</td>
                        <td>{item?.userMail}</td>
                        <td>{item?.userMobile}</td>
                        <td>{item?.PickupLoc}</td>

                        <td style={{ paddingTop: "20px" }}>
                          {moment(item.PickupDate).format("MMM Do YYYY ")} - 
                          [{item?.PickupTime}]
                        </td>
                        <td>{item?.DropoffLoc}</td>
                        <td style={{ paddingTop: "20px" }}>
                        {moment(item.DropoffDate).format("MMM Do YYYY")} - 
                          [{item.DropoffTime}]
                        </td>

                        <td>{item?.status =="Pending" ? (<span style={{color:"blue"}}>{item?.status}
                        </span>):(<span style={{color:"green"}}>{item.status=="Hold" ? (<span style={{color:"red"}}>{item?.status}</span>):(<span>{item?.status}</span>)}</span>)}
                        <div>
                          {item?.status !== "Completed" ? (
                            <div  style={{ display: "flex", gap: "10px" }}>
                              <button type="button" class="btn btn-success" onClick={()=>{
                                seteditid(item?._id);
                                setstatus("Completed");
                                handleShow10()
                              }}>
                                Complete
                              </button>
                              <button type="button" class="btn btn-danger" onClick={()=>{
                                seteditid(item?._id);
                                setstatus("Hold")
                                handleShow10()
                              }}>
                                Hold
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        </td>

                        <td>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              justifyContent: "center",
                            }}
                          >
                            {/* <div>
                              <BiSolidEdit
                                className="text-success"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => handleShow5(item)}
                              />{" "}
                            </div> */}
                            <div>
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShow6();
                                  setData3(item?._id);
                                }}
                              />{" "}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Add keypoints modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "navy", color: "white" }}
          >
            <Modal.Title style={{ color: "white" }}>Add KeyPoints</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div className="row">
              <div className="do-sear mt-2">
                <label>Select category</label>
                <select
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setkeycategory(e.target.value)}
                >
                  <option value="">--select Category--</option>
                  {AddCategory?.map((item, i) => {
                    return <option value={item?.CtText}>{item?.CtText}</option>;
                  })}
                </select>
              </div>
            </div> */}

            <div className="row">
              <div className="do-sear mt-2">
                <label>keypoints</label>
                <CKEditor editor={ClassicEditor} onChange={handleChange} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                className="mx-2 modal-close-btn"
                variant=""
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={AddKeypoints}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit keypoints modal */}
        <Modal
          show={show3}
          onHide={handleClose3}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "navy", color: "white" }}
          >
            <Modal.Title style={{ color: "white" }}>Edit Keypoints</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div className="row">
              <div className="do-sear mt-2">
                <label>Select category</label>
                <select
                  name=""
                  id=""
                  className="vi_0"
                  value={keycategory}
                  onChange={(e) => setkeycategory(e.target.value)}
                >
                  <option value="">--select Category--</option>
                  {AddCategory?.map((item, i) => {
                    return <option value={item?.CtText}>{item?.CtText}</option>;
                  })}
                </select>
              </div>
            </div> */}

            <div className="row">
              <div className="do-sear mt-2">
                <label>keypoints</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={keypoints}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose3}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={editkeypoints}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete keypoints modal  */}
        <Modal
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header
            closeButton
            style={{ background: "navy", color: "white" }}
          >
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <p className="fs-4" style={{ color: "red" }}>
                  Are you sure?
                  <br /> you want to delete this data?
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose4}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={Deletekeypoints}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add bookings modal */}
        <Modal show={show5} onHide={handleClose5} style={{ zIndex: "99999" }}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "navy", color: "white" }}
          >
            <Modal.Title style={{ color: "white" }}>Add Bookings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            <div className="do-sear mt-2">
                <label>Name</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter user name"
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Mail</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter user mail"
                  onChange={(e) => setuserMail(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Phone</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter user mobile no"
                  onChange={(e) => setuserMobile(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Pick Up Location</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter user Pickup Location"
                  onChange={(e) => setPickupLoc(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Select PickUp Date</label>
                <input
                  type="date"
                  className="vi_0"
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Select PickUp Time</label>
                <input
                  type="time"
                  className="vi_0"
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </div>
            </div>
            <div className="do-sear mt-2">
                <label>Drop off Location</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter user Dropoff Location"
                  onChange={(e) => setDropoffLoc(e.target.value)}
                />
              </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Select Dropoff Date</label>
                <input
                  type="date"
                  className="vi_0"
                  onChange={(e) => setDropoffDate(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Select Dropoff Time</label>
                <input
                  type="time"
                  className="vi_0"
                  onChange={(e) => setDropoffTime(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                className="mx-2 modal-close-btn"
                variant=""
                onClick={handleClose5}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={Addbookings}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit bookings modal */}
        <Modal
          show={show3}
          onHide={handleClose3}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "navy", color: "white" }}
          >
            <Modal.Title style={{ color: "white" }}>Edit Keypoints</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            <div className="do-sear mt-2">
                <label>Name</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder={userName}
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Mail</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder={userMail}
                  onChange={(e) => setuserMail(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Phone</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder={userMobile}
                  onChange={(e) => setuserMobile(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Pick Up Location</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder={PickupLoc}
                  onChange={(e) => setPickupLoc(e.target.value)}
                />
              </div>
              <div className="do-sear mt-2">
                <label>Select category</label>
                <select
                  name=""
                  id=""
                  className="vi_0"
                  value={keycategory}
                  onChange={(e) => setkeycategory(e.target.value)}
                >
                  <option value="">--select Category--</option>
                  {AddCategory?.map((item, i) => {
                    return <option value={item?.CtText}>{item?.CtText}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>keypoints</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={keypoints}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose3}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={editkeypoints}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* delete bookings modal  */}
        <Modal
          show={show6}
          onHide={handleClose6}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header
            closeButton
            style={{ background: "navy", color: "white" }}
          >
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <p className="fs-4" style={{ color: "red" }}>
                  Are you sure?
                  <br /> you want to delete this data?
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose6}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={DeleteBookings}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* {modal} */}
        <Modal show={show10} onHide={handleClose10}>
        <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
            <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <p style={{ color: "orange", fontSize: "18px" }}>
                  Are You Sure Want to {status} This Contact?
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#52f310", color: "#ffff" }}
              onClick={handleClose10}
            >
              Cancel
            </Button>
            <Button style={{ backgroundColor: "Success", color: "#ffff" }} onClick={makeStatusChangeContactUs}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <nav>
          <ul className="pagination">
            <li className="not-allow">
              <span>
                <li className="next-prev">
                  <a
                    onClick={() => {
                      prevpage();
                    }}
                  >
                    &lt;
                  </a>{" "}
                </li>
              </span>
            </li>
            {numbers?.map((n, i) => {
              return (
                <li className="actives-next" key={i}>
                  <a
                    href="#"
                    className="inactives"
                    onClick={() => changePage(n)}
                  >
                    {n}
                  </a>
                </li>
              );
            })}

            <li className="not-allow">
              <span>
                <li
                  className="next-prev"
                  onClick={() => {
                    nextpage();
                  }}
                >
                  &gt;{" "}
                </li>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminBookings;
