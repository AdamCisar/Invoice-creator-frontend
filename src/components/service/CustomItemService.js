import { URL } from './config';

const API_URL = `${URL}/custom-item`;

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
