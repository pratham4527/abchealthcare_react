
  export const fetchUserData = (username) => async (dispatch) => {
    try {
      // const response = await fetch(`https://localhost:44305/api/users/${username}`);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${username}`);
      const userData = await response.json();
      localStorage.setItem('userData', JSON.stringify(userData));

      dispatch({
        type: 'SET_USER_DATA',
        payload: userData,
      });
    } catch (error) {
      alert('Failed to fetch data of the logged-in user');
    }
  };
  




 
  