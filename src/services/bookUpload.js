import { addDoc, collection } from 'firebase/firestore'
import { auth, db, storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const addImage = async (imageFileList) => {
  try {
    const imageArray = Array.from(imageFileList)
    const imagePromises = imageArray.map(async (image, _) => {
      const storageRef = ref(storage, `bookImage/${Date.now()}_${image.name}`)

      await uploadBytes(storageRef, image)
      const imageUrl = await getDownloadURL(storageRef)
      return imageUrl
    })

    const images = await Promise.all(imagePromises)
    return images
  } catch (error) {
    console.log('addImageのエラー:', error)
  }
}

export const bookUpload = async (imagefileList, bookInfo) => {
  const Url = await addImage(imagefileList)
  const user = auth.currentUser
  try {
    await addDoc(collection(db, 'books'), {
      ...bookInfo,
      bookImageUrl: Url,
      userId: user.uid,
      timeData: new Date(),
    })
  } catch (error) {
    console.log('bookUploadのエラー:', error)
  }
}
