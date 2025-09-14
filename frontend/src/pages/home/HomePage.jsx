import { useAuthStore } from "../../store/authUser.js";
import AuthScreen from "./AuthScreen.jsx";
import HomeScreen from "./HomeScreen.jsx";

export const HomePage = () => {
  const { user } = useAuthStore();

  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};
