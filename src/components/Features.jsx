import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../utils/animations';
import exploreVideo from '../../public/assets/videos/explore.mp4';
import explore1Img from '../../public/assets/images/explore1.jpg';
import explore2Img from '../../public/assets/images/explore2.jpg';
const Features = () => {
    const videoRef = useRef();
    useGSAP(() => {
        animateWithGsap('#features_title', {
            y: 0,
            opacity: 1
        })
        animateWithGsap('.g_grow', {
            scale: 1,
            opacity: 1,
            ease: 'power1'
        },
            {
                scrub: 5.5
            }
        )
    }, []);
    return (
        < section className='w-full h-full overflow-hidden common-padding bg-zinc mt-10 relative' >
            <div className='screen-max-width'>
                <div className='mb-12 w-full'>
                    <h1 id='features_title' className='section-heading'>Explore the full story.</h1>
                </div>
                <div className='flex flex-col justify-center items-center overflow-hidden'>
                    <div className='mt-32 mb-24 pl-24'>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>Forged in titanium.</h2>
                    </div>
                    <div className='flex-center flex-col sm:px-10'>
                        <div className='relative h-[50vh] w-full flex items-center'>
                            <video playsInline id='exploreVideo' className='w-full h-full object-cover object-center' preload='none' muted autoPlay ref={videoRef}>
                                <source src={exploreVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <div className='features-video-container'>
                                <div className='overflow-hidden flex-1 h-[50vh]'>
                                    <img src={explore1Img} alt="titanium" className='features-video g_grow' />
                                </div>
                                <div className='overflow-hidden flex-1 h-[50vh]'>
                                    <img src={explore2Img} alt="titanium" className='features-video g_grow' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section >
    )

}



export default Features;