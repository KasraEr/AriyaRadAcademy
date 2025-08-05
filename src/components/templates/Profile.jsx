import { getToken } from "../../utils/tokenService"
import { jwtDecode } from "jwt-decode"

export default function Profile() {

  const token = getToken()
  const details = jwtDecode(token)
  console.log(details)

  return (
    <div>Profile</div>
  )
}
