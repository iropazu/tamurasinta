import React from "react";
import { auth, db } from '../firebase/firebase';
import { collection,doc,setDoc  } from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";

export const signUp=async(email,password)=>{

  try{
    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
    const uid=userCredential.user.uid

    await setDoc(doc(collection(db, 'users'), uid), {
      email: email,
      timeData: new Date()
    });
  } catch (error) {
      throw error;
  }
}

export const addData=async(data)=>{
  try{
    const uid=auth.currentUser?.uid
    await setDoc(doc(collection(db,'users'),uid),{
      ...data,
    })
  }  catch (error){
    throw new Error(error)
  }
}

export const login=async(email,passwprd)=>{
  try {
    await signInWithEmailAndPassword(auth,email,passwprd)
  } catch (error){
    if (error.code === "auth/wrong-password") {
      console.log("パスワードが間違ってるよ！")
      throw new Error(error);
    } else if (error.code === "auth/user-not-found") {
      console.log("指定されたメールアドレスのユーザーが見つからなかったよ！")
      throw new Error(error);
    } else if (error.code === "auth/invalid-email") {
      console.log("メールアドレスの形式が無効だよ！")
      throw new Error(error);
    } else {
      console.log("ログインに失敗しました。もう一度試してよ！")
      throw new Error(error);
    }
  }
}

export const logout =async()=>{
  try {
    await signOut(auth)
  } catch (error){
    throw new Error("ログアウトエラー： ", error);
  }
}