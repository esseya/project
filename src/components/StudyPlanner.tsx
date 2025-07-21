import React, { useState } from 'react';
import { Calendar, Target, CheckCircle, Plus, Trash2, Bell } from 'lucide-react';

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  category: 'theory' | 'practical' | 'risk' | 'exam';
}

interface StudySession {
  id: string;
  date: string;
  time: string;
  type: 'theory' | 'practical' | 'risk';
  duration: number;
  topic: string;
  notes?: string;
  completed: boolean;
}

const defaultGoals: StudyGoal[] = [
  {
    id: '1',
    title: 'Klara teoriprov',
    description: 'Få minst 52 rätt av 65 frågor på teoriprovet',
    targetDate: '2024-03-15',
    completed: false,
    category: 'theory'
  },
  {
    id: '2',
    title: 'Genomför Riskettan',
    description: 'Boka och genomför den obligatoriska riskutbildningen',
    targetDate: '2024-02-20',
    completed: false,
    category: 'risk'
  },
  {
    id: '3',
    title: 'Klara uppkörning',
    description: 'Genomföra praktiskt prov och få körkort',
    targetDate: '2024-04-10',
    completed: false,
    category: 'exam'
  }
];

export const StudyPlanner: React.FC = () => {
  const [goals, setGoals] = useState<StudyGoal[]>(defaultGoals);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [activeTab, setActiveTab] = useState<'goals' | 'calendar' | 'progress'>('goals');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddSession, setShowAddSession] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: 'theory' as StudyGoal['category']
  });
  const [newSession, setNewSession] = useState({
    date: '',
    time: '',
    type: 'theory' as StudySession['type'],
    duration: 60,
    topic: ''
  });

  const addGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      const goal: StudyGoal = {
        id: Date.now().toString(),
        ...newGoal,
        completed: false
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', description: '', targetDate: '', category: 'theory' });
      setShowAddGoal(false);
    }
  };

  const addSession = () => {
    if (newSession.date && newSession.time && newSession.topic) {
      const session: StudySession = {
        id: Date.now().toString(),
        ...newSession,
        completed: false
      };
      setSessions([...sessions, session]);
      setNewSession({ date: '', time: '', type: 'theory', duration: 60, topic: '' });
      setShowAddSession(false);
    }
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const toggleSession = (id: string) => {
    setSessions(sessions.map(session => 
      session.id === id ? { ...session, completed: !session.completed } : session
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  const getProgress = () => {
    const completedGoals = goals.filter(goal => goal.completed).length;
    const totalGoals = goals.length;
    return totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  };

  const getUpcomingSessions = () => {
    const today = new Date().toISOString().split('T')[0];
    return sessions
      .filter(session => session.date >= today && !session.completed)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'theory': return 'bg-blue-100 text-blue-800';
      case 'practical': return 'bg-green-100 text-green-800';
      case 'risk': return 'bg-red-100 text-red-800';
      case 'exam': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-500';
      case 'practical': return 'bg-green-500';
      case 'risk': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <Calendar className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Studieplanering</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Skapa en personlig studieplan, sätt mål och håll koll på dina framsteg mot körkortet
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{getProgress()}%</div>
            <div className="text-sm text-gray-600">Måluppfyllelse</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{goals.filter(g => g.completed).length}</div>
            <div className="text-sm text-gray-600">Klara mål</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{sessions.filter(s => s.completed).length}</div>
            <div className="text-sm text-gray-600">Genomförda sessioner</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{getUpcomingSessions().length}</div>
            <div className="text-sm text-gray-600">Kommande sessioner</div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { key: 'goals', label: 'Mål & Milstolpar', icon: <Target className="h-4 w-4" /> },
          { key: 'calendar', label: 'Studiekalender', icon: <Calendar className="h-4 w-4" /> },
          { key: 'progress', label: 'Framsteg', icon: <CheckCircle className="h-4 w-4" /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'goals' | 'calendar' | 'progress')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Dina Mål</h3>
            <button
              onClick={() => setShowAddGoal(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Lägg till mål
            </button>
          </div>

          {showAddGoal && (
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-indigo-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Nytt mål</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="T.ex. Klara teoriprov"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as StudyGoal['category'] })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="theory">Teori</option>
                    <option value="practical">Praktik</option>
                    <option value="risk">Riskutbildning</option>
                    <option value="exam">Prov</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Måldatum</label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beskrivning</label>
                  <input
                    type="text"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Detaljerad beskrivning av målet"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addGoal}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Spara mål
                </button>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Avbryt
                </button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {goals.map((goal) => (
              <div key={goal.id} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${goal.completed ? 'border-green-500' : 'border-indigo-500'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal(goal.id)}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(goal.category)}`}>
                      {goal.category}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <h4 className={`text-lg font-semibold mb-2 ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {goal.title}
                </h4>
                <p className={`text-sm mb-3 ${goal.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {goal.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Måldatum: {new Date(goal.targetDate).toLocaleDateString('sv-SE')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Studiekalender</h3>
            <button
              onClick={() => setShowAddSession(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Boka session
            </button>
          </div>

          {showAddSession && (
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-indigo-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Ny studiesession</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
                  <input
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tid</label>
                  <input
                    type="time"
                    value={newSession.time}
                    onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
                  <select
                    value={newSession.type}
                    onChange={(e) => setNewSession({ ...newSession, type: e.target.value as StudySession['type'] })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="theory">Teori</option>
                    <option value="practical">Praktik</option>
                    <option value="risk">Riskutbildning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Varaktighet (minuter)</label>
                  <input
                    type="number"
                    value={newSession.duration}
                    onChange={(e) => setNewSession({ ...newSession, duration: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="15"
                    step="15"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ämne/Aktivitet</label>
                  <input
                    type="text"
                    value={newSession.topic}
                    onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="T.ex. Vägmärken, Körlektion, Riskettan"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addSession}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Boka session
                </button>
                <button
                  onClick={() => setShowAddSession(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Avbryt
                </button>
              </div>
            </div>
          )}

          {/* Upcoming Sessions */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-4">Kommande sessioner</h4>
            {getUpcomingSessions().length > 0 ? (
              <div className="space-y-3">
                {getUpcomingSessions().map((session) => (
                  <div key={session.id} className="flex items-center gap-4 bg-white rounded-lg p-3">
                    <div className={`w-3 h-3 rounded-full ${getTypeColor(session.type)}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{session.topic}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(session.date).toLocaleDateString('sv-SE')} kl. {session.time} ({session.duration} min)
                      </div>
                    </div>
                    <Bell className="h-4 w-4 text-yellow-600" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-yellow-700">Inga kommande sessioner bokade</p>
            )}
          </div>

          {/* All Sessions */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800">Alla sessioner</h4>
            {sessions.length > 0 ? (
              sessions
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((session) => (
                  <div key={session.id} className={`bg-white rounded-lg shadow-md p-4 ${session.completed ? 'opacity-75' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={session.completed}
                          onChange={() => toggleSession(session.id)}
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <div className={`w-3 h-3 rounded-full ${getTypeColor(session.type)}`}></div>
                        <div>
                          <div className={`font-medium ${session.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {session.topic}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(session.date).toLocaleDateString('sv-SE')} kl. {session.time} ({session.duration} min)
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 text-center py-8">Inga sessioner bokade än</p>
            )}
          </div>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Målframsteg</h4>
              <div className="space-y-4">
                {['theory', 'practical', 'risk', 'exam'].map(category => {
                  const categoryGoals = goals.filter(g => g.category === category);
                  const completedGoals = categoryGoals.filter(g => g.completed).length;
                  const progress = categoryGoals.length > 0 ? (completedGoals / categoryGoals.length) * 100 : 0;
                  
                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                        <span className="text-sm text-gray-600">{completedGoals}/{categoryGoals.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Studietid denna månad</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {sessions.filter(s => s.completed).reduce((sum, s) => sum + s.duration, 0)} min
                </div>
                <div className="text-gray-600">Total studietid</div>
              </div>
              
              <div className="mt-6 space-y-3">
                {['theory', 'practical', 'risk'].map(type => {
                  const typeSessions = sessions.filter(s => s.type === type && s.completed);
                  const totalTime = typeSessions.reduce((sum, s) => sum + s.duration, 0);
                  
                  return (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 capitalize">{type}</span>
                      <span className="text-sm font-medium text-gray-800">{totalTime} min</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Rekommendationer</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-800 mb-2">Nästa steg</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Boka teoriprov när du får 90%+ på övningsprov</li>
                  <li>• Genomför Riskettan innan teoriprovet</li>
                  <li>• Träna körning minst 2 gånger per vecka</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-800 mb-2">Tips för framgång</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Sätt realistiska delmål</li>
                  <li>• Träna regelbundet istället för intensivt</li>
                  <li>• Be om feedback från handledare</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



