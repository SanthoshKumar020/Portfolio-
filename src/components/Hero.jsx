import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';

const RotatingBox = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box ref={meshRef}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
};

import { theme } from '../theme';

const Hero = () => {
  return (
    <div id="hero" className="h-screen bg-primary">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingBox />
        <Text
          position={[0, 1.5, 0]}
          color={theme.colors.accent}
          fontSize={0.5}
          font={theme.fonts.heading}
          glowColor={theme.colors.accent}
          emissive={theme.colors.accent}
          emissiveIntensity={2}
        >
          Santhoshkumar K
        </Text>
        <Text
          position={[0, 1, 0]}
          color={theme.colors.text}
          fontSize={0.2}
          font={theme.fonts.body}
        >
          Full-Stack Web Developer
        </Text>
      </Canvas>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <button className="px-8 py-4 text-primary bg-accent rounded-full hover:bg-link">
          Explore My Work
        </button>
      </div>
    </div>
  );
};

export default Hero;
