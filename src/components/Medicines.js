import React, { useState, useEffect } from 'react'
import Axios from 'axios';



import Navbar from './Navbar';

import {
  MDBBtn,
} from 'mdb-react-ui-kit';


function Medicines() {

    const [Medicines, setMedicines] = useState([]);
    const [cartId, setCartId] = useState(null); // State to store cartId
    // const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [selectedCategoryId, setSelectedCategoryId] = useState(-1); // Initialize with -1 (All categories)



      // Fetch the cart for the user
      const fetchUserCart = async () => {
        try {
            // const response = await Axios.get(`https://localhost:44305/api/carts/getCartByUserId?userId=${storedUserData.userId}`);
            const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/api/carts/getCartByUserId?userId=${storedUserData.userId}`);
            if (response.status === 200) {
                // Get the cartId from the response
                const userCartId = response.data.id;
                // const cartData = response.json;
                // dispatch(setCartData(cartData)); // Dispatch the action to update the Redux store
                 setCartId(userCartId);
                //  console.log(cartData);
            }
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error fetching user cart:', error);
        }
    };


    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    console.log(storedUserData);

    const fetchMedicines = () => {
      // Axios.get('https://localhost:44305/api/Medicine')
      Axios.get('https://abchealthcareapi.azurewebsites.net/api/Medicine')
        .then((response) => response.data)
        .then((data) => setMedicines(data));
    };
    console.log(Medicines);
   

    useEffect(() => {
       
        fetchMedicines();

        fetchUserCart();

      }, []);

    

    const handleAddToCart = async (medicine) => {
      try {
          const response = await Axios.post(
              // `https://localhost:44305/api/carts/addToCart?cartId=${cartId}`,
              `https://abchealthcareapi.azurewebsites.net/api/carts/addToCart?cartId=${cartId}`,
              medicine
          );
  
          if (response.status === 200) {
              // Handle success, e.g., show a success message
              console.log('Medicine added to cart successfully.');
          }
      } catch (error) {
          // Handle error, e.g., show an error message
          console.error('Error adding medicine to cart:', error);
      }
  };

  // Function to filter medicines based on search query
  const filterMedicines = (medicines, query) => {
    return medicines.filter((medi) =>
      medi.medName.toLowerCase().includes(query.toLowerCase())
    );
  };

  const categories = [
    { categoryId: -1, name: 'All' }, // -1 represents all categories
    { categoryId: 1, name: 'Pain Relief' }, // Replace with actual category names
    { categoryId: 2, name: 'Antibiotics' }, // Replace with actual category names
    { categoryId: 3, name: 'Cardiovascular' }, // Replace with actual category names
    { categoryId: 4, name: 'Mental Health' }, // Replace with actual category names
    { categoryId: 5, name: 'Vitamins and Supplements' }, // Replace with actual category names
    // Add more categories as needed
  ];

  const filterMedicinesByCategory = (medicines, categoryId) => {
    if (categoryId === -1) {
      return medicines; // Return all medicines
    } else {
      
      console.log("second -->",categoryId)
      return medicines.filter((medi) => medi.categoryID === categoryId);
    }
  };

  // Filter medicines when searchQuery changes
  useEffect(() => {
    const filteredMedicines = filterMedicines(Medicines, searchQuery);
    setMedicines(filteredMedicines);

    const filteredMedicinesByCategory = filterMedicinesByCategory(filteredMedicines, selectedCategoryId);
    setMedicines(filteredMedicinesByCategory);
  }, [searchQuery, selectedCategoryId]);
  


  return (
    <>
    <Navbar/>
    <div className='d-flex' style={{flexDirection:'column', alignItems:'center'}}>
    <form className="d-flex input-group w-50 my-5" style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="search"
            className="form-control"
            placeholder="Search Medicine"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: '1', // Make the input grow to fill the available space
              marginRight: '10px', // Add some spacing between input and select
            }}
          />
         
          <select
            className="form-select"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
             style={{
              flex: '1', // Make the select grow to fill the available space
              marginRight: '10px', // Add some spacing between select and button
              fontSize: '12px', // Adjust font size for the select
            }}
          >
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>


          <MDBBtn color="primary">Search</MDBBtn>
        </form>
      <h1>Featured Products</h1>


      {/* <h1>cardid is :, {cartId}</h1> */}


      <div className='container my-4'>
      <div className="row">
        {Medicines.map((medi) => (
     
      

          <div className="col-md-3 " key={medi.id}>
            <div className="card mb-4" style={{alignItems:'center'}}>


              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px', // Set the desired height
                  width: '200px',  // Set the desired width
                  overflow: 'hidden', // Hide overflow to maintain aspect ratio
                  margin:'10px'
                }}
              >


                <img
                  src={`images/${medi.medImgUrl}`}
                  alt={medi.medName}
                  style={{
                    objectFit: 'contain', // Ensure the entire image fits within the container
                    height: '100%', // Fill the container height
                    width: '100%', // Fill the container width
                  }}
                />
              </div>
              <div className="card-body">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:"flex-start"}}>
                    <h5 className="card-title">{medi.medName} </h5>  
                    <span  style={{height:'fit-content'}} class="badge badge-pill badge-success">{medi.manufacturer}</span>
                </div>              
                <p className="card-text">{medi.medDescription}</p>
                <button onClick={() => handleAddToCart(medi)}  className="btn btn-primary">AddToCart</button>
              </div>
            </div>
          </div>



        


        ))}
      </div>
      </div>
    </div>

    </>
  )
}

export default Medicines