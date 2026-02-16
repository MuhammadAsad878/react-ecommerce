import React from 'react'

function NavBar() {
  return (
    <div className="w-3/4 mx-auto mt-6">
    <div className="flex justify-between">

    <h1 className="w-14 text-xl font-light ">FASCO</h1>

    <div>
    <ul className="flex gap-8 justify-center items-center">
        <li>Home</li>
        <li>Deals</li>
        <li>New Arrivals</li>
        <li>Packages</li>
        <li>Sign in</li>
        <li className="bg-black text-white rounded-md px-2 py-1">Signup</li>
    </ul>
    </div>    
   </div>
    </div>
  )
}

export default NavBar