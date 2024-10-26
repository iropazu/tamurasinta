import React,{useState} from 'react'
import { storage } from "../services/firebaseConfig";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'

function StorageTest(){

  const [file,setFile]=useState(null)
  const [url,setUrl]=useState('')

  const handleFileChange=(e)=>{
    setFile(e.target.files[0])
  }

  const handleUp=async()=>{
    const storageRef=ref(storage,'path')
    await uploadBytes(storageRef,file)
    const downloadURL=await getDownloadURL(storageRef)
    setUrl(downloadURL)
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange}/>
      <button onClick={handleUp}>up</button>
      <img src={url} />
    </div>
  )

}

export default StorageTest