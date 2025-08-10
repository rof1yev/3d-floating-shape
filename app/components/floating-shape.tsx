"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./model";
import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const FloatingShape = () => {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 3 }),
    y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 3 }),
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerHeight, innerWidth } = window;

    const x = clientX / innerWidth;
    const y = clientY / innerHeight;

    mouse.x.set(x);
    mouse.y.set(y);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);

  return (
    <Canvas
      style={{ background: "#e0e0e2" }}
      orthographic
      camera={{ position: [0, 0, 200], zoom: 7 }}
    >
      <Model mouse={smoothMouse} />
      <Environment preset="studio" />
    </Canvas>
  );
};

export default FloatingShape;
