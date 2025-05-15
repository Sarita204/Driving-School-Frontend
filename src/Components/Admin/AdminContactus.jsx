import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";

const AdminContactus = () => {

  const [show, setShow] = useState();
  const [show4, setShow4] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const formdata = new FormData();
  const [CAddress, setCAddress] = useState("");
  const [CPhone, setCPhone] = useState("");
  const [CEmail, setCEmail] = useState("");

  const AddContact = async () => {
    formdata.append("CAddress", CAddress);
    formdata.append("CPhone", CPhone);
    formdata.append("CEmail", CEmail);

    try {
      if (!CAddress) {
        return alert("Please add Address");
      }
      if (!CPhone) {
        return alert("Please add Phone number");
      }
      if (!CEmail) {
        return alert("Please add Email ID");
      }

      const config = {
        url: "/admin/contactus",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddcontactus();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  //integrating get  method
  const [Addcontactus, setAddcontactus] = useState([]);
  const getAddcontactus = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/admin/getcontactus");
      if (res.status === 200) {
        setAddcontactus(res.data.getcontactus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete method
  const [Data, setData] = useState("");
  const DeleteContact = async () => {
    try {
      const config = {
        url: "admin/Deletecontactus/" + Data,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddcontactus();
          handleClose4();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  //update method
  const [Data1, setData1] = useState("");
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (item) => {
    setShow3(true);
    setData1(item);
    setCAddress(item?.CAddress);
    setCPhone(item?.CPhone);
    setCEmail(item?.CEmail);

  };

  const editConatct = async (e) => {
    e.preventDefault();
    // if (!GrImage) {
    //   alert("Select the image");
    // } else {
    formdata.append("CAddress", CAddress);
    formdata.append("CPhone", CPhone);
    formdata.append("CEmail", CEmail);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editcontactus",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddcontactus();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddcontactus();
  }, []);
  console.log(Addcontactus);

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Addcontactus.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Addcontactus.length / recordsperpage);
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
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Contact us</h2>
          {Addcontactus?.length !==0 ?(<>
          </>):(<>
            <button className="admin-add-btn" onClick={handleShow}>
            Add Contactus
          </button>
          </>)}
         
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email ID</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
            {records?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td style={{ paddingTop: "20px" }}>{item.CAddress}</td>
                    <td style={{ paddingTop: "20px" }}>{item.CPhone}</td>
                    <td style={{ paddingTop: "20px" }}>{item.CEmail}</td>
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

        {/* Add Package modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "navy", color: "white" }}
          >
            <Modal.Title style={{ color: "white" }}>Add Conatct us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Address</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter address"
                  onChange={(e) => setCAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Phone Number</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter phone number"
                  onChange={(e) => setCPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add mail ID</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Email id"
                  onChange={(e) => setCEmail(e.target.value)}
                />
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
                onClick={AddContact}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal */}
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
            <Modal.Title style={{ color: "white" }}>Edit Contactus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Address</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Address"
                  value={CAddress}
                  onChange={(e) => setCAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Phone Number</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Phone number"
                  value={CPhone}
                  onChange={(e) => setCPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit mail ID</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Email ID"
                  value={CEmail}
                  onChange={(e) => setCEmail(e.target.value)}
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
            <Button variant="" className="modal-add-btn"
            onClick={editConatct}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delet modal  */}
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
              onClick={DeleteContact}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminContactus;
