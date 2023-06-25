import axios from "axios"

import UserContextProvider from "./userContext";
import Route from "./components/Route";
function App() {
   axios.defaults.baseURL = 'http://localhost:3000/'
   axios.defaults.withCredentials = true;
   return (
   <div className="main">
   <UserContextProvider>
          <Route/>
      </UserContextProvider> 
   </div>
  
   )
}

export default App
