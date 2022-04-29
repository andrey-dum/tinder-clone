import { useState } from "react"

export const ChatInput = () => {
  const [value, setValue] = useState('')

    return (
      <div className="chatInput">
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button className="secondary-button">
          Submit
        </button>
      </div>
    )
  }
  
  
  