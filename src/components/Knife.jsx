import * as THREE from 'three';
import React, {useEffect, useState} from "react";
import {useGLTF, useTexture} from "@react-three/drei";

function Model(props) {
    const {nodes, materials} = useGLTF("/models/scene.glb");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const texture = useTexture(props.item.img);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        Object.entries(materials).forEach(([key, material]) => {
            if (
                key !== "zFdeDaGNRwzccye" &&
                key !== "ujsvqBWRMnqdwPx" &&
                key !== "hUlRcbieVuIiOXG" &&
                key !== "jlzuBkUzuJqgiAK" &&
                key !== "xNrofRCqOXXHVZt"
            ) {
                material.color = new THREE.Color(props.item.color[0]);
                material.needsUpdate = true;
            }
        });
    }, [materials, props.item]);

    const modelScale = windowWidth < 760 ? 0.0002 : 0.0004;

    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes['military_knife_Material_#90_0'].geometry}
                material={materials.Material_90}
                position={[0, 0, 0]}
                rotation={[0, 14, 8]}
                scale={[modelScale, modelScale, modelScale]}
            />
        </group>
    );
}

export default Model;

useGLTF.preload("/models/scene.glb");