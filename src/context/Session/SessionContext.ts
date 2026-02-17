import { createContext } from "react"

export interface Session {
  id: string | number,
  sessionName: string,
  category: string,
  productivity: string,
  date: string,
  startTime: string,
  endTime: string,
  msDuration: number,
  activeTime?: string,
}

interface SessionContextValue {
  sessions: Session[],
  addSession: (session: Session) => void,
  deleteSession: (id: number) => void,
  editSession: (session: Session) => void,
}

const SessionContext = createContext<SessionContextValue | null>(null)

export default SessionContext
