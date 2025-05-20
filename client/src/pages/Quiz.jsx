"use client"

import { useState, useEffect } from "react"
import { ChevronRight, CheckCircle, AlertCircle, ArrowLeft, Brain, Loader2 } from "lucide-react"

const Quiz = () => {
  // States for quiz flow
  const [quizzes, setQuizzes] = useState([])
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [activeQuizId, setActiveQuizId] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [quizResult, setQuizResult] = useState(null)

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [quizLoading, setQuizLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all quizzes on component mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3000/api/quiz")

        if (!response.ok) {
          throw new Error(`Failed to fetch quizzes: ${response.status}`)
        }

        const data = await response.json()
        setQuizzes(data)
      } catch (err) {
        console.error("Error fetching quizzes:", err)
        setError("Failed to load quizzes. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  // Fetch specific quiz when selected
  const fetchQuizById = async (id) => {
    try {
      setQuizLoading(true)
      const response = await fetch(`http://localhost:3000/api/quiz/${id}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch quiz: ${response.status}`)
      }

      const data = await response.json()
      setActiveQuiz(data)
      setActiveQuizId(id)
    } catch (err) {
      console.error("Error fetching quiz:", err)
      setError("Failed to load quiz. Please try again later.")
    } finally {
      setQuizLoading(false)
    }
  }

  // Start a quiz
  const startQuiz = (quizId) => {
    fetchQuizById(quizId)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setQuizResult(null)
  }

  // Handle answer selection
  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = {
      questionIndex: currentQuestion,
      optionIndex: answerIndex,
    }
    setAnswers(newAnswers)

    // Move to next question or show results
    if (currentQuestion < activeQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      submitQuiz(newAnswers)
    }
  }

  // Submit quiz to API
  const submitQuiz = async (finalAnswers) => {
    try {
      setSubmitting(true)
      const response = await fetch("http://localhost:3000/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: activeQuizId,
          answers: finalAnswers,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to submit quiz: ${response.status}`)
      }

      const result = await response.json()
      setQuizResult(result)
      setShowResults(true)
    } catch (err) {
      console.error("Error submitting quiz:", err)
      setError("Failed to submit quiz. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  // Go back to quiz selection
  const backToQuizzes = () => {
    setActiveQuiz(null)
    setActiveQuizId(null)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setQuizResult(null)
  }

  // Go back to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Get quiz icon based on title
  const getQuizIcon = (title) => {
    if (title.toLowerCase().includes("anxiety")) {
      return <AlertCircle className="h-10 w-10 text-yellow-500" />
    } else if (title.toLowerCase().includes("depression")) {
      return <Brain className="h-10 w-10 text-blue-500" />
    } else if (title.toLowerCase().includes("stress")) {
      return <AlertCircle className="h-10 w-10 text-red-500" />
    } else {
      return <CheckCircle className="h-10 w-10 text-green-500" />
    }
  }

  // Get quiz color based on title
  const getQuizColor = (title) => {
    if (title.toLowerCase().includes("anxiety")) {
      return { bg: "bg-yellow-50", border: "border-yellow-200" }
    } else if (title.toLowerCase().includes("depression")) {
      return { bg: "bg-blue-50", border: "border-blue-200" }
    } else if (title.toLowerCase().includes("stress")) {
      return { bg: "bg-red-50", border: "border-red-200" }
    } else {
      return { bg: "bg-green-50", border: "border-green-200" }
    }
  }

  // Calculate max possible score for a quiz
  const getMaxScore = () => {
    if (!activeQuiz) return 0

    return activeQuiz.questions.reduce((total, question) => {
      const maxOptionScore = Math.max(...question.options.map((option) => option.score))
      return total + maxOptionScore
    }, 0)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#FFF5F1] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mental Health Quizzes</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="mt-2 text-sm underline">
            Try again
          </button>
        </div>
      )}

      {loading ? (
        // Loading state for initial quizzes fetch
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-[#FF8E7E] animate-spin" />
          <span className="ml-3 text-gray-600">Loading quizzes...</span>
        </div>
      ) : !activeQuiz ? (
        // Quiz selection screen
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {quizzes.map((quiz) => {
            const colors = getQuizColor(quiz.title)
            return (
              <div
                key={quiz._id}
                className={`${colors.bg} ${colors.border} border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => startQuiz(quiz._id)}
              >
                <div className="flex items-center mb-4">
                  {getQuizIcon(quiz.title)}
                  <h2 className="text-xl font-semibold ml-3">{quiz.title}</h2>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Take this assessment</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            )
          })}
        </div>
      ) : quizLoading ? (
        // Loading state for specific quiz fetch
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-[#FF8E7E] animate-spin" />
          <span className="ml-3 text-gray-600">Loading quiz...</span>
        </div>
      ) : showResults ? (
        // Results screen
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{activeQuiz.title} Results</h2>
            <button onClick={backToQuizzes} className="flex items-center text-[#FF8E7E] hover:text-[#FF7A68]">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Quizzes
            </button>
          </div>

          {submitting ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 text-[#FF8E7E] animate-spin" />
              <span className="ml-3 text-gray-600">Processing results...</span>
            </div>
          ) : quizResult ? (
            <div className="mb-8">
              <div className={`${getQuizColor(activeQuiz.title).bg} rounded-lg p-6 mb-6`}>
                <h3 className="text-xl font-semibold mb-2">{quizResult.result}</h3>
                <p className="text-gray-700">{quizResult.recommendation}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">
                  Your Score: {quizResult.score} / {getMaxScore()}
                </h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#FF8E7E] h-2.5 rounded-full"
                    style={{
                      width: `${(quizResult.score / getMaxScore()) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Something went wrong with your results. Please try again.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => startQuiz(activeQuizId)}
              className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-6 py-3 rounded-lg transition-colors"
            >
              Take Quiz Again
            </button>
            <button
              onClick={backToQuizzes}
              className="bg-white border border-[#FF8E7E] text-[#FF8E7E] hover:bg-[#FFF0EB] px-6 py-3 rounded-lg transition-colors"
            >
              Try Another Quiz
            </button>
          </div>
        </div>
      ) : (
        // Quiz questions screen
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{activeQuiz.title}</h2>
            <button onClick={backToQuizzes} className="flex items-center text-[#FF8E7E] hover:text-[#FF7A68]">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Exit Quiz
            </button>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestion + 1} of {activeQuiz.questions.length}
              </span>
              {currentQuestion > 0 && (
                <button
                  onClick={goToPreviousQuestion}
                  className="text-sm text-[#FF8E7E] hover:text-[#FF7A68] flex items-center"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  Previous
                </button>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#FF8E7E] h-2.5 rounded-full"
                style={{
                  width: `${((currentQuestion + 1) / activeQuiz.questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-6">{activeQuiz.questions[currentQuestion].question}</h3>
            <div className="space-y-3">
              {activeQuiz.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    answers[currentQuestion]?.optionIndex === index
                      ? "border-[#FF8E7E] bg-[#FFF0EB]"
                      : "border-gray-200 hover:border-[#FF8E7E] hover:bg-[#FFF5F1]"
                  }`}
                  onClick={() => handleAnswer(index)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Select an option to continue</span>
            {answers[currentQuestion] !== undefined && currentQuestion < activeQuiz.questions.length - 1 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            )}
            {answers[currentQuestion] !== undefined && currentQuestion === activeQuiz.questions.length - 1 && (
              <button
                onClick={() => submitQuiz(answers)}
                className="bg-[#FF8E7E] hover:bg-[#FF7A68] text-white px-4 py-2 rounded-lg transition-colors"
              >
                See Results
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
