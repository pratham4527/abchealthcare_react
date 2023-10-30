import React, { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    // firstName: '',
    // lastName: '',
    email: "",
    password: "",
    confirmPassword: "",
    // Add other fields if needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password must match');
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
    else{
        try {

                // Check if the username already exists
                // const checkResponse = await axios.get(
                //   `https://localhost:44305/api/users/${formData.username}`
                // );

                // if (checkResponse.status === 200) {
                //   alert('Username already exists. Please choose a different username.');
                //   setFormData({
                //     username: "",
                //     email: "",
                //     password: "",
                //     confirmPassword: "",
                //   });
                // }
                // else
                // {
                  
                    const response = await axios.post(
                      // "https://localhost:44305/api/register",
                      `${process.env.REACT_APP_BASE_URL}/api/register`,
                      formData
                    );
                    console.log(response);
                    alert("Registered Successfully");

                    setFormData({
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });

                    window.location.href = '/login';

                //}
          } 
          catch (error) 
          {
            console.log(error)
            alert("Not Registered");
          }
        }
  };

  

  
  
  return (
    <>
      <MDBContainer fluid style={{ display: "flex", justifyContent: "center" }}>
        <MDBCard
          className="text-black m-5"
          style={{ borderRadius: "25px", width: "50%" }}
        >
          <MDBCardBody style={{padding:'0px'}}>
            <MDBRow>
              <MDBCol
              style={{padding:'26px 8px'}}
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <h3 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign Up
                </h3>
                <br />
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    id="form1"
                    type="text"
                    className="w-100"
                  />
                </div>

           
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    id="form2"
                    type="email"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    id="form3"
                    type="password"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Repeat your password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    id="form4"
                    type="password"
                  />
                </div>

                {/* <div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div> */}

                <MDBBtn className="mb-4" size="lg" onClick={handleRegistration}>
                  Register
                </MDBBtn>
                <div>Alredy have an account ? <a href="/login">Login</a></div>



              </MDBCol>


              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              style={{    padding: '0px'   }}
              >
                <MDBCardImage
                  src="images/weblogo.png"
                  fluid
                  style={{height: '-webkit-fill-available',
                    borderRadius: '0px 25px 25px 0px'}}

                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default Register;
