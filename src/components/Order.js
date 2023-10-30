import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Navbar from './Navbar';


function Order() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const [orderDetails, setOrderDetails] = useState([]);
  const [cartid, setcartid] = useState(0);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(
          // `https://localhost:44305/api/carts/getCartByUserId?userId=${storedUserData.userId}`
          `${process.env.REACT_APP_BASE_URL}/api/carts/getCartByUserId?userId=${storedUserData.userId}`
        );
        if (response.status === 200) {
          const userCartId = response.data.id;
          setcartid(userCartId);
        }
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };

    fetchUserCart(); // Fetch the cart ID when the component mounts
  }, []);

  useEffect(() => {
    // Make an API call to retrieve processing order details
    axios
      // .get(`https://localhost:44305/api/Order/OrderDetails?cartId=${cartid}`)
      .get(`${process.env.REACT_APP_BASE_URL}/api/Order/OrderDetails?cartId=${cartid}`)

      .then((response) => {
        if (response.status === 200) {
          setOrderDetails(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching processing order details:", error);
      });
  }, [cartid]);

  return (
    <>
    <Navbar/>
      {/* <div>
        <h2>Processing Order Details</h2>
        <ul>
          {orderDetails.map((orderDetail) => (
            <li key={orderDetail.id}>
              <p>MedName: {orderDetail.medName}</p>
              <p>MedDescription: {orderDetail.medDescription}</p>
              <p>Quantity: {orderDetail.quantity}</p>
            </li>
          ))}
        </ul>
      </div> */}

      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="p-4">
                  {/* <MDBRow> */}
                    {/* <MDBCol lg="7"> */}
                      <MDBTypography tag="h5">
                        <a href="/" className="text-body">
                        {/* <a href="http://localhost:3000/" className="text-body"> */}
                        {/* <a href="https://abchealthcareapi.azurewebsites.net/" className="text-body"> */}
                          <MDBIcon fas icon="long-arrow-alt-left me-2" />{" "}
                          Continue shopping
                        </a>
                      </MDBTypography>

                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h2 className="mb-1">Order Summary</h2>
                          
                        </div>
                      </div>

                      <ul style={{ listStyleType: "none" }}>
                        {orderDetails.map((orderDetail) => (
                          <li key={orderDetail.id}>
                            <MDBCard className="mb-3">
                              <MDBCardBody>
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex flex-row align-items-center">
                                    <div>
                                      <MDBCardImage
                                        src={`images/${orderDetail.medImgUrl}`}
                                        fluid
                                        className="rounded-3"
                                        style={{
                                          width: "65px",
                                          height: "65px",
                                        }}
                                        alt="Shopping item"
                                      />
                                    </div>
                                    <div className="ms-3">
                                      <MDBTypography tag="h5">
                                      {orderDetail.medName}
                                      </MDBTypography>
                                      <h5 className="small mb-0">
                                        {orderDetail.medDescription}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row align-items-center text-center">
                                    
                                    <MDBCol
                                      md="3"
                                      lg="3"
                                      xl="3"
                                      className="d-flex align-items-center"
                                      style={{ flexDirection: "column" }}
                                    >
                                     
                            

                                      <MDBTypography
                                        tag="h5"
                                        className="fw-normal mb-0 mx-2"
                                      >
                                        {orderDetail.quantity}
                                      </MDBTypography>

                                   
                                    </MDBCol>

                                    <div style={{ width: "120px" }}>
                                      <MDBTypography tag="h5" className="mb-0 mx-1">
                                        Rs. {orderDetail.medPrice * orderDetail.quantity}
                                      </MDBTypography>
                                    </div>

                                    <div style={{ width: "80%" }} >
                                      <MDBTypography className="mb-0 mx-1">
                                         {orderDetail.orderStatus}
                                      </MDBTypography>
                                    </div>
                                    
                                  </div>
                                </div>
                              </MDBCardBody>
                            </MDBCard>
                          </li>
                        ))}
                      </ul>
                 
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}

export default Order;
