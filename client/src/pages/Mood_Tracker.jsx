"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
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
  const [activeTab, setActiveTab] = useState("today")
  const { userId } = useUser();

  // Fetch mood data from the backend
  useEffect(() => {

      if (!userId) return;

    const fetchMoodData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/moods/${userId}`);
    const data = await response.json();

    // Check if data is an array
    if (Array.isArray(data)) {
      setMoodEntries(data);
    } else {
      console.error("Unexpected response shape:", data);
      setMoodEntries([]); // Fallback to empty array to avoid .filter crash
    }
  } catch (error) {
    console.error("Error fetching mood data:", error);
    setMoodEntries([]);
  } finally {
    setLoading(false);
  }
};


    fetchMoodData()
  }, [userId])

  // Function to handle mood submission
  const handleSubmitMood = async (e) => {
    e.preventDefault()
if (!userId) return alert("Login required");

    if (!selectedMood) {
      alert("Please select a mood")
      return
    }

    const newMoodEntry = {
      mood: selectedMood,
      note: note,
      userId: userId, 
    }

    try {
      // Send POST request to create a new mood entry
      const response = await fetch("http://localhost:3000/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMoodEntry),
      })

      const data = await response.json()
  
      // Add the new mood entry to the state
      setMoodEntries([data, ...moodEntries])

      // Reset form
      setSelectedMood("")
      setNote("")
      setShowMoodSelector(false)
    } catch (error) {
      console.error("Error posting new mood:", error)
    }
  }

  // Function to delete a mood entry
  const handleDeleteEntry = async (id) => {
    try {
      // Send DELETE request to remove the mood entry
      await fetch(`/api/moods/${id}`, { method: "DELETE" })

      // Remove the deleted entry from the state
      setMoodEntries(moodEntries.filter((entry) => entry._id !== id))
    } catch (error) {
      console.error("Error deleting mood entry:", error)
    }
  }

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
    // Create a copy and sort by date
    const sortedEntries = [...moodEntries].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

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
      date: formatDate(entry.createdAt),
      value: moodValues[entry.mood],
      mood: entry.mood,
    }))
  }

  // Prepare data for pie chart
  const preparePieChartData = () => {
    const moodCounts = {
      happy: 0,
      sad: 0,
      angry: 0,
      anxious: 0,
      excited: 0,
      neutral: 0,
    }

    moodEntries.forEach((entry) => {
      moodCounts[entry.mood]++
    })

    return Object.keys(moodCounts)
      .map((mood) => ({
        name: mood,
        value: moodCounts[mood],
      }))
      .filter((item) => item.value > 0)
  }

  // Colors for pie chart
  const COLORS = ["#4CAF50", "#2196F3", "#F44336", "#FFC107", "#9C27B0", "#9E9E9E"]

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
          const entryDate = new Date(entry.createdAt)
          return entryDate >= today
        })
      case "week":
        return moodEntries.filter((entry) => {
          const entryDate = new Date(entry.createdAt)
          return entryDate >= weekAgo
        })
      case "month":
        return moodEntries.filter((entry) => {
          const entryDate = new Date(entry.createdAt)
          return entryDate >= monthAgo
        })
      case "all":
      default:
        return moodEntries
    }
  }

  const filteredEntries = getFilteredEntries()
  const lineChartData = prepareLineChartData()
  const pieChartData = preparePieChartData()

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
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Optional"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#FF7A68] text-white rounded-lg font-semibold"
          >
            Save Mood
          </button>
        </form>
      </div>

      {/* Mood Stats and Graphs */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Mood Pie Chart */}
          <div className="bg-white p-6 mb-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mood Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="40%"
                  outerRadius="70%"
                  paddingAngle={5}
                  isAnimationActive={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Mood Line Chart */}
          <div className="bg-white p-6 mb-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mood Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FF7A68"
                  activeDot={{ r: 8 }}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Mood Entries List */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Mood History</h2>

            {filteredEntries.map((entry) => (
              <div
                key={entry._id}
                className="flex justify-between items-center py-3 border-b border-gray-200"
              >
                <div className="flex items-center">
                  {getMoodIcon(entry.mood, 30)}
                  <div className="ml-4">
                    <p className="text-lg font-semibold">{entry.mood}</p>
                    <p className="text-gray-500 text-sm">{formatDate(entry.createdAt)}</p>
                    <p className="text-gray-700 text-sm">{entry.note}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteEntry(entry._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MoodTracker
