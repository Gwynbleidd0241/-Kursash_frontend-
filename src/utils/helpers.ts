export const formatPrice = (price: number): string => {
    return `${Math.round(price)} 000 ₽`;
};

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const handleApiError = (error: unknown): string => {
    console.error(error);
    return error instanceof Error
        ? error.message
        : 'Произошла неизвестная ошибка';
};