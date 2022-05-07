import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Note } from "../../models";

export enum NoteStatus {
  NOTE_SAVED,
  NOTE_SAVING,
  NOTE_IDLE,
  NOTE_ERROR,
}

export type NoteState =
  | {
      note: Note;
      status: NoteStatus.NOTE_SAVED;
    }
  | {
      status: NoteStatus.NOTE_SAVING | NoteStatus.NOTE_IDLE;
    }
  | {
      status: NoteStatus.NOTE_ERROR;
      error: string;
    };

const initialState = {
  status: NoteStatus.NOTE_IDLE,
} as NoteState;

export const saveNote = createAsyncThunk(
  "saveNote",
  async ({ userId, note }: { userId: string; note: string }) => {
    const response = await fetch(
      `https://60b793ec17d1dc0017b8a6bc.mockapi.io/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          note,
        }),
      }
    );
    return await response.json();
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveNote.fulfilled, (state, action: PayloadAction<Note>) => {
        return {
          status: NoteStatus.NOTE_SAVED,
          note: action.payload,
        };
      })
      .addCase(saveNote.rejected, (state, action) => {
        return {
          status: NoteStatus.NOTE_ERROR,
          error: "Unable to save Note",
        };
      })
      .addCase(saveNote.pending, (state, action) => {
        return {
          status: NoteStatus.NOTE_SAVING,
        };
      });
  },
});

export const selectNote = (state: RootState) => state.note;

export default noteSlice.reducer;
