import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import parse from "html-react-parser"

const AdminAboutus = () => {
  
  const [show, setShow] = useState();
  const [show4, setShow4] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setAboutDesc(data);
  };

  // integrating post method
  const formdata = new FormData();
  const [AbImg,setAbImg] = useState("");
  const [Abouttitle, setAbouttitle] = useState("");
  const [AboutDesc, setAboutDesc] = useState("");

  const AddAbout = async () => {
    formdata.append("AbImg", AbImg);
    formdata.append("Abouttitle", Abouttitle);
    formdata.append("AboutDesc", AboutDesc);

    try {
      if (!AbImg) {
        return alert("Please select the image");
      }
      if (!Abouttitle) {
        return alert("Please add text");
      }
      if (!AboutDesc) {
        return alert("Please add text");
      }

      const config = {
        url: "/admin/aboutus",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddaboutus();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  //integrating get  method
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

  //delete method
  const [Data, setData] = useState("");
  const DeleteTest = async () => {
    try {
      const config = {
        url: "admin/Deleteaboutus/" + Data,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddaboutus();
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

    setAbouttitle(item?.Abouttitle);
    setAboutDesc(item?.AboutDesc);
  };

  const editTest = async (e) => {
    e.preventDefault();
    // if (!GrImage) {
    //   alert("Select the image");
    // } else {
      formdata.append("AbImg",AbImg);
    formdata.append("Abouttitle", Abouttitle);
    formdata.append("AboutDesc", AboutDesc);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editaboutus",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddaboutus();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddaboutus();
  }, []);
  console.log(Addaboutus);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Addaboutus.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Addaboutus.length / recordsperpage);
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
          <h2 className="header-c ">About Us</h2>
          {Addaboutus?.length !==0 ? (<>
          
            </>):(<><button className="admin-add-btn" onClick={handleShow}>
            Add Aboutus
          </button></>)}
         
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>Image</th>
               <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td><img src={`http://localhost:9000/Aboutus/${item?.AbImg}`} alt="" style={{width:"100px",height:"100px"}}/></td>
                    <td style={{ paddingTop: "20px" }}>{item.Abouttitle}</td>
                    <td style={{ paddingTop: "20px" }}>{parse(`<div>${item.AboutDesc}</div>`)}</td>
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
            <Modal.Title style={{ color: "white" }}>Add Aboutus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="row">
              <div className="do-sear mt-2">
                <label>Add Image</label>
                <input
                  type="file"
                  className="vi_0"
                  onChange={(e) => setAbImg(e.target.files[0])}
                />
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Title</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Title"
                  onChange={(e) => setAbouttitle(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Description</label>
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
                onClick={AddAbout}
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
            <Modal.Title style={{ color: "white" }}>Edit Aboutus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="row">
              <div className="do-sear mt-2">
                <label>Add Image</label>
                <input
                  type="file"
                  className="vi_0"
                  onChange={(e) => setAbImg(e.target.files[0])}
                />
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Title</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Title"
                  value={Abouttitle}
                  onChange={(e) => setAbouttitle(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={AboutDesc}
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
            <Button variant="" className="modal-add-btn" onClick={editTest}>
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
            <Button variant="" className="modal-add-btn" onClick={DeleteTest}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default AdminAboutus;
