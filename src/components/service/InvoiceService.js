// const API_URL = "http://127.0.0.1:8000/api/invoice/";
const API_URL = "http://192.168.0.52:8000/api/invoice/";

export const createInvoice= async (invoice) => {
    try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(invoice),
        });
        if (!response.ok) {
          throw new Error("Couldn't save the invoice!");
        }

        return response.json();
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    };

export const getInvoices = async () => {
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

  export const deleteInvoice = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: "DELETE",
        });
    
        if (!response.ok) {
            throw new Error("Couldn't delete the invoice!");
        }
        } catch (error) {
        console.log(error.message);
        throw error;
        }
    };