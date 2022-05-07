import { useCookies } from 'react-cookie'

export const ChatHeader = ({user}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload()
  }

    return (
      <div className="chatHeader">
        <div className="profile">
          <div className="imgContainer">
            <img src={user.url} alt="" />
            {/* <img src="https://i.imgur.com/dmwjVjG.jpeg" alt="" /> */}
          </div>

          <h3>{user?.first_name || user?.email}</h3>
        </div>
        <div onClick={logout}>Logout</div>
      </div>
    )
  }
  
  
  