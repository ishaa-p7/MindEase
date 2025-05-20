// Reddit subreddits mapping for mental health categories
export const redditSubreddits = {
  anxiety: "Anxiety",
  depression: "depression",
  grief: "GriefSupport",
  stress: "stress",
  addiction: "StopDrinking",
}

// Function to fetch subreddit data
export const fetchSubredditData = async (subreddit) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error(`Error fetching data for r/${subreddit}:`, error)
    throw error
  }
}

// Format Reddit data for our UI
export const formatRedditData = (redditData, category, format = "online") => {
  // Generate a random future date for the next meeting
  const getRandomMeetingDate = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const randomDay = days[Math.floor(Math.random() * days.length)]
    const randomHour = Math.floor(Math.random() * 12) + 1
    const randomMinute = Math.floor(Math.random() * 4) * 15 // 0, 15, 30, or 45
    const amPm = Math.random() > 0.5 ? "AM" : "PM"
    return `${randomDay} at ${randomHour}:${randomMinute === 0 ? "00" : randomMinute} ${amPm}`
  }

  return {
    id: redditData.id,
    name: redditData.title || redditData.display_name,
    description: redditData.public_description || "A Reddit community for support and discussion.",
    category,
    format,
    location: "Online (Reddit)",
    members: redditData.subscribers || 0,
    nextMeeting: getRandomMeetingDate(),
    image: redditData.banner_img || redditData.header_img || "/placeholder.svg?height=150&width=300",
    url: `https://www.reddit.com/r/${redditData.display_name}`,
  }
}
