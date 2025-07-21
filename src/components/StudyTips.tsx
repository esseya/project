import React, { useState } from 'react';
import { Brain, Target, AlertTriangle, Clock, CheckCircle, Lightbulb, BookOpen, Zap } from 'lucide-react';

interface TipCard {
  icon: React.ReactNode;
  title: string;
  content: string;
  category: 'study' | 'memory' | 'exam' | 'mistakes';
}

const studyTips: TipCard[] = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Aktiv repetition",
    content: "Läs inte bara - testa dig själv! Gör övningsprov dagligen och fokusera på områden där du gör fel. Aktiv repetition är 3x mer effektiv än passiv läsning.",
    category: 'study'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Spaced repetition",
    content: "Repetera samma material med ökande intervaller: dag 1, dag 3, dag 7, dag 14. Detta hjälper hjärnan att flytta information till långtidsminnet.",
    category: 'study'
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Färgkodning för vägmärken",
    content: "Röd = förbud/fara, Blå = påbud/information, Gul = varning, Vit = upplysning. Lär dig färgernas betydelse först, sedan detaljerna.",
    category: 'memory'
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Visualisering",
    content: "Skapa mentala bilder av trafiksituationer. Föreställ dig att du kör och möter olika vägmärken och situationer. Detta hjälper dig komma ihåg reglerna.",
    category: 'memory'
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Vanliga fallgropar",
    content: "Förväxla inte 'får' med 'ska' i frågor. Läs noga om frågan handlar om hastighet, avstånd eller tid. Många missar skillnaden mellan 'minst' och 'högst'.",
    category: 'mistakes'
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Provdagen",
    content: "Kom 15 min tidigt, ta med ID, läs varje fråga två gånger, använd hela tiden (50 min), och dubbelkolla dina svar innan du lämnar in.",
    category: 'exam'
  }
];

const memoryTechniques = [
  {
    title: "Vägmärkens former",
    technique: "Triangel = varning (spetsig som fara), Cirkel = förbud (stoppar dig), Rektangel = information (rakt på sak)",
    example: "Triangulär skylt med bil = varning för bil, Cirkulär skylt med bil = förbud mot bil"
  },
  {
    title: "Hastighetsregler",
    technique: "Tätort = 50 (som femtio-lappen), Landsväg = 70 (som sjuttio-talet), Motorväg = 110 (som polisens nummer)",
    example: "I tätort tänk 'femtio-lapp i plånboken', på motorväg 'ring 110 om det händer något'"
  },
  {
    title: "Säkerhetsavstånd",
    technique: "3-sekundersregeln: Räkna 'tjugoett, tjugotva, tjugotre' när bilen framför passerar en punkt",
    example: "När framförvarande bil passerar en skylt, börja räkna. Du ska passera samma skylt efter 3 sekunder."
  }
];

const commonMistakes = [
  {
    mistake: "Förväxla 'minst' och 'högst'",
    explanation: "Läs frågan extra noga. 'Minst 3 meter' betyder 3 meter eller mer. 'Högst 50 km/h' betyder 50 km/h eller mindre.",
    tip: "Markera nyckelord som 'minst', 'högst', 'får', 'ska', 'måste' när du läser frågan."
  },
  {
    mistake: "Glömma kontrollera alla alternativ",
    explanation: "Många väljer första alternativet som verkar rätt utan att läsa alla alternativ.",
    tip: "Läs ALLA svarsalternativ innan du väljer. Ibland finns ett bättre svar längre ner."
  },
  {
    mistake: "Stress över tid",
    explanation: "50 minuter är gott om tid för 65 frågor. Stressa inte - det leder till slarvfel.",
    tip: "Räkna med 45 sekunder per fråga. Det ger dig 15 minuter över för kontroll."
  }
];

export const StudyTips: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tips' | 'memory' | 'mistakes' | 'exam'>('tips');

  const filteredTips = studyTips.filter(tip => {
    switch (activeTab) {
      case 'tips': return tip.category === 'study';
      case 'memory': return tip.category === 'memory';
      case 'mistakes': return tip.category === 'mistakes';
      case 'exam': return tip.category === 'exam';
      default: return true;
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tips & Strategier för Teoriprovet</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Lär dig effektiva studieteknik, minnessystem och strategier för att klara teoriprovet på första försöket
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { key: 'tips', label: 'Studieteknik', icon: <BookOpen className="h-4 w-4" /> },
          { key: 'memory', label: 'Minnessystem', icon: <Brain className="h-4 w-4" /> },
          { key: 'mistakes', label: 'Vanliga fel', icon: <AlertTriangle className="h-4 w-4" /> },
          { key: 'exam', label: 'Provdagen', icon: <Target className="h-4 w-4" /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'tips' | 'memory' | 'mistakes' | 'exam')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Study Tips */}
      {activeTab === 'tips' && (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTips.map((tip, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Memory Techniques */}
      {activeTab === 'memory' && (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Minnestekniker för Vägmärken & Regler</h3>
            <p className="text-gray-700 mb-6">
              Använd dessa beprövade minnestekniker för att komma ihåg komplicerade regler och vägmärken.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-6">
            {memoryTechniques.map((technique, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">{technique.title}</h4>
                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                  <h5 className="font-medium text-yellow-800 mb-2">Teknik:</h5>
                  <p className="text-gray-700">{technique.technique}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-medium text-green-800 mb-2">Exempel:</h5>
                  <p className="text-gray-700">{technique.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6">
          <div className="bg-red-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-800 mb-4">Vanliga Fallgropar & Hur Du Undviker Dem</h3>
            <p className="text-gray-700">
              Lär dig av andras misstag och undvik de vanligaste fällorna som får elever att misslyckas.
            </p>
          </div>

          <div className="space-y-4">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{mistake.mistake}</h4>
                    <p className="text-gray-600 mb-3">{mistake.explanation}</p>
                    <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Tips:</span>
                      </div>
                      <p className="text-green-700 text-sm">{mistake.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exam Day */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Provdagen - Steg för Steg</h3>
            <p className="text-gray-700">
              Förbered dig optimalt för provdagen med denna detaljerade checklista.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Innan provet</h4>
              <div className="space-y-3">
                {[
                  "Sov minst 8 timmar natten innan",
                  "Ät en näringsrik frukost",
                  "Kom 15 minuter tidigt",
                  "Ta med giltig ID-handling",
                  "Stäng av mobilen helt",
                  "Gå på toaletten innan start"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Under provet</h4>
              <div className="space-y-3">
                {[
                  "Läs varje fråga två gånger",
                  "Markera nyckelord (minst, högst, får, ska)",
                  "Läs alla svarsalternativ",
                  "Använd hela tiden (50 minuter)",
                  "Dubbelkolla osäkra svar",
                  "Lämna inte in för tidigt"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">Tidshantering</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-700">45 sek</div>
                <div className="text-gray-600">per fråga i genomsnitt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-700">35 min</div>
                <div className="text-gray-600">för alla 65 frågor</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-700">15 min</div>
                <div className="text-gray-600">för kontroll & reflektion</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
