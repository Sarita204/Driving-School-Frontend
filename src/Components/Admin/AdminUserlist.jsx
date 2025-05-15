import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";

const AdminUserlist = () => {
    
  const [show, setShow] = useState();
  const [show4, setShow4] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const formdata = new FormData();
  const [UName, setUName] = useState("");
  const [UPhone, setUPhone] = useState("");
  const [UEmail, setUEmail] = useState("");
  const [UAddress, setUAddress] = useState("");

  const AddUser = async () => {
    formdata.append("UName", UName);
    formdata.append("UPhone", UPhone);
    formdata.append("UEmail", UEmail);
    formdata.append("UAddress", UAddress);


    try {
      if (!UName) {
        return alert("Please add Address");
      }
      if (!UPhone) {
        return alert("Please add Phone number");
      }
      if (!UEmail) {
        return alert("Please add Email ID");
      }
      if (!UAddress) {
        return alert("Please add Email ID");
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
  const Deleteuser = async () => {
    try {
      const config = {
        url: "user/Deleteuser/" + Data,
        method: "delete",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("Successfully Delete");
          getAdduser();
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
    setUName(item?.UName);
    setUPhone(item?.UPhone);
    setUEmail(item?.UEmail);
    setUAddress(item?.UAddress);

  };

  const editUser = async (e) => {
    e.preventDefault();
    // if (!GrImage) {
    //   alert("Select the image");
    // } else {
    formdata.append("UName", UName);
    formdata.append("UPhone", UPhone);
    formdata.append("UEmail", UEmail);
    formdata.append("UAddress", UAddress);
    formdata.append("id", Data1?._id);
    try {
      const config = {
        url: "user/edituser",
        method: "put",
        baseURL: "http://localhost:9000/api/",
        header: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert("successfully Update");
          handleClose3();
          getAdduser();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  // };

 
  useEffect(() => {
    getAdduser();
  }, []);
  console.log(Adduser);

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 5;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Adduser.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Adduser.length / recordsperpage);
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
          <h2 className="header-c ">User List</h2>
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
                <th>Image</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email ID</th>
                <th>Address</th>
                <th>Action</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>

            <tbody>
              {records?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1 + firstIndex}</td>
                    <td>
                      <img src={`http://localhost:9000/UserList/${item?.UImg}`} alt="" style={{width:"70px",height:"70px"}}/>
                    </td>
                    <td style={{ paddingTop: "20px" }}>{item.UName}</td>
                    <td style={{ paddingTop: "20px" }}>{item.UPhone}</td>
                    <td style={{ paddingTop: "20px" }}>{item.UEmail}</td>
                    <td style={{ paddingTop: "20px" }}>{item.UAddress}</td>
                    <td><div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow4();
                              setData(item?._id);
                            }}
                          />{" "}
                        </div></td>

                    {/* <td>
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
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
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
            <Button variant="" className="modal-add-btn" onClick={Deleteuser}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
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
    </div>
  );
};

export default AdminUserlist;
