import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    src: 'https://images.ctfassets.net/3viuren4us1n/5YzA7KGIWQEjt8KStZGlxd/992b5c0e04b062195155c4072d802015/facial_recognition.jpg?fm=webp&w=1920',
    bgColor: '#ff0000',
  },
  {
    src: 'https://images.ctfassets.net/3viuren4us1n/4TqSXKMxKpDQmNpsDKEx7f/07bfe086f9bbac7abbbd5617b1dbe1de/tripletloss.jpg?fm=webp&w=1920',
    bgColor: '#33c3ff',
  },
  {
    src: 'https://images.ctfassets.net/3viuren4us1n/40JXje75HcC6C0A6M3jWuM/08248f37b305973102a8eeb6edb0dd55/face_embeddings.jpg?fm=webp&w=1920',
    bgColor: '#ffffff',
  },
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
