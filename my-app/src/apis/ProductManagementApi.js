const API_BASE_URL = 'http://localhost:5000/api/admin/products';

export const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error('Failed to create product');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/update/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/delete/${productId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
