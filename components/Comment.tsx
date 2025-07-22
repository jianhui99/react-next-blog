'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { StaticImageData } from "next/image";
import profile_icon from "../assets/profile_icon.png";

type Reply = {
  id: number;
  name: string;
  avatar: string | StaticImageData;
  content: string;
  timestamp: Date;
  likes: number;
};

type Comment = {
  id: number;
  name: string;
  avatar: string | StaticImageData;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Reply[];
};

// Skeleton Loading Component
const CommentSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-3/5"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  </div>
);

const ReplySkeleton = () => (
  <div className="animate-pulse flex gap-3 p-4 bg-gray-50 rounded-lg ml-12">
    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="space-y-1 mb-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-8"></div>
    </div>
  </div>
);

export default function Comment() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [likedReplies, setLikedReplies] = useState<Set<number>>(new Set());
  const [postingComment, setPostingComment] = useState(false);
  const [postingReply, setPostingReply] = useState(false);

  // 模拟从API获取评论数据
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockComments: Comment[] = [
        {
          id: 1,
          name: 'Alice Johnson',
          avatar: profile_icon,
          content: 'Great article! The insights about modern web development are really helpful. I\'ve been struggling with these concepts and this cleared up a lot of confusion.',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          likes: 12,
          replies: [
            {
              id: 101,
              name: 'Charlie Brown',
              avatar: profile_icon,
              content: 'I agree! This really helped me understand the concepts better.',
              timestamp: new Date(Date.now() - 1000 * 60 * 3),
              likes: 3,
            }
          ],
        },
        {
          id: 2,
          name: 'Bob Smith',
          avatar: profile_icon,
          content: 'Thanks for sharing this. We implemented something similar in our project and saw great results. Would love to see more content like this.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          likes: 8,
          replies: [],
        },
      ];
      
      setComments(mockComments);
      setLoading(false);
    };

    fetchComments();
  }, []);

  const handlePost = async () => {
    if (!newComment.trim()) return;

    setPostingComment(true);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newEntry: Comment = {
      id: Date.now(),
      name: 'You',
      avatar: profile_icon,
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    };

    setComments([newEntry, ...comments]);
    setNewComment('');
    setPostingComment(false);
  };

  const handleReply = async (commentId: number) => {
    if (!replyText.trim()) return;

    setPostingReply(true);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    const newReply: Reply = {
      id: Date.now(),
      name: 'You',
      avatar: profile_icon,
      content: replyText,
      timestamp: new Date(),
      likes: 0,
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment
    ));
    
    setReplyText('');
    setReplyingTo(null);
    setPostingReply(false);
  };

  const handleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    if (isReply && parentId) {
      const newLikedReplies = new Set(likedReplies);
      if (likedReplies.has(commentId)) {
        newLikedReplies.delete(commentId);
        setComments(comments.map(comment => 
          comment.id === parentId 
            ? {
                ...comment, 
                replies: comment.replies.map(reply => 
                  reply.id === commentId ? { ...reply, likes: reply.likes - 1 } : reply
                )
              }
            : comment
        ));
      } else {
        newLikedReplies.add(commentId);
        setComments(comments.map(comment => 
          comment.id === parentId 
            ? {
                ...comment, 
                replies: comment.replies.map(reply => 
                  reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
                )
              }
            : comment
        ));
      }
      setLikedReplies(newLikedReplies);
    } else {
      const newLikedComments = new Set(likedComments);
      if (likedComments.has(commentId)) {
        newLikedComments.delete(commentId);
        setComments(comments.map(comment => 
          comment.id === commentId ? { ...comment, likes: comment.likes - 1 } : comment
        ));
      } else {
        newLikedComments.add(commentId);
        setComments(comments.map(comment => 
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
        ));
      }
      setLikedComments(newLikedComments);
    }
  };

  return (
    <div className="mt-12 pt-8">
      {/* Header */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
          </div>
        ) : (
          `Comments (${comments.length})`
        )}
      </h3>

      {/* Comment Input */}
      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex-shrink-0">
            <Image
              src={profile_icon}
              alt="Your avatar"
              width={40}
              height={40}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              rows={4}
              placeholder="What are you thoughts?"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={postingComment}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handlePost}
                disabled={!newComment.trim() || postingComment}
                className="font-normal py-1.5 px-3 sm:py-2 sm:px-4 border border-solid border-black shadow-[-4px_4px_0px_#000000] transition-all duration-300 ease-in-out hover:shadow-[-3px_3px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[2px] active:shadow-none active:translate-x-0 active:translate-y-0 rounded-md bg-white text-black text-sm"
              >
                {postingComment ? 'Responding...' : 'Respond'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment List or Loading */}
      {loading ? (
        <div className="space-y-8">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <CommentSkeleton />
              {index === 0 && (
                <div className="mt-4">
                  <ReplySkeleton />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              {/* Main Comment */}
              <div className="flex gap-4">
                <div className="w-10 h-10 flex-shrink-0">
                  <Image
                    src={comment.avatar}
                    alt={`${comment.name} avatar`}
                    width={40}
                    height={40}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Comment Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      {comment.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(comment.timestamp)} ago
                    </span>
                  </div>

                  {/* Comment Content */}
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {comment.content}
                  </p>

                  {/* Comment Actions */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className={`flex items-center gap-1 hover:text-gray-700 transition-colors ${
                        likedComments.has(comment.id) ? 'text-red-600' : ''
                      }`}
                    >
                      <svg className="w-4 h-4" fill={likedComments.has(comment.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>

                    <button 
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="hover:text-gray-700 transition-colors"
                    >
                      Reply
                    </button>
                  </div>

                  {/* Reply Input */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 flex-shrink-0">
                          <Image
                            src={profile_icon}
                            alt="Your avatar"
                            width={32}
                            height={32}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                            rows={3}
                            placeholder={`Reply to ${comment.name}...`}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            disabled={postingReply}
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                              disabled={postingReply}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReply(comment.id)}
                              disabled={!replyText.trim() || postingReply}
                              className="font-normal py-1.5 px-3 sm:py-2 sm:px-4 border border-solid border-black shadow-[-4px_4px_0px_#000000] transition-all duration-300 ease-in-out hover:shadow-[-3px_3px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[2px] active:shadow-none active:translate-x-0 active:translate-y-0 rounded-md bg-white text-black text-sm"
                            >
                              {postingReply ? 'Posting...' : 'Reply'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-6 ml-12 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 flex-shrink-0">
                        <Image
                          src={reply.avatar}
                          alt={`${reply.name} avatar`}
                          width={32}
                          height={32}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900 text-sm">
                            {reply.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(reply.timestamp)} ago
                          </span>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          {reply.content}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <button 
                            onClick={() => handleLike(reply.id, true, comment.id)}
                            className={`flex items-center gap-1 hover:text-gray-700 transition-colors ${
                              likedReplies.has(reply.id) ? 'text-red-600' : ''
                            }`}
                          >
                            <svg className="w-3 h-3" fill={likedReplies.has(reply.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {reply.likes > 0 && <span>{reply.likes}</span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {!loading && comments.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
            Load more comments
          </button>
        </div>
      )}
    </div>
  );
}
