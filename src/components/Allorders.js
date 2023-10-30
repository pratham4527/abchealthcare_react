import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from './Navbar';


function Allorders() {

  const [orderDetails, setOrderDetails] = useState([]);
  let SrNo = 1;

  useEffect(() => {
    // Fetch order details from your API when the component mounts
    // axios.get('https://localhost:44305/api/Order/AllOrderDetails')
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/Order/AllOrderDetails`)
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
      });
  }, []);

  return (
    <>
    <Navbar/>
    
        {/* <div>
          <h2>Order Details</h2>
          <table>
            <thead>
              <tr>
                <th>MedName</th>
                <th>MedDescription</th>
                <th>MedPrice</th>
                <th>Quantity</th>
                <th>OrderStatus</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((orderDetail) => (
                <tr key={orderDetail.id}>
                  <td>{orderDetail.medName}</td>
                  <td>{orderDetail.medDescription}</td>
                  <td>{orderDetail.medPrice}</td>
                  <td>{orderDetail.quantity}</td>
                  <td>{orderDetail.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

<div className="container my-5">
        <MDBTable striped hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Sr.No.</th>
          <th scope='col'>MedName</th>
          <th scope='col'>MedDescription</th>
          <th scope='col'>MedPrice</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>OrderStatus</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {orderDetails.map((orderDetail) => (
                <tr key={orderDetail.id}>
                  <th scope='row'>{SrNo++}</th>
                  <td>{orderDetail.medName}</td>
                  <td>{orderDetail.medDescription}</td>
                  <td>{orderDetail.medPrice}</td>
                  <td>{orderDetail.quantity}</td>
                  <td>{orderDetail.orderStatus}</td>
                </tr>
              ))}
      </MDBTableBody>
    </MDBTable>
    </div>

    <div className="text-center mt-4">
        <MDBBtn href='/'>Back</MDBBtn>
        {/* <MDBBtn href='https://abchealthcareapi.azurewebsites.net/'>Back</MDBBtn> */}
      </div>
    </>
  )
}

export default Allorders