import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';

import Navbar from './Navbar'

function Allmedicines() {

    const [Medicines, setMedicines] = useState([]);

    let SrNo = 1;

   
    const fetchMedicines = () => {
        // Axios.get('https://localhost:44305/api/Medicine')
        Axios.get(`${process.env.REACT_APP_BASE_URL}/api/Medicine`)
          .then((response) => response.data)
          .then((data) => setMedicines(data));
    };
    console.log(Medicines);
     
  
    useEffect(() => {   
        
        fetchMedicines();
  
    }, []);
  



  return (
    <>

        <Navbar/>

        <div className='my-4 text-end mx-4' >
            <MDBBtn href='/admin/addproducts'>Add Medicine</MDBBtn>
            {/* <MDBBtn href='https://abchealthcareapi.azurewebsites.net/admin/addproducts'>Add Medicine</MDBBtn> */}
        </div>


        <div className="container my-5">
            <MDBTable striped hover>
            <MDBTableHead className='text-center'>
                <tr>
                <th scope='col'>Sr.No.</th>
                <th scope='col'>MedName</th>
                <th scope='col'>MedDescription</th>
                <th scope='col'>MedImgUrl</th>
                <th scope='col'>MedPrice</th>
                <th scope='col'>Manufacturer</th>
                <th scope='col'>Expiry Date</th>
                <th scope='col'>Stock Qty</th>
                <th scope='col'>Category Id</th>
                <th scope='col'>Update Medicine</th>
                
                </tr>
            </MDBTableHead>
            <MDBTableBody>
            {Medicines.map((med) => (
                        <tr key={med.id}>
                        <th scope='row'>{SrNo++}</th>
                        <td>{med.medName}</td>
                        <td>{med.medDescription}</td>
                        <td>{med.medImgUrl}</td>
                        <td>{med.medPrice}</td>
                        <td>{med.manufacturer}</td>
                        <td>{med.expiryDate}</td>
                        <td>{med.stockQty}</td>
                        <td>{med.categoryID}</td>
                        <td><MDBBtn color='info'>Update</MDBBtn></td>
                        </tr>
                    ))}
            </MDBTableBody>
            </MDBTable>
        </div>

        <div className="text-center  ">
            <MDBBtn href='/' className='my-4'>Back</MDBBtn>
      </div>


    
    
    </>
  )
}

export default Allmedicines