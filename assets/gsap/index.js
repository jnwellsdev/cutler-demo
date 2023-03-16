import gsap from 'gsap'
// gsap.registerPlugin()

export const playSplash = () => {
    const all = '.top, .top2, .btm, .btm2'
    gsap.set('.mid, .top, .top2, .btm, .btm2, .mid .logo, .mid p, .mid button', {opacity: 0})
    gsap.set('.mid', {height: '0%'})

    const tl = gsap.timeline()
    tl.timeScale(1.5)

    tl.to('.top', {opacity: 0.5, duration: 1, delay: 1, ease: 'sine'})
      .to('.top2', {opacity: 0.5, duration: 1, ease: 'sine'}, '> -0.25')
      .to('.btm2', {opacity: 0.5, duration: 1, ease: 'sine'}, '> -0.25')
      .to('.btm', {opacity: 0.5, duration: 1, ease: 'sine'}, '> -0.25')
      .to(all, {opacity: 1, duration: 3}, '>')
      .to('.mid', {opacity: 1, height: '100%', duration: 1.5, ease: 'circ.inOut'}, '<' )
      .to('.mid button, .mid p', {opacity: 1, duration: 0.5, ease: 'circ.inOut'}, '< +0.25')
      .to('.mid .logo', {opacity: 1, duration: 1, ease: 'circ.in'}, '< +1' )
    // console.log(gsap)
}

export const playForm = () => {
  const tl = gsap.timeline()
    gsap.set('.form-module, .title', {opacity: 0})
    tl.to('.mid .logo, .mid p, .mid button', {opacity: 0, duration: 0.5})
      .to('.form-module, .title', {opacity: 1, duration: 1}, '<')
}

export const playVideo = () => {
  const tl = gsap.timeline()
    gsap.set('.video-screen .background, .video-screen span', {opacity: 0})
    tl.to('.video-screen .background', {opacity: 1, duration: 1, delay: 1})
      .to('.video-screen span', {opacity: 1, duration: 1}, '> -0.5')
}