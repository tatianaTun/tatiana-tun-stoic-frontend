import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../consts";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import journalEntries from "../../data/journalEntries.json";

import AddEntry from "../../components/AddEntry/AddEntry";

function ProfilePage() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [addEntry, setAddEntry] = useState(false);
  const navigate = useNavigate();
  const profileUrl = `${baseURL}/profile`;

  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const fetchData = async () => {
    try {
      // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
      const token = sessionStorage.token;
      console.log(token);
      const response = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setUserInfo(response.data);
      // Remember to include the token in Authorization header
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setEntries(journalEntries);
  }, []);

  //////////all the journal related functions
  const openEntryHandler = (entry) => {
    setSelectedEntry(entry);
    setAddEntry(false);
  };

  const addEntryHandler = () => {
    setSelectedEntry(null);
    setAddEntry(true)
  };


  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="profile">
      <section className="profile__sidebar">
        <div className="profile__user-info">
          <h3>Welcome, {userInfo.name}</h3>
          <p>Level: ___</p>
          <p>Accomplishments: ___</p>
          <button
            onClick={() => {
              sessionStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
        <div className="profile__journal">
          <h3>Journal</h3>
          <button onClick={addEntryHandler}>add</button>
          <div>
            <h4>All entries</h4>
            <ul>
              {entries.map((entry) => (
                <li key={entry.id}>
                  <p>{entry.date}</p>
                  <button  className="profile__entry-button" onClick={() => openEntryHandler(entry)}>
                    {entry.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="profile__journal-output">
      {addEntry && (<AddEntry />)}
        {selectedEntry && (
          <div>
            <h3>{selectedEntry.title}</h3>
            <p>{selectedEntry.date}</p>
            <p>{selectedEntry.content}</p>
            {/* Display other entry details as needed */}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
