import React, { useState, useEffect } from 'react';

export const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Disabled slideshow rotation for categories
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="ImageSlideshowFrame">
      {images.map((imageAsset, index) => (
        <img
          key={index}
          src={imageAsset}
          alt={`Fleet slide ${index}`}
          className={`SlideshowVehicleAsset ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

export default Slideshow;
