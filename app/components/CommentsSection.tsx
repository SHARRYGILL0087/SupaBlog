import React from 'react'


type Comment = {
  id?: number;
  content: string;
  post_id: number;
  user_id: number;
  created_at?: string;
  user_name: string;
};

interface CommentsSectionProps {
  comments: Comment[];
  isComments: boolean;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleComment: () => {};
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, isComments, comment, setComment, handleComment }) => {

  return (
    <div className={`space-y-3 mt-6 border-2 rounded-xl px-2 py-3 ${isComments ? "visible" : "hidden"}`}>
      <div className='my-3 px-2 py-3 bg-gray-200 min-h-[120px] rounded-2xl'>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add comment...' className='border-0 focus:border-0 focus:outline-0 bg-gray-200 placeholder:text-xl text-xl  placeholder:font-medium w-full ' />
        <button onClick={handleComment} className='cursor-pointer bg-blue-500 px-1.5 py-1 text-white font-semibold rounded-xl float-right'>Submit</button>
      </div>
      <h2 className='text-2xl font-semibold '>Comments </h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first!</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="p-2 border rounded-2xl bg-white">
            <p className="text-sm">
              <span className="font-semibold">{c.user_name || "Anonymous"}</span>
              <span className="text-gray-500 text-xs ml-2">
                {c.created_at ? new Date(c.created_at).toLocaleString() : ""}
              </span>
            </p>
            <p className="mt-1">{c.content}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default CommentsSection
