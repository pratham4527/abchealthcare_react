import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Navbar from './Navbar';


function Cart() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  // console.log(storedUserData.userId);
  const [mycart, setMycart] = useState([]);
  const [total, setTotal] = useState(0); // Initialize total as a state variable
  const [cartid, setcartid] = useState(0);

  // Fetch the cart ID for the user
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
          // console.log("before",userCartId);

          const response2 = await axios.get(
            // `https://localhost:44305/api/carts/getCartDetailsByCartId?cartId=${userCartId}`
            `${process.env.REACT_APP_BASE_URL}/api/carts/getCartDetailsByCartId?cartId=${userCartId}`
          );

          if (response2.status === 200) {
            // Get the cart details from the response
            const cartDetails = response2.data;
            console.log(cartDetails);
            // const cartDetailsInJson = cartDetails.JSON;
            // console.log(cartDetailsInJson);
            setMycart(cartDetails);
          }
        }
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };

    fetchUserCart(); // Fetch the cart ID when the component mounts
  }, []);

  // Calculate the total price when mycart changes
  useEffect(() => {
    let totalPrice = 0;
    mycart.forEach((item) => {
      totalPrice = totalPrice + item.medPrice*item.quantity;
    });
    setTotal(totalPrice); // Update the total state
  }, [mycart]);





  const [quantity, setQuantity] = useState(mycart.quantity);

// Function to increase the quantity
const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to decrease the quantity
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const fetchUpdatedCart = async () => {
    try {

       

        // const response = await axios.get(`https://localhost:44305/api/carts/getCartDetailsByCartId?cartId=${cartid}`);
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/carts/getCartDetailsByCartId?cartId=${cartid}`);
        if (response.status === 200) {
            const cartDetails = response.data;
            setMycart(cartDetails);
        }else{
            
        }
    } catch (error) {
        console.error('Error fetching updated cart:', error);
    }
};


  const removeFromCart = async (cartDetailId) => {
    try {

        // const response = await axios.delete(`https://localhost:44305/api/carts/removeFromCart?cartDetailId=${cartDetailId}`);
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/carts/removeFromCart?cartDetailId=${cartDetailId}`);
        if (response.status === 200) {
            // Refresh the cart items after successful removal
            // You can make another API call to get the updated cart
            fetchUpdatedCart(); 
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};

const handleCheckout = async (cartId) => {
  try {
      // const response = await axios.post(`https://localhost:44305/api/Order/checkout?cartId=${cartId}`);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Order/checkout?cartId=${cartId}`);
      if (response.status === 200) {
          // Handle success, e.g., show a success message
          console.log('Order created successfully.');
          alert('Order Placed Successfully !!')
          window.location.href = '/';
      }
  } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error creating order:', error);
  }
};







  return (
    <>
    <Navbar/>
      {/* <h1>Cart</h1>
            <div>
                <ul>
                    {mycart.map((item) => (
                        <li key={item.id}>
                            {item.medName} - {item.quantity}
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
                  <MDBRow>
                    <MDBCol lg="7">
                      <MDBTypography tag="h5">
                        <a href="/" className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" />{" "}
                          Continue shopping

                        </a>
                      </MDBTypography>

                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h2 className="mb-1">Shopping cart</h2>
                          <p className="mb-0">
                            You have {mycart.length} items in your cart
                          </p>
                        </div>
                       
                      </div>

                      <ul style={{ listStyleType: "none" }}>
                        {mycart.map((item) => (
                          <li key={item.id}>
                            <MDBCard className="mb-3">
                              <MDBCardBody>
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex flex-row align-items-center">
                                    <div>
                                      <MDBCardImage
                                        src={`images/${item.medImgUrl}`}
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
                                        {item.medName}
                                      </MDBTypography>
                                      <h5 className="small mb-0">
                                        {item.medDescription}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row align-items-center text-center">
                                    {/* <div style={{ width: "50px" }}>
                                      <MDBTypography
                                        tag="h5"
                                        className="fw-normal mb-0 mx-2"
                                      >
                                        {item.quantity}
                                      </MDBTypography>
                                    </div> */}
                                    <MDBCol
                                      md="3"
                                      lg="3"
                                      xl="3"
                                      className="d-flex align-items-center"
                                      style={{ flexDirection: "column" }}
                                    >
                                      <MDBBtn color="link" className="px-2" onClick={increaseQuantity}>
                                        <MDBIcon fas icon="plus" />
                                      </MDBBtn>

                                      {/* <MDBInput
                                        type="number"
                                        min="0"
                                        defaultValue={1}
                                        size="sm"
                                      /> */}

                                      <MDBTypography
                                        tag="h5"
                                        className="fw-normal mb-0 mx-2"
                                      >
                                        {item.quantity}
                                      </MDBTypography>

                                      <MDBBtn color="link" className="px-2" onClick={decreaseQuantity}>
                                        <MDBIcon fas icon="minus" />
                                      </MDBBtn>
                                    </MDBCol>


                                    <div style={{ width: "80px" }}>
                                      <MDBTypography tag="h5" className="mb-0">
                                        Rs. {item.medPrice*item.quantity}
                                      </MDBTypography>
                                    </div>
                                    <a href="#!" style={{ color: "#cecece" }} onClick={() => removeFromCart(item.id)}>
                                      <MDBIcon fas icon="trash-alt" />
                                    </a>
                                  </div>
                                </div>
                              </MDBCardBody>
                            </MDBCard>
                          </li>
                        ))}
                      </ul>
                    </MDBCol>

                    <MDBCol lg="5">
                      <MDBCard className="bg-primary text-white rounded-3">
                        <MDBCardBody>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h5" className="mb-0">
                              Shipping Details
                            </MDBTypography>
                            <MDBCardImage
                              src="user.jpg"
                              fluid
                              className="rounded-3"
                              style={{ width: "45px" }}
                              alt="Avatar"
                            />
                          </div>

                          <form className="mt-4">
                            <MDBInput
                              className="mb-4"
                              label="Name"
                              type="text"
                              size="lg"
                              placeholder="Cardholder's Name"
                              contrast
                              required
                            />

                            <MDBInput
                              className="mb-4"
                              label="Contact Number"
                              type="text"
                              size="lg"
                              minLength="10"
                              maxLength="10"
                              placeholder="99 99 99 99 99"
                              contrast
                              required
                            />

                            <MDBRow className="mb-4">
                              <MDBCol md="6">
                                <MDBInput
                                  label="City"
                                  type="text"
                                  size="lg"
                                  minLength="2"
                                  maxLength="20"
                                  placeholder="City"
                                  contrast
                                  required
                                />
                              </MDBCol>
                              <MDBCol md="6">
                                <MDBInput
                                  label="District"
                                  type="text"
                                  size="lg"
                                  minLength="2"
                                  maxLength="20"
                                  placeholder="Districr"
                                  contrast
                                  required
                                />
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className="mb-4">
                              <MDBCol md="6">
                                <MDBInput
                                  className="mb-4"
                                  label="State"
                                  type="text"
                                  size="lg"
                                  minLength="2"
                                  maxLength="20"
                                  placeholder="State"
                                  contrast
                                  required
                                />
                              </MDBCol>
                              <MDBCol md="6">
                                <MDBInput
                                  className="mb-4"
                                  label="Pin"
                                  type="text"
                                  size="lg"
                                  minLength="6"
                                  maxLength="6"
                                  placeholder="Pincode"
                                  contrast
                                  required
                                />
                              </MDBCol>
                            </MDBRow>
                          </form>

                          <hr />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">{total}.00</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping Charges</p>
                            <p className="mb-2">50.00</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Discount (5%)</p>
                            <p className="mb-2">{(total * 5) / 100}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">
                              {Math.ceil(total + 50 - (total * 5) / 100)}
                            </p>
                          </div>

                          {/* <MDBBtn color="info" block size="lg">
                            <div className="d-flex justify-content-between">
                              <span>
                                Rs. {Math.ceil(total + 50 - (total * 5) / 100)}
                              </span>
                              <span>
                                Checkout{" "}
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </MDBBtn> */}

<MDBBtn color="info"  block size="lg" onClick={() => handleCheckout(cartid)}>
{/* <MDBBtn color="info" block size="lg" > */}
    <div className="d-flex justify-content-between">
        <span>
            Rs. {Math.ceil(total + 50 - (total * 5) / 100)}
        </span>
        <span>
            Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i>
        </span>
    </div>
</MDBBtn>

                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}

export default Cart;
