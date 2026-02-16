import React from 'react'
import NavBar from './layout/Navbar/NavBar'
import HeroMain from './components/Home/HeroMain'
import LogoMarquee from './components/LogoMarquee'
import HomeCarousal from './components/HomeCarousal/HomeCarousal'

export default function App() {
  return (
    <div className="w-full items-center justify-center">
      <NavBar />
      <HeroMain />
      <LogoMarquee />
      <HomeCarousal />
    </div>
  )
}
