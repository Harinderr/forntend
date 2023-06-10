import axios from "axios"
import Register from "./components/Register"
import UserContextProvider from "./userContext";
import Route from "./components/Route";
function App() {
   axios.defaults.baseURL = 'https://real-ruby-barnacle-hem.cyclic.app'
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
