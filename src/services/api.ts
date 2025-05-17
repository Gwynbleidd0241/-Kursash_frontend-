const API_BASE_URL = 'https://681e251bc1c291fa66332e95.mockapi.io/api/lazarus';

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