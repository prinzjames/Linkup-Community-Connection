import Navbar from "../components/Navbar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar />

      <div className="profile">
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}