import { useState } from "react"
import { ChatsDisplay } from "../ChatsDisplay/ChatsDisplay"
import { MatchesDisplay } from "../MatchesDisplay/MatchesDisplay"
import { ChatHeader } from "./ChatHeader"

export const ChatContainer = ({user}) => {

   const [clickedUser, setClickedUser] = useState(null)
  
    return (
      <div className="chatContainer">
          <ChatHeader user={user} />

          <div>
            <button
              className="option"
              onClick={() => setClickedUser(null)}
              
            >
              Matches
            </button>
            <button
              className="option"
              disabled={!clickedUser}
            >
              Chats
            </button>

            {
              !clickedUser ? (
                <MatchesDisplay 
                  matches={user?.matches}
                  setClickedUser={setClickedUser}
                />
              ) : (
                <ChatsDisplay
                  user={user}
                  clickedUser={clickedUser}
                />
              )
            }

            
          </div>
      </div>
    )
  }
  
  
  