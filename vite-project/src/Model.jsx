import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Model=(props)=> {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../public/models/computer-desk-area.glb')
  const { actions } = useAnimations(animations, group)
  // useEffect(() => {
  //   console.log(actions)
  
    
  // }, [])
  
  return (
    <group ref={group} {...props} dispose={null} >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Body108_0"
                position={[-0.724, 1.013, 0.657]}
                rotation={[Math.PI / 2, 0, 0]}>
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.material}
                />
              </group>
              <group name="Cube_1" position={[-0.724, 1.013, 0.762]} scale={0.092}>
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials.material_0}
                />
              </group>
              <group name="MONITOR_4" position={[0.048, 0.928, 0.305]} scale={0.605}>
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials.peopleColors}
                />
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials.material_3}
                />
              </group>
              <group name="TABLE_5" position={[0.048, -0.002, 0.572]} scale={0.605}>
                <mesh
                  name="Object_11"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_11.geometry}
                  material={materials.WOOD}
                />
              </group>
              <group name="KEYBOARD_6" position={[-0.087, 0.954, 0.727]} scale={0.605}>
                <mesh
                  name="Object_13"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_13.geometry}
                  material={materials.peopleColors}
                />
              </group>
              <group name="MOUSE_7" position={[0.423, 0.928, 0.831]}>
                <mesh
                  name="Object_15"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_15.geometry}
                  material={materials.peopleColors}
                />
              </group>
              <group
                name="Cylinder002_8"
                position={[0.011, 0.442, 1.214]}
                scale={[0.026, 0.245, 0.026]}>
                <mesh
                  name="Object_17"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_17.geometry}
                  material={materials.peopleColors}
                />
                <mesh
                  name="Object_18"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_18.geometry}
                  material={materials.FABRIC}
                />
              </group>
              <group
                name="Cylinder003_9"
                position={[0.011, 0.442, 1.214]}
                scale={[0.026, 0.245, 0.026]}>
                <mesh
                  name="Object_20"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_20.geometry}
                  material={materials.FABRIC}
                />
              </group>
              <group
                name="Cylinder007_10"
                position={[0.011, 0.442, 1.214]}
                scale={[0.026, 0.245, 0.026]}>
                <mesh
                  name="Object_22"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_22.geometry}
                  material={materials.peopleColors}
                />
              </group>
              <group name="MONITOR001_11" position={[0.808, 1.239, 0.49]} scale={0.605}>
                <mesh
                  name="Object_24"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_24.geometry}
                  material={materials.material_6}
                />
              </group>
              <group
                name="rig_CharRoot_43"
                position={[0, -0.199, 1.224]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={0.01}>
                <group name="bip_42" position={[0, 92.405, -1.666]} rotation={[0, -1.571, 0]}>
                  <group name="GLTF_created_0">
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <skinnedMesh
                      name="Object_30"
                      geometry={nodes.Object_30.geometry}
                      material={materials.peopleColors}
                      skeleton={nodes.Object_30.skeleton}
                    />
                    <skinnedMesh
                      name="Object_31"
                      geometry={nodes.Object_31.geometry}
                      material={materials.peopleColors}
                      skeleton={nodes.Object_31.skeleton}
                    />
                    <group name="lpMaleG_41" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
export default Model

