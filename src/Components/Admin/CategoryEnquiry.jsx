import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser"

const CategoryEnquiry = () => {
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleShow = (item) => {
  //   setShow(true);
  //   setservicedata(item);
  // };

  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setCUMessage(data);
  };
  //post API for category enquiry
  const [CUName, setCUName] = useState("");
  const [CUPhone, setCUPhone] = useState("");
  const [CUEmail, setCUEmail] = useState("");
  const [CatName, setCatName] = useState("");
  const [CUMessage, setCUMessage] = useState("");
  // const [servicedata, setservicedata] = useState({});
  const AddCategoryEnquiry=async()=>{
    try {
      const config ={
        url:"/user/Categoryenquiry",
        method:"post",
        baseURL:"http://localhost:9000/api",
        header:{"Content-type":"application/json"},
        data:{
          // CategoryName: servicedata?.CtText,
          CatName:CatName,
          CUName:CUName,
          CUPhone:CUPhone,
          CUEmail:CUEmail,
          CUMessage:CUMessage,
        },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert(res.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  }
  //integrating get  method
  // const [nochangedataH, setnochangedataH] = useState([]);
  const [AddEnquiryC, setAddEnquiryC] = useState([]);
  const getAddEnquirys = async () => {
    try {
      let res = await axios.get(
        "http://localhost:9000/api/user/getallCategoryenquiry"
      );
      if (res.status === 200) {
        setAddEnquiryC(res.data.getCenquirynow);
        // setnochangedataH(res.data.getSenquirynow);
      }
    } catch (error) {
      console.log(error);
    }
  };
   //integrating get  method for category list
   const [AddCategory, setAddCategory] = useState([]);
   const getAddCategory = async () => {
     try {
       let res = await axios.get(
         "http://localhost:9000/api/admin/getcategory"
       );
       if (res.status === 200) {
         setAddCategory(res.data.getcategory);
       }
     } catch (error) {
       console.log(error);
     }
   };
   //Delete 
   const [Data,setData] = useState("");
  const DeleteCategory = async () => {
    try {
      const config = {
        url: "user/deleteCategoryenquiry/" + Data,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddEnquirys();
          handleClose4();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  useEffect(() => {
    getAddEnquirys();
    getAddCategory();
  }, [])
  
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
          <h2 className="header-c ">Category Enquiry</h2>
          <button className="admin-add-btn" onClick={handleShow}>
            Add
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
                <th>SL.NO</th>
                <th>Category Name</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Phone Number</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
            {AddEnquiryC?.map((val,i)=>{
                return(
                  <tr>
                  <td>{i+1}</td>
                  <td>{val?.CatName}</td>
                  <td>
                    {val?.CUName}
                  </td>
                  <td>{val?.CUEmail}</td>
                  <td>{val?.CUPhone}</td>
                  <td>{parse(`<div>${val?.CUMessage}</div>`)}</td>
  
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
                        <AiFillDelete
                          className="text-danger"
                          style={{ cursor: "pointer", fontSize: "20px" }}
                          onClick={() => {
                            handleShow4();
                              setData(val?._id);
                          }}
                        />{" "}
                      </div>
                    </div>
                  </td>
                </tr>
                )
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
            <Modal.Title style={{ color: "white" }}>Add Aboutus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              <select className="vi_0" 
              onChange={(e)=>setCatName(e.target.value)}>
                {AddCategory?.map((val,i)=>{
                  return(
                    <option value={val?.CtText}>{val?.CtText}</option>
                  )
                })}
                </select>
            </div>
           
            <div className="row">
              <div className="do-sear mt-2">
                <label>Message</label>
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
                onClick={AddCategoryEnquiry}
              >
                Add
              </Button>
            </div>
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
            <Button variant="" className="modal-close-btn">
              Close
            </Button>
            <Button variant="" className="modal-add-btn" onClick={DeleteCategory}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryEnquiry;
