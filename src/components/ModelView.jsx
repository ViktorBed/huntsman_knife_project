import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"

import * as THREE from 'three'
import Lights from './Lights';
import Loader from './Loader';
import Knife from './Knife';
import { Suspense } from "react";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  return (
      <View
          index={index}
          id={gsapType}
      >
        <PerspectiveCamera makeDefault position={[-3, 0, -0.5]} rotation={[0, 14, 8]} />

        <Lights />

        <OrbitControls
            makeDefault
            ref={controlRef}
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.4}
            target={new THREE.Vector3(0, 0 ,0)}
            onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        />

        <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0 ,0]}>
          <Suspense fallback={<Loader />}>
            <Knife
                scale={index === 1 ? [15, 15, 15] : [18, 18, 18]}
                item={item}
                size={size}
            />
          </Suspense>
        </group>
      </View>
  )
}

export default ModelView