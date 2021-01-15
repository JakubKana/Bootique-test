type Token = string | null;

const TOKEN_KEY = "TOKEN_KEY";

const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = (): Token => {
  return localStorage.getItem(TOKEN_KEY);
};

export { getToken, saveToken };
