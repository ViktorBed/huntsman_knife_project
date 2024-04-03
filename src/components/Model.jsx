import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";

import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'Huntsman Knife ',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  })

  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if(size === 'large') {
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }

    if(size ==='small') {
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2
      })
    }
  }, [size])

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 })
  }, []);

  return (
      <section >
        <div className="screen">
          <h1 id="heading">
            Take a closer look.
          </h1>

          <div className="screen_canvas">
            <div className="screen_canvas_cover">
              <ModelView
                  index={1}
                  groupRef={small}
                  gsapType="view1"
                  controlRef={cameraControlSmall}
                  setRotationState={setSmallRotation}
                  item={model}
                  size={size}
              />

              <ModelView
                  index={2}
                  groupRef={large}
                  gsapType="view2"
                  controlRef={cameraControlLarge}
                  setRotationState={setLargeRotation}
                  item={model}
                  size={size}
              />

              <Canvas
                  style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: 'hidden'
                  }}
                  eventSource={document.getElementById('root')}
              >
                <View.Port />
              </Canvas>
            </div>

            <div className="screen_bottom ">
              <p>{model.title}</p>
              <div>
                    <ul>
                    {models.map((item, i) => (
                      <li key={i} className="mapped" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                    ))}
                  </ul>

                <button className="screen_btn">
                  {sizes.map(({ label, value }) => (
                      <span key={label} className="screen_btn_size" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white'}} onClick={() => setSize(value)}>
                    {label}
                  </span>
                  ))}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Model;
