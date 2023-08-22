const API_URL = "http://127.0.0.1:8000/api/invoice-item/";

export const getInvoiceItems = async ($id) => {
    try {
        const response = await fetch(`${API_URL}${$id}`, {
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