"use client"

import { useState, useEffect } from "react"
import { Search, Phone, MapPin, AlertCircle, Users, ExternalLink, Loader2, Globe } from "lucide-react"

const HelpSupport = () => {
  const [city, setCity] = useState("")
  const [searchedCity, setSearchedCity] = useState("")
  const [psychiatrists, setPsychiatrists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("find-help")

  // Emergency hotlines
  const emergencyHotlines = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988 or 1-800-273-8255",
      description: "24/7, free and confidential support for people in distress",
      website: "https://suicidepreventionlifeline.org/",
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 text support with a trained crisis counselor",
      website: "https://www.crisistextline.org/",
    },
    {
      name: "SAMHSA's National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service (English and Spanish)",
      website: "https://www.samhsa.gov/find-help/national-helpline",
    },
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "24/7 support, crisis intervention, and referral service",
      website: "https://www.thehotline.org/",
    },
  ]

  // Community support options - expanded list
  const communitySupport = [
    {
      name: "Mental Health America",
      description: "Find support groups and resources in your area.",
      website: "https://www.mhanational.org/find-support-groups",
    },
    {
      name: "NAMI Connection",
      description: "Recovery support groups for adults living with mental health conditions.",
      website: "https://www.nami.org/Support-Education/Support-Groups",
    },
    {
      name: "7 Cups",
      description: "Online therapy and free support chat with trained listeners.",
      website: "https://www.7cups.com/",
    },
    {
      name: "Postpartum Support International",
      description: "Support for individuals experiencing postpartum mental health issues.",
      website: "https://www.postpartum.net/",
    },
    {
      name: "Depression and Bipolar Support Alliance",
      description: "Peer-based, wellness-oriented support groups for people with mood disorders.",
      website: "https://www.dbsalliance.org/support/",
    },
    {
      name: "Anxiety and Depression Association of America",
      description: "Find local in-person and virtual support groups for anxiety and depression.",
      website: "https://adaa.org/supportgroups",
    },
    {
      name: "Schizophrenia & Psychosis Action Alliance",
      description: "Support for individuals and families affected by schizophrenia and psychosis spectrum disorders.",
      website: "https://sczaction.org/find-support/",
    },
    {
      name: "International OCD Foundation",
      description: "Support groups for people with Obsessive-Compulsive Disorder and related disorders.",
      website: "https://iocdf.org/ocd-finding-help/supportgroups/",
    },
    {
      name: "American Foundation for Suicide Prevention",
      description: "Support groups for suicide loss survivors and those with lived experience.",
      website: "https://afsp.org/find-a-support-group",
    },
    {
      name: "Mental Health First Aid",
      description: "Training program that teaches skills to respond to signs of mental illness and substance use.",
      website: "https://www.mentalhealthfirstaid.org/",
    },
  ]

  // Handle city search
  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSearchedCity(city)

    try {
      // Call the backend API to get psychiatrists
      const response = await fetch(`http://localhost:3000/api/psychiatrists?city=${encodeURIComponent(city)}`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`No psychiatrists found in ${city}`)
        } else {
          throw new Error(`Error searching for psychiatrists: ${response.status}`)
        }
      }

      const data = await response.json()
      setPsychiatrists(data)
    } catch (err) {
      console.error("Error fetching psychiatrists:", err)
      setError(err.message || "Failed to find psychiatrists. Please try another city or contact our support team.")
    } finally {
      setLoading(false)
    }
  }

  // Try to get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Use reverse geocoding to get city name from coordinates
            const { latitude, longitude } = position.coords
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
            )

            if (!response.ok) throw new Error("Failed to get location")

            const data = await response.json()
            const detectedCity = data.address?.city || data.address?.town || data.address?.village

            if (detectedCity) {
              setCity(detectedCity)
              console.log("Detected city:", detectedCity)
            }
          } catch (error) {
            console.error("Error getting city from coordinates:", error)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  // Open map with psychiatrist location
  const openMap = (lat, lon) => {
    window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=15`, "_blank")
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#FFF5F1] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Help & Support</h1>

      {/* Tabs */}
      <div className="flex mb-8 border-b overflow-x-auto">
        <button
          className={`px-4 py-2 whitespace-nowrap ${
            activeTab === "find-help"
              ? "border-b-2 border-[#FF8E7E] text-[#FF8E7E] font-medium"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("find-help")}
        >
          Find a Psychiatrist
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${
            activeTab === "emergency"
              ? "border-b-2 border-[#FF8E7E] text-[#FF8E7E] font-medium"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("emergency")}
        >
          Emergency Resources
        </button>
        <button
          className={`px-4 py-2 whitespace-nowrap ${
            activeTab === "community"
              ? "border-b-2 border-[#FF8E7E] text-[#FF8E7E] font-medium"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("community")}
        >
          Community Support
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        {activeTab === "find-help" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Find a Psychiatrist Near You</h2>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                Enter your city to find psychiatrists and mental health professionals in your area.
              </p>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8E7E]"
                    placeholder="Enter your city (e.g., New York, Chicago)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </>
                  )}
                </button>
              </form>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                <p>{error}</p>
              </div>
            )}

            {searchedCity && !loading && !error && (
              <h3 className="text-xl font-medium mb-4">
                Psychiatrists in {searchedCity} ({psychiatrists.length})
              </h3>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 text-[#FF8E7E] animate-spin" />
                <span className="ml-3 text-gray-600">Searching for psychiatrists...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {psychiatrists.map((psychiatrist, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{psychiatrist.name}</h4>
                      </div>
                    </div>

                    <div className="mt-3 space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{psychiatrist.address}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        onClick={() => openMap(psychiatrist.lat, psychiatrist.lon)}
                        className="flex items-center text-[#FF8E7E] hover:text-[#FF7A68]"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        View on Map
                      </button>
                      
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchedCity && !loading && psychiatrists.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-gray-500">No psychiatrists found in {searchedCity}.</p>
                <p className="text-gray-500 mt-2">Try another city or contact our support team for assistance.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "emergency" && (
          <div>
            <div className="flex items-center mb-6">
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-2xl font-semibold">Emergency Resources</h2>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-medium">
                If you or someone you know is in immediate danger, please call 911 or go to your nearest emergency room.
              </p>
            </div>

            <p className="text-gray-600 mb-6">
              The following hotlines provide 24/7 support for various mental health crises:
            </p>

            <div className="space-y-6">
              {emergencyHotlines.map((hotline, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-1">{hotline.name}</h3>
                  <div className="flex items-center text-[#FF8E7E] font-medium mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    {hotline.phone}
                  </div>
                  <p className="text-gray-600 mb-3">{hotline.description}</p>
                  <a
                    href={hotline.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#FF8E7E] hover:underline"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "community" && (
          <div>
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 text-[#FF8E7E] mr-2" />
              <h2 className="text-2xl font-semibold">Community Support</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Connecting with others who share similar experiences can be a powerful part of your mental health journey.
              Here are some community resources that may help:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communitySupport.map((support, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-2">{support.name}</h3>
                  <p className="text-gray-600 mb-3">{support.description}</p>
                  <a
                    href={support.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#FF8E7E] hover:underline"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HelpSupport
