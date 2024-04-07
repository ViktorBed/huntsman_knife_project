import {  PerspectiveCamera, View } from "@react-three/drei"

import Lights from './Lights';
import Loader from './Loader';
import Knife from './Knife';
import { Suspense } from "react";

const ModelView = ({ index, groupRef, gsapType, controlRef, size, item }) => {
  return (
      <View
          index={index}
          id={gsapType}
      >
        <PerspectiveCamera makeDefault position={[-3, 0, -0.5]} rotation={[0, 14, 8]} />

        <Lights />

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