import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";

const AdminHomeSlider = () => {
  
  const [show, setShow] = useState();
  const [show4, setShow4] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  // integrating post method
  const formdata = new FormData();
  const [GrImage, setGrImage] = useState("");
  const [GrText, setGrText] = useState("");

  const AddGrapph = async () => {
    formdata.append("GrImage", GrImage);
    formdata.append("GrText", GrText);
    try {
      if (!GrImage) {
        return alert("Please add Image");
      }
      if (!GrText) {
        return alert("Please add text");
      }
      
      const config = {
        url: "/admin/graph",
        method: "post",
        baseURL: "http://localhost:9000/api",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getAddGraph();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };
  //integrating get  method
  const [AddGraph, setAddGraph] = useState([]);
  const getAddGraph = async () => {
    try {
      let res = await axios.get(
        "http://localhost:9000/api/admin/getgraph"
      );
      if (res.status === 200) {
        setAddGraph(res.data.getgraph);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete method
  const [Data, setData] = useState("");
  const Deletegraph = async () => {
    try {
      const config = {
        url: "admin/Deletegraph/" + Data,
        method: "delete",
        baseURL:"http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAddGraph();
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
    setGrText(item?.GrText);
  };

  const editgallery = async (e) => {
    e.preventDefault();
    // if (!GrImage) {
    //   alert("Select the image");
    // } else {
    formdata.append("GrImage", GrImage);
    formdata.append("GrText", GrText);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "admin/editgraph",
        method: "put",
        baseURL:"http://localhost:9000/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAddGraph();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };
  useEffect(() => {
    getAddGraph();
  }, []);
  console.log(AddGraph);

  // pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = AddGraph.slice(firstIndex, lastIndex);
  const npages = Math.ceil(AddGraph.length / recordsperpage);
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
          <h2 className="header-c ">Home Slider</h2>
          <button className="admin-add-btn" onClick={handleShow}>
            Add Slider
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
                <th>Image</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1 + firstIndex}</td>
                    <td>
                      <Image
                        src={`http://localhost:9000/Homegraph/${item?.GrImage}`}
                        alt="pic"
                        style={{ width: "75px", height: "75px" }}
                      />
                    </td>

                    <td style={{ paddingTop: "20px" }}>{item.GrText}</td>

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
                            onClick={() => handleShow3(item)} />{" "}
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow4();
                              setData(item?._id)
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
            <Modal.Title style={{ color: "white" }}>Add Slider</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Banner Image</label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="vi_0"
                  onChange={(e) => setGrImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Banner Title</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Banner Title"
                  onChange={(e) => setGrText(e.target.value)}
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
                onClick={AddGrapph}
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
            <Modal.Title style={{ color: "white" }}>Edit Slider</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Banner Image</label>
                <input
                  type="file"
                  name=""
                  className="vi_0"
                  onChange={(e) => setGrImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Banner Title</label>
                <input
                  type="text"
                  className="vi_0"
                  value={GrText}
                  placeholder="Enter Banner Title"
                  onChange={(e) => setGrText(e.target.value)}
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
              onClick={editgallery} >
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
              onClick={Deletegraph}
            >
              Delete
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

export default AdminHomeSlider;
