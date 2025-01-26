import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
console.log(API_URL);

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, userData);
        return { token: response.data.token, role: response.data.role };
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};
