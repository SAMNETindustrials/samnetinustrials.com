"use client"

import { useState, useEffect } from "react"
import { Heart, MessageCircle, Share2, Users, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  author: string
  authorRole: string
  content: string
  timestamp: string
  likes: number
  comments: number
  category: string
  avatar: string
}

export function CommunityHub({ userRole }: { userRole: string }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const savedPosts = localStorage.getItem("samnet_community_posts")
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    } else {
      const defaultPosts: Post[] = [
        {
          id: "1",
          author: "Admin",
          authorRole: "admin",
          content: "Welcome to SAMNET Community! Share your achievements, ideas, and support each other!",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          likes: 15,
          comments: 3,
          category: "announcement",
          avatar: "A",
        },
        {
          id: "2",
          author: "Team Lead",
          authorRole: "staff",
          content: "Great work on the new IoT project! The team did an amazing job.",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          likes: 12,
          comments: 5,
          category: "achievement",
          avatar: "T",
        },
      ]
      setPosts(defaultPosts)
    }
  }, [])

  const handleCreatePost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: `p${Date.now()}`,
      author: "You",
      authorRole: userRole,
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      category: "general",
      avatar: userRole.charAt(0).toUpperCase(),
    }

    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem("samnet_community_posts", JSON.stringify(updatedPosts))
    setNewPost("")
  }

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post))
    setPosts(updatedPosts)
    localStorage.setItem("samnet_community_posts", JSON.stringify(updatedPosts))
  }

  const filteredPosts = selectedCategory === "all" ? posts : posts.filter((p) => p.category === selectedCategory)

  const categories = [
    { id: "all", label: "All Posts", icon: Users },
    { id: "announcement", label: "Announcements", icon: TrendingUp },
    { id: "achievement", label: "Achievements", icon: Award },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-slate-900 rounded-lg p-6 border border-slate-700">
      {/* Main Feed */}
      <div className="lg:col-span-3 space-y-6">
        {/* Create Post */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {userRole.charAt(0).toUpperCase()}
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts, achievements, or ideas with the community..."
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleCreatePost}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Post
            </Button>
          </div>
        </div>

        {/* Posts */}
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold">{post.author}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">{post.authorRole}</span>
                </div>
                <p className="text-slate-400 text-sm">{new Date(post.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-slate-100 mb-4">{post.content}</p>
            <div className="flex items-center gap-6 text-slate-400 border-t border-slate-700 pt-4">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 hover:text-red-400 transition-colors group"
              >
                <Heart size={16} className="group-hover:fill-red-400" />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <MessageCircle size={16} />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Categories */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-bold mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white font-bold mb-4">Community Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Members</span>
              <span className="text-white font-bold">145</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Active Posts</span>
              <span className="text-white font-bold">{posts.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Engagement</span>
              <span className="text-white font-bold">{posts.reduce((a, p) => a + p.likes + p.comments, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
