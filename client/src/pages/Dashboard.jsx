import { ChatContainer } from "../components/ChatContainer/ChatContainer"
import TinderCard from "react-tinder-card"
import { useState } from "react"
import './TC.css'


const db = [
  
  {
    name: 'Jared Dunn',
    url: 'https://i.imgur.com/dmwjVjG.jpeg'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://i.imgur.com/Lnt9K7l.jpeg'
  },
	{
    name: 'Kate',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  },
  {
    name: 'Megan',
    url: 'https://i.imgur.com/H07Fxdh.jpeg'
  },
  {
    name: 'Monica Hall',
    url: 'https://i.imgur.com/OckVkRo.jpeg'
  },
]


export const Dashboard = () => {
	const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
		<div className="dashboard">
      <ChatContainer />

      <div className="swiperContainer">
        <div className="cardContainer">
				{characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
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


