import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from './../images/img1.webp';
import img2 from './../images/img2.jpeg';
import img3 from './../images/img3.png';

const images = [
  { src: img1, bgColor: '#ff5733' },
  { src: img2, bgColor: '#33c3ff' },
  { src: img3, bgColor: '#7d33ff' },
];

const ImageGallery = () => {
  // Remove the TypeScript type annotation and use plain JavaScript
  const [selectedImage, setSelectedImage] = useState(null);

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const fullscreenVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0 },
  };

  return (
    <main className="gallery">
      <AnimatePresence>
        {!selectedImage &&
          images.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={`Image ${index + 1}`}
              className="thumbnail"
              onClick={() => setSelectedImage(image)}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                rotate: 3,
                boxShadow: '0 0.6rem 1.4rem rgba(0, 0, 0, 0.3)',
              }}
            />
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fullscreen-overlay"
            style={{ backgroundColor: selectedImage.bgColor }}
            onClick={() => setSelectedImage(null)}
            variants={fullscreenVariants}
            initial="initial"
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={selectedImage.src}
              alt="Fullscreen"
              className="fullscreen-image"
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ImageGallery;
