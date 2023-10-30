import React from 'react'
import { useState } from 'react';


import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
//   MDBDropdown,
//   MDBDropdownToggle,
//   MDBDropdownMenu,
//   MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

function Navbar() {

    const [showBasic, setShowBasic] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate user authentication status


    //to use redux user data use below lines
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
  
    console.log(storedUserData);


    const handelMyCart = () => {
      // alert("cart clicked");
    }


    const handleLogout = () => {
      // Perform logout actions here (e.g., clear authentication token, session data)
  
      // Simulate logout by setting isLoggedIn to false
      setIsLoggedIn(false);
  
      // Redirect the user to the login page or home page
      // window.location.href = 'http://localhost:3000/login';  
      window.location.href = '/login';  
      };


  return (


        // <MDBNavbar expand='lg' light bgColor='light'>
        <MDBNavbar expand='lg' style={{backgroundColor:'black',color:'white'}} >
        <MDBContainer fluid>
            
            <img src="/images/navlogo.png" alt="scsc" style={{width:'9%',margin:'0px 50px 0px 25px'}}   />

            <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
            >
            <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                <MDBNavbarItem >
                <MDBNavbarLink active aria-current='page' href='/' style={{color:'white', margin:'0px 5px'}}>
                    Home
                </MDBNavbarLink>
                </MDBNavbarItem>

    

              
                {storedUserData.isAdmin?(
                <>

                      <MDBNavbarItem >
                      <MDBNavbarLink active aria-current='page' href='/admin/medicines' style={{color:'white', margin:'0px 5px'}} >
                          Update Medicines
                      </MDBNavbarLink>
                      </MDBNavbarItem>

                      <MDBNavbarItem >
                      <MDBNavbarLink active aria-current='page' href='/admin/addproducts' style={{color:'white', margin:'0px 5px'}} >
                          Add Medicine
                      </MDBNavbarLink>
                      </MDBNavbarItem>

                      <MDBNavbarItem>
                      <MDBNavbarLink active aria-current='page' href='/admin/orders' style={{color:'white', margin:'0px 5px'}} >
                          Orders
                      </MDBNavbarLink>
                      </MDBNavbarItem>
                      
                      <MDBNavbarItem>
                      <MDBNavbarLink active aria-current='page' href='/admin/users' style={{color:'white', margin:'0px 5px'}} >
                          Users
                      </MDBNavbarLink>
                      </MDBNavbarItem>

                </>):(
                
                <>

                      <MDBNavbarItem>
                      <MDBNavbarLink active aria-current='page' href='/cart' onClick={handelMyCart} style={{color:'white', margin:'0px 5px'}}>
                          MyCart
                      </MDBNavbarLink>
                      </MDBNavbarItem>

                      <MDBNavbarItem>
                      <MDBNavbarLink active aria-current='page' href='/order' style={{color:'white', margin:'0px 5px'}} >
                          MyOrder
                      </MDBNavbarLink>
                      </MDBNavbarItem>

                </>)}

            
            

               
            </MDBNavbarNav>

               

               


              {isLoggedIn ? (
                  <>
                 <div>
                    <span >Welcome, {isLoggedIn ? storedUserData.userName  : 'Guest'}</span>
                </div>
                  <MDBBtn color='primary' onClick={handleLogout}>Logout</MDBBtn>
                  </>
                ) : (
                  <> 
                    <div>
                      <a href='/login'>Login</a>
                    </div>
                    <div>
                      <a href='/register'>Register</a>
                    </div> 
                 </>
                )}
               
               


            </MDBCollapse>
        </MDBContainer>
        </MDBNavbar>
  );
}


  

export default Navbar