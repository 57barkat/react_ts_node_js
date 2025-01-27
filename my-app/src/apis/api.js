import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
console.log(API_URL);

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin/login/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin/login/login`, userData);
        return { token: response.data.token, role: response.data.role };
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/manageUsers`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};

export const deleteUser = async (userId) => {
    try {
        await axios.delete(`${API_URL}/api/admin/manageUsers/delete/${userId}`);
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};

export const updateUserRole = async (userId, role) => {
    try {
        const response = await axios.put(`${API_URL}/api/admin/manageUsers/updateRole/${userId}`, { role });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};

export const updateUserDetails = async (userId, userDetails) => {
    try {
        const response = await axios.put(`${API_URL}/api/admin/manageUsers/update/${userId}`, userDetails);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};
