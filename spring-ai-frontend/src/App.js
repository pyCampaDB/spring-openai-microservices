import './App.css'
import { useState } from 'react';
import ImageComponent from './components/ImageComponent';
import ChatComponent from './components/ChatComponent';
import RecipeComponent from './components/RecipeComponent';

function App() {
  const [activeTab, setActiveTab] = useState('image-generator');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  //ImageComponent
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageN, setImageN] = useState(1);
  const [imageUrls, setImageUrls] = useState([]);
  const resetImageState = () => {
    setImagePrompt('');
    setImageN(1);
    setImageUrls([]);
  };

  //ChatComponent
  const [chatPrompt, setChatPrompt] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const resetChatState = () => {
    setChatPrompt('');
    setChatResponse('');
  }
  
  // RecipeComponent
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('any');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [recipeResponse, setRecipeResponse] = useState('');
  const resetRecipeState = () => {
    setIngredients('');
    setCuisine('any');
    setDietaryRestrictions('');
    setRecipeResponse('');
  }

  return (
    <div className='App'>
      <button className={activeTab === 'image-generator' ? 'active' : '' }
        onClick={() => handleTabChange('image-generator')}>
        Image Generator
      </button>
      <button className={activeTab === 'chat' ? 'active' : '' }
        onClick={() => handleTabChange('chat')}>
        Chat
      </button>
      <button className={activeTab === 'recipe-generator' ? 'active' : '' }
        onClick={() => handleTabChange('recipe-generator')}>
        Recipe Generator
      </button>

      <div>
        {activeTab === 'image-generator' && (
          <ImageComponent 
            prompt={imagePrompt}
            setPrompt={setImagePrompt}
            n={imageN}
            setN={setImageN}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            resetImageState={resetImageState}
          />
        )}
        {activeTab === 'chat' && (
          <ChatComponent
            chatPrompt={chatPrompt} 
            setChatPrompt={setChatPrompt}
            chatResponse={chatResponse}
            setChatResponse={setChatResponse}
            resetChatState={resetChatState}
            />
          )}
        {activeTab === 'recipe-generator' && (
          <RecipeComponent 
            ingredients={ingredients}
            setIngredients={setIngredients}
            cuisine={cuisine}
            setCuisine={setCuisine}
            dietaryRestrictions={dietaryRestrictions}
            setDietaryRestrictions={setDietaryRestrictions}
            recipeResponse={recipeResponse}
            setRecipeResponse={setRecipeResponse}
            resetRecipeState={resetRecipeState}
            />
          )}
      </div>
    </div>
  );
}

export default App;
