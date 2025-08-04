//utils
import { getToken } from "../utils/tokenService";
//jwt-decode
import { jwtDecode } from "jwt-decode";

export default function DashboardPage() {
  const token = getToken();
  const { name } = jwtDecode(token);

  return (
    <div>
      <h2>{name}جان به پنل کاربری خوش آمدید.</h2>
    </div>
  );
}
