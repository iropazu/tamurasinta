import React, { useEffect, useState} from "react";
import { db } from "../services/firebaseConfig";
import { collection, addDoc, getDocs, } from "firebase/firestore";

function FirestoreTest(){

  const [data,setData]=useState([])
  const [handle,setHandle]=useState('')

  const addTest =async (e)=>{
    e.preventDefault()
    const docRef=await addDoc(collection(db,'Users'),{
      name:handle,
    })
    fetchTest()
    setHandle('')
  }

  const fetchTest = async (e)=>{
    const querySnap=await getDocs(collection(db,'Users'))
    const queryData=querySnap.docs.map((doc)=>({...doc.data(),id:doc.id}))
    setData(queryData)
  }

  const eventHandle=(e)=>{
    setHandle(e.target.value)
  }

  useEffect(()=>{
    fetchTest()
  },[])

  return(
    <div>
      <form onSubmit={addTest}>
        <input type="text" onChange={eventHandle} placeholder="heloow" value={handle}/>
      </form>
      <ul>
        {data.map((data)=>(
          <div>
            <li>{data.name}</li>
          </div>
        ))}
      </ul>
    </div>
  )
}
export default FirestoreTest