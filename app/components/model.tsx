import { FC } from "react";
import { GLTFResult } from "@/types";
import { useGLTF, Float } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import CustomMesh from "./CustomMesh";

export type Props = {
  mouse: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
};

const Model: FC<Props> = ({ mouse }) => {
  const { nodes } = useGLTF(
    "/medias/floating_shapes.glb"
  ) as unknown as GLTFResult;

  return (
    <Float>
      <group>
        <CustomMesh mouse={mouse} node={nodes.Sphere001} multiplier={2.4} />
        <CustomMesh mouse={mouse} node={nodes.Sphere002} multiplier={2.4} />
        <CustomMesh mouse={mouse} node={nodes.Cylinder002} multiplier={1.2} />
        <CustomMesh mouse={mouse} node={nodes.Sphere003} multiplier={1} />
        <CustomMesh mouse={mouse} node={nodes.Cylinder003} multiplier={1.8} />
        <CustomMesh mouse={mouse} node={nodes.Cylinder005} multiplier={1.8} />
        <CustomMesh mouse={mouse} node={nodes.Cube002} multiplier={2} />
        <CustomMesh mouse={mouse} node={nodes.Cylinder006} multiplier={1.2} />
        <CustomMesh mouse={mouse} node={nodes.Cylinder007} multiplier={1.6} />
        <CustomMesh mouse={mouse} node={nodes.Cylinder009} multiplier={1.8} />
        <CustomMesh mouse={mouse} node={nodes.Sphere} multiplier={1.5} />
      </group>
    </Float>
  );
};

useGLTF.preload("/medias/floating_shapes.glb");

export default Model;
