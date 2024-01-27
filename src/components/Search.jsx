import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    setLoading(true);
    setError(false); // Reset error state

    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      let userFound = false;

      querySnapshot.forEach((doc) => {
        console.log("Response: ", doc.data());
        if (doc.data()) {
          console.log("test", doc.data());
          setUser(doc.data());
          userFound = true;
          return;
        }
      });

      setLoading(false);

      if (!userFound) {
        setUser(null);
        setError(true);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        {loading ? (
          <AiOutlineLoading3Quarters
            style={{ color: "white", cursor: "pointer" }}
            onClick={handleSearch}
          />
        ) : (
          <FaSearch
            style={{ color: "white", cursor: "pointer" }}
            onClick={handleSearch}
          />
        )}
      </div>
      {error && (
        <span style={{ color: "red", padding: "10px 55px" }}>
          User not found!
        </span>
      )}
      {user && (
        <div className="userConversation" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
