import { ChatsDisplay } from "../ChatsDisplay/ChatsDisplay"
import { MatchesDisplay } from "../MatchesDisplay/MatchesDisplay"
import { ChatHeader } from "./ChatHeader"

export const ChatContainer = () => {
    return (
      <div className="chatContainer">
          <ChatHeader />

          <div>
            <button
              className="option"
              disabled
            >
              Matches
            </button>
            <button
              className="option"
            >
              Chats
            </button>

            <MatchesDisplay />

            <ChatsDisplay />
          </div>
      </div>
    )
  }
  
  
  