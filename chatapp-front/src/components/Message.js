import React from 'react'
import './style.css'

const Message = ({message})=> {
    return(
        <div>
           <p className='message message-bottom-left'> {message.content}</p>
        </div>
    )
}

export default Message
