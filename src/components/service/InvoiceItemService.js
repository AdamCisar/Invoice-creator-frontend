// const API_URL = "http://192.168.0.52:8000/api/invoice-item/";
const API_URL = "https://invoice-creator-backend.onrender.com/api/invoice-item/";

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

export const saveInvoiceItems = async (invoiceData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
              },
            body: JSON.stringify(invoiceData),
        });
    
        if (!response.ok) {
            throw new Error("Couldn't save the items!");
        }
        } catch (error) {
        console.log(error.message);
        throw error;
        }
    };

export const deleteInvoiceItem = async (data) => {
    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", 
                },
            body: JSON.stringify(data),
        });
    
        if (!response.ok) {
            throw new Error("Couldn't delete the item!");
        }
        } catch (error) {
        console.log(error.message);
        throw error;
        }
    };