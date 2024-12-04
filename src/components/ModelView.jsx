import { Html, OrbitControls, View,PerspectiveCamera } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Light'
import Iphone from './Iphone'
import * as THREE from 'three'
const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationSize, size, item }) => {
    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full $ {index === 2} ? "right-[-100%]:''`}
        >
            <ambientLight intensity={0.3} />

            <perspectiveCamera makeDefault position={[0, 0, 4]} />
            <Lights />
            <OrbitControls
                makeDefault
                ref={controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)}
                onEnded={() => setRotationSate(controlRef.current.getAzimuthaAngle())}


            />

            <group ref={groupRef} name={`${index === 1} ? 'small':'large'`} position={[0, 0, 0]}>
                <Suspense fallBack={<Html><div>Loading</div></Html>}>
                    <Iphone
                        scale={index === 1 ? [25, 25, 25] : [10,10,10]}
                        item={item}
                        size={size}
                    />
                </Suspense>
            </group>

        </View >
    )
}

export default ModelView

