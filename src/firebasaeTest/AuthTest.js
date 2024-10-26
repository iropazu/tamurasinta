import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../services/firebaseConfig";


const AuthTest = () => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } 
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('ログイン成功', result.user);
  };

  const handleSignOut = async () => {
      await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>ログインユーザー: {user.displayName}</p>
          <button onClick={handleSignOut}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしていません</p>
          <button onClick={handleSignIn}>ログイン</button>
        </div>
      )}
    </div>
  );
};

export default AuthTest;