import React from "react"
import { useEffect, useState } from "react";
import '../index.css'
//e5c74ddd755d4e99a32116947e8fd0fb
function App (){
  const [infoIP, setInfoIP] = useState({})
  const [IPAddress, setIPAddress] = useState("")
  const [latitude, setLatitude] = useState("32.58997")
  const [longitude, setLongitude] = useState("-92.06862")
  const [reload, setReload] = useState(false)
 
  useEffect(() => {
     map.remove()
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
    
  }, [reload])/**end of useEffect */

  
  function handleOnChange(e){
    map.remove()
    e.preventDefault()
    setIPAddress(e.target.value) 
  }
  function handleSubmit(){
    map.remove()
    setReload(prevReload => !prevReload)
    
  }

  var map = L.map('map').setView([latitude, longitude], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
      }).addTo(map);
  var marker = L.marker([latitude, longitude]).addTo(map);
  

  return(
      <div className="main--container">
        <div className="header--container">
          <h1>IP Address Tracker</h1>
        <form>
          <input type="text" 
                 value={IPAddress}
                 name="ip" 
                 placeholder="Search for any IP address or domain"
                 onChange={handleOnChange}/>
          <button type="button" onClick={handleSubmit} className="submit-btn"></button>
        </form>
       </div>
        <div className="ip-info--container">

         <div className="ip-address">
          <p>IP ADDRESS</p>
          <h3>{IPAddress}</h3>
         </div>

         <div>
          <p>LOCATION</p>
          <h3>{infoIP.district}</h3>
         </div>

         <div>
          <p>TIMEZONE</p>
          <h3>UTC {infoIP.time_zone_offset}:00</h3>
         </div>

         <div>
          <p>COUNTRY</p>
          <h3>{infoIP.country_name}</h3>
         </div> 
       </div> 

      </div>
  )
}

export default App