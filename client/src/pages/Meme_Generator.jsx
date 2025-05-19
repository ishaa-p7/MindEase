"use client"

import { useState, useEffect, useRef } from "react"
import {
  ImageIcon,
  Upload,
  Download,
  Type,
  Loader2,
  RefreshCw,
  Trash2,
  ChevronDown,
  ChevronUp,
  Check,
  History,
  X,
} from "lucide-react"

const MemeGenerator = () => {
  // State for meme creation
  const [topText, setTopText] = useState("")
  const [bottomText, setTopText2] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [memeUrl, setMemeUrl] = useState("")
  const [fontSize, setFontSize] = useState(32)
  const [textColor, setTextColor] = useState("#ffffff")
  const [showTemplates, setShowTemplates] = useState(false)
  const [customImage, setCustomImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [memeHistory, setMemeHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  // Canvas for custom meme generation
  const canvasRef = useRef(null)

  // Popular meme templates
  const memeTemplates = [
    { id: "181913649", name: "Drake Hotline Bling", url: "https://i.imgflip.com/30b1gx.jpg" },
    { id: "87743020", name: "Two Buttons", url: "https://i.imgflip.com/1g8my4.jpg" },
    { id: "112126428", name: "Distracted Boyfriend", url: "https://i.imgflip.com/1ur9b0.jpg" },
    { id: "131087935", name: "Running Away Balloon", url: "https://i.imgflip.com/261o3j.jpg" },
    { id: "129242436", name: "Change My Mind", url: "https://i.imgflip.com/24y43o.jpg" },
    { id: "124822590", name: "Left Exit 12 Off Ramp", url: "https://i.imgflip.com/22bdq6.jpg" },
    { id: "217743513", name: "UNO Draw 25 Cards", url: "https://i.imgflip.com/3lmzyx.jpg" },
    { id: "222403160", name: "Bernie I Am Once Again Asking", url: "https://i.imgflip.com/3oevdk.jpg" },
    { id: "438680", name: "Batman Slapping Robin", url: "https://i.imgflip.com/9ehk.jpg" },
    { id: "4087833", name: "Waiting Skeleton", url: "https://i.imgflip.com/2fm6x.jpg" },
    { id: "93895088", name: "Expanding Brain", url: "https://i.imgflip.com/1jwhww.jpg" },
    { id: "80707627", name: "Sad Pablo Escobar", url: "https://i.imgflip.com/1c1uej.jpg" },
  ]

  // Load meme history from localStorage on component mount
  useEffect(() => {
    const savedMemes = localStorage.getItem("memeHistory")
    if (savedMemes) {
      try {
        setMemeHistory(JSON.parse(savedMemes))
      } catch (e) {
        console.error("Error loading saved memes:", e)
      }
    }
  }, [])

  // Save meme history to localStorage when it changes
  useEffect(() => {
    if (memeHistory.length > 0) {
      localStorage.setItem("memeHistory", JSON.stringify(memeHistory))
    }
  }, [memeHistory])

  // Handle template selection
  const selectTemplate = (template) => {
    setSelectedTemplate(template)
    setShowTemplates(false)
    setCustomImage(null)
    setMemeUrl("")
  }

  // Handle custom image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setCustomImage(reader.result)
        setSelectedTemplate(null)
        setMemeUrl("")
      }
      reader.readAsDataURL(file)
    }
  }

  // Generate meme using imgflip API
 const generateMeme = async () => {
  if (!selectedTemplate && !customImage) {
    setError("Please select a template or upload an image")
    return
  }

  setIsGenerating(true)
  setError(null)

  try {
    let response

    if (selectedTemplate) {
      // Call your own backend here
      response = await fetch("http://localhost:3000/api/meme/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_id: selectedTemplate.id,
          text0: topText,
          text1: bottomText,
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        setMemeUrl(data.url)

        const newMeme = {
          id: Date.now(),
          url: data.url,
          topText,
          bottomText,
          templateName: selectedTemplate.name,
          date: new Date().toISOString(),
        }

        setMemeHistory([newMeme, ...memeHistory.slice(0, 9)])
      } else {
        setError(data.error || "Meme generation failed")
      }
    } else if (customImage) {
      generateCustomMeme()
      return
    }
  } catch (error) {
    console.error("Error generating meme:", error)
    setError("Server error. Please try again.")
  } finally {
    setIsGenerating(false)
  }
}



  // Generate custom meme using canvas
  const generateCustomMeme = () => {
    setIsGenerating(true)
    setError(null)

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width
      canvas.height = img.height

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Configure text style
      ctx.fillStyle = textColor
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = fontSize / 16
      ctx.textAlign = "center"
      ctx.font = `bold ${fontSize}px Impact, sans-serif`

      // Draw top text
      if (topText) {
        ctx.textBaseline = "top"
        ctx.fillText(topText, canvas.width / 2, 20, canvas.width - 40)
        ctx.strokeText(topText, canvas.width / 2, 20, canvas.width - 40)
      }

      // Draw bottom text
      if (bottomText) {
        ctx.textBaseline = "bottom"
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20, canvas.width - 40)
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20, canvas.width - 40)
      }

      // Convert canvas to URL
      const url = canvas.toDataURL("image/png")
      setMemeUrl(url)

      // Add to history
      const newMeme = {
        id: Date.now(),
        url,
        topText,
        bottomText,
        templateName: "Custom Image",
        date: new Date().toISOString(),
      }
      setMemeHistory([newMeme, ...memeHistory.slice(0, 9)]) // Keep only 10 most recent

      setIsGenerating(false)
    }

    img.onerror = () => {
      setError("Failed to load image. Please try another image.")
      setIsGenerating(false)
    }

    img.src = customImage
  }

  // Download generated meme
  const downloadMeme = () => {
    if (!memeUrl) return

    const link = document.createElement("a")
    link.href = memeUrl
    link.download = `meme-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Reset form
  const resetForm = () => {
    setTopText("")
    setTopText2("")
    setSelectedTemplate(null)
    setCustomImage(null)
    setMemeUrl("")
    setError(null)
  }

  // Load meme from history
  const loadFromHistory = (meme) => {
    setTopText(meme.topText)
    setTopText2(meme.bottomText)
    setMemeUrl(meme.url)
    setShowHistory(false)

    // Find and set the template if it was a template meme
    if (meme.templateName !== "Custom Image") {
      const template = memeTemplates.find((t) => t.name === meme.templateName)
      if (template) {
        setSelectedTemplate(template)
        setCustomImage(null)
      }
    } else {
      setCustomImage(meme.url)
      setSelectedTemplate(null)
    }
  }

  // Delete meme from history
  const deleteFromHistory = (id) => {
    const updatedHistory = memeHistory.filter((meme) => meme.id !== id)
    setMemeHistory(updatedHistory)
    localStorage.setItem("memeHistory", JSON.stringify(updatedHistory))
  }

  // Format date for history display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#FFF5F1] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Meme Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meme Creator Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Create Your Meme</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Template Selection */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Choose a Template</label>
              <div className="flex flex-wrap gap-4">
                <div className="relative cursor-pointer" onClick={() => setShowTemplates(!showTemplates)}>
                  <div className="border border-gray-300 rounded-lg p-3 flex justify-between items-center min-w-[200px]">
                    <span className="text-gray-700">
                      {selectedTemplate ? selectedTemplate.name : "Select template"}
                    </span>
                    {showTemplates ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>

                  {showTemplates && (
                    <div className="absolute z-10 mt-1 w-[300px] max-h-[400px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {memeTemplates.map((template) => (
                          <div
                            key={template.id}
                            className={`p-2 hover:bg-[#FFE6E2] rounded-lg cursor-pointer ${
                              selectedTemplate?.id === template.id ? "bg-[#FFE6E2]" : ""
                            }`}
                            onClick={() => selectTemplate(template)}
                          >
                            <img
                              src={template.url || "/placeholder.svg"}
                              alt={template.name}
                              className="w-full h-24 object-cover rounded-lg mb-1"
                            />
                            <p className="text-xs text-center truncate">{template.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <span className="text-gray-500 mx-2">or</span>
                </div>

                <label className="cursor-pointer flex items-center justify-center border border-dashed border-gray-300 rounded-lg p-3 hover:border-[#FF8E7E] transition-colors">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  <Upload size={20} className="mr-2 text-gray-500" />
                  <span className="text-gray-700">Upload Image</span>
                </label>
              </div>

              {customImage && (
                <div className="mt-3 relative">
                  <img
                    src={customImage || "/placeholder.svg"}
                    alt="Custom template"
                    className="h-32 object-contain rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => setCustomImage(null)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm"
                  >
                    <X size={16} className="text-gray-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Text Inputs */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Add Text</label>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center mb-1">
                    <Type size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">Top Text</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter top text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8E7E]"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-1">
                    <Type size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">Bottom Text</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter bottom text"
                    value={bottomText}
                    onChange={(e) => setTopText2(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8E7E]"
                  />
                </div>
              </div>
            </div>

            {/* Text Styling (for custom images) */}
            {customImage && (
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Text Styling</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600 block mb-1">Font Size</span>
                    <input
                      type="range"
                      min="16"
                      max="64"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
                      className="w-full accent-[#FF8E7E]"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600 block mb-1">Text Color</span>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={generateMeme}
                disabled={isGenerating || (!selectedTemplate && !customImage)}
                className={`${
                  isGenerating || (!selectedTemplate && !customImage)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FF8E7E] hover:bg-[#FF7A68]"
                } text-white px-6 py-2 rounded-lg transition-colors flex items-center`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ImageIcon size={20} className="mr-2" />
                    Generate Meme
                  </>
                )}
              </button>

              <button
                onClick={resetForm}
                className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg transition-colors flex items-center"
              >
                <RefreshCw size={20} className="mr-2" />
                Reset
              </button>

             
            </div>
          </div>

          {/* Hidden canvas for custom meme generation */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        {/* Meme Preview Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">{memeUrl ? "Your Meme" : "Preview"}</h2>

          <div className="flex flex-col items-center justify-center min-h-[300px] border border-dashed border-gray-300 rounded-lg p-4">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p>Generating your meme...</p>
              </div>
            ) : memeUrl ? (
              <div className="flex flex-col items-center">
                <img
                  src={memeUrl || "/placeholder.svg"}
                  alt="Generated Meme"
                  className="max-w-full max-h-[400px] rounded-lg shadow-sm"
                />
                <button
                  onClick={downloadMeme}
                  className="mt-6 bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Download size={20} className="mr-2" />
                  Download Meme
                </button>
              </div>
            ) : selectedTemplate ? (
              <div className="flex flex-col items-center text-center">
                <img
                  src={selectedTemplate.url || "/placeholder.svg"}
                  alt={selectedTemplate.name}
                  className="max-w-full max-h-[300px] rounded-lg opacity-70"
                />
                <p className="mt-4 text-gray-500">Add text and click "Generate Meme" to create your masterpiece!</p>
              </div>
            ) : customImage ? (
              <div className="flex flex-col items-center text-center">
                <img
                  src={customImage || "/placeholder.svg"}
                  alt="Custom template"
                  className="max-w-full max-h-[300px] rounded-lg opacity-70"
                />
                <p className="mt-4 text-gray-500">Add text and click "Generate Meme" to create your masterpiece!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 text-center">
                <ImageIcon size={40} className="mb-4" />
                <p>Select a template or upload an image to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>

     
      
    </div>
  )
}

export default MemeGenerator
