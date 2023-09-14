import { URL } from './config';

const API_URL = `${URL}/item/`;

export const saveItemToDatabase = async (item) => {
    try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(item),
        });
    
        if (!response.ok) {
          throw new Error("Couldn't save the item!");
        }
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    };

export const getItems = async () => {
  try {
      const response = await fetch(API_URL, {
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