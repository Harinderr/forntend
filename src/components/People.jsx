import Userimg from "./Userimg"
export default function People({friends, onlinepeople,selectedUserId,offlinepeople,setSelectedUserId}){

    return (
        <div className="flex-grow">

        {friends.map((userid) => (
            <div
              key={userid}
              className={`p-3 flex items-center ${
                selectedUserId === userid
                  ? "bg-indigo-100 border-l-4 border-blue-500"
                  : ""
              }`}
              onClick={() => setSelectedUserId(userid)}
            >
              <Userimg value={onlinepeople[userid]} id={userid} status={"online"} />
              <div className="pl-4"> {onlinepeople[userid]}</div>
            </div>
          ))}
        {
            Object.keys(offlinepeople).map((userid)=> {
               
             return(  <div
                key={userid}
                className={`p-3 flex items-center ${
                  selectedUserId === userid
                    ? "bg-indigo-100 border-l-4 border-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedUserId(userid)}
              >
                
                <Userimg value={offlinepeople[userid]} id={userid} status={"offline"}/>
                <div className="pl-4"> {offlinepeople[userid]}</div>
              </div>) 
            })
        }
          </div>
    )

}