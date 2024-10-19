import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ImageExpand = ({path , alt, height, width, exH, exW}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle the popup when the image is clicked
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center w-full h-full">
        <div onClick={handleClick} className="cursor-pointer">
          <Image
            src={path}
            alt={alt}
            height={height} // set the height you want
            width={width}  // set the width you want
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Framer Motion popup */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50"
          onClick={handleClick} // Close popup on outside click
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-xl"
          >
            <Image
              src={path}
              alt={alt}
              height={exH} // Enlarged version
              width={exW}  // Enlarged version
              className="rounded-xl object-cover"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageExpand;
