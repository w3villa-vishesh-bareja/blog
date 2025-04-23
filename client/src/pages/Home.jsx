import React, { useEffect, useState } from "react";
import BlogCard from "../components/blogCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentBox, setCommentBox] = useState({ open: false, blogId: null });
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userRes = await fetch("http://localhost:5000/api/v1/users/getuser", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      const userInfo = userData?.data?.[0]?.[0];
      if (!userInfo?.id) throw new Error("Invalid user data");

      setUser(userInfo);

      const blogsRes = await fetch("http://localhost:5000/api/v1/blogs/getallblogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userInfo.id }),
      });
      const blogsData = await blogsRes.json();
      setBlogs(blogsData?.data?.[0] || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleComment = async (blogId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/v1/blogs/getcomments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blogId }),
      });
      const commentsData = await res.json();

      const structuredComments = commentsData?.data?.[0]?.reduce((acc, comment) => {
        if (!comment.reply_of) {
          acc.push({ ...comment, replies: [] });
        } else {
          const parent = acc.find((c) => c.id === comment.reply_of);
          if (parent) {
            parent.replies.push(comment);
          }
        }
        return acc;
      }, []);

      setComments(structuredComments || []);
      setCommentBox({ open: true, blogId });
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const postComment = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/v1/blogs/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          blogId: commentBox.blogId,
          userId: user.id,
          comment: newComment,
          reply_of: replyTo,
        }),
      });
      const result = await res.json();
      if (result.status === 201) {
        handleComment(commentBox.blogId);
        setNewComment("");
        setReplyTo(null);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleCreate = () => {
    navigate("/create",{
        state:{
            user:user
        }
    });
  }
  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
  
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/v1/blogs/delete/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });
  
      if (response.ok) {
        // Refresh the blogs list after successful deletion
        fetchData();
      } else {
        const data = await response.json();
        console.error("Error deleting blog:", data.message);
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };
  const handleLike = async (blogId, userId) => {
    const token = localStorage.getItem("token");
    try {
      await fetch("http://localhost:5000/api/v1/blogs/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blogId, userId }),
      });
      fetchData();
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  const closeCommentBox = () => {
    setCommentBox({ open: false, blogId: null });
    setComments([]);
    setNewComment("");
    setReplyTo(null);
  };

  const renderComments = (comment, level = 0) => (
    <div key={comment.id} className={`ml-${level * 4} mt-3`}>
      <div className="border-l-2 border-gray-200 pl-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">{comment.user_name}</span>

        </div>
        <p className="text-gray-600">{comment.description}</p>
        <button
          onClick={() => setReplyTo(comment.id)}
          className="text-sm text-blue-500 hover:underline"
        >
          Reply
        </button>

        {comment.replies?.map((reply) => renderComments(reply, level + 1))}
      </div>
    </div>
  );

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <nav className="bg-white border-b border-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BlogIt
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Welcome back, <span className="font-semibold text-indigo-700">{user?.name || "Guest"}</span>
            </span>
            
            <button
              onClick={handleCreate}
              className="inline-flex items-center px-4 py-2 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Blog
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.description}
              likesCount={blog.like_count}
              userHasLiked={blog.liked_by_current_user}
              username={blog.user_name}
              isOwner={blog.user_id === user.id} 
              onLike={() => handleLike(blog.id, user.id)}
              onComment={() => handleComment(blog.id)}
              onDelete={() => handleDelete(blog.unique_id)} 

            />
          ))}
        </div>
      )}
    </main>

    {commentBox.open && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 space-y-4 overflow-y-auto max-h-[90vh] animate-slideUp">
          <div className="flex justify-between items-center border-b border-indigo-100 pb-3">
            <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
            <button
              onClick={closeCommentBox}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto px-2">
            {comments.map((comment) => renderComments(comment))}
          </div>

          <div className="pt-4 border-t border-indigo-100">
            <textarea
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 resize-none"
              placeholder={replyTo ? "Reply to comment..." : "Add a comment..."}
            />
            <div className="flex justify-end mt-3 space-x-3">
              <button
                onClick={postComment}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Post Comment
              </button>
              <button
                onClick={() => setReplyTo(null)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Home;
