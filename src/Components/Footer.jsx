import React, { useState , useEffect} from "react";
import "../Styles/footer.css";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import axios from "axios";

function Footer() {
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

  useEffect(() => {
    getAddcontactus();
  }, []);
  console.log(Addcontactus);

return (
  <div>
    <div className="footer-container">
      <Container className="p-2">
        <Row>
          <div className="col-1">
            <img
              src="../Assets/logo.png"
              alt="logo"
              className="navbar-logo"
            />
              {Addcontactus?.map((item, i) => {
              return (
            <div className="footer-description">
              <p>
              {item.CAddress}
              </p>
            </div>
               );
              })}
          </div>
          <div className="col-2">
            <h3>Quick Links</h3>

            <ul className="xfgdf p-0">
              <li>
                <span>
                  <img src="../Assets/icon.png" alt="logo" className="icon" />
                </span>
                <a href="/"> Home</a>
              </li>
              <li>
                <span>
                  <img src="../Assets/icon.png" alt="logo" className="icon" />
                </span>
                <a href="/aboutus"> About Us</a>
              </li>

              <li>
                <span>
                  <img src="../Assets/icon.png" alt="logo" className="icon" />
                </span>
                <a href="/contact"> Contact us</a>
              </li>
            </ul>
          </div>
          <div className="col-2">
            <h3>Branches</h3>
            <ul className="xfgdf p-0">
              <li>
                <span>
                  <img src="../Assets/icon.png" alt="logo" className="icon" />
                </span>
                <a href="#">Bangalore</a>
              </li>
              <li>
                <span>
                  <img src="../Assets/icon.png" alt="logo" className="icon" />
                </span>
                <a href="#">Mangalore</a>
              </li>

              <li>
                <span>
                  <img src="../Assets/icon.png" alt="logo" className="icon" />
                </span>
                <a href="#">Mumbai</a>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <h3>Contact Us</h3>

            <ul className="xfgdf p-0">
              <li className="d-flex mb-2">
                <span>
                  <img
                    src="../Assets/email.png"
                    alt="logo"
                    className="icon-contact"
                  />
                </span>
                {Addcontactus?.map((item, i) => {
              return (
                <a
                  href="#"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {/* srivk123@gmail.com */}
                  {item.CEmail}
                </a>
             );
            })}
              </li>
              <li className="d-flex mb-3">
                <span>
                  <img
                    src="../Assets/phone.png"
                    alt="logo"
                    className="icon-contact"
                  />
                </span>
                {Addcontactus?.map((item, i) => {
              return (
                <a
                  href="#"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {" "}
                  {/* +91 1234567890 */}
                  +91  {item.CPhone}
                </a>
              );
                })}
              </li>
              <div className="navbar-social-icon mt-2">
                <a traget="_blank" href="https://www.facebook.com/">
                  <img
                    src="../Assets/fb.png"
                    alt="logo1"
                    className="footer-social-icon"
                  />
                </a>
                <a traget="_blank" href="https://www.twitter.com/">
                  <img
                    src="../Assets/twitter.png"
                    alt="logo1"
                    className="footer-social-icon"
                  />
                </a>
                <a traget="_blank" href="https://www.instagram.com/">
                  <img
                    src="../Assets/insta.png"
                    alt="logo1"
                    className="footer-social-icon"
                  />
                </a>
                <a traget="_blank" href="https://www.linkedin.com/">
                  <img
                    src="../Assets/linkedin.png"
                    alt="logo1"
                    className="footer-social-icon"
                  />
                </a>
              </div>
            </ul>
          </div>
        </Row>

        {/* trail */}
        {/* <Row>
          <div className="col-md-6 mb-2 ghgggggjhj">
            <div className="fg">
              <div>
                <div>
                  <img
                    src="../Assets/logo.png"
                    alt="logo"
                    className="navbar-logo"
                  />
                </div>
                <div className="footer-description">
                  <p>
                    Block A, JP Nagar,
                    <br />
                    6th Cross, Bangalore <br /> Karnataka 560022.
                  </p>
                </div>
              </div>
            </div>
            <div className="fg">
              <div>
                <div className="footer-title">
                  {" "}
                  <h3>Quick Links</h3>
                </div>
                <ul className="xfgdf p-0">
                  <li>
                    <span>
                      <img
                        src="../Assets/icon.png"
                        alt="logo"
                        className="icon"
                      />
                    </span>
                    <a href="/"> Home</a>
                  </li>
                  <li>
                    <span>
                      <img
                        src="../Assets/icon.png"
                        alt="logo"
                        className="icon"
                      />
                    </span>
                    <a href="/aboutus"> About Us</a>
                  </li>

                  <li>
                    <span>
                      <img
                        src="../Assets/icon.png"
                        alt="logo"
                        className="icon"
                      />
                    </span>
                    <a href="/contact"> Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-2 ghgggggjhj">
          <div className="fg">
            <div>
              <div className="footer-title">
                {" "}
                <h3>Our Branches</h3>
              </div>
              <ul className="xfgdf p-0">
                <li>
                  <span>
                    <img
                      src="../Assets/icon.png"
                      alt="logo"
                      className="icon"
                    />
                  </span>
                  <a href="#"> Bangalore</a>
                </li>
                <li>
                  <span>
                    <img
                      src="../Assets/icon.png"
                      alt="logo"
                      className="icon"
                    />
                  </span>
                  <a href="#"> Mangalore</a>
                </li>

                <li>
                  <span>
                    <img
                      src="../Assets/icon.png"
                      alt="logo"
                      className="icon"
                    />
                  </span>
                  <a href="#"> Mumbai</a>
                </li>

                <li>
                  <span>
                    <img
                      src="../Assets/icon.png"
                      alt="logo"
                      className="icon"
                    />
                  </span>
                  <a href="#"> Gujarath</a>
                </li>

                <li>
                  <span>
                    <img
                      src="../Assets/icon.png"
                      alt="logo"
                      className="icon"
                    />
                  </span>
                  <a href="#"> Kolkata</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="fg">
            <div>
              <div className="footer-title">
                {" "}
                <h3>Contact Us</h3>
              </div>
              <ul className="xfgdf p-0">
                <li>
                  <span>
                    <img
                      src="../Assets/email.png"
                      alt="logo"
                      className="icon-contact"
                    />{" "}
                  </span>
                  <a href="#"> yourmail@gmail.com</a>
                </li>
                <li>
                  <span>
                    <img
                      src="../Assets/phone.png"
                      alt="logo"
                      className="icon-contact"
                    />{" "}
                  </span>
                  <a href="#"> +91 1234567890</a>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </Row> */}
      </Container>
    </div>
  </div>
  );
}
export default Footer;
