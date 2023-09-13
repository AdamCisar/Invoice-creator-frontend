
// const API_URL = "http://192.168.0.52:8000/api/search/";
const API_URL = "https://invoice-creator-backend.onrender.com/api/search/";


export const searchForItems = async (query) => {
    try {
        const response = await fetch(`${API_URL}${query}`, {
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error("Couldn't fetch the data!");
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    };