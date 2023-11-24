const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body ? JSON.stringify(body) : null,
        });
        if (!response.ok) throw new Error(`Authentication failed: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error.message);
        throw new Error(error.message);
    }
}
