import { post } from ".";

export const login = (username: string, password: string) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  return post(`/user/login`, formData);
};

export const sendCode = (phoneNumber: string) => {
  return post(`/send-code`, { phone_number: phoneNumber });
};

export const validateCode = (values: {
  phone_number: string;
  code: string;
}) => {
  return post(`/phone-validate`, values);
};

export const signUp = (
  values: { username: string; phone_number: string; password: string },
  clientID: string
) => {
  return post("/user/signup", values, { headers: { client_id: clientID } });
};
