export const setToken = (tokenName: string, token: string) => {
    localStorage.setItem(tokenName, token);
};

export const getToken = (tokenName: string) => {
    return localStorage.getItem(tokenName);
};

export const removeToken = (tokenName: string) => {
    localStorage.removeItem(tokenName);
};
