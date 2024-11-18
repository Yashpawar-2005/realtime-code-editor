import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { PresentationControls } from "@react-three/drei";
import { Preload } from "@react-three/drei";
// import { Html } from "@react-three/drei";
import Model from "./Model.jsx";
// Rotating Sphere Component
// function RotatingSphere() {
//   const sphereRef = useRef();
//   useState(() => {
//     const interval = setInterval(() => {
//       if (sphereRef.current) {
//         sphereRef.current.rotation.x += 0.01;
//         sphereRef.current.rotation.y += 0.01;
//       }
//     }, 16);
//     return () => clearInterval(interval);
//   });

//   return (
//     <mesh ref={sphereRef}>
//       <sphereGeometry args={[1, 32, 32]} />
//       <meshStandardMaterial color="royalblue" />
//     </mesh>
//   );
// }

export default function App() {
    const cam = useRef()

  
  return (
    <group cameara={[10,10,10]}>
        {/* <Html className="bg-blue-500">
            <button onClick={()=>{console.log(cam.current.position)}}> button here</button>
        </Html> */}
      <PerspectiveCamera makeDefault  position= {[2.91, 1.89, 2.43]} fov={55} ref={cam} />
      <OrbitControls  enableZoom={false} maxPolarAngle={Math.PI/2}  />
      <PresentationControls
      makeDefault
        speed={1.5}
        global
        polar={[-0.1, Math.PI / 4]}
        rotation={[Math.PI / 8, Math.PI / 4, 0]}
      />
      <spotLight
intensity={100}
color="#0ac2e3"
penumbra={0.6}
angle={Math.PI /4}
position={[0,4,0]}/>
<ambientLight intensity={4}/>
      <Suspense fallback={null}>
        <mesh position={[0,-0.5,-0.9]}
        >
       <Model/>
          <Preload all />
        </mesh>
      </Suspense>
    </group>
  );
}
