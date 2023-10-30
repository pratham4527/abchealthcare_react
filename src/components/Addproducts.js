import React, { useState } from 'react';
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
  
}
from 'mdb-react-ui-kit';
import Navbar from './Navbar';



function Addproducts() {

  const [medicine, setMedicine] = useState({
    medName: '',
    medDescription: '',
    medImgUrl: '',
    medPrice: 0,
    manufacturer: '',
    expiryDate: '',
    stockQty: 0,
    categoryID: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to add a new medicine
      console.log("asfs")
      console.log('Medicine data:', medicine); // Log the medicine data

      // const response = await axios.post('https://localhost:44305/api/Medicine', medicine);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Medicine`, medicine);

      // Handle success, e.g., display a success message or redirect to a different page
      console.log('Medicine added successfully:', response.data);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error adding medicine:', error);
    }
  };



  return (

    <>
    <Navbar/>
    
    {/* <form onSubmit={handleSubmit}>
      <label>
        Medicine Name:
        <input
          type="text"
          name="medName"
          value={medicine.medName}
          onChange={(e) => setMedicine({ ...medicine, medName: e.target.value })}
        />
      </label>

      <button type="submit">Add Medicine</button>
    </form> */}

<img src="logo192.png" alt="" />

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
                  Add Medicines
                </h3>
                <br />
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="MedicineName"
                    id="form1"
                    type="text"
                    className="w-100"
                    name="medName"
                    value={medicine.medName}
                    onChange={(e) => setMedicine({ ...medicine, medName: e.target.value })}
                  />
                </div>


                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="MedicineDesc"
                    id="form1"
                    type="text"
                    className="w-100"
                    name="medDesc"
                    value={medicine.medDescription}
                    onChange={(e) => setMedicine({ ...medicine, medDescription: e.target.value })}
                  />
                </div>


                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="MedicineImgUrl"
                    id="form1"
                    type="text"
                    className="w-100"
                    name="medImgUrl"
                    value={medicine.medImgUrl}
                    onChange={(e) => setMedicine({ ...medicine, medImgUrl: e.target.value })}

                  />
                </div>


                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="MedicinePrice"
                    id="form1"
                    type="number"
                    className="w-100"
                    name="medPrice"
                    value={medicine.medPrice}
                    onChange={(e) => setMedicine({ ...medicine, medPrice: e.target.value })}

                  />
                </div>


                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Manufacturer"
                    id="form1"
                    type="text"
                    className="w-100"
                    name="manufacturer"
                    value={medicine.manufacturer}
                    onChange={(e) => setMedicine({ ...medicine, manufacturer: e.target.value })}

                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 " style={{width:'58%'}}>
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="ExpiryDate"
                    id="form1"
                    type="date"
                    className="w-100"
                    name="expirydate"
                    value={medicine.expiryDate}
                    onChange={(e) => setMedicine({ ...medicine, expiryDate : e.target.value })}

                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="StockQty"
                    id="form1"
                    type="number"
                    className="w-100"
                    name="stockqty"
                    value={medicine.stockQty}
                    onChange={(e) => setMedicine({ ...medicine, stockQty : e.target.value })}

                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="CategoryId"
                    id="form1"
                    type="number"
                    className="w-100"
                    name="Categoryid"
                    value={medicine.categoryID}
                    onChange={(e) => setMedicine({ ...medicine, categoryID : e.target.value })}

                  />
                </div>




                <MDBBtn className="mb-4" size="lg" onClick={handleSubmit}>
                  Add Medicine
                </MDBBtn>
                <div><a href="/">Go to Dashboard</a></div>
                {/* <div><a href="https://abchealthcareapi.azurewebsites.net/">Go to Dashboard</a></div> */}


              </MDBCol>


              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              style={{    padding: '0px'   }}
              >
                <MDBCardImage
                  src="/images/weblogo.png"
                  
                  fluid
                  style={{height: '-webkit-fill-available',
                    borderRadius: '0px 25px 25px 0px'}}

                />

                {/* <img src="/images/weblogo.png" alt="sgew" /> */}

              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

    
    </>

    )
}

export default Addproducts


