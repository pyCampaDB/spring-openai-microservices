import React from "react";

const ImageComponent = ({ prompt, setPrompt, n, setN, imageUrls, setImageUrls, resetImageState }) => {

  const generateImage = async () => {
    try {
      const response = await fetch(`http://localhost:8080/image-service/generate-image-options-ii?prompt=${prompt}&n=${n}`);
      const urls = await response.json();
      setImageUrls(urls);
    } catch (e) {
      console.error("Error generating image: " + e);
    }
  }

  return (
    <div className="tab-content">
      <h2>Generate Image</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for image"
      />
      <input
        type="number"
        value={n}
        onChange={(e) => setN(e.target.value)}
        placeholder="Enter the number of images"
        min="1"
        max="4"
        onInput={(e) => e.target.blur()}
      />
      <button className="no-tab" onClick={generateImage}>Generate Image</button>
      &nbsp;&nbsp;
      <button className="no-tab" onClick={resetImageState}>Reset</button>
      <div className="image-grid">
        {imageUrls.map(
          (url, idx) => (
            <img key={idx} src={url} alt={`Generated ${idx}`} />
          )
        )}
        {[...Array(4 - imageUrls.length)].map((_, idx) => (
          <div key={idx + imageUrls.length} className="empty-image-slot"></div>
        ))}
      </div>
    </div>
  );
}

export default ImageComponent;
