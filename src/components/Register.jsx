import { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../userContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logStatus, setLogStatus] = useState("register");
  const { setUser, setid } = useContext(userContext);

  async function registerfn(e) {
    e.preventDefault();
   
    const route = logStatus === 'register' ? 'register' : 'login'
    if(route === 'register'){
    const { data } = await axios.post('/register', { username:username, password:password },{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setUser(username);
    setid(data.id);}
    else {
      const { data } = await axios.post('/login', { username:username, password:password },{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setUser(username);
      setid(data.id);
    }
   
  }
  return (
    <div className="box flex justify-center items-center w-2/5  mx-auto   h-screen bg-slate-50">
      <form
      method="post"
        onSubmit={registerfn}
        action=""
        className="w-5/6 h-4/6 flex flex-col justify-around border border-grey-200 py-[80px] px-8 rounded bg-slate-100 "
      >
        <p className="text-xl font-bold text-center text-indigo-800">
        {logStatus === "register" ? "Sign Up" : "Log In"}</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Username"
          className="block rounded  p-2  w-full border border-black"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          className="block rounded  p-2 w-full  border border-black"
        />
        <button type="submit" className="w-full p-2 bg-indigo-500 rounded text-white">
          {" "}
          {logStatus === 'olduser' ? 'Log In' : 'register'}
        </button>
        <span className="text-center">
          <p>Already have an account?</p>
          <a
            href="#"
            className="text-indigo-400"
            onClick={() => logStatus === 'register' ? setLogStatus('olduser'): setLogStatus('register')}
          >
            {" "}
            {logStatus === "register" ? "Log In" : "register"}
          </a>
        </span>
      </form>
    </div>
  );
}
