import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../consts";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import journalEntries from "../../data/journalEntries.json";
// import { plusIcon } from '../../../public/plus.svg';

import AddEntry from "../../components/AddEntry/AddEntry";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
const profileUrl = `${baseURL}/profile`;

function ProfilePage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [addEntry, setAddEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const points = 22;
  const levels = [
    "Level 1 : Novice Navigator",
    "Level 2 : Aspiring Apprentice",
    "Level 3 : Virtue Voyager",
    "Level 4 : Resilience Rookie",
    "Level 5 : Tranquility Traveler",
    "Level 6 : Wisdom Warrior",
    "Level 7 : Equanimity Explorer",
    "Level 8 : Fortitude Philosopher",
    "Level 9 : Sage Seeker",
    "Level 10 : Stoic Sage",
  ];
  const [level, setLevel] = useState(null);

  const fetchData = async () => {
    try {
      // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
      const token = sessionStorage.token;
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
    if (!sessionStorage.token) {
      navigate("/signup");
    } else {
      fetchData();
      setEntries(journalEntries);
      if (0 < points && points < 5) {
        setLevel(levels[0]);
      } else if (4 < points && points < 10) {
        setLevel(levels[1]);
      } else if (9 < points && points < 15) {
        setLevel(levels[2]);
      } else if (14 < points && points < 20) {
        setLevel(levels[3]);
      } else if (19 < points && points < 25) {
        setLevel(levels[4]);
      } else if (24 < points && points < 30) {
        setLevel(levels[5]);
      } else if (29 < points && points < 35) {
        setLevel(levels[6]);
      } else if (34 < points && points < 40) {
        setLevel(levels[7]);
      } else if (39 < points && points < 45) {
        setLevel(levels[8]);
      } else if (44 < points) {
        setLevel(levels[9]);
      }
    }
  }, []);

  //////////all the journal related functions
  const openEntryHandler = (entry) => {
    setSelectedEntry(entry);
    setAddEntry(false);
  };

  const addEntryHandler = () => {
    setSelectedEntry(null);
    setAddEntry(true);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="profile">
      <section className="profile__sidebar">
        <div className="profile__journal">
          <h3>Journal</h3>
          <button className="profile__add-button" onClick={addEntryHandler}>
            {/* <plusIcon /> */}
            Add
          </button>
          <div>
            <h4>All entries</h4>
            <ul>
              {entries.map((entry) => (
                <li key={entry.id}>
                  {/* <p>{entry.date}</p> */}
                  <button
                    className="profile__entry-button"
                    onClick={() => openEntryHandler(entry)}
                  >
                    {entry.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="profile__journal-output">
        {!addEntry && !selectedEntry && (
          <ProfileInfo userInfo={userInfo} level={level} />
        )}
        {addEntry && <AddEntry />}
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
