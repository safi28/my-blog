export const authenticateUser = async (email, password) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error('Authentication failed:', response.statusText);

        return response
    } catch (error) {
        console.error('Authentication failed:', error.message);
        throw error;
    }
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};
