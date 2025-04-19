const API_BASE_URL = 'https://67fd6f5f3da09811b175b728.mockapi.io/api/v1';

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const apiRequest = async <T>(
    endpoint: string,
    method: string = 'GET',
    data?: unknown
): Promise<T> => {
    const url = `${API_BASE_URL}/${endpoint}`;
    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, config);
        return handleResponse<T>(response);
    } catch (error) {
        console.error(`API request failed: ${error}`);
        throw error;
    }
};

export default apiRequest;