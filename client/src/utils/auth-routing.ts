const TOKEN_KEY = "token";

export const login = (jwtToken: string) => {
    localStorage.setItem(TOKEN_KEY, jwtToken);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
};

export const isLogin = () => !!localStorage.getItem(TOKEN_KEY);
