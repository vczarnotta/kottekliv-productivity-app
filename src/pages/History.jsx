import { useEffect, useState } from 'react';
import { mockWorkSessions } from "./history/mockWorkSessions.jsx";
import HistoryList from "./history/HistoryList";

function History() {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("workSessions");

    return saved
      ? JSON.parse(saved)
      : mockWorkSessions;
  });

  useEffect(() => {
    localStorage.setItem(
      "workSessions",
      JSON.stringify(sessions)
    );
  }, [sessions]);

  function handleEdit(id, updateData) {
    setSessions((prev) => 
      prev.map((session) =>
      session.id ===id
        ? { ...session, ...updateData }
        : session
      )
    );
  }

  function handleDelete(id) {
    setSessions((prev) =>
      prev.filter((session) => session.id !== id)
    );
  }

  return (
    <div>
      <h1>Historik</h1>

      <HistoryList
        sessions={sessions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default History