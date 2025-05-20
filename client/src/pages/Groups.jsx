"use client"

import { useState, useEffect } from "react"
import { Users, Calendar, Search, MapPin, Filter, ExternalLink } from "lucide-react"
import { redditSubreddits, fetchSubredditData, formatRedditData } from "../utils/redditGroups"

const GroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedFormat, setSelectedFormat] = useState("all")
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Create categories from the redditSubreddits mapping
  const categories = [
    { id: "all", name: "All Categories" },
    ...Object.entries(redditSubreddits).map(([id, name]) => ({ id, name })),
  ]

  const formats = [
    { id: "all", name: "All Formats" },
    { id: "in-person", name: "In-Person" },
    { id: "online", name: "Online" },
    { id: "hybrid", name: "Hybrid" },
  ]

  // Fetch groups data from Reddit
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true)
        setError(null)

        const groupsData = []

        // Fetch data for each subreddit
        for (const [category, subreddit] of Object.entries(redditSubreddits)) {
          try {
            const subredditData = await fetchSubredditData(subreddit)

            // Randomly assign some groups as hybrid for variety
            const format = Math.random() > 0.7 ? "hybrid" : "online"

            const formattedData = formatRedditData(subredditData, category, format)
            groupsData.push(formattedData)
          } catch (subredditError) {
            console.error(`Error fetching data for ${subreddit}:`, subredditError)
            // Continue with other subreddits even if one fails
          }
        }

        if (groupsData.length === 0) {
          throw new Error("Could not fetch any group data")
        }

        setGroups(groupsData)
      } catch (err) {
        console.error("Error fetching groups:", err)
        setError("Failed to load groups. Please try again later.")

        // Fallback to mock data if API fails
        setGroups(getMockGroups())
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  // Fallback mock data in case the API fails
  const getMockGroups = () => {
    return [
      {
        id: 1,
        name: "Anxiety Support Circle",
        description: "A supportive community for those dealing with anxiety and panic disorders.",
        category: "anxiety",
        format: "hybrid",
        location: "Online + Local Meetups",
        members: 128000,
        nextMeeting: "Tomorrow at 7:00 PM",
        image: "/placeholder.svg?height=150&width=300",
        url: "https://www.reddit.com/r/Anxiety",
      },
      {
        id: 2,
        name: "Depression Support",
        description: "Share experiences and coping strategies for managing depression.",
        category: "depression",
        format: "online",
        location: "Online (Reddit)",
        members: 95000,
        nextMeeting: "Wednesday at 6:30 PM",
        image: "/placeholder.svg?height=150&width=300",
        url: "https://www.reddit.com/r/depression",
      },
      {
        id: 3,
        name: "Grief & Healing",
        description: "A safe space for those navigating the journey of grief and loss.",
        category: "grief",
        format: "online",
        location: "Online (Reddit)",
        members: 42000,
        nextMeeting: "Saturday at 10:00 AM",
        image: "/placeholder.svg?height=150&width=300",
        url: "https://www.reddit.com/r/GriefSupport",
      },
      {
        id: 4,
        name: "Stress Management",
        description: "Learn and practice techniques for stress reduction.",
        category: "stress",
        format: "hybrid",
        location: "Online + Local Meetups",
        members: 56000,
        nextMeeting: "Monday at 8:00 PM",
        image: "/placeholder.svg?height=150&width=300",
        url: "https://www.reddit.com/r/stress",
      },
      {
        id: 5,
        name: "Recovery Support",
        description: "Support group for those in recovery from substance use disorders.",
        category: "addiction",
        format: "online",
        location: "Online (Reddit)",
        members: 73000,
        nextMeeting: "Friday at 7:00 PM",
        image: "/placeholder.svg?height=150&width=300",
        url: "https://www.reddit.com/r/StopDrinking",
      },
    ]
  }

  const filteredGroups = groups.filter((group) => {
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory
    const matchesFormat = selectedFormat === "all" || group.format === selectedFormat
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesFormat && matchesSearch
  })

  const formatMemberCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count
  }

  const handleJoinGroup = (group) => {
    // Open the Reddit URL in a new tab
    window.open(group.url, "_blank", "noopener,noreferrer")
  }

  const handleCreateGroup = () => {
    // In a real app, this would navigate to a group creation form
    window.open("https://www.reddit.com/subreddits/create", "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Support Groups</h1>
        <p className="text-gray-600 mb-8">
          Connect with others facing similar challenges in a safe, supportive environment. Our groups provide a space to
          share experiences, learn coping strategies, and build a community of support.
        </p>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search groups..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8E7E]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8E7E] bg-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8E7E] bg-white"
              >
                {formats.map((format) => (
                  <option key={format.id} value={format.id}>
                    {format.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Groups List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF8E7E]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              className="mt-4 bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-4 py-2 rounded-lg"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <img
                  src={group.image && group.image !== "" ? group.image : "/placeholder.svg?height=150&width=300"}
                  alt={group.name}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg?height=150&width=300"
                  }}
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                    <span className="bg-[#FFE6E2] text-[#FF8E7E] text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {categories.find((c) => c.id === group.category)?.name || group.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{formatMemberCount(group.members)} members</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Next meeting: {group.nextMeeting}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{formats.find((f) => f.id === group.format)?.name}</span>
                    <button
                      className="flex items-center text-[#FF8E7E] hover:text-[#FF7A68] font-medium"
                      onClick={() => handleJoinGroup(group)}
                    >
                      Join Group
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center mb-12">
            <div className="flex justify-center mb-4">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No groups found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedFormat("all")
              }}
              className="text-[#FF8E7E] hover:text-[#FF7A68] font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Start Your Own Group */}
        <div className="bg-[#FFF0EB] rounded-xl p-8 border border-[#FFE6E2]">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Start Your Own Support Group</h2>
              <p className="text-gray-700 mb-6">
                Don't see a group that fits your needs? Create your own subreddit and connect with others who share
                similar experiences. Reddit provides the tools and resources to help you build a supportive community.
              </p>
              <button
                className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-6 py-3 rounded-lg transition-colors font-medium"
                onClick={handleCreateGroup}
              >
                Create a Subreddit
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img src="/placeholder.svg?height=200&width=200" alt="Create a group" className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Group Guidelines */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Community Guidelines</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What to Expect</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#FF8E7E] mr-2">•</span>
                    <span>A safe, non-judgmental space to share experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF8E7E] mr-2">•</span>
                    <span>Moderated discussions by community volunteers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF8E7E] mr-2">•</span>
                    <span>Practical coping strategies and resources</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF8E7E] mr-2">•</span>
                    <span>Connection with others who understand your journey</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Group Rules</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#FF8E7E] mr-2">•</span>
                    <span>Respect confidentiality and privacy of other members</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF8E7E] mr-2">•</span>
                    <span>Be respectful and supportive in all interactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF8E7E] mr-2">•</span>
                    <span>Avoid giving unsolicited advice</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF8E7E] mr-2">•</span>
                    <span>Follow each community's specific guidelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupsPage
