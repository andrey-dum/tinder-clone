
export const Chat = ({messages, user}) => {
    return (
      <div className="chat">
        {
          messages.length > 0 && messages.map((message, _index) => (
            <div 
              key={_index} 
              className="chat-message" 
              style={{
                textAlign: user?.first_name === message.name ? 'right' : 'left',
                alignItems: user?.first_name === message.name ? 'flex-end' : 'flex-start',
              }}
            >
              <div className="chat-message-header">
                <div className="img-container">
                  <img src={message.img} alt="" />
                </div>
                <small>{message.name}</small>
              </div>
              <small>{message.message}</small>
            </div>
          ))
        }      
      </div>
    )
  }
  
  
  