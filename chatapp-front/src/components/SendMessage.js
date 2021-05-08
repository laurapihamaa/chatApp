import React from 'react'

const SendMessage = ({user, text, newMessage, handleChange}) => {
    return(      
        <div style={{fontSize:"18px"}}>
        {user}{" "}{text}
            <input style={{width:"50%", height: "20px", background: "whitesmoke", border:"0px"}}
            value={newMessage} 
            onChange = {handleChange}
            placeholder= "type your message here"/>
            </div>    
    )
    
}

export default SendMessage
