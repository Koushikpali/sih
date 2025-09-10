export const login = async (email, password) => {
  console.log("Login:", email, password);
  return { token: "mock-token" };
};

export const register = async (data) => {
  console.log("Register:", data);
  return { token: "mock-token" };
};

export const logout = () => {
  localStorage.removeItem("token");
};
