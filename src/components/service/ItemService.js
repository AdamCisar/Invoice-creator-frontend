const API_URL = "http://127.0.0.1:8000/api/item/";

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