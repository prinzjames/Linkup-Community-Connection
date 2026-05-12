export default function PostCard({ post, onLike }) {
  return (
    <div className="post">
      <div className="post-header">
        <b>{post.user.username}</b>
      </div>

      <p>{post.text}</p>

      {post.image && (
        <img src={post.image} alt="" className="post-img" />
      )}

      <button onClick={() => onLike(post._id)}>
        ❤️ {post.likes.length}
      </button>
    </div>
  );
}