import { addDoc, collection, } from "firebase/firestore"
import { auth, db, storage } from "../firebase/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"


export const addImage=async(imagefile)=>{
  try{
    const storageRef=ref(storage,`bookImage/${Date.now()}_${imagefile.name}`)

    await uploadBytes(storageRef,imagefile)
    const imageUrl=await getDownloadURL(storageRef)
    console.log(imageUrl)
    return imageUrl
  }catch(error){
    console.log('addImageのエラー:',error)
  }

}

export const bookUpload=async(imagefile,bookInfo)=>{
  const Url=await addImage(imagefile)
  const user=auth.currentUser
  try{
    await addDoc(collection(db,'books'),{
      ...bookInfo,
      bookImageUrl:Url,
      userId:user.uid,
      state:false,
      timeData:new Date()
    })
  }catch(error){
    console.log('bookUploadのエラー:',error)
  }
  
}