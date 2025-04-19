export const login = async (username: string, password: string): Promise<boolean> => {
    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('authenticated', 'true');
        return true;
    }
    return false;
};

export const logout = (): void => {
    localStorage.removeItem('authenticated');
};

export const checkAuth = (): boolean => {
    return localStorage.getItem('authenticated') === 'true';
};