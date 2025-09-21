"use client";
import React, { useEffect, useState } from 'react';
import { ExclamationCircleIcon, MapPinIcon, MapIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

export default function DashboardEdit() {

// map section
    const svgIcon = ` <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="#e84118"></path> </g></svg> `;
    const customSvgIcon = L.divIcon({
        html: svgIcon,
        className: "", 
        iconSize: [33, 33],
        iconAnchor: [16, 32],
    });
    const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
      );

    const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
    );

    const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
    );

    const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
    );
// map section

  const [avatar, setAvatar] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<number | string>("");
  const [gender, setGender] = useState<string>(""); 
  const [socialLinks, setSocialLinks] = useState<string>(""); 
  const [lat, setLat] = useState<number>()
  const [lng, setLng] = useState<number>()
  const [country, setCountry] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [address, setAddress] = useState<string | number>("")
  const [postCode, setPostCode] = useState<string | number>("")

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
      // console.log("⛔ No token found!");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch('https://jiran-api.com/api/v1/auth/show', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
        const data = await response.json();
        if(response.ok){
          const userData = data.data;
          console.log("full data =>", userData)
          setUsername(userData.name);
          setEmail(userData.email);
          setLat(userData?.["loc-lat"] ?? undefined);
          setLng(userData?.["loc-lng"] ?? undefined);
        }
      }
      catch (error) {
        console.error("⛔ Error:", error);
      }
    }
    fetchData() 
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(!token) {
      console.log('⛔ No token found!')
      return;
    }

    const formData = new FormData()
    if (avatar) {
      formData.append("avatar", avatar)
    }
    formData.append("username", username)
    formData.append("email", email);
    formData.append("bio", bio.toString())
    formData.append("gender", gender)
    formData.append("socialLinks", socialLinks)
    if (lat) formData.append("lat", lat.toString());
    if (lng) formData.append("lng", lng.toString());
    formData.append("country", country);
    formData.append("city", city);
    formData.append("address", address.toString());
    formData.append("postCode", postCode.toString());

    try {
      const response = await fetch('https://jiran-api.com/api/v1/auth/edit-profile', {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if(!response.ok){
        console.error("❌ Error updating profile");
        return
      }

      const data = await response.json()
      console.log("Profile updated ✅", data);

      const newUserData = await fetch('https://jiran-api.com/api/v1/auth/show', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(!newUserData.ok){
        console.error("❌ Error fetching user info");
        return;
      }

      const userData  = await newUserData.json()
      console.log("Updated user info:", userData.data);
      console.log(userData.bio)
      setBio(userData.bio);
      setGender(userData.gender);
      setSocialLinks(userData.socialLinks);
      if (userData.avatar) setAvatar(userData.avatar);
    }
    
    catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='container my-11'>
      <section className='flex items-start justify-between gap-3'>

        <div className='w-1/2 flex flex-col items-start justify-center gap-7'>

          <div className='bg-white shadow rounded-lg w-full p-3'>
            <div className='flex flex-col justify-center items-start gap-2'>
              <h6 className='text-red-600 flex-row-center'>
                <ExclamationCircleIcon className='w-7 h-7'/>
                Personal Information
              </h6>
            {/* Avatar preview */}
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-28">
                <Image
                  src={avatar || "/images/default-avatar.svg"}
                  alt={username}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold">{username}</h4>
                <span className="text-sm text-gray-900">{email}</span>
              </div>
            </div>
            {/* Upload Button */}
            <label htmlFor="avatar-upload" className="mt-2 cursor-pointer text-[var(--primaryColor)] hover:underline text-sm" >
              Upload new photo
            </label>
            <input type="file" accept="image/*" id="avatar-upload" className="hidden" />
          </div>

            <form onSubmit={handleSubmit} action="" className='flex flex-col justify-center gap-3 my-4 px-3 w-full'>   

                <div className='flex items-center justify-between w-full'>
                  <label htmlFor="Bio" className='text-[var(--navy)]'>Bio</label>
                  <input type="text" value={bio} onChange={(event)=> setBio(event.target.value)} className='border-b px-3 py-2 border-gray-300 w-[85%]' placeholder='About yourself' />
                </div>

                <div className='flex items-center gap-x-11 w-full'>
                <label className='text-[var(--navy)]'>Gender</label>
                <div className='flex items-center gap-7'>
                  <div className='flex-row-center gap-1'>
                    <input 
                      type="radio" 
                      name="gender" 
                      value="male" 
                      checked={gender === "male"} 
                      onChange={(e) => setGender(e.target.value)} 
                    />
                    <span>Male</span>
                  </div>
                  <div className='flex-row-center gap-1'>
                    <input 
                      type="radio" 
                      name="gender" 
                      value="female" 
                      checked={gender === "female"} 
                      onChange={(e) => setGender(e.target.value)} 
                    />
                    <span>Female</span>
                  </div>
                </div>
              </div>


                <div className='flex items-center justify-between w-full'>
                <label htmlFor="SocialLinks" className='text-[var(--navy)]'>Social Links</label>
                <input 
                  type="text" 
                  value={socialLinks} 
                  onChange={(e) => setSocialLinks(e.target.value)} 
                  className='border-b px-3 py-2 border-gray-300 w-[85%]' 
                  placeholder='https://...' 
                />
              </div>

              <div className='w-full flex-row-center gap-2 p-3'>
                <button type='submit' className='flex-row-center py-2.5 border border-[var(--primaryColor)] bg-[var(--primaryColor)] hover:bg-blue-600 text-white w-1/2 rounded transition-colors duration-75'>Done</button>
                <button className='flex-row-center py-2.5 border border-red-600 text-red-600 w-1/2 rounded hover:bg-red-600 hover:text-white transition-colors duration-75'>Discard</button>
              </div>

            </form>
          </div>
        </div>

        <div className='w-1/2 bg-white flex flex-col items-start shadow rounded-lg p-4'>

          <h6 className='text-red-600 flex-row-center'>
            <MapPinIcon className='w-7 h-7'/>
            Your Location
          </h6>

          <form className='flex py-2 w-full'>
            <div className='flex flex-col justify-center gap-7 w-full'>
              
              <div className='flex items-center justify-between gap-2 w-full'>
                <div className='w-1/2'>
                  <label className='text-[var(--navy)]'>Latitude</label>
                  <input type="text" value={lat ?? ""} 
                  onChange={(e) => setLat(Number(e.target.value))}
                  className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='-' />
                </div>
                <div className='w-1/2'>
                  <label className='text-[var(--navy)]'>Longitude</label>
                  <input type="text" value={lng ?? ""} 
                  onChange={(e) => setLng(Number(e.target.value))}
                  className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='-' />
                </div>
              </div>

              <div className='border border-gray-300 shadow flex-row-center w-full p-2 rounded h-[400px]'>
                {lat !== undefined && lng !== undefined ? (
                  <MapContainer
                    center={[lat, lng]}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    <Marker position={[lat, lng]} icon={customSvgIcon}>
                      <Popup>
                       your location: {lat}, {lng}
                      </Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                <p>Loading location...</p>
                )}
              </div>
            </div>
          </form>

          <div className='w-full'>

          <div>
            <h6 className='text-red-600 flex items-center pt-4'>
              <MapIcon className='w-7 h-7'/>
              Your Address
            </h6>

            <form className='flex py-2'>
              <div className='flex flex-col justify-center gap-3 w-full'>
                
                <div className='flex items-center justify-between gap-2 w-full'>
                  <div className='w-1/2'>
                    <label className='text-[var(--navy)]'>Country</label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='Your Country' />
                  </div>
                  <div className='w-1/2'>
                    <label className='text-[var(--navy)]'>City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='Your City' />
                  </div>
                </div>

                <div>
                  <label className='text-[var(--navy)]'>Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='Your Address' />
                </div>

                <div>
                  <label className='text-[var(--navy)]'>Post Code</label>
                  <input type="text" value={postCode} onChange={(e) => setPostCode(e.target.value)} className='border rounded px-3 py-2 border-gray-300 w-full' placeholder='Your Post Code' />
                </div>

                <div>
                  <label className='text-[var(--navy)]'>Upload your documents (PDF or Image)</label>
                  <input type="file" className='border rounded px-3 py-2 border-gray-300 w-full mt-1' />
                </div>

                <button type='submit' className='border border-[var(--primaryColor)] text-[var(--primaryColor)] rounded py-2 hover:bg-[var(--primaryColor)] hover:text-white'>Save Address</button>

              </div>
            </form>
          </div>

          </div>
        </div>

      </section>
    </main>
  )
}
