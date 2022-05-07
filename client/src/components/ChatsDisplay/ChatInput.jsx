import axios from "axios"
import { useState } from "react"

export const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUserMessages }) => {

  const [value, setValue] = useState('')
  const userId = user?.user_id
  const clickedUserId = clickedUser?.user_id

  const addMessage = async () => {
    const msg = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: value
    }

    try {
      await axios.post('http://localhost:8000/message', {
        message: msg
      })
      
      getUserMessages()
      getClickedUserMessages()
      setValue('')
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <div className="chatInput">
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button 
          className="secondary-button"
          onClick={addMessage}  
        >
          Submit
        </button>
      </div>
    )
  }
  
  
  