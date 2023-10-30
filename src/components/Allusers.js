import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Navbar from './Navbar';


function Allusers() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    // Fetch users from the API when the component mounts
    axios
      // .get('https://localhost:44305/api/users')
      .get(`${process.env.REACT_APP_BASE_URL}/api/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (

    <>
    <Navbar/>
    
    {/* <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            User ID: {user.userId}, Username: {user.userName}, Email: {user.email}
          </li>
        ))}
      </ul>
    </div> */}
    
    <div className="container">


    <h2 style={{textAlign:'center', margin:'50px'}}>User List</h2>

    <MDBTable align='middle' className="my-5">
      <MDBTableHead>
        <tr>
          <th scope='col'>Username</th>
          <th scope='col'>Name</th>
          <th scope='col'>Contact No.</th>
          <th scope='col'>City</th>
          <th scope='col'>District</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>


      
        {users.map((user) => (

        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{user.userName}</p>
                <p className='text-muted mb-0'>{user.email}</p>
              </div>
            </div>
          </td>

          <td>
            <p className='fw-normal mb-1'>{user.firstName}</p>
          </td>

          <td>
            <p className='fw-normal mb-1'>{user.phone}</p>
          </td>
          
          <td>
            <p className='fw-normal mb-1'>Nesari</p>
            <p className='text-muted mb-0'>Pin-416504</p>
          </td>
          <td>
            <p className='fw-normal mb-1'>Kolhapur</p>
            <p className='text-muted mb-0'>Maharashtra</p>

          </td>
         
        </tr>

        ))}

      
      </MDBTableBody>
    </MDBTable>

    </div>
    

    <div className="text-center mt-4">
        <MDBBtn href='/'>Back</MDBBtn>
      </div>

    </>

  )
}

export default Allusers