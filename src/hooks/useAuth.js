import { useSelector } from "react-redux";

export default function useAuth() {
  const { userName } = useSelector((state) => state.user);

  if (userName) {
    return true;
  } else {
    return false;
  }
}
