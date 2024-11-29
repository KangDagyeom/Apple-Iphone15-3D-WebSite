import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import hero from '../../public/assets/videos/hero.mp4';
import smallHero from '../../public/assets/videos/smallHero.mp4';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHero : hero)
  const handleVideoSrcSet = () => {
    setVideoSrc(window.innerWidth < 760 ? smallHero : hero)
  }
  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet)
    return () => window.removeEventListener('resize', handleVideoSrcSet)
  }, [])
  if (window.innerWidth < 760) {
    useGSAP(() => {
      gsap.to('#hero', { opacity: 1, delay: 2.2 })
      gsap.to('#cta', { opacity: 1, y: -25, delay: 2.2 })
    }, [])
  } else {
    useGSAP(() => {
      gsap.to('#hero', { opacity: 1, delay: 1 })
      gsap.to('#cta', { opacity: 1, y: -15, delay: 1 })
    }, [])
  }

  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
        <p id='hero' className='hero-title'>iPhone 15 Pro</p>
        <div className='md:w-10/12 w-9/12'>
          <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
        <a href="#highlight" className='btn'>Buy</a>
        <p className='font-normal text-xl'>From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero