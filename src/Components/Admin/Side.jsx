import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuActivity,
  LuBookMarked,
  LuFileQuestion,
  LuIndianRupee,
  LuListOrdered,
  LuLogOut,
  LuPackageX,
  LuUserCog,
} from "react-icons/lu";
import { FaQuestion, FaWeightHanging } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FaShop, FaRegIdCard, FaCircleUser } from "react-icons/fa6";
import { GiFlatPlatform } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { AiOutlineSnippets } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { IoPeopleOutline, IoNewspaperOutline } from "react-icons/io5";
import { PiExamFill, PiHandshakeLight } from "react-icons/pi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineTipsAndUpdates,
  MdOutlineKeyboardArrowUp,
  MdOutlineSupportAgent,
  MdOutlineAddComment,
  MdEventAvailable,
  MdSubject,
  MdOutlineKeyboardArrowLeft,
  MdOutlineReviews,
} from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { LuAlignHorizontalJustifyStart } from "react-icons/lu";
import { IoEarth } from "react-icons/io5";
import "../Admin/Admin.css";
import Navbar from "react-bootstrap/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { MdLooksOne } from "react-icons/md";
import { PiNumberSquareTwoFill } from "react-icons/pi";
import { PiNumberSquareThreeFill } from "react-icons/pi";
import { PiNumberSquareFourFill } from "react-icons/pi";
import { PiNumberSquareFiveFill } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { MdOutlineStarRate } from "react-icons/md";

const Side = () => {
  const [question, setquestion] = useState(false);

  const [Board, setBoard] = useState(false);
  const [Class, setClass] = useState(false);
  const [Medium, setMedium] = useState(false);
  const [Examination, setExamination] = useState(false);
  const [Subject, setSubject] = useState(false);
  const [Weightage, setWeightage] = useState(false);
  const [Questions, setQuestions] = useState(false);
  const [QuestionLevel, setQuestionLevel] = useState(false);
  const [ExamLevel, setExamLevel] = useState(false);
  const [UserList, setUserList] = useState(false);
  const [AccountHistory, setAccountHistory] = useState(false);
  const [SyllabusCopy, setsyllabusCopy] = useState(false);
  const [onesentence, setOnesentence] = useState(false);
  const [twosentence, setTwosentence] = useState(false);
  const [threesentence, setThreesentence] = useState(false);
  const [foursentence, setFoursentence] = useState(false);
  const [fivesentence, setFivesentence] = useState(false);
  const [recorrect, setRecorrect] = useState(false);
  const [match, setMatch] = useState(false);
  const [relationship, setRelationship] = useState(false);

  const [fiveandsix, setfiveandsix] = useState(false);
  const [six, setsix] = useState(false);
  const [seven, setseven] = useState(false);
  const [eight, seteight] = useState(false);
  const [ten, setten] = useState(false);
  const [expandexplain, setexpandexplain] = useState(false);
  const [oddandout, setoddandout] = useState(false);
  const [mcq, setmcq] = useState(false);
  const [passage, setpassage] = useState(false);

  // Responsive sidebar
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <div>
      <Navbar expand="lg" className=" p-0">
        <button
          class="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
          style={{ margin: "10px" }}
        >
          <span>
            <GiHamburgerMenu style={{ color: "white" }} />
          </span>
        </button>
        <div
          class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarsExample09"
        >
          <div className="si09">
            <div style={{ width:"100%", justifyContent: "space-between" }}>
              <div className="lo-ad"  style={{background:"navy", borderBottom:"1px solid white"}}>
              <div className="d-flex gap-2">
              <a href="/" className="tail-text">
                <img src="../Assets/logo.png" alt="Logo" className="admin-logo-img" />
              </a>
              <div className="H_logo">
                <h4 className="mb-0 text-uppercase">Sri Venkateshwara</h4>
                <p className="inter-national motor-title" style={{ fontSize:"13px"}}>Motor Driving School</p>
              </div>
            </div>
              </div>
              <div className="sidebar-close-icon" onClick={handleNavCollapse}>
                <AiOutlineClose />
              </div>
            </div>
            <ul>
              <Link to="/dashboard" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>
                    <MdOutlineSupportAgent style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Dashboard</span>
                </li>
              </Link>

              <Link to="/adminhomeslider" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                >
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Home Slider </span>
                </li>
              </Link>
              <Link to="/homecategories" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                >
                  <span>
                    <LuBookMarked style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Categories</span>
                </li>
              </Link>

              <Link to="/testimonials" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                >
                  <span>
                    <LuFileQuestion style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Testimonials</span>
                </li>
              </Link>
              <Link to="/adminaboutus" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                >
                  <span>
                    <IoPeopleOutline style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">About Us</span>
                </li>
              </Link>
              <Link to="/admincontactus" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                >
                  <span>
                    <MdSubject style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Contact Us</span>
                </li>
              </Link>
              <Link to="/userlist" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                >
                  <span>
                    <PiExamFill style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">User List</span>
                </li>
              </Link>

              <Link to="/bookings" onClick={handleNavCollapse}>
                <li
                  className="a-ele "                >
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Bookings</span>
                </li>
              </Link>

              <Link to="/generalenquiry" onClick={handleNavCollapse}>
                <li
                  className="a-ele "                >
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">General Enquiries</span>
                </li>
              </Link>

              <Link to="/categoryenquiry" onClick={handleNavCollapse}>
                <li
                  className="a-ele "                >
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Category Enquiries</span>
                </li>
              </Link>

              <Link to="/ratings" onClick={handleNavCollapse}>
                <li
                  className="a-ele "                >
                  <span>
                    <MdOutlineStarRate  style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Ratings</span>
                </li>
              </Link>
             
            </ul>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Side;