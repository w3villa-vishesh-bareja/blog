import React from 'react';

const BlogCard = ({
  title,
  description,
  likesCount,
  userHasLiked,
  onLike,
  onComment,
  onDelete,
  username,
  isOwner,
}) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-200 p-6 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">Posted by:</span>
          <span className="font-medium text-gray-800">{username}</span>
        </div>
        {isOwner && (
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">
          {description.length > 120 ? `${description.slice(0, 120)}...` : description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        <span className="text-gray-700 text-sm font-medium">
          ❤️ {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </span>

        <div className="flex gap-2">
          <button
            onClick={onLike}
            className={`px-4 py-2 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 ${
              userHasLiked
                ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
            }`}
          >
            {userHasLiked ? "Dislike" : "Like"}
          </button>

          <button
            onClick={onComment}
            className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;