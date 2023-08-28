const API_URL =  "http://192.168.0.52:8000/api/download-invoice/";

export const getPdf = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: "GET",
        });
    
        if (!response.ok) {
            throw new Error("Couldn't save the PDF!");
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        // Create a downloadable link
        const a = document.createElement('a');
        a.href = blobUrl;
        a.click();

        // Clean up after creating the link
        URL.revokeObjectURL(blobUrl);
        } catch (error) {
        console.log(error.message);
        throw error;
        }
    };