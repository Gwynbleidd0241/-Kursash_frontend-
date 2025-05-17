export const isAuthenticated = (): boolean => {
    return localStorage.getItem('authenticated') === 'true';
};

export const checkAuthAndRedirect = (): void => {
    if (!isAuthenticated()) {
        window.location.href = '/login';
    }
};

export const logout = (): void => {
    localStorage.removeItem('authenticated');
    window.location.href = '/login';
};