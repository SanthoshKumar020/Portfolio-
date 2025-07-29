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

const Hero = () => {
  return (
    <div className="h-screen bg-black">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingBox />
        <Text
          position={[0, 1.5, 0]}
          color="white"
          fontSize={0.5}
          glowColor="blue"
          emissive="blue"
          emissiveIntensity={2}
        >
          Santhoshkumar K
        </Text>
        <Text
          position={[0, 1, 0]}
          color="white"
          fontSize={0.2}
        >
          Full-Stack Web Developer
        </Text>
      </Canvas>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <button className="px-8 py-4 text-white bg-blue-500 rounded-full hover:bg-blue-700">
          Explore My Work
        </button>
      </div>
    </div>
  );
};

export default Hero;
