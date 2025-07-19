import React from 'react'
import headerImg from '../assets/favi-removebg-preview.png'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className="headerContainer">
      <div className="headerImage">
        <img className="headerlogo" src={headerImg} alt="MainLogo" />
        <NavLink className="headerp" to="/">Codo File</NavLink>
      </div>
    </div>
  )
}

export default Header
