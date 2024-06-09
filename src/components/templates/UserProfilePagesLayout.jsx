import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // new
import { getUserByUsername } from "../../api/userApi.js";

export default function UserProfilePagesLayout() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchUsername() {
      try {
        const user = await getUserByUsername(id);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUsername();
  }, [id]);

  return (
    <>
      {user ? (
        <div key={user.uuid}>
          <h1>{user.username}</h1>
        </div>
      ) : (
        <div>
          <h1>User not found</h1>
        </div>
      )}
    </>
  );
}
