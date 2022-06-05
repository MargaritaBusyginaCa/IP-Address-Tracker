import React from "react"
import { useEffect, useState } from "react";
import '../index.css'
//e5c74ddd755d4e99a32116947e8fd0fb
function App (){
  const [infoIP, setInfoIP] = useState({})
  const [IPAddress, setIPAddress] = useState("8.8.8.8")
  const [latitude, setLatitude] = useState("32.58997")
  const [longitude, setLongitude] = useState("-92.06862")
  const [reload, setReload] = useState(false)
  useEffect(() => {
     let ipObj = {}
     /**API Call */
     fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=e5c74ddd755d4e99a32116947e8fd0fb&ip=${IPAddress}`)
     .then(res => res.json())
     .then(data => ipObj = data)
     .then(() =>{
         setLatitude(ipObj.latitude)
         setLongitude(ipObj.longitude)
         setInfoIP({ip: ipObj.ip, country_name:ipObj.country_name, district:ipObj.district, 
                 latitude: ipObj.latitude, longitude: ipObj.longitude, time_zone_name: ipObj.time_zone.name,
                 time_zone_offset:ipObj.time_zone.offset})
       })
     /**emd of API Call */
     var map = L.map('map').setView([latitude, longitude], 11);
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 19,
       attribution: '© OpenStreetMap'
       }).addTo(map);
     var marker = L.marker([51.5, -0.09]).addTo(map);

  }, [reload])/**emd of useEffect */

  
  function handleSubmit(e){
    e.preventDefault()
    setIPAddress(e.target.value)
    console.log(IPAddress) 
  }
  return(
      <div>
        <form>
          <input type="text" 
                 
                 name="ip" 
                 placeholder="IP Address"/>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>    
      </div>
  )
}

export default App