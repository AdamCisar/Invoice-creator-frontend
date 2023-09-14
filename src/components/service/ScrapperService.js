import { URL } from './config';

const API_URL = `${URL}/search/`;

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