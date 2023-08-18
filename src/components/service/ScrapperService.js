
const API_URL = "http://127.0.0.1:8000/api/search/";

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