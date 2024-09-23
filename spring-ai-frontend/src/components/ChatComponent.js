import React from "react";

const ChatComponent = ({chatPrompt, setChatPrompt, chatResponse, setChatResponse, resetChatState}) =>{
    
    const askAI = async () => {
        try{
            const response = await fetch(`http://localhost:8080/chat-service/ask-ai?prompt=${chatPrompt}`);
            const data = await response.text();
            setChatResponse(data);
        } catch(e){
            console.error("Error generating response: ",e);
        }
    }
    return(
        <div className="tab-content">
            <h2>Talk to AI</h2>
            <input 
                type="text"
                placeholder="Enter a prompt for AI"
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                />
            <button className="no-tab" onClick={askAI}>Ask AI</button>
            &nbsp;&nbsp;
            <button className="no-tab" onClick={resetChatState}>Reset</button>
            <div className="output"><p>{chatResponse}</p></div>
        </div> 
    );
}

export default ChatComponent;