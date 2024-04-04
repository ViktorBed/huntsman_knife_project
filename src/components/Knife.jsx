import * as THREE from 'three';
import React, {useEffect} from "react";
import {useGLTF, useTexture} from "@react-three/drei";

function Model(props) {
    const {nodes, materials} = useGLTF("/models/scene.glb");

    const texture = useTexture(props.item.img);

    useEffect(() => {
        Object.entries(materials).map((material) => {
            // these are the material names that can't be changed color
            if (
                material[0] !== "zFdeDaGNRwzccye" &&
                material[0] !== "ujsvqBWRMnqdwPx" &&
                material[0] !== "hUlRcbieVuIiOXG" &&
                material[0] !== "jlzuBkUzuJqgiAK" &&
                material[0] !== "xNrofRCqOXXHVZt"
            ) {
                material[1].color = new THREE.Color(props.item.color[0]);
            }
            material[1].needsUpdate = true;
        });
    }, [materials, props.item]);

    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes['military_knife_Material_#90_0'].geometry} material={materials.Material_90}
                  position={[0, 0, 0]} rotation={[0, 14, 8]} scale={0.0004}/>
        </group>
    );
}

export default Model;

useGLTF.preload("/models/scene.glb");
