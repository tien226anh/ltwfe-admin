import { LoginForm, useLogin } from "react-admin";

export const CustomLogin = () => {
  const login = useLogin();
  const handleLogin = (credentials) => {
    login(credentials);
  };
  return <LoginForm onSubmit={handleLogin} />;
};
