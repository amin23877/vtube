import { post } from ".";

export const login = (username: string, password: string) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  return post(`/user/login`, formData);
};
