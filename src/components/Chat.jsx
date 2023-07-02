import { useContext, useEffect, useRef, useState } from "react";
import './chat.css'
import { userContext } from "../userContext";
import axios from "axios";
import _ from "lodash";
import People from "./People";

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinepeople, setOnlinepeople] = useState({});
  const [offlinepeople, setOfflinepeople] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { id,user ,setUser, setId} = useContext(userContext);
  const [message, setMessage] = useState([]);
  const [allmessages, setAllmessages] = useState([]);
  const chatContainerRef = useRef(null);

  const inputboxRef = useRef(null);

  useEffect(() => {
    connecttoWs();
  }, []);

  function connecttoWs() {
    const ws = new WebSocket("wss://glimmer-excited-eocursor.glitch.me");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        connecttoWs();
      }, 100);
    });
  }

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [allmessages]);

  useEffect(() => {
    if (selectedUserId) {
      axios
        .get("/messages/" + selectedUserId)
        .then((result) => {
          setAllmessages(result.data);
          console.log(result.data)
        })
        .catch((err) => console.log("error occurred" + err));
    }
  }, [selectedUserId]);
  

  useEffect(()=> {
    axios.get('/people').then((result, err)=> {
      if(err){
        console.log(err)
      }
      else {
        const userdata = result.data
        const offline = {}
       const filterarray =  userdata.filter(({_id}) => _id !== id)
        .filter(({_id}) => !Object.keys(onlinepeople).includes(_id))
      filterarray.forEach(({_id, username})=> {
        offline[_id] = username
      })
   
      setOfflinepeople(offline)
     
      }
  } )}, [onlinepeople])
  
  function showOnlinePeople(val) {
    const people = {}
    val.map(({userid, username}) => {
      people[userid] = username
    });

   return  setOnlinepeople({...people})
  }
 
  function handleMessage(e) {
    const messageData = JSON.parse(e.data);
    if ("online" in messageData) {
     
      showOnlinePeople(messageData.online)
    } else if ("text" in messageData) {
      console.log(messageData)
      setAllmessages((prev) => {
  // Check if the message with the same identifier already exists
  const existingMessage = prev.find((msg) => msg.id === messageData._id);
  
  if (existingMessage) {
    // Message already exists, return the previous state without adding the duplicate message
    return prev;
  } else {
    // Message doesn't exist, add the new message to the state
    return [...prev, messageData];
  }
});
     
      }
    }
  
 
  function sendmessage(e,file = null) {
   if(e)
    {e.preventDefault()}

    ws.send(
      JSON.stringify({
        newMessage: {
          recipient: selectedUserId,
          text: message,
          file
        },
      })
    );

    // setAllmessages((prev) => [
    //   ...prev,
    //   { text: message, sender: id, recipient: selectedUserId, _id : Date.now()},
    // ]);
    setMessage("");
    if(file){
      axios
      .get("/messages/" + selectedUserId)
      .then((result) => {
        setAllmessages(()=> result.data);
      })
      .catch((err) => console.log("error occurred" + err));
    }
    else {
      setAllmessages((prev) => [
        ...prev,
        { text: message, sender: id, recipient: selectedUserId}
      ]);
    }
  }
 function sendFile(e){
     const reader = new FileReader()
     reader.readAsDataURL(e.target.files[0])
     reader.onload = () => {
      sendmessage(null, {
        info : e.target.files[0].name,
        data : reader.result
      })
     }
 }
  function logout(){
    axios.post('/logout').then(()=> {
      setId(null)
      setUser(null)
      setWs(null)
    }).catch(err => console.log('unable to logout', err))
    
  }
  const friends = Object.keys(onlinepeople).filter((p) => p !== id);

 
  return (
    <div className="chatbox flex h-screen overflow-x-hidden">
      <div className="left w-1/4 bg-indigo-200 relative">
        <div className="logo flex p-4">
        
          <span className="CmpLogo pl-2 font-bold text-xl text-indigo-500">
          <i class="fa-solid fa-comments"></i>   CHATZIZZ
          </span>
        </div>
      <People setSelectedUserId={setSelectedUserId} friends={friends} onlinepeople={onlinepeople} selectedUserId={selectedUserId} offlinepeople={offlinepeople}/>
      <div className="logout  flex justify-between absolute bottom-0 left-0 right-0 p-4">
  <div className="userName  flex  ">   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

       <span className="text-sm mx-2">{user}</span></div> 
        <button onClick={()=> logout()} className="text-sm px-3 py-1 text-slate-600 bg-blue-200 border border-slate-200">Logout</button>
      </div>
      </div>
      <div className="right w-3/4 bg-blue-100 relative">
        <div className="message-container h-5/6 mt-5 ">
          {" "}
          <div
            className="messages overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 h-full"
            ref={chatContainerRef}
          >
            {!selectedUserId ? (
              <div className="">No selected user</div>
            ) : (
              allmessages.map((val, index) => (
                <div
                  key={val._id}
                  className={`rounded p-4 flex ${
                    val.sender === id ? "justify-end" : "justify-start"
                  } `}
                >
                  {" "}
                  <div
                    className={
                      val.sender === id
                        ? "bg-white  rounded inline-block p-2 text-slate-500"
                        : "bg-slate-500  rounded inline-block p-2 text-white "
                    }
                    style={{ maxWidth: "70%" }}
                  >
                    {val.text}
                    {
                      val.file && (
                        <div key={val._id}>
                          <a target="_blank" href={axios.defaults.baseURL+ "/uploads/"+ val.file}>
                            {val.file}
                          </a>
                        </div>
                      )
                    }
                  </div>{" "}
                  <br />{" "}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="textmessage w-full  absolute bottom-4">
          <form
            ref={inputboxRef}
            action=""
            className="w-full flex items-center justify-center"
            onSubmit={sendmessage}
          >
            <input
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              type="text"
              placeholder="Enter text here"
              className="  p-2 w-4/6 rounded "
            />
            <label type='button' className="p-2 bg-blue-200 cursor-pointer text-black-300">
                <input type="file" className="hidden" onChange={sendFile} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
</svg>

            </label>
            <button
              type="submit"
              className=" p-2   bg-blue-600 text-white rounded  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>{" "}
          </form>
        </div>
      </div>
    </div>
  );
            }
