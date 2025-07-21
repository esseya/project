import React, { useState } from 'react';
import { Car, CheckCircle, Play, Clock, Users, Target, Award } from 'lucide-react';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'Nybörjare' | 'Medel' | 'Avancerad';
  duration: string;
  keyPoints: string[];
  videoUrl?: string;
  completed: boolean;
}

const trainingModules: TrainingModule[] = [
  {
    id: 'basic-controls',
    title: 'Grundläggande bilkontroll',
    description: 'Lär dig bilens grundfunktioner, säkerhetskontroller och hur du startar bilen säkert.',
    difficulty: 'Nybörjare',
    duration: '15 min',
    keyPoints: [
      'Säkerhetskontroll före start',
      'Speglar och sätesinställning',
      'Pedaler och växelspak',
      'Handbroms och blinkers'
    ],
    completed: false
  },
  {
    id: 'city-driving',
    title: 'Stadstrafik & Korsningar',
    description: 'Navigera säkert genom stadstrafik, korsningar och trafikljus.',
    difficulty: 'Medel',
    duration: '25 min',
    keyPoints: [
      'Väjningsregler i korsningar',
      'Trafikljus och skyltar',
      'Fotgängare och cyklister',
      'Parkering vid trottoarkant'
    ],
    completed: false
  },
  {
    id: 'highway-driving',
    title: 'Motorväg & Landsväg',
    description: 'Säker körning i högre hastigheter, omkörning och motorvägsregler.',
    difficulty: 'Avancerad',
    duration: '30 min',
    keyPoints: [
      'Påfart och avfart motorväg',
      'Säkerhetsavstånd vid hög hastighet',
      'Omkörning på landsväg',
      'Väjning för utryckningsfordon'
    ],
    completed: false
  },
  {
    id: 'parking',
    title: 'Parkering & Manövrering',
    description: 'Mästra olika parkeringstyper och manövrer som krävs vid uppkörning.',
    difficulty: 'Medel',
    duration: '20 min',
    keyPoints: [
      'Parallellparkering',
      'Vinkelparkering',
      'Backning runt hörn',
      'U-sväng på säker plats'
    ],
    completed: false
  },
  {
    id: 'weather-conditions',
    title: 'Körning i Olika Väderförhållanden',
    description: 'Anpassa din körning efter väder och väglag för maximal säkerhet.',
    difficulty: 'Avancerad',
    duration: '20 min',
    keyPoints: [
      'Körning på halt väglag',
      'Regn och sikt',
      'Vinterkörning',
      'Dimma och mörker'
    ],
    completed: false
  },
  {
    id: 'defensive-driving',
    title: 'Defensiv Körning',
    description: 'Utveckla säkra körvanor och riskmedvetenhet för livslång säker körning.',
    difficulty: 'Avancerad',
    duration: '25 min',
    keyPoints: [
      'Förutse andra trafikanters handlingar',
      'Säkerhetsmarginaler',
      'Hantera aggressiva förare',
      'Trötthet och koncentration'
    ],
    completed: false
  }
];

const readinessChecklist = [
  { category: 'Grundläggande kontroll', items: [
    'Kan starta och stänga av bilen säkert',
    'Ställer in speglar och säte korrekt',
    'Använder pedaler smidigt',
    'Behärskar handbroms och växelspak'
  ]},
  { category: 'Stadstrafik', items: [
    'Navigerar korsningar säkert',
    'Följer trafikljus och skyltar',
    'Visar hänsyn till fotgängare',
    'Parkerar vid trottoarkant'
  ]},
  { category: 'Landsväg/Motorväg', items: [
    'Kör säkert i högre hastigheter',
    'Håller korrekt säkerhetsavstånd',
    'Utför säkra omkörningar',
    'Hanterar på- och avfarter'
  ]},
  { category: 'Manövrering', items: [
    'Parallellparkerar mellan två bilar',
    'Utför vinkelparkering',
    'Backar runt hörn kontrollerat',
    'Gör U-sväng på lämplig plats'
  ]}
];

export const PracticalTraining: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [activeTab, setActiveTab] = useState<'modules' | 'checklist' | 'assessment'>('modules');
  const [checklistProgress, setChecklistProgress] = useState<{[key: string]: boolean}>({});

  const toggleChecklistItem = (itemKey: string) => {
    setChecklistProgress(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Nybörjare': return 'bg-green-100 text-green-800';
      case 'Medel': return 'bg-yellow-100 text-yellow-800';
      case 'Avancerad': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateReadiness = () => {
    const totalItems = readinessChecklist.reduce((sum, category) => sum + category.items.length, 0);
    const completedItems = Object.values(checklistProgress).filter(Boolean).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <Car className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Praktisk Körträning</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Lär dig alla praktiska moment som krävs för uppkörningen genom videoinstruktioner och strukturerad träning
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { key: 'modules', label: 'Träningsmoduler', icon: <Play className="h-4 w-4" /> },
          { key: 'checklist', label: 'Färdighetschecklista', icon: <CheckCircle className="h-4 w-4" /> },
          { key: 'assessment', label: 'Självbedömning', icon: <Target className="h-4 w-4" /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'modules' | 'checklist' | 'assessment')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Training Modules */}
      {activeTab === 'modules' && (
        <div className="space-y-6">
          {!selectedModule ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingModules.map((module) => (
                <div key={module.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {module.duration}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                  
                  <div className="space-y-1 mb-4">
                    {module.keyPoints.slice(0, 2).map((point, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {point}
                      </div>
                    ))}
                    {module.keyPoints.length > 2 && (
                      <div className="text-sm text-gray-500">+{module.keyPoints.length - 2} fler punkter</div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setSelectedModule(module)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Starta modul
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <button
                onClick={() => setSelectedModule(null)}
                className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Tillbaka till moduler
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded text-sm font-semibold ${getDifficultyColor(selectedModule.difficulty)}`}>
                  {selectedModule.difficulty}
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  {selectedModule.duration}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedModule.title}</h2>
              <p className="text-gray-600 mb-6">{selectedModule.description}</p>
              
              {/* Video placeholder */}
              <div className="bg-gray-900 rounded-lg aspect-video mb-6 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                  <p className="text-lg">Videoinstruktion</p>
                  <p className="text-sm opacity-70">Klicka för att spela upp</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-4">Viktiga punkter att komma ihåg:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedModule.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Readiness Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Färdighetschecklista för Uppkörning</h3>
            <p className="text-gray-700">
              Gå igenom denna checklista för att bedöma om du är redo för uppkörningen. 
              Bocka av de färdigheter du behärskar säkert.
            </p>
          </div>

          {readinessChecklist.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h4>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const itemKey = `${categoryIndex}-${itemIndex}`;
                  const isChecked = checklistProgress[itemKey] || false;
                  
                  return (
                    <label key={itemIndex} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleChecklistItem(itemKey)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className={`${isChecked ? 'text-gray-800 line-through' : 'text-gray-700'}`}>
                        {item}
                      </span>
                      {isChecked && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Self Assessment */}
      {activeTab === 'assessment' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Din Beredskap för Uppkörning</h3>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">{calculateReadiness()}%</div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${calculateReadiness()}%` }}
                />
              </div>
            </div>
            
            {calculateReadiness() >= 80 ? (
              <div className="bg-green-50 rounded-lg p-6">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">Du verkar redo!</h4>
                <p className="text-green-700">
                  Du har bockat av de flesta färdigheter. Det kan vara dags att boka din uppkörning!
                </p>
              </div>
            ) : calculateReadiness() >= 60 ? (
              <div className="bg-yellow-50 rounded-lg p-6">
                <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">Nästan redo</h4>
                <p className="text-yellow-700">
                  Du är på god väg! Fortsätt träna på de områden du inte bockat av än.
                </p>
              </div>
            ) : (
              <div className="bg-red-50 rounded-lg p-6">
                <Users className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-red-800 mb-2">Mer träning behövs</h4>
                <p className="text-red-700">
                  Fokusera på grunderna och träna mer innan du bokar uppkörning.
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Rekommendationer</h4>
              <div className="space-y-3">
                {calculateReadiness() < 60 && (
                  <div className="flex items-center gap-3 text-red-700">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    Träna grundläggande bilkontroll mer
                  </div>
                )}
                {calculateReadiness() < 80 && (
                  <div className="flex items-center gap-3 text-yellow-700">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    Öva på manövrering och parkering
                  </div>
                )}
                <div className="flex items-center gap-3 text-blue-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Ta några lektioner med körlärare
                </div>
                <div className="flex items-center gap-3 text-green-700">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Kör i olika väderförhållanden
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Nästa steg</h4>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Boka körlektioner
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Hitta övningsplats
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Kontakta handledare
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
