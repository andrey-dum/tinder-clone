import { ChatContainer } from "../components/ChatContainer/ChatContainer"
import TinderCard from "react-tinder-card"
import { useEffect, useState } from "react"
import './TC.css'
import axios from "axios"
import { useCookies } from 'react-cookie'


export const Dashboard = () => {
	const [characters, setCharacters] = useState([])
  const [lastDirection, setLastDirection] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [user, setUser] = useState(null)


  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId: cookies.UserId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: { gender: user?.gender_interest }
      })
      setCharacters(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    
  }, [])

  useEffect(() => {
    getGenderedUsers()
  }, [user])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  if(!user) {
    return null;
  }

  return (
		<div className="dashboard">
      <ChatContainer
        user={user}
      />

      <div className="swiperContainer">
        <div className="cardContainer">
				{characters.length > 0 && characters.map((character) =>
          <TinderCard className='swipe' key={character.email} onSwipe={(dir) => swiped(dir, character.first_name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character?.first_name || character.email}</h3>
            </div>
          </TinderCard>
        )}
				
        </div>

				<div className="swipeInfo">
					{ lastDirection ? <p>You swiped {lastDirection}</p> : null }
				</div>
      </div>
    </div>
  )
}


