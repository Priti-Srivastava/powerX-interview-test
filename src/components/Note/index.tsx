import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, LoginStatus } from "../Login/authslice";
import { saveNote } from "./noteslice";

export function Note() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  if (auth.status !== LoginStatus.LOGGED_IN) return null;

  const {
    user: { id: userId, note },
  } = auth;

  const onSaveNote = (e: any) => {
    dispatch(saveNote({ userId, note: e.target.value }));
  };

  return (
    <div>
      <NoteField note={note} onSaveNote={onSaveNote} />
    </div>
  );
}

function NoteField({ note, onSaveNote }: { note: string; onSaveNote: any }) {
  return <textarea value={note} onChange={onSaveNote}></textarea>;
}
