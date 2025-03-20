export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
