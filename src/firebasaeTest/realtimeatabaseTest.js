import React, { useState, useEffect } from "react";
import { realtimeDb } from "../services/firebaseConfig";
import { ref, set, onValue, push } from "firebase/database";



function RealtimeDatabaseTest() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // データベースにデータを書き込む
  const handleSendMessage = () => {
    console.log("handleSendMessage called");
    console.log("Input Value:", inputValue);  // 入力があるか確認
    if (inputValue.trim() === "") return;
  
    const messagesRef = ref(realtimeDb, "messages");
    const newMessageRef = push(messagesRef);
  
    set(newMessageRef, {
      content: inputValue,
      timestamp: new Date().toISOString()
    })
      .then(() => {
        console.log("Message sent successfully");
        setInputValue(""); // 入力欄をクリア
      })
      .catch((error) => {
        console.error("Error sending message: ", error.message); // エラーメッセージを確認
      });
  };
  

  // データベースからデータを取得
  useEffect(() => {
    const messagesRef = ref(realtimeDb, "messages");

    // データが変更されるたびに更新
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.entries(data).map(([id, message]) => ({
          id,
          ...message
        }));
        setMessages(loadedMessages);
      }
    });
  }, []);

  return (
    <div>
      <h1>Realtime Database Test</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="メッセージを入力"
      />
      <button onClick={handleSendMessage}>送信</button>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.content} - {new Date(message.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}


// function RealtimeDatabaseTest(){

//   const [inputv,setInputv]=useState('')
//   const [messages,setMessages]=useState([])

//   const eventHandle=(e)=>{
//     setInputv(e.target.value)   
//   }


//   const handleSendMessage=()=>{
//     const messageRef=ref(realtimeDb,'messages')
//     const newMessageRef=push(messageRef)

//     set(newMessageRef,{
//       content:inputv,
//     })
//     setInputv('')
//   }

//   useEffect(()=>{
//     const messageRef=ref(realtimeDb,'messages')

//     onValue(messageRef,(snap)=>{
//       const data=snap.val()
//       if (data){
//         const loadeMessages=Object.entries(data).map(([id,message])=>({
//           id,
//           ...message
//         }))
//         setMessages(loadeMessages)
//       }
//     })
//   },[])
//   return (
//     <div>
//       <input type="text" onChange={eventHandle}/>
//       <button onClick={handleSendMessage}>送信</button>
//       {messages.map((message)=>(
//         <li>{message.content} - {new Date(message.timestamp).toLocaleString()}</li>
//       ))}
//     </div>
//   )
// }

export default RealtimeDatabaseTest