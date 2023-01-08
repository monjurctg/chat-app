import axios from 'axios'
import React, { useEffect } from 'react'

function Test() {
  const fetchfun = async ()=>{
    const res =await axios("http://localhost:5000/api/auth/allUsers/62f54075bc5925b36e2d6b87")

    console.log(res,"res")
  }

    useEffect(()=>{
      fetchfun()
      


    })
  return (
    <div>

    </div>
  )
}

export default Test