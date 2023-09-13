// const API_URL = "http://192.168.0.52:8000/api/custom-item";
const API_URL = "https://invoice-creator-backend.onrender.com/api/custom-item";

export const saveCustomItem = async (itemData) => {
    try {
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
              },
            body: JSON.stringify(itemData),
        });
    
        if (!response.ok) {
            throw new Error("Couldn't save the item!");
        }
        } catch (error) {
        console.log(error.message);
        throw error;
        }
    };
