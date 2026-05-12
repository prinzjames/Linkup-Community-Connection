import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Stories from "../components/Stories";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    await API.post("/posts", { text });
    setText("");
    fetchPosts();
  };

  const likePost = async (id) => {
    await API.put(`/posts/like/${id}`);
    fetchPosts();
  };

  return (
    <div>
      <Navbar />
      <Stories />

      <div className="feed">

        <div className="create-post">
          <input
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={createPost}>Post</button>
        </div>

        {posts.map((post) => (
          <PostCard key={post._id} post={post} onLike={likePost} />
        ))}
      </div>
    </div>
  );
}