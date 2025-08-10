import { FC, useRef } from "react";
import { Props } from "./model";
import { Mesh } from "three";
import { useTransform } from "framer-motion";
import { useFrame } from "@react-three/fiber";

type CustomMeshProps = {
  node: Mesh | null;
  multiplier: number;
} & Props;

const CustomMesh: FC<CustomMeshProps> = ({ node, mouse, multiplier }) => {
  const meshRef = useRef<Mesh>(null);
  const a = multiplier / 2;

  const baseRotationX = node?.rotation?.x ?? 0;
  const baseRotationY = node?.rotation?.y ?? 0;
  const basePositionX = node?.position?.x ?? 0;
  const basePositionY = node?.position?.y ?? 0;

  const rotationX = useTransform(
    mouse.y,
    [0, 1],
    [baseRotationX + a, baseRotationX - a]
  );
  const rotationY = useTransform(
    mouse.x,
    [0, 1],
    [baseRotationY - a, baseRotationY + a]
  );

  const positionX = useTransform(
    mouse.x,
    [0, 1],
    [basePositionX - multiplier * 2, basePositionX + multiplier * 2]
  );
  const positionY = useTransform(
    mouse.y,
    [0, 1],
    [basePositionY + multiplier * 2, basePositionY - multiplier * 2]
  );

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = rotationX.get();
    meshRef.current.rotation.y = rotationY.get();
    meshRef.current.position.x = positionX.get();
    meshRef.current.position.y = positionY.get();
  });

  if (!node) return null;

  return (
    <mesh
      ref={meshRef}
      castShadow={node.castShadow}
      receiveShadow={node.receiveShadow}
      geometry={node.geometry}
      material={node.material}
      position={node.position}
      rotation={node.rotation}
      scale={node.scale}
    />
  );
};

export default CustomMesh;
