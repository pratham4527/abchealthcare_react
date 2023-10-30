
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../actions';


import axios from 'axios';
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

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        // 'https://localhost:44305/api/login',
        `${process.env.REACT_APP_BASE_URL}/api/login`,
        formData
      );

      // Handle successful login, e.g., save the user's token to localStorage and redirect to another page.
      // You should implement token-based authentication.
      console.log("logged in  by --> ");
      console.log(formData.username);
      dispatch(fetchUserData(formData.username));

      alert('login successful')

      // window.location.href = 'http://localhost:3000/';
      window.location.href = '/';


      console.log(response);
    } catch (error) {
      // Handle login error, display an error message, e.g., invalid credentials.
      alert('Failed to ligin')

      console.error('Login failed', error);
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
              style={{padding:'26px 8px', justifyContent:'center'}}
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <h3 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign In
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

    
                <MDBBtn className="mb-4" size="lg"  onClick={handleLogin}>
                  Login
                </MDBBtn>
                <div>Create an account ? <a href="/register">Register</a></div>
                {/* <div>Create an account ? <a href="http://lkocalhost:3000/register">Register</a></div> */}


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

export default Login;
