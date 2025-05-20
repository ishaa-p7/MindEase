"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Moon, Wind, CloudRain, Music } from "lucide-react"

const RelaxPage = () => {
  const [activeTab, setActiveTab] = useState("sounds")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState(null)
  const [currentMeditation, setCurrentMeditation] = useState(null)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState(null)
  const [breathingCount, setBreathingCount] = useState(0)
  const audioRef = useRef(null)
  const timerRef = useRef(null)
  const breathingRef = useRef(null)

  const relaxingSounds = [
    {
      id: 1,
      name: "Gentle Rain",
      icon: <CloudRain className="h-8 w-8 text-[#FF8E7E]" />,
      description: "Soft rainfall on leaves and rooftops",
      duration: "Continuous",
      bgColor: "bg-[#FFE6E2]",
    },
    {
      id: 2,
      name: "Ocean Waves",
      icon: <Wind className="h-8 w-8 text-[#FF8E7E]" />,
      description: "Waves gently crashing on the shore",
      duration: "Continuous",
      bgColor: "bg-[#FFF0EB]",
    },
    {
      id: 3,
      name: "Night Sounds",
      icon: <Moon className="h-8 w-8 text-[#FF8E7E]" />,
      description: "Crickets and gentle night ambience",
      duration: "Continuous",
      bgColor: "bg-[#FFE6E2]",
    },
    {
      id: 4,
      name: "Forest Birds",
      icon: <Music className="h-8 w-8 text-[#FF8E7E]" />,
      description: "Birds chirping in a peaceful forest",
      duration: "Continuous",
      bgColor: "bg-[#FFF0EB]",
    },
    {
      id: 5,
      name: "Campfire",
      icon: <Music className="h-8 w-8 text-[#FF8E7E]" />,
      description: "Crackling fire sounds",
      duration: "Continuous",
      bgColor: "bg-[#FFE6E2]",
    },
    {
      id: 6,
      name: "Gentle Piano",
      icon: <Music className="h-8 w-8 text-[#FF8E7E]" />,
      description: "Soft piano melodies for relaxation",
      duration: "Continuous",
      bgColor: "bg-[#FFF0EB]",
    },
  ]

  const breathingExercises = [
    {
      id: 1,
      name: "4-7-8 Breathing",
      description: "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds",
      benefits: "Reduces anxiety and helps with sleep",
      steps: [
        { action: "Inhale", duration: 4, instruction: "Breathe in slowly through your nose" },
        { action: "Hold", duration: 7, instruction: "Hold your breath" },
        { action: "Exhale", duration: 8, instruction: "Exhale completely through your mouth" },
      ],
      bgColor: "bg-[#FFE6E2]",
    },
    {
      id: 2,
      name: "Box Breathing",
      description: "Equal duration for inhale, hold, exhale, and hold again",
      benefits: "Improves concentration and performance under stress",
      steps: [
        { action: "Inhale", duration: 4, instruction: "Breathe in through your nose" },
        { action: "Hold", duration: 4, instruction: "Hold your breath" },
        { action: "Exhale", duration: 4, instruction: "Breathe out through your mouth" },
        { action: "Hold", duration: 4, instruction: "Hold before breathing in again" },
      ],
      bgColor: "bg-[#FFF0EB]",
    },
    {
      id: 3,
      name: "Deep Belly Breathing",
      description: "Slow, deep breaths focusing on expanding your diaphragm",
      benefits: "Activates relaxation response and reduces stress",
      steps: [
        { action: "Inhale", duration: 5, instruction: "Breathe deeply into your belly" },
        { action: "Exhale", duration: 5, instruction: "Slowly release all the air" },
      ],
      bgColor: "bg-[#FFE6E2]",
    },
  ]

  const guidedMeditations = [
    {
      id: 1,
      name: "Body Scan Meditation",
      description: "A gentle journey through your body to release tension",
      duration: "10 minutes",
      benefits: "Reduces physical tension and increases body awareness",
      image: "/placeholder.svg?height=120&width=200",
      bgColor: "bg-[#FFE6E2]",
    },
    {
      id: 2,
      name: "Loving-Kindness Meditation",
      description: "Cultivate feelings of compassion for yourself and others",
      duration: "15 minutes",
      benefits: "Increases positive emotions and feelings of connection",
      image: "/placeholder.svg?height=120&width=200",
      bgColor: "bg-[#FFF0EB]",
    },
    {
      id: 3,
      name: "Mindful Awareness",
      description: "Focus on the present moment with acceptance",
      duration: "12 minutes",
      benefits: "Improves focus and reduces rumination",
      image: "/placeholder.svg?height=120&width=200",
      bgColor: "bg-[#FFE6E2]",
    },
    {
      id: 4,
      name: "Sleep Meditation",
      description: "Gentle guidance to help you drift into restful sleep",
      duration: "20 minutes",
      benefits: "Improves sleep quality and helps with insomnia",
      image: "/placeholder.svg?height=120&width=200",
      bgColor: "bg-[#FFF0EB]",
    },
  ]

  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (breathingRef.current) {
        clearInterval(breathingRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerRef.current)
            setIsTimerRunning(false)
            if (audioRef.current) {
              audioRef.current.pause()
              setIsPlaying(false)
            }
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)
    } else if (!isTimerRunning && timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isTimerRunning, timer])

  const handlePlaySound = (sound) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    // In a real app, you would have actual audio files
    audioRef.current = new Audio("/placeholder.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = isMuted ? 0 : volume

    setCurrentSound(sound)
    setCurrentMeditation(null)
    setBreathingPhase(null)
    setIsPlaying(true)
    audioRef.current.play().catch((error) => {
      console.error("Error playing audio:", error)
    })
  }

  const handlePlayMeditation = (meditation) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    // In a real app, you would have actual audio files
    audioRef.current = new Audio("/placeholder.mp3")
    audioRef.current.loop = false
    audioRef.current.volume = isMuted ? 0 : volume

    setCurrentMeditation(meditation)
    setCurrentSound(null)
    setBreathingPhase(null)
    setIsPlaying(true)
    audioRef.current.play().catch((error) => {
      console.error("Error playing audio:", error)
    })
  }

  const startBreathingExercise = (exercise) => {
    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    // Clear any existing breathing interval
    if (breathingRef.current) {
      clearInterval(breathingRef.current)
    }

    setCurrentSound(null)
    setCurrentMeditation(null)
    setBreathingPhase(exercise.steps[0])
    setBreathingCount(exercise.steps[0].duration)

    let stepIndex = 0
    let count = exercise.steps[0].duration

    breathingRef.current = setInterval(() => {
      setBreathingCount((prevCount) => {
        if (prevCount <= 1) {
          // Move to next step
          stepIndex = (stepIndex + 1) % exercise.steps.length
          const nextStep = exercise.steps[stepIndex]
          setBreathingPhase(nextStep)
          count = nextStep.duration
          return nextStep.duration
        } else {
          count--
          return count
        }
      })
    }, 1000)
  }

  const stopBreathingExercise = () => {
    if (breathingRef.current) {
      clearInterval(breathingRef.current)
      breathingRef.current = null
    }
    setBreathingPhase(null)
    setBreathingCount(0)
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume
    }
  }

  const startTimer = (minutes) => {
    setTimer(minutes * 60)
    setIsTimerRunning(true)
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
    setTimer(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="min-h-screen bg-[#FFF5F1]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Relax & Unwind</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Take a moment for yourself with our collection of soothing sounds, guided meditations, and breathing
              exercises designed to help you find calm in your busy day.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("sounds")}
              className={`py-3 px-6 font-medium text-lg transition-colors ${
                activeTab === "sounds"
                  ? "text-[#FF8E7E] border-b-2 border-[#FF8E7E]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Calming Sounds
            </button>
            <button
              onClick={() => setActiveTab("breathing")}
              className={`py-3 px-6 font-medium text-lg transition-colors ${
                activeTab === "breathing"
                  ? "text-[#FF8E7E] border-b-2 border-[#FF8E7E]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Breathing Exercises
            </button>
          
          </div>

          {/* Content based on active tab */}
          <div className="mb-12">
            {activeTab === "sounds" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                  {relaxingSounds.map((sound) => (
                    <div
                      key={sound.id}
                      onClick={() => handlePlaySound(sound)}
                      className={`${sound.bgColor} rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                        currentSound?.id === sound.id && isPlaying
                          ? "border-2 border-[#FF8E7E] shadow-md"
                          : "border border-[#FFD6CF] hover:border-[#FF8E7E]"
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        {sound.icon}
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800">{sound.name}</h3>
                          <p className="text-sm text-gray-500">{sound.duration}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{sound.description}</p>
                    </div>
                  ))}
                </div>

                {currentSound && (
                  <div className="bg-white rounded-xl p-6 border border-[#FFD6CF] shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div className="flex items-center mb-4 md:mb-0">
                        {currentSound.icon}
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800 text-xl">{currentSound.name}</h3>
                          <p className="text-gray-600">{currentSound.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => startTimer(5)}
                          className={`px-4 py-2 rounded-full text-sm transition-colors ${
                            timer > 0 && isTimerRunning && timer <= 300
                              ? "bg-[#FF8E7E] text-white"
                              : "bg-[#FFE6E2] text-gray-700 hover:bg-[#FFD6CF]"
                          }`}
                        >
                          5 min
                        </button>
                        <button
                          onClick={() => startTimer(10)}
                          className={`px-4 py-2 rounded-full text-sm transition-colors ${
                            timer > 0 && isTimerRunning && timer > 300 && timer <= 600
                              ? "bg-[#FF8E7E] text-white"
                              : "bg-[#FFE6E2] text-gray-700 hover:bg-[#FFD6CF]"
                          }`}
                        >
                          10 min
                        </button>
                        <button
                          onClick={() => startTimer(30)}
                          className={`px-4 py-2 rounded-full text-sm transition-colors ${
                            timer > 0 && isTimerRunning && timer > 600
                              ? "bg-[#FF8E7E] text-white"
                              : "bg-[#FFE6E2] text-gray-700 hover:bg-[#FFD6CF]"
                          }`}
                        >
                          30 min
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div className="flex items-center space-x-6 mb-4 md:mb-0">
                        <button
                          onClick={togglePlayPause}
                          className="w-14 h-14 flex items-center justify-center bg-[#FF8E7E] rounded-full shadow-sm hover:bg-[#FF7A68] transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white ml-1" />
                          )}
                        </button>
                        <div className="flex items-center space-x-3">
                          <button onClick={toggleMute} className="text-gray-600 hover:text-gray-800">
                            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                      {timer > 0 && (
                        <div className="flex items-center bg-[#FFE6E2] px-4 py-2 rounded-full">
                          <span className="text-gray-700 font-medium mr-3">{formatTime(timer)}</span>
                          <button onClick={stopTimer} className="text-sm text-[#FF8E7E] hover:text-[#FF7A68]">
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "breathing" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {breathingExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className={`${exercise.bgColor} rounded-xl p-6 border border-[#FFD6CF] hover:border-[#FF8E7E] hover:shadow-sm transition-all`}
                    >
                      <h3 className="font-semibold text-gray-800 text-xl mb-2">{exercise.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
                      <p className="text-sm text-gray-700 mb-4">
                        <span className="font-medium">Benefits:</span> {exercise.benefits}
                      </p>
                      <button
                        onClick={() => startBreathingExercise(exercise)}
                        className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-5 py-2 rounded-lg text-sm transition-colors w-full"
                      >
                        Start Exercise
                      </button>
                    </div>
                  ))}
                </div>

                {breathingPhase && (
                  <div className="bg-white rounded-xl p-8 border border-[#FFD6CF] shadow-sm text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{breathingPhase.action}</h3>
                    <p className="text-gray-600 mb-6">{breathingPhase.instruction}</p>

                    <div className="relative w-32 h-32 mx-auto mb-8">
                      <div
                        className="absolute inset-0 rounded-full bg-[#FFE6E2] border-4 border-[#FF8E7E] flex items-center justify-center"
                        style={{
                          transform:
                            breathingPhase.action === "Inhale"
                              ? `scale(${1 + (1 - breathingCount / breathingPhase.duration) * 0.3})`
                              : breathingPhase.action === "Exhale"
                                ? `scale(${1.3 - (1 - breathingCount / breathingPhase.duration) * 0.3})`
                                : "scale(1.3)",
                          transition: "transform 1s linear",
                        }}
                      >
                        <span className="text-3xl font-bold text-[#FF8E7E]">{breathingCount}</span>
                      </div>
                    </div>

                    <button
                      onClick={stopBreathingExercise}
                      className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      End Exercise
                    </button>
                  </div>
                )}

                {!breathingPhase && (
                  <div className="bg-[#FFF0EB] rounded-xl p-6 border border-[#FFD6CF]">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits of Breathing Exercises</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-[#FF8E7E] mb-2">Reduces Stress & Anxiety</h4>
                        <p className="text-sm text-gray-600">
                          Deep breathing activates the parasympathetic nervous system, which helps calm the body's
                          stress response and lower anxiety levels.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-[#FF8E7E] mb-2">Improves Focus & Clarity</h4>
                        <p className="text-sm text-gray-600">
                          Breathing exercises increase oxygen flow to the brain, enhancing mental clarity, focus, and
                          decision-making abilities.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-[#FF8E7E] mb-2">Lowers Blood Pressure</h4>
                        <p className="text-sm text-gray-600">
                          Regular practice can help reduce blood pressure and improve cardiovascular health by relaxing
                          blood vessels.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-[#FF8E7E] mb-2">Improves Sleep Quality</h4>
                        <p className="text-sm text-gray-600">
                          Breathing exercises before bed can help calm the mind and prepare the body for restful, deeper
                          sleep.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            
          </div>

    
         
        </div>
      </div>
    </div>
  )
}

export default RelaxPage
