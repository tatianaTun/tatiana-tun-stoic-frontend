import { useState, useEffect } from "react";
// import axios from "axios";
// import { baseURL } from "../../consts";
import "./AddEntry.scss";
import journalEntries from "../../data/journalEntries.json";

function AddEntry() {
  const [entries, setEntries] = useState([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");

  // Helper function to format the current date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  };
  const [newEntryDate, setNewEntryDate] = useState(formatDate(new Date()));

  function handleNewEntrySubmit(e) {
    e.preventDefault();

    const newEntry = {
      id: Date.now(),
      title: newEntryTitle,
      content: newEntryContent,
      date: newEntryDate,
    };

    setEntries([...entries, newEntry]); // Assuming you have a state 'entries' that holds the journal entries

    // Clear form fields
    setNewEntryTitle("");
    setNewEntryContent("");
    setNewEntryDate("");
  }

  useEffect(() => {
    setEntries(journalEntries);
  }, [entries]);

  return (
    <section className="profile__journal-output">
      {/* Optionally include a button or mechanism to toggle the display of this form */}
      <form onSubmit={handleNewEntrySubmit}>
        <input
         className="profile__title"
          type="text"
          placeholder="Untitled"
          value={newEntryTitle}
          onChange={(e) => setNewEntryTitle(e.target.value)}
        />

        <input
                 className="profile__date"
          type="date"
          value={newEntryDate}
          //   onChange={(e) => setNewEntryDate(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={newEntryContent}
          onChange={(e) => setNewEntryContent(e.target.value)}
        />
                <button type="submit">Add Entry</button>
      </form>
      {/* The rest of the content that usually appears in this section */}
    </section>
  );
}

export default AddEntry;
