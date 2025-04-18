// Importing the IKImage component from the "imagekitio-react" library
// IKImage is used to render optimized images from the ImageKit.io service
import { IKImage } from "imagekitio-react";

// The Image component is a wrapper around the IKImage component from ImageKit.io.
// It simplifies the process of rendering optimized images with optional transformations.
// Props:
// - path: The path to the image on the ImageKit.io server (used if `src` is not provided).
// - src: The direct URL of the image (used as a fallback if `path` is not provided).
// - alt: The alternative text for the image (for accessibility).
// - className: Additional CSS classes to style the image.
// - w: The desired width of the image (used for transformations).
// - h: The desired height of the image (used for transformations).
const Image = ({ path, src, alt, className, w, h }) => {
  return (
    <IKImage
      // The base URL endpoint for ImageKit.io, retrieved from environment variables
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}

      // The path to the image on the ImageKit.io server
      path={path}

      // The direct URL of the image (used as a fallback if `path` is not provided)
      src={src}

      // Transformation options for resizing the image
      transformation={[
        {
          height: h, // Sets the height of the image
          width: w,  // Sets the width of the image
        },
      ]}

      // Alternative text for the image (important for accessibility)
      alt={alt}

      // Enables lazy loading for the image to improve performance
      loading="lazy"

      // Additional CSS classes for styling the image
      className={className}

      // Enables Low-Quality Image Placeholder (LQIP) for faster loading
      lqip={{ active: true, quality: 20 }}
    />
  );
};

// Exports the Image component so it can be used in other parts of the application
export default Image;