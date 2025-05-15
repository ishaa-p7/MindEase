"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Calendar,
  Clock,
  Trash2,
  ChevronDown,
  ChevronUp,
  Smile,
  Frown,
  Angry,
  AlertCircle,
  Star,
  Coffee,
} from "lucide-react"
import { useUser } from '../context/UserContext'; 

const MoodTracker = () => {
  // State for the mood form
  const [selectedMood, setSelectedMood] = useState("")
  const [note, setNote] = useState("")
  const [showMoodSelector, setShowMoodSelector] = useState(false)

  // State for mood data
  const [moodEntries, setMoodEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [submitting, setSubmitting] = useState(false)

   const { userId } = useUser();

  // Hardcoded userId for demo purposes - in a real app, this would come from authentication
  // Replace with actual user ID from your auth system

  // Fetch mood data from API
  useEffect(() => {
    if (!userId) return;
    const fetchMoodData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`http://localhost:3000/api/moods/${userId}`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()
        // Access the data array from the response structure
        setMoodEntries(result.data || [])
      } catch (err) {
        console.error("Error fetching mood data:", err)
        setError("Failed to load your mood data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchMoodData()
  }, [userId])

  // Function to handle mood submission
  const handleSubmitMood = async (e) => {
    e.preventDefault()

    if (!selectedMood) {
      alert("Please select a mood")
      return
    }

    setSubmitting(true)

    try {
      // Create current date in ISO format
      const currentDate = new Date().toISOString()

      const response = await fetch("http://localhost:3000/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId, // Match the API's expected field
          mood: selectedMood,
          date: currentDate, // Include date as expected by the API
          note: note,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()
      const newMoodEntry = result.data // Access the data field from the response

      // Add the new entry to the state
      setMoodEntries([newMoodEntry, ...moodEntries])

      // Reset form
      setSelectedMood("")
      setNote("")
      setShowMoodSelector(false)
    } catch (err) {
      console.error("Error submitting mood:", err)
      alert("Failed to save your mood. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Function to handle delete UI (API not implemented yet)
 const handleDeleteEntry = async (id) => {
  if (!window.confirm("Are you sure you want to delete this mood entry?")) return;

  try {
    const response = await fetch(`http://localhost:3000/api/moods/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the mood entry");
    }

    // Update UI by filtering out the deleted entry
    setMoodEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== id));
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete the mood entry. Please try again.");
  }
};


  // Function to get mood icon
  const getMoodIcon = (mood, size = 24) => {
    switch (mood) {
      case "happy":
        return <Smile size={size} className="text-green-500" />
      case "sad":
        return <Frown size={size} className="text-blue-500" />
      case "angry":
        return <Angry size={size} className="text-red-500" />
      case "anxious":
        return <AlertCircle size={size} className="text-yellow-500" />
      case "excited":
        return <Star size={size} className="text-purple-500" />
      case "neutral":
        return <Coffee size={size} className="text-gray-500" />
      default:
        return null
    }
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  // Function to format time
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Prepare data for line chart
  const prepareLineChartData = () => {
    if (!moodEntries.length) return []

    // Create a copy and sort by date
    const sortedEntries = [...moodEntries].sort((a, b) => new Date(a.date) - new Date(b.date))

    // Map mood to numeric value for the chart
    const moodValues = {
      happy: 5,
      excited: 4,
      neutral: 3,
      anxious: 2,
      sad: 1,
      angry: 0,
    }

    return sortedEntries.map((entry) => ({
      date: formatDate(entry.date),
      value: moodValues[entry.mood],
      mood: entry.mood,
    }))
  }

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const moodNames = {
        0: "angry",
        1: "sad",
        2: "anxious",
        3: "neutral",
        4: "excited",
        5: "happy",
      }

      const value = payload[0].value
      const mood = moodNames[value]

      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-sm">{`${label}: ${mood}`}</p>
          <div className="flex items-center mt-1">{getMoodIcon(mood, 16)}</div>
        </div>
      )
    }

    return null
  }

  // Filter entries based on active tab
  const getFilteredEntries = () => {
    if (!moodEntries.length) return []

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    weekAgo.setHours(0, 0, 0, 0)

    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    monthAgo.setHours(0, 0, 0, 0)

    switch (activeTab) {
      case "today":
        return moodEntries.filter((entry) => {
          const entryDate = new Date(entry.date)
          return entryDate >= today
        })
      case "week":
        return moodEntries.filter((entry) => {
          const entryDate = new Date(entry.date)
          return entryDate >= weekAgo
        })
      case "month":
        return moodEntries.filter((entry) => {
          const entryDate = new Date(entry.date)
          return entryDate >= monthAgo
        })
      case "all":
      default:
        return moodEntries
    }
  }

  const filteredEntries = getFilteredEntries()
  const lineChartData = prepareLineChartData()

  // Mood options
  const moodOptions = [
    { value: "happy", label: "Happy", icon: <Smile className="text-green-500" /> },
    { value: "sad", label: "Sad", icon: <Frown className="text-blue-500" /> },
    { value: "angry", label: "Angry", icon: <Angry className="text-red-500" /> },
    { value: "anxious", label: "Anxious", icon: <AlertCircle className="text-yellow-500" /> },
    { value: "excited", label: "Excited", icon: <Star className="text-purple-500" /> },
    { value: "neutral", label: "Neutral", icon: <Coffee className="text-gray-500" /> },
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-[#FFF5F1] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mood Tracker</h1>

      {/* Mood Input Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">How are you feeling today?</h2>

        <form onSubmit={handleSubmitMood}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">Select your mood</label>
            <div
              className="border border-gray-300 rounded-lg p-3 flex justify-between items-center cursor-pointer"
              onClick={() => setShowMoodSelector(!showMoodSelector)}
            >
              <div className="flex items-center">
                {selectedMood ? (
                  <>
                    {getMoodIcon(selectedMood)}
                    <span className="ml-2 capitalize">{selectedMood}</span>
                  </>
                ) : (
                  <span className="text-gray-500">Select a mood</span>
                )}
              </div>
              {showMoodSelector ? <ChevronUp /> : <ChevronDown />}
            </div>

            {showMoodSelector && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                {moodOptions.map((option) => (
                  <div
                    key={option.value}
                    className="p-3 hover:bg-[#FFE6E2] flex items-center cursor-pointer"
                    onClick={() => {
                      setSelectedMood(option.value)
                      setShowMoodSelector(false)
                    }}
                  >
                    {option.icon}
                    <span className="ml-2 capitalize">{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Add a note (optional)</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF8E7E]"
              rows="3"
              placeholder="How are you feeling? What's on your mind?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`${
              submitting ? "bg-gray-400" : "bg-[#FF8E7E] hover:bg-[#FF7A68]"
            } text-white px-6 py-2 rounded-lg transition-colors flex items-center`}
          >
            {submitting ? (
              <>
                <span className="mr-2">Saving...</span>
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
              </>
            ) : (
              "Save Mood"
            )}
          </button>
        </form>
      </div>

      {/* Mood Analytics */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood Analytics</h2>

       {/* Time period tab - only 'all' shown */}
<div className="flex mb-6 border-b">
  <button
    className={`px-4 py-2 capitalize ${
      activeTab === "all"
        ? "border-b-2 border-[#FF8E7E] text-[#FF8E7E] font-medium"
        : "text-gray-600 hover:text-gray-800"
    }`}
    onClick={() => setActiveTab("all")}
  >
    all
  </button>
</div>


        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF8E7E]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No mood data available for this period.</p>
              </div>
            ) : (
              <div>
                {/* Line Chart */}
                <div className="bg-[#FFF5F1] p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">Mood Over Time</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="date" stroke="#6B7280" tick={{ fontSize: 12 }} />
                        <YAxis
                          stroke="#6B7280"
                          tick={{ fontSize: 12 }}
                          domain={[0, 5]}
                          ticks={[0, 1, 2, 3, 4, 5]}
                          tickFormatter={(value) => {
                            const moodLabels = {
                              0: "Angry",
                              1: "Sad",
                              2: "Anxious",
                              3: "Neutral",
                              4: "Excited",
                              5: "Happy",
                            }
                            return moodLabels[value]
                          }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#FF8E7E"
                          strokeWidth={2}
                          dot={{ stroke: "#FF8E7E", strokeWidth: 2, r: 4, fill: "white" }}
                          activeDot={{ r: 6, fill: "#FF8E7E" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood History</h2>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF8E7E]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {filteredEntries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No mood entries found for this period.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-[#FFE6E2]">{getMoodIcon(entry.mood)}</div>
                        <div className="ml-3">
                          <p className="font-medium capitalize text-gray-800">{entry.mood}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar size={14} className="mr-1" />
                            <span className="mr-3">{formatDate(entry.date)}</span>
                            <Clock size={14} className="mr-1" />
                            <span>{formatTime(entry.date)}</span>
                          </div>
                        </div>
                      </div>

                      <button onClick={() => handleDeleteEntry(entry._id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {entry.note && (
                      <div className="mt-3 pl-12">
                        <p className="text-gray-600">{entry.note}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MoodTracker
