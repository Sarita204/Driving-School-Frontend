import React, { useEffect, useState } from "react";
import "../Admin/Admin.css";
import Card from "react-bootstrap/Card";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import moment from "moment";

const Dashboard = () => {
  const admin =JSON.parse(sessionStorage.getItem("admin"));
  const token = sessionStorage.getItem("token");

  const [show2, setShow2] = useState();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [Teacher, setTeacher] = useState([]);
  const [nochangedata, setnochangedata] = useState([]);
  const getAllTeacher = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8000/api/admin/getAllTeachers/${admin?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setTeacher(res.data.success);
        setnochangedata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
   //search filter for about us
  const [searchH, setSearchH] = useState("");
  const handleFilterH = (e) => {
    if (e.target.value != "") {
      setSearchH(e.target.value);
      const filterTableH = nochangedata.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k])?.toLowerCase().includes(e.target.value?.toLowerCase())
        )
      );
      setTeacher([...filterTableH]);
    } else {
      setSearchH(e.target.value);
      setTeacher([...nochangedata]);
    }
  };
  const [searchTermH, setSearchTermH] = useState("");
  const searchedProductH = Teacher.filter((item) => {
    if (searchTermH.value === "") {
      return item;
    }
    if (item?.EName?.toLowerCase().includes(searchTermH?.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  useEffect(()=>{
    getAllTeacher();
  },[])

  
  return (
    <div>
      <h2 className="header-c ">Dashboard</h2>

      <div className="cards-container">
        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Title>Number of Registered Users</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">600</Card.Subtitle>
          </Card.Body>
        </Card>

        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Title>Number of Booked Car</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">1000</Card.Subtitle>
          </Card.Body>
        </Card>

        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Title>Number of Booked Motor Cycle</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">400</Card.Subtitle>
          </Card.Body>
        </Card>

        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Title>Number of Booked Bus</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">800</Card.Subtitle>
          </Card.Body>
        </Card>
      </div>

      {/* <div>
        <h2 className="header-c ">User List</h2>

        <div className="srch-icon">
          <div>
            <div class="input-group ">
              <span class="input-group-text" id="basic-addon1">
                <BsSearch />
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                aria-describedby="basic-addon1"
                onChange={handleFilterH}
              />
            </div>
          </div>

          <div>
            <Button className="admin-add-btn">
              <a
                style={{ color: "white", textDecoration: "none" }}
                href="/adminuserlist"
              >
                View All Users
              </a>
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 p-3">
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>
                    <div>Registration ID</div>
                  </th>
                  <th>
                    <div>Name</div>
                  </th>
                  <th>
                    <div>Registration Date</div>
                  </th>
                  <th>
                    <div>Mobile Number</div>
                  </th>
                  <th>
                    <div>Email Id</div>
                  </th>
                </tr>
              </thead>
              <tbody>
               
                    <tr>
                    <td>1</td>
                    <td>{Teacher[0]?.teacherId}</td>
                    <td>{Teacher[0]?.FirstName} {Teacher[0]?.LastName}</td>
                    <td>{moment(Teacher[0]?.createdAt)?.format("DD/MM/YYYY")}</td>
                    <td>{Teacher[0]?.Mobile}</td>
                    <td>{Teacher[0]?.Email}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>{Teacher[1]?.teacherId}</td>
                    <td>{Teacher[1]?.FirstName} {Teacher[1]?.LastName}</td>
                    <td>{moment(Teacher[1]?.createdAt)?.format("DD/MM/YYYY")}</td>
                    <td>{Teacher[1]?.Mobile}</td>
                    <td>{Teacher[1]?.Email}</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>{Teacher[2]?.teacherId}</td>
                    <td>{Teacher[2]?.FirstName} {Teacher[2]?.LastName}</td>
                    <td>{moment(Teacher[2]?.createdAt)?.format("DD/MM/YYYY")}</td>
                    <td>{Teacher[2]?.Mobile}</td>
                    <td>{Teacher[2]?.Email}</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>{Teacher[3]?.teacherId}</td>
                    <td>{Teacher[3]?.FirstName} {Teacher[3]?.LastName}</td>
                    <td>{moment(Teacher[3]?.createdAt)?.format("DD/MM/YYYY")}</td>
                    <td>{Teacher[3]?.Mobile}</td>
                    <td>{Teacher[3]?.Email}</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>{Teacher[4]?.teacherId}</td>
                    <td>{Teacher[4]?.FirstName} {Teacher[4]?.LastName}</td>
                    <td>{moment(Teacher[4]?.createdAt)?.format("DD/MM/YYYY")}</td>
                    <td>{Teacher[4]?.Mobile}</td>
                    <td>{Teacher[4]?.Email}</td>
                  </tr>
                 
              </tbody>
            </Table>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
