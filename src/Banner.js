import React, { useEffect, useState } from 'react'
import axios from "./axios"
import requests from "./requests"
function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(request.fetchNetflixOriginals)
        }
    })
  return (
    <div>
      
    </div>
  )
}

export default Banner
