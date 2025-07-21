import React, { useState } from 'react';
import { 
  Car, 
  BookOpen, 
  Users, 
  AlertTriangle, 
  FileText, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  ChevronDown,
  ChevronUp,
  Award,
  Shield,
  Target,
  Brain,
  Play,
  Calendar
} from 'lucide-react';
import { TheoryTest } from './components/TheoryTest';
import { StudyTips } from './components/StudyTips';
import { PracticalTraining } from './components/PracticalTraining';
import { StudyPlanner } from './components/StudyPlanner';
import { TrafficSignsQuiz } from './components/TrafficSignsQuiz';

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, icon, children }) => (
  <section id={id} className="mb-12 scroll-mt-20">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
    {children}
  </section>
);

const FAQ = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
      >
        <span className="font-medium text-gray-800">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

function App() {
  const [activeView, setActiveView] = useState<'guide' | 'theory-test' | 'study-tips' | 'practical' | 'planner' | 'traffic-signs'>('guide');

  const navigationItems = [
    { href: '#oversikt', label: 'Översikt' },
    { href: '#teori', label: 'Teori' },
    { href: '#praktik', label: 'Praktik' },
    { href: '#risk', label: 'Riskutbildning' },
    { href: '#prov', label: 'Prov' },
    { href: '#tips', label: 'Tips' },
    { href: '#kontakt', label: 'Kontakt' }
  ];

  const interactiveTools = [
    { key: 'traffic-signs', label: 'Vägmärken Quiz', icon: <Target className="h-4 w-4" />, description: 'Träna på svenska vägmärken' },
    { key: 'theory-test', label: 'Teoriprov', icon: <Brain className="h-4 w-4" />, description: 'Interaktiva övningsprov' },
    { key: 'study-tips', label: 'Studietips', icon: <BookOpen className="h-4 w-4" />, description: 'Strategier för framgång' },
    { key: 'practical', label: 'Körträning', icon: <Play className="h-4 w-4" />, description: 'Praktiska moment' },
    { key: 'planner', label: 'Studieplan', icon: <Calendar className="h-4 w-4" />, description: 'Planera dina studier' }
  ];

  if (activeView !== 'guide') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setActiveView('guide')}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-800">B-körkort Sverige</span>
              </button>
              <div className="flex items-center gap-4">
                {interactiveTools.map((tool) => (
                  <button
                    key={tool.key}
                    onClick={() => setActiveView(tool.key as any)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      activeView === tool.key
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    {tool.icon}
                    <span className="hidden md:inline">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </header>

        {/* Content */}
        <main className="py-8">
          {activeView === 'traffic-signs' && <TrafficSignsQuiz />}
          {activeView === 'theory-test' && <TheoryTest />}
          {activeView === 'study-tips' && <StudyTips />}
          {activeView === 'practical' && <PracticalTraining />}
          {activeView === 'planner' && <StudyPlanner />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">B-körkort Sverige</span>
            </div>
            <div className="hidden md:flex space-x-6">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Ta ditt B-körkort i Sverige
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            En komplett guide som tar dig genom alla steg från ansökan till färdigt körkort. 
            Allt du behöver veta om teori, praktik och prov enligt Transportstyrelsens riktlinjer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#introduktion"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Läs guiden
            </a>
            <button
              onClick={() => setActiveView('traffic-signs')}
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              <Target className="h-5 w-5" />
              Träna vägmärken
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Interaktiva Träningsverktyg</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Använd våra interaktiva verktyg för att träna och förbereda dig optimalt för körkortet
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interactiveTools.map((tool) => (
              <button
                key={tool.key}
                onClick={() => setActiveView(tool.key as any)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{tool.label}</h3>
                </div>
                <p className="text-gray-600">{tool.description}</p>
                <div className="mt-4 text-blue-600 font-medium group-hover:text-blue-700">
                  Starta träning →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduktion */}
        <Section id="introduktion" title="Introduktion" icon={<Car className="h-6 w-6" />}>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Vad är ett B-körkort?</h3>
            <p className="text-gray-700 leading-relaxed">
              B-körkort ger dig rätt att köra personbil med totalvikt upp till 3,5 ton. Det är det vanligaste 
              körkortet i Sverige och din väg till mobil frihet.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Ålderskrav</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Minst 18 år för att få körkort</li>
                <li>• Kan börja övningsköra från 17 år</li>
                <li>• Körkortstillstånd kan sökas från 17,5 år</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Grundläggande villkor</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Vara bosatt i Sverige</li>
                <li>• Ha godkänd syn- och hälsoundersökning</li>
                <li>• Klara alla obligatoriska moment</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Vägen till körkortet */}
        <Section id="oversikt" title="Vägen till körkortet – Översikt" icon={<Target className="h-6 w-6" />}>
          <div className="space-y-4">
            {[
              { step: 1, title: "Ansök om körkortstillstånd", desc: "Ansök via Transportstyrelsens webbplats eller hos trafikskola" },
              { step: 2, title: "Få handledartillstånd", desc: "Om du ska övningsköra privat behöver din handledare tillstånd" },
              { step: 3, title: "Genomför Riskettan", desc: "Obligatorisk utbildning om trafiksäkerhet och riskmedvetenhet" },
              { step: 4, title: "Studera teori", desc: "Läs kurslitteratur och träna på frågor inför teoriprovet" },
              { step: 5, title: "Övningsköra", desc: "Praktisk körning med handledare eller körlärare" },
              { step: 6, title: "Ta teoriprov", desc: "Kunskapsprov hos Trafikverket - 65 frågor, 50 minuter" },
              { step: 7, title: "Genomför Risktvåan", desc: "Halkbaneträning för att lära hantera farliga situationer" },
              { step: 8, title: "Ta uppkörning", desc: "Praktiskt prov hos Trafikverket med trafikprov och förarprov" }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Teoriutbildning */}
        <Section id="teori" title="Teoriutbildning" icon={<BookOpen className="h-6 w-6" />}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Vad innehåller teoriutbildningen?</h3>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Trafikregler</h4>
                  <p className="text-sm text-gray-600">Väjningsplikt, hastighet, omkörning och trafikljus</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Vägmärken</h4>
                  <p className="text-sm text-gray-600">Varnings-, förbud-, påbud- och upplysningsskyltar</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Miljö och säkerhet</h4>
                  <p className="text-sm text-gray-600">Ekonomisk körning och trafiksäkerhet</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Fordonskännedom</h4>
                  <p className="text-sm text-gray-600">Bilens olika delar och säkerhetskontroller</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Studiematerial och tips</h3>
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-green-800 mb-3">Rekommenderat material</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Körkortsboken (officiell bok från Transportstyrelsen)</li>
                  <li>• Digitala övningstester online</li>
                  <li>• Mobilappar för körkortsträning</li>
                  <li>• YouTube-kanaler med förklarande videos</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Om teoriprovet</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 65 frågor totalt</li>
                  <li>• 50 minuter tid</li>
                  <li>• Minst 52 rätt för godkänt (80%)</li>
                  <li>• Kostar 325 kr</li>
                  <li>• Bokas via Trafikverkets webbplats</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Praktik/Övningskörning */}
        <Section id="praktik" title="Praktik/Övningskörning" icon={<Users className="h-6 w-6" />}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Två sätt att övningsköra</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Via trafikskola</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Professionella körlärare</li>
                    <li>• Bil med dubbelkommando</li>
                    <li>• Strukturerad utbildning</li>
                    <li>• Kostnad: 500-700 kr/lektion</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Privat övningskörning</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Med godkänd handledare</li>
                    <li>• Flexibelt och billigare</li>
                    <li>• Kräver eget fordon och handledartillstånd</li>
                    <li>• Övningsskyltar obligatoriska</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-3">Krav för handledare</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Minst 24 år gammal</li>
                  <li>• Haft B-körkort i minst 5 år</li>
                  <li>• Godkänd på handledarkurs</li>
                  <li>• Inga anmärkningar sista 3 åren</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Vad lär du dig?</h3>
              <div className="space-y-3">
                {[
                  "Grundläggande bilkontroll",
                  "Stadstrafik och korsningar",
                  "Landsväg och motorvägskörning", 
                  "Parkering (parallell och vinkel)",
                  "Backning och U-sväng",
                  "Körning i olika väderförhållanden",
                  "Defensiv körning",
                  "Säkerhetskontroller"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Riskutbildning */}
        <Section id="risk" title="Riskutbildning" icon={<AlertTriangle className="h-6 w-6" />}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-semibold text-red-800">Riskettan</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Teoretisk utbildning om trafiksäkerhet som måste genomföras innan teoriprovet.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">3 timmar</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Diskussion om risker i trafiken</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Gruppstorlek: 6-12 personer</span>
                </div>
              </div>
              <h4 className="font-semibold mt-4 mb-2">Innehåll:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Riskmedvetenhet och attityder</li>
                <li>• Alkohol och droger i trafiken</li>
                <li>• Hastighet och säkerhetsavstånd</li>
                <li>• Trötthet och stress</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Car className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-orange-800">Risktvåan (Halkbana)</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Praktisk träning på halkbana för att lära dig hantera farliga körsituationer.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">4 timmar</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Praktisk körning på halkbana</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Genomförs efter godkänt teoriprov</span>
                </div>
              </div>
              <h4 className="font-semibold mt-4 mb-2">Träning i:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Undanmanövrer</li>
                <li>• Inbromsning på halt underlag</li>
                <li>• Sladdig och återställning</li>
                <li>• ABS-bromsning</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Teoriprov */}
        <Section id="prov" title="Teoriprov (Kunskapsprov)" icon={<FileText className="h-6 w-6" />}>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Så fungerar teoriprovet</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Provfakta</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 65 frågor totalt</li>
                      <li>• 50 minuter tid</li>
                      <li>• Minst 52 rätt svar (80%)</li>
                      <li>• Kostar 325 kr</li>
                      <li>• Datorbaserat prov</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Bokningsinfo</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Boka via Trafikverket.se</li>
                      <li>• Genomförs på Trafikverkets kontor</li>
                      <li>• ID-handling krävs</li>
                      <li>• Resultat direkt efter provet</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-6">
                <h4 className="font-semibold text-red-800 mb-3">Om du inte klarar provet</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Du kan göra ett nytt försök efter 7 dagar</li>
                  <li>• Ny provavgift på 325 kr</li>
                  <li>• Inga begränsningar på antal försök</li>
                  <li>• Fokusera på dina svaga områden</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Förberedelse</h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Rekommendationer</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Gör minst 1000 övningsfrågor</li>
                    <li>• Få 90%+ rätt på testprov</li>
                    <li>• Läs igenom boken flera gånger</li>
                    <li>• Vila väl innan provet</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">På provdagen</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Kom i god tid</li>
                    <li>• Ta med gyltig ID-handling</li>
                    <li>• Läs frågorna noggrant</li>
                    <li>• Använd hela tiden</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Uppkörning */}
        <Section id="uppkorning" title="Uppkörning (Förarprov)" icon={<Award className="h-6 w-6" />}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Hur går uppkörningen till?</h3>
              <div className="space-y-4">
                <div className="bg-white border-l-4 border-blue-600 p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">1. Säkerhetskontroll (5 minuter)</h4>
                  <p className="text-sm text-gray-600">
                    Kontrollera belysning, däck, bromsar och andra säkerhetsfunktioner
                  </p>
                </div>
                
                <div className="bg-white border-l-4 border-blue-600 p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">2. Körning i trafik (25 minuter)</h4>
                  <p className="text-sm text-gray-600">
                    Körning i olika trafikmiljöer med fokus på trafikregler och teknik
                  </p>
                </div>
                
                <div className="bg-white border-l-4 border-blue-600 p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">3. Manövrering (5 minuter)</h4>
                  <p className="text-sm text-gray-600">
                    Parkering, backning eller U-sväng på en säker plats
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold text-yellow-800 mb-3">Vad bedöms?</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Trafikregler och föreskrifter</li>
                  <li>• Körteknik och fordonsbehandling</li>
                  <li>• Riskuppfattning och anpassning</li>
                  <li>• Miljömedvetenhet</li>
                  <li>• Samspel med andra trafikanter</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Exempel på övningar</h3>
              <div className="space-y-3 mb-6">
                {[
                  { title: "Körning i stad", desc: "Korsningar, rondeller, trafikljus" },
                  { title: "Landsväg", desc: "Omkörning, hastighetsmätning" },
                  { title: "Parallellparkering", desc: "Mellan två bilar" },
                  { title: "Vinkelparkering", desc: "På parkeringsplats" },
                  { title: "Backning", desc: "Rakt eller runt hörn" },
                  { title: "U-sväng", desc: "På lämplig plats" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded p-3">
                    <h5 className="font-medium text-gray-800">{item.title}</h5>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">Provinfo</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Kostnad: 800 kr</li>
                  <li>• Total tid: ca 35 minuter</li>
                  <li>• Resultat direkt efter provet</li>
                  <li>• Boka via Trafikverket.se</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Efter godkänt prov */}
        <Section id="efter-prov" title="Efter godkänt prov" icon={<CheckCircle className="h-6 w-6" />}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Tillfälligt körkort</h3>
              <p className="text-gray-700 mb-4">
                Direkt efter godkänd uppkörning får du ett tillfälligt körkort (körkortsbevis) 
                som gäller i 3 månader.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Giltigt som legitimation tillsammans med ID</li>
                <li>• Får användas för att köra bil direkt</li>
                <li>• Ska alltid bäras vid körning</li>
                <li>• Gäller i 3 månader</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Ditt riktiga körkort</h3>
              <p className="text-gray-700 mb-4">
                Det fysiska körkortet skickas hem till din folkbokföringsadress.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Skickas inom 2-3 veckor</li>
                <li>• Postas till folkbokföringsadressen</li>
                <li>• Giltigt i 10 år från utfärdandet</li>
                <li>• Fungerar som ID-handling i EU</li>
              </ul>
              
              <div className="mt-4 p-4 bg-white rounded border">
                <h4 className="font-semibold text-gray-800 mb-2">Om du inte får körkortet</h4>
                <p className="text-sm text-gray-600">
                  Kontakta Transportstyrelsen om körkortet inte kommit inom 3 veckor.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Tips & FAQ */}
        <Section id="tips" title="Tips & Vanliga frågor" icon={<Users className="h-6 w-6" />}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Studietips</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">För teoriprovet</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Läs kurslitteraturen flera gånger</li>
                    <li>• Gör övningsprov dagligen</li>
                    <li>• Fokusera på dina svaga områden</li>
                    <li>• Diskutera svåra frågor med andra</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">För uppkörningen</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Träna i olika väderförhållanden</li>
                    <li>• Öva på parkeringsplatser</li>
                    <li>• Kör på provbanan om möjligt</li>
                    <li>• Få feedback från din handledare</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Hantera nervositet</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Andas djupt och lugnt</li>
                    <li>• Kom väl förberedd</li>
                    <li>• Vila väl innan proven</li>
                    <li>• Tänk positivt</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Vanliga frågor</h3>
              <div className="space-y-2">
                <FAQ 
                  question="Hur länge gäller mitt körkortstillstånd?"
                  answer="Körkortstillståndet gäller i 5 år från utfärdandet. Du måste ha tagit körkortet inom denna tid."
                />
                <FAQ 
                  question="Kan jag ta om proven hur många gånger som helst?"
                  answer="Ja, det finns ingen begränsning på antal försök. Du måste bara vänta 7 dagar mellan försöken och betala en ny provavgift."
                />
                <FAQ 
                  question="Vad händer om jag missar min bokade tid?"
                  answer="Om du inte kommer till din bokade tid utan att avboka i tid, förlorar du provavgiften och måste boka en ny tid."
                />
                <FAQ 
                  question="Kan jag köra utomlands med svensk körkort?"
                  answer="Ja, svenska körkort gäller i hela EU/EES. För andra länder kan du behöva internationellt körkort."
                />
                <FAQ 
                  question="Vad kostar det totalt att ta körkort?"
                  answer="Kostnaden varierar men räkna med 15 000-25 000 kr totalt inklusive utbildning, prov och tillstånd."
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Kontakt */}
        <Section id="kontakt" title="Kontakt & Anmälan" icon={<Phone className="h-6 w-6" />}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Viktiga kontakter</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Transportstyrelsen</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>0771-776 776</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>transportstyrelsen.se</span>
                      </div>
                      <p className="text-gray-600">För körkortstillstånd och allmänna frågor</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Trafikverket</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>0771-921 921</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>trafikverket.se</span>
                      </div>
                      <p className="text-gray-600">För provbokningar och examenfrågor</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Kom igång idag</h3>
                <p className="text-gray-600 mb-4">
                  Är du redo att börja din körkortsresa? Ta första steget genom att ansöka om 
                  körkortstillstånd eller kontakta en trafikskola i din närhet.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="#"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Ansök körkortstillstånd
                  </a>
                  <a 
                    href="#"
                    className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Hitta trafikskola
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Snabbkontakt</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Namn</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ditt namn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
                    <input 
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="din@email.se"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meddelande</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Hur kan vi hjälpa dig?"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Skicka meddelande
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Car className="h-6 w-6" />
                <span className="text-lg font-bold">B-körkort Sverige</span>
              </div>
              <p className="text-gray-300 text-sm">
                Din kompletta guide för att ta B-körkort i Sverige. 
                All information enligt Transportstyrelsens riktlinjer.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Snabblänkar</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#oversikt" className="hover:text-white transition-colors">Översikt</a></li>
                <li><a href="#teori" className="hover:text-white transition-colors">Teoriutbildning</a></li>
                <li><a href="#praktik" className="hover:text-white transition-colors">Övningskörning</a></li>
                <li><a href="#risk" className="hover:text-white transition-colors">Riskutbildning</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Information</h4>
              <p className="text-gray-300 text-sm mb-2">
                Denna webbplats är en informationsresurs och är inte officiellt kopplad till 
                Transportstyrelsen eller Trafikverket.
              </p>
              <p className="text-gray-300 text-sm">
                Kontrollera alltid den senaste informationen på myndigheternas officiella webbplatser.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 B-körkort Sverige. Skapad för att hjälpa dig lyckas med ditt körkort.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default App