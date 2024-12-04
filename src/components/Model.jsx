import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { yellowImg } from "../../public/assets/images/yellow.jpg";
import * as THREE from THREE;
const Model = () => {
    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['$8f8a81', '#ffe7b9', '#6f6c64'],
        img: yellowImg
    })

    const cameraControlSmall = useRef();
    const cameraControlLarge = useGSAP();

    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRptation, setLargeRotation] = useState(0);
    useGSAP(() => {
        gsap.to('#heading', { y: 0, opacity: 1 })
    }, [])
    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="section-heading">
                    Take a closer look.
                </h1>
                <div className="flex flex-col items-center mt-5">
                    <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                        <ModelView/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model