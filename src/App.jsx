import axios from "axios"

import UserContextProvider from "./userContext";
import Route from "./components/Route";
function App() {
   axios.defaults.baseURL = 'https://exuberant-elk-spacesuit.cyclic.app'
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
