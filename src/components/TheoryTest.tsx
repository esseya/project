import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Target, Clock} from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
}

interface TestResult {
  score: number;
  total: number;
  passed: boolean;
  timeSpent: number;
  categoryScores: { [key: string]: { correct: number; total: number } };
}

const mockQuestions: Question[] = [
  {
    id: 1,
    category: "Vägmärken",
    question: "Vad betyder denna skylt?",
    options: ["Förbud mot fordonstrafik", "Stopp för trafik från motsatt håll", "Väjningsplikt", "Parkering förbjuden"],
    correctAnswer: 2,
    explanation: "En triangulär skylt med röd kant betyder väjningsplikt. Du ska lämna företräde åt trafik på den väg du ska köra in på."
  },
  {
    id: 2,
    category: "Trafikregler",
    question: "Vilken är den allmänna hastighetsbegränsningen i tätort?",
    options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
    correctAnswer: 2,
    explanation: "Den allmänna hastighetsbegränsningen i tätort är 50 km/h om inte annat anges med vägmärken."
  },
  {
    id: 3,
    category: "Miljö & ekonomi",
    question: "Vad kan du göra för att minska bränsleförbrukningen?",
    options: ["Köra med högre hastighet", "Hålla jämn hastighet", "Bromsa och accelerera ofta", "Köra med öppna fönster på motorväg"],
    correctAnswer: 1,
    explanation: "Att hålla jämn hastighet och undvika onödiga accelerationer och inbromsningar minskar bränsleförbrukningen betydligt."
  },
  {
    id: 4,
    category: "Säkerhet & fordonsteknik",
    question: "Hur ofta ska du kontrollera däcktrycket?",
    options: ["En gång per år", "En gång per månad", "En gång per vecka", "Bara när däcken ser platta ut"],
    correctAnswer: 1,
    explanation: "Däcktrycket bör kontrolleras minst en gång per månad och alltid före längre resor för optimal säkerhet och bränsleekonomisk körning."
  },
  {
    id: 5,
    category: "Människan i trafiken",
    question: "Vad är den vanligaste orsaken till trafikolyckor?",
    options: ["Tekniska fel på fordonet", "Dåligt väder", "Mänskliga faktorer", "Dålig vägstandard"],
    correctAnswer: 2,
    explanation: "Cirka 90% av alla trafikolyckor beror på mänskliga faktorer som ouppmärksamhet, trötthet, hastighet eller felaktiga bedömningar."
  }
];

const categories = ["Alla kategorier", "Vägmärken", "Trafikregler", "Miljö & ekonomi", "Säkerhet & fordonsteknik", "Människan i trafiken"];

export const TheoryTest: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Alla kategorier");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [result, setResult] = useState<TestResult | null>(null);

  const filteredQuestions = selectedCategory === "Alla kategorier" 
    ? mockQuestions 
    : mockQuestions.filter(q => q.category === selectedCategory);

  useEffect(() => {
    let interval: number;
    if (testStarted && !testCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testStarted, testCompleted, startTime]);

  const startTest = () => {
    setTestStarted(true);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers(new Array(filteredQuestions.length).fill(null));
    setSelectedAnswer(null);
    setShowExplanation(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setResult(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
    }

    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowExplanation(false);
    } else {
      completeTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowExplanation(false);
    }
  };

  const showAnswer = () => {
    setShowExplanation(true);
  };

  const completeTest = () => {
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer;
    }

    const correctAnswers = finalAnswers.filter((answer, index) => 
      answer === filteredQuestions[index].correctAnswer
    ).length;

    const categoryScores: { [key: string]: { correct: number; total: number } } = {};
    
    categories.slice(1).forEach(category => {
      const categoryQuestions = filteredQuestions.filter(q => q.category === category);
      const categoryCorrect = categoryQuestions.filter(q => {
        const questionIndex = filteredQuestions.findIndex(fq => fq.id === q.id);
        return finalAnswers[questionIndex] === q.correctAnswer;
      }).length;
      
      if (categoryQuestions.length > 0) {
        categoryScores[category] = {
          correct: categoryCorrect,
          total: categoryQuestions.length
        };
      }
    });

    const testResult: TestResult = {
      score: correctAnswers,
      total: filteredQuestions.length,
      passed: correctAnswers >= Math.ceil(filteredQuestions.length * 0.8),
      timeSpent: timeElapsed,
      categoryScores
    };

    setResult(testResult);
    setTestCompleted(true);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const resetTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setTimeElapsed(0);
    setResult(null);
  };

  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Teoriprov Träning</h2>
            <p className="text-gray-600 text-lg">
              Träna inför teoriprovet med frågor som liknar de riktiga proven
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Välj kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-800 mb-3">Testinformation</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p><strong>Antal frågor:</strong> {filteredQuestions.length}</p>
                <p><strong>Godkäntgräns:</strong> {Math.ceil(filteredQuestions.length * 0.8)} rätt ({Math.round(80)}%)</p>
              </div>
              <div>
                <p><strong>Kategori:</strong> {selectedCategory}</p>
                <p><strong>Tid:</strong> Obegränsad (rekommenderat: 50 min)</p>
              </div>
            </div>
          </div>

          <button
            onClick={startTest}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Starta test
          </button>
        </div>
      </div>
    );
  }

  if (testCompleted && result) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            {result.passed ? (
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {result.passed ? "Grattis! Du klarade testet!" : "Tyvärr, du klarade inte testet"}
            </h2>
            <p className="text-gray-600">
              Du fick {result.score} av {result.total} rätt ({Math.round((result.score / result.total) * 100)}%)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Resultat</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Rätt svar:</span>
                  <span className="font-semibold text-green-600">{result.score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fel svar:</span>
                  <span className="font-semibold text-red-600">{result.total - result.score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tid:</span>
                  <span className="font-semibold">{formatTime(result.timeSpent)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-semibold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {result.passed ? 'Godkänt' : 'Underkänt'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Resultat per kategori</h3>
              <div className="space-y-2">
                {Object.entries(result.categoryScores).map(([category, scores]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span>{category}:</span>
                    <span className="font-semibold">
                      {scores.correct}/{scores.total} ({Math.round((scores.correct / scores.total) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetTest}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Nytt test
            </button>
            <button
              onClick={() => setSelectedCategory("Alla kategorier")}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              Ändra kategori
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = filteredQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Fråga {currentQuestion + 1} av {filteredQuestions.length}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              {formatTime(timeElapsed)}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {question.category}
          </span>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {question.question}
          </h3>

          {/* Answer options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";
              
              if (showExplanation) {
                if (index === question.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              } else if (selectedAnswer === index) {
                buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
              } else {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showExplanation}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                    {showExplanation && index === question.correctAnswer && (
                      <CheckCircle className="h-5 w-5 ml-auto text-green-600" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 ml-auto text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-800 mb-2">Förklaring:</h4>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Föregående
          </button>

          <div className="flex gap-3">
            {!showExplanation && selectedAnswer !== null && (
              <button
                onClick={showAnswer}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Visa svar
              </button>
            )}
            
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === filteredQuestions.length - 1 ? 'Avsluta test' : 'Nästa'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



