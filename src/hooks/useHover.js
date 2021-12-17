import { useEffect, useState, useRef } from 'react';

const useHover = () => {
  const [isHovered, setHovered] = useState(false);

  const ref = useRef(null);

  const handleMouseover = () => setHovered(true);
  const handleMouseout = () => setHovered(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mouseover', handleMouseover);
      ref.current.addEventListener('mouseout', handleMouseout);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mouseover', handleMouseover);
        ref.current.removeEventListener('mouseout', handleMouseout);
      }
    };
  }, [ref.current]);

  return [ref, isHovered];
};

export default useHover;
