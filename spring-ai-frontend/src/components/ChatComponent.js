import React, { useState } from "react";

const ChatComponent = ({chatPrompt, setChatPrompt, chatResponse, setChatResponse, resetChatState}) =>{
    const modelList = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']
    const [temperature, setTemperature] = useState(0.3);
    const [model, setModel] = useState('gpt-4o')
    const [flag, setFlag] = useState(false);
    const [tokens,setTokens] = useState(1897)
    const askAI = async () => {
        try{
            const response = await fetch(`http://localhost:8080/chat-service/ask-ai?prompt=${chatPrompt}`);
            const data = await response.text();
            setChatResponse(data);
        } catch(e){
            console.error("Error generating response: ",e);
        }
    }

    const askAiWithOptions = async () => {
        try{
            const response = await fetch(`http://localhost:8080/chat-service/ask-ai-options?=prompt=${chatPrompt}&model=${model}&temperature=${temperature}F&tokens=${tokens}`);
            const data = await response.text();
            setChatResponse(data);
        } catch(e){
            console.error("Error generating response: ", e);
        }
    }

    const inputTemperature = () => {       
        return (
            <p>
                <label><b>Temperature: </b></label>
                <input 
                type="number"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                onInput={(e) => e.target.blur()}
                />
            </p>
            
        );
    }

    const inputTokens = () => {       
        return (
            <p>
                <label><b>Max Chunks: </b></label>
                <input 
                type="number"
                min="0"
                max="4096"
                value={tokens}
                onChange={(e) => setTokens(e.target.value)}
                onInput={(e) => e.target.blur()}
                />
            </p>
            
        );
    }

    const selectModel = () => {
        return(
            <p>
                <label><b>MODEL GPT: </b></label>
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                    {modelList.map((modelName, idx) => (
                        <option key={idx} value={modelName}>
                            {modelName}
                        </option>
                    ))}
                </select>
            </p>
        )
    }

    const moreOptions = () => {
        setFlag(!flag);
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
            {
                flag ? selectModel() : ''
            }
            {
                flag ? inputTemperature() : ''
            }
            {
                flag ? inputTokens() : ''
            }
            {
                flag ? '': <div><br/></div>
            }
            <button className="no-tab" onClick={moreOptions}>{flag ? "Hide Filters" : "Show Filters"}</button>
            &nbsp;&nbsp;
            <button className="no-tab" onClick={flag ? askAiWithOptions : askAI}>Ask AI</button>
            &nbsp;&nbsp;
            <button className="no-tab" onClick={resetChatState}>Reset</button>
            <div className="output"><pre>{chatResponse}</pre></div>
        </div> 
    );
}

export default ChatComponent;