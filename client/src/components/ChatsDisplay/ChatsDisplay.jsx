import axios from "axios"
import { useEffect, useState } from "react"
import { Chat } from "./Chat"
import { ChatInput } from "./ChatInput"

export const ChatsDisplay = ({user, clickedUser}) => {
  const [userMessages, setUserMessages] = useState([])
  const [clickedUserMessages, setClickedUserMessages] = useState([])
  const userId = user?.user_id
  const clickedUserId = clickedUser?.user_id


  const getUserMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { 
          userId: userId, 
          correspondingUserId: clickedUserId
        }
      })
      setUserMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getClickedUserMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { 
          userId: clickedUserId, 
          correspondingUserId: userId
        }
      })
      setClickedUserMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserMessages()
    getClickedUserMessages()
  }, [clickedUserId, userId])

  const messages = []

  userMessages?.forEach(message => {
    const formatedMessage = {}
    formatedMessage['name'] = user?.first_name
    formatedMessage['img'] = user?.url
    formatedMessage['message'] = message?.message
    formatedMessage['timestamp'] = message?.timestamp

    messages.push(formatedMessage)
  })

  clickedUserMessages?.forEach(message => {
    const formatedMessage = {}
    formatedMessage['name'] = clickedUser?.first_name
    formatedMessage['img'] = clickedUser?.url
    formatedMessage['message'] = message?.message
    formatedMessage['timestamp'] = message?.timestamp

    messages.push(formatedMessage)
  })

  const descOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

    return (
      <div className="chatsDisplay">
        <Chat messages={descOrderMessages} user={user} />
        <ChatInput
          user={user}
          clickedUser={clickedUser}
          getUserMessages={getUserMessages}
          getClickedUserMessages={getClickedUserMessages}
        />      
      </div>
    )
  }
  
  
  