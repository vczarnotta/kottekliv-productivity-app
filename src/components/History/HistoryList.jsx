import { useState } from 'react';

function HistoryList({ sessions, onEdit, onDelete}) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  function startEdit(session) {
    setEditingId(session.id);
    setDraft({ ...session });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(null);
  }

  function saveEdit() {
    onEdit(draft.id, draft);
    cancelEdit();
  }

  return (
    <div>
      {sessions.map((session) => {

        const isEditing = session.id === editingId;

        return (
          <div
            key={session.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: 10,
              padding: 10,
            }}
          >
            {!isEditing ? (
              <>
                <p>
                  <strong>{session.title}</strong>
                </p>

                <p>
                  {session.date} {session.startTime}-{session.endTime}
                </p>

                <p>
                  {session.sessionType} | Energi: {session.energyLevel}/5
                </p>

                <button onClick={() => startEdit(session)}>
                  Redigera
                </button>

                <button onClick={() => onDelete(session.id)}>
                  Ta bort
                </button>
              </>
            ) : (
              <>
                <input
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      title: e.target.value,
                    })
                  }
                  />

                  <select
                    value={draft.sessionType}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        sessionType: e.target.value,
                      })
                    }
                  >
                    <option>Deep Work</option>
                    <option>Möte</option>
                    <option>Paus</option>
                  </select>

                  <select
                    value={draft.energyLevel}
                    onChange={(e) => 
                      setDraft({
                        ...draft,
                        energyLevel: Number(e.target.value),
                      })
                    }
                  >
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>

                  <button onClick={saveEdit}>Spara</button>
                  <button onClick={cancelEdit}>Avbryt</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default HistoryList