import React, { useState } from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = (e) => {
    console.log('Image failed to load:', currentSrc);
    setImageError(true);
    
    // Try different fallback images
    const fallbacks = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    
    if (currentSrc !== fallbacks[0]) {
      setCurrentSrc(fallbacks[0]);
    } else if (currentSrc !== fallbacks[1]) {
      setCurrentSrc(fallbacks[1]);
    } else if (currentSrc !== fallbacks[2]) {
      setCurrentSrc(fallbacks[2]);
    } else {
      // If all fallbacks fail, use a data URL for a placeholder
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={() => setImageError(false)}
      {...props}
    />
  );
}

export default Image;
