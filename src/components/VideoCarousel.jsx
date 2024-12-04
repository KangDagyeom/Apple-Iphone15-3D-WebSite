import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { list } from 'postcss'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([]); //Like a video list
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);
    // Video state
    const [video, setVideo] = useState({
        isEnd: false, //Current video is end ?
        startPlay: false, //Current video is playing ?
        videoId: 0, //Current video id 
        isLastVideo: false, //Last video ?
        isPlaying: false, //Current video is playing ?
    });
    const [loadedData, setLoadedData] = useState([]);
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;
    useGSAP(() => {
        gsap.to('#slide', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                //onEnter, onLeave, onEnterBack, onLeaveBack
                toggleActions: 'restart none none none',
            },
            //When video is playing, set startPlay and isPlaying to true
            onUpdate: () => {
                setVideo(prev => ({ ...prev, startPlay: true, isPlaying: true }))
            }
        })
    }, [isEnd, videoId]) //Depend on isEnd and videoId
    //Get video duration and set to list
    const handleLoadedMetadata = (i, e) => {
        setLoadedData((pre) => [...pre, e])
    }
    useEffect(() => {
        //Check if video is loaded 
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause(); //Pause video
            }
            else {
                startPlay && videoRef.current[videoId].play(); //Play video if startPlay is true
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]) //Depend on startPlay, videoId, isPlaying, loadedData
    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;
        if (span[videoId]) {
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100); //Calculate progress
                    if (progress !== currentProgress) {
                        currentProgress = progress;
                        //Change size and color of video progress
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? '10vh' : window.innerWidth < 1200 ? '10vw' : '4vw',
                        });
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        });
                    }
                }
            });

            if (videoId === 0) {
                anim.restart(); //Restart animation when video is first
            }

            const animUpdate = () => {
                const videoElement = videoRef.current[videoId];
                if (videoElement) {
                    //Update progress of video depend on video duration
                    anim.progress(videoElement.currentTime / hightlightsSlides[videoId].videoDuration);
                }
            };

            if (isPlaying) {
                //Update progress of video
                gsap.ticker.add(animUpdate);
            } else {
                //Remove animation when video is not playing
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay]);

    const handleProcess = (type, i) => {
        //prev is current video state, not a variable
        //...prev is spread current value of video state
        switch (type) {
            case 'video-end':
                setVideo((prev) => ({
                    ...prev,
                    isEnd: true,
                    videoId: i + 1,
                    isPlaying: true
                }));
                break;
            //
            case 'video-last':
                setVideo(prev => ({ ...prev, isLastVideo: true }));
                break;
            case 'video-reset':
                setVideo(prev => ({ ...prev, isEnd: false, isLastVideo: false, videoId: 0 }));
                break;
            case 'play':
                setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
                break;
            case 'pause':
                setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
                break;

            default:
                return video;
        }

    }
    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id='slide' className='sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black' >
                                <video id='video' playsInline={true} preload='auto' muted ref={(el) => (videoRef.current[i] = el)}
                                    className={`${list.id === 2 && 'translate-x-44'
                                        } pointer-events-none`}
                                    onEnded={() =>
                                        i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')
                                    }
                                    onPlay={() => {
                                        setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }))
                                    }}
                                    onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                                <div className='absolute top-12 left-[5%] z-10'>
                                    {list.textLists.map((text) => (
                                        <p key={text} className='md:text-2xl text-xl font-medium'>{text}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, i) => (
                        <span key={i} ref={(el) => (videoDivRef.current[i] = el)} className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
                            <span className='absolute h-full w-full rounded-full' ref={(el) => (videoSpanRef.current[i] = el)} />



                        </span>
                    ))}
                </div>
                <button className='control-btn'>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} onClick={isLastVideo ? () => handleProcess('video-reset') : !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')} />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel