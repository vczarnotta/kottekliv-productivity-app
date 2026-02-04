import { useContext } from "react";
import SessionContext from "../context/Session/SessionContext"

//Return error message if not in Provider
function useSessions() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSessions must be used within a SessionProvider");
  return context;
}

export default useSessions