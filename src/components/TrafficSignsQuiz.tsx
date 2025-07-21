import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Target, Clock, Eye, EyeOff } from 'lucide-react';
import signImages from '../assets/sings';

interface TrafficSign {
  id: number;
  name: string;
  description: string;
  category: 'warning' | 'prohibition' | 'mandatory' | 'information' | 'additional';
  imageUrl: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  commonMistakes?: string[];
}

const trafficSigns: TrafficSign[] = [
  // Varningsskyltar (Warning signs)
  {
    id: 1,
    name: "Varning för korsning",
    description: "Triangulär skylt med svart kors på vit bakgrund",
    category: "warning",
    imageUrl: signImages['1'],
    options: ["Stopp", "Väjningsplikt", "Varning för korsning", "Förbud mot fordonstrafik"],
    correctAnswer: 2,
    explanation: "Denna triangulära skylt med rött ramverk varnar för en korsning där du ska vara extra uppmärksam på trafik från andra håll.",
    commonMistakes: ["Förväxlas ofta med väjningsplikt"]
  },
  {
    id: 2,
    name: "Väjningsplikt",
    description: "Triangulär skylt med spetsen nedåt",
    category: "warning",
    imageUrl: signImages['2'],
    options: ["Stopp", "Väjningsplikt", "Varning", "Parkering förbjuden"],
    correctAnswer: 1,
    explanation: "Den omvända triangeln med röd kant betyder väjningsplikt. Du ska lämna företräde åt trafik på den väg du ska köra in på.",
    commonMistakes: ["Glöm inte att denna skylt betyder att du MÅSTE väja, inte bara vara försiktig"]
  },
  {
    id: 3,
    name: "Stopp",
    description: "Åttakantig röd skylt med vit text STOPP",
    category: "prohibition",
    imageUrl: signImages['3'],
    options: ["Väjningsplikt", "Stopp", "Varning", "Förbud"],
    correctAnswer: 1,
    explanation: "STOPP-skylten kräver fullständigt stopp. Du måste stanna helt innan du fortsätter, även om vägen verkar fri.",
    commonMistakes: ["Många saktar bara ner istället för att stanna helt"]
  },
  {
    id: 4,
    name: "Förbud mot fordonstrafik",
    description: "Rund vit skylt med röd kant",
    category: "prohibition",
    imageUrl: signImages['4'],
    options: ["Väjningsplikt", "Parkering förbjuden", "Förbud mot fordonstrafik", "Enkelriktad trafik"],
    correctAnswer: 2,
    explanation: "En vit cirkel med röd kant betyder förbud mot all fordonstrafik. Endast gång- och cykeltrafik är tillåten.",
    commonMistakes: ["Förväxlas med andra förbud - kom ihåg att helt vit = förbud mot ALLA fordon"]
  },
  {
    id: 5,
    name: "Förbud mot motorcykel",
    description: "Rund vit skylt med röd kant och motorcykelsymbol",
    category: "prohibition",
    imageUrl: signImages['5'],
    options: ["Förbud mot bil", "Förbud mot motorcykel", "Förbud mot moped", "Förbud mot lastbil"],
    correctAnswer: 1,
    explanation: "Rund skylt med motorcykelsymbol överstruken betyder förbud specifikt mot motorcyklar.",
    commonMistakes: ["Förväxlas med förbud mot moped - titta noga på symbolen"]
  },
  {
    id: 6,
    name: "Hastighetsbegränsning 50",
    description: "Rund vit skylt med röd kant och siffran 50",
    category: "prohibition",
    imageUrl: signImages['6'],
    options: ["Rekommenderad hastighet", "Hastighetsbegränsning 50 km/h", "Minsta tillåtna hastighet", "Varning för 50-skylt"],
    correctAnswer: 1,
    explanation: "Rund skylt med röd kant och siffra anger högsta tillåtna hastighet. Här 50 km/h.",
    commonMistakes: ["Glöm inte att detta är MAXhastighet, inte rekommenderad hastighet"]
  },
  {
    id: 7,
    name: "Förbud mot omkörning",
    description: "Rund vit skylt med röd kant och två bilar",
    category: "prohibition",
    imageUrl: signImages['7'],
    options: ["Varning för omkörning", "Förbud mot omkörning", "Rekommendation", "Påbjuden körfält"],
    correctAnswer: 1,
    explanation: "Skylten visar två bilar där den ena kör om den andra, med röd kant = förbud mot omkörning.",
    commonMistakes: ["Gäller endast omkörning av motorfordon, inte cyklar"]
  },
  {
    id: 8,
    name: "Påbjuden färdriktning rakt fram",
    description: "Rund blå skylt med vit pil rakt fram",
    category: "mandatory",
    imageUrl: signImages['8'],
    options: ["Rekommenderad riktning", "Påbjuden färdriktning rakt fram", "Information om riktning", "Varning för riktning"],
    correctAnswer: 1,
    explanation: "Blå rund skylt med vit pil anger påbjuden färdriktning. Du MÅSTE köra rakt fram.",
    commonMistakes: ["Blå = påbud, inte bara information"]
  },
  {
    id: 9,
    name: "Påbjuden färdriktning höger",
    description: "Rund blå skylt med vit pil åt höger",
    category: "mandatory",
    imageUrl: signImages['9'],
    options: ["Information om höger", "Påbjuden färdriktning höger", "Rekommendation höger", "Varning för högersväng"],
    correctAnswer: 1,
    explanation: "Blå rund skylt med vit pil åt höger - du MÅSTE svänga höger.",
    commonMistakes: ["Kom ihåg att detta är ett påbud, inte ett förslag"]
  },
  {
    id: 10,
    name: "Påbjuden färdriktning vänster",
    description: "Rund blå skylt med vit pil åt vänster",
    category: "mandatory",
    imageUrl: signImages['10'],
    options: ["Information om vänster", "Påbjuden färdriktning vänster", "Rekommendation vänster", "Varning för vänstersväng"],
    correctAnswer: 1,
    explanation: "Blå rund skylt med vit pil åt vänster - du MÅSTE svänga vänster.",
    commonMistakes: ["Blå bakgrund = påbud som måste följas"]
  },
  {
    id: 11,
    name: "Cykelbana",
    description: "Rund blå skylt med vit cykelsymbol",
    category: "mandatory",
    imageUrl: signImages['11'],
    options: ["Information om cyklar", "Cykelbana", "Varning för cyklar", "Cykelförbud"],
    correctAnswer: 1,
    explanation: "Blå rund skylt med cykelsymbol anger cykelbana. Endast cyklar får använda denna yta.",
    commonMistakes: ["Förväxlas med varning för cyklar - blå = påbud/reserverat för cyklar"]
  },
  {
    id: 12,
    name: "Gångbana",
    description: "Rund blå skylt med vit fotgängarsymbol",
    category: "mandatory",
    imageUrl: signImages['12'],
    options: ["Information om fotgängare", "Gångbana", "Varning för fotgängare", "Förbud för fotgängare"],
    correctAnswer: 1,
    explanation: "Blå rund skylt med fotgängarsymbol anger gångbana. Endast fotgängare får använda denna yta.",
    commonMistakes: ["Blå bakgrund betyder att ytan är reserverad FÖR fotgängare"]
  },
  {
    id: 13,
    name: "Gång- och cykelbana",
    description: "Rund blå skylt med både fotgängar- och cykelsymbol",
    category: "mandatory",
    imageUrl: signImages['13'],
    options: ["Varning för gående och cyklister", "Gång- och cykelbana", "Information", "Förbud"],
    correctAnswer: 1,
    explanation: "Blå skylt med både fotgängar- och cykelsymbol - gemensam bana för gående och cyklister.",
    commonMistakes: ["Kom ihåg att båda trafikantgrupperna delar samma yta"]
  },
  {
    id: 14,
    name: "Minsta tillåtna hastighet",
    description: "Rund blå skylt med vit siffra",
    category: "mandatory",
    imageUrl: signImages['14'],
    options: ["Hastighetsbegränsning", "Minsta tillåtna hastighet", "Rekommenderad hastighet", "Maxhastighet"],
    correctAnswer: 1,
    explanation: "Blå rund skylt med vit siffra anger minsta tillåtna hastighet. Du får INTE köra långsammare än denna hastighet.",
    commonMistakes: ["Förväxlas med hastighetsbegränsning - blå = minimum, vit med röd kant = maximum"]
  },
  {
    id: 15,
    name: "Motorväg",
    description: "Rektangulär grön skylt med motorvägssymbol",
    category: "information",
    imageUrl: signImages['15'],
    options: ["Motortrafikled", "Motorväg", "Huvudled", "Landsväg"],
    correctAnswer: 1,
    explanation: "Grön rektangulär skylt med motorvägssymbol anger början på motorväg. Särskilda regler gäller.",
    commonMistakes: ["Förväxlas med motortrafikled - motorväg har strängare regler"]
  },
  {
    id: 16,
    name: "Motortrafikled",
    description: "Rektangulär blå skylt med bilsymbol",
    category: "information",
    imageUrl: signImages['16'],
    options: ["Motorväg", "Motortrafikled", "Huvudled", "Allmän väg"],
    correctAnswer: 1,
    explanation: "Blå rektangulär skylt anger motortrafikled. Liknande regler som motorväg men mindre strikta.",
    commonMistakes: ["Skillnaden mot motorväg: blå vs grön bakgrund"]
  },
  {
    id: 17,
    name: "Huvudled",
    description: "Gul romb med vit kant",
    category: "information",
    imageUrl: signImages['17'],
    options: ["Motorväg", "Huvudled", "Förkörsrätt", "Varning"],
    correctAnswer: 1,
    explanation: "Gul romb anger huvudled. Du har förkörsrätt mot trafik från sidovägar.",
    commonMistakes: ["Betyder inte att du kan köra hur som helst - andra trafikregler gäller fortfarande"]
  },
  {
    id: 18,
    name: "Parkering",
    description: "Rektangulär blå skylt med vit P",
    category: "information",
    imageUrl: signImages['18'],
    options: ["Parkering förbjuden", "Parkering", "Betalning krävs", "Kort parkering"],
    correctAnswer: 1,
    explanation: "Blå rektangulär skylt med vit P anger parkeringsplats.",
    commonMistakes: ["Kontrollera alltid om det finns tilläggsskyltar med begränsningar"]
  },
  {
    id: 19,
    name: "Varning för barn",
    description: "Triangulär skylt med barn-symbol",
    category: "warning",
    imageUrl: signImages['19'],
    options: ["Lekplats", "Varning för barn", "Skola", "Förskola"],
    correctAnswer: 1,
    explanation: "Triangulär varningsskylt med barnsymbol varnar för att barn kan finnas i området.",
    commonMistakes: ["Betyder inte att det är en skola - bara att barn kan förekomma"]
  },
  {
    id: 20,
    name: "Varning för djur",
    description: "Triangulär skylt med djursymbol",
    category: "warning",
    imageUrl: signImages['20'],
    options: ["Djurpark", "Varning för djur", "Jakt", "Naturreservat"],
    correctAnswer: 1,
    explanation: "Triangulär varningsskylt med djursymbol (ofta älg eller rådjur) varnar för vilda djur på vägen.",
    commonMistakes: ["Vanligast på landsbygden, särskilt i skymning och gryning"]
  },
  {
    id: 21,
    name: "Varning för halt väglag",
    description: "Triangulär skylt med bil som sladdar",
    category: "warning",
    imageUrl: signImages['21'],
    options: ["Varning för kurva", "Varning för halt väglag", "Varning för backe", "Varning för vind"],
    correctAnswer: 1,
    explanation: "Triangulär skylt med bil som sladdar varnar för halt väglag - is, snö eller våt väg.",
    commonMistakes: ["Gäller ofta på broar och i skugga där isen ligger kvar längre"]
  },
  {
    id: 22,
    name: "Enkelriktad trafik",
    description: "Rektangulär blå skylt med vit pil",
    category: "information",
    imageUrl: signImages['22'],
    options: ["Påbjuden riktning", "Enkelriktad trafik", "Rekommenderad riktning", "Avfart"],
    correctAnswer: 1,
    explanation: "Rektangulär blå skylt med vit pil anger enkelriktad trafik i pilens riktning.",
    commonMistakes: ["Skillnad mot påbjuden riktning: rektangulär vs rund form"]
  },
  {
    id: 23,
    name: "Förbud mot parkering",
    description: "Rund vit skylt med röd kant och överstruket P",
    category: "prohibition",
    imageUrl: signImages['23'],
    options: ["Parkering", "Förbud mot parkering", "Betalning krävs", "Kort parkering"],
    correctAnswer: 1,
    explanation: "Rund skylt med överstruket P betyder förbud mot parkering.",
    commonMistakes: ["Stannande för av- och påstigning kan fortfarande vara tillåtet"]
  },
  {
    id: 24,
    name: "Förbud mot stannande",
    description: "Rund vit skylt med röd kant och överstruket X",
    category: "prohibition",
    imageUrl: signImages['24'],
    options: ["Förbud mot parkering", "Förbud mot stannande", "Förbud mot vändning", "Förbud mot stopp"],
    correctAnswer: 1,
    explanation: "Rund skylt med överstruket X betyder förbud mot både stannande och parkering.",
    commonMistakes: ["Strängare än parkeringsförbud - du får inte ens stanna kort"]
  },
  {
    id: 25,
    name: "Varning för vägarbete",
    description: "Triangulär skylt med arbetarsymbol",
    category: "warning",
    imageUrl: signImages['25'],
    options: ["Byggarbetsplats", "Varning för vägarbete", "Omledning", "Avstängd väg"],
    correctAnswer: 1,
    explanation: "Triangulär skylt med arbetarsymbol varnar för pågående vägarbete.",
    commonMistakes: ["Var extra försiktig och håll låg hastighet i arbetsområden"]
  }
];

// Utökad samling med fler svenska vägmärken
const additionalTrafficSigns: TrafficSign[] = [
  // Fler varningsskyltar
  {
    id: 26,
    name: "Varning för kurva till höger",
    description: "Triangulär skylt med kurvsymbol åt höger",
    category: "warning",
    imageUrl: signImages['26'],
    options: ["Sväng höger", "Varning för kurva till höger", "Påbjuden riktning", "Avfart höger"],
    correctAnswer: 1,
    explanation: "Triangulär skylt med kurvsymbol varnar för en skarp kurva åt höger. Anpassa hastigheten i god tid.",
    commonMistakes: ["Förväxlas med påbjuden färdriktning - triangel = varning, cirkel = påbud"]
  },
  {
    id: 27,
    name: "Varning för kurva till vänster",
    description: "Triangulär skylt med kurvsymbol åt vänster",
    category: "warning",
    imageUrl: signImages['27'],
    options: ["Sväng vänster", "Varning för kurva till vänster", "Påbjuden riktning", "Avfart vänster"],
    correctAnswer: 1,
    explanation: "Triangulär skylt med kurvsymbol varnar för en skarp kurva åt vänster. Sänk hastigheten innan kurvan.",
    commonMistakes: ["Kom ihåg att triangel = varning, inte påbud"]
  },
  {
    id: 28,
    name: "Varning för backe nedför",
    description: "Triangulär skylt med procentsiffra och nedåtpil",
    category: "warning",
    imageUrl: signImages['28'],
    options: ["Backe uppför", "Varning för backe nedför", "Hastighetsbegränsning", "Rekommenderad hastighet"],
    correctAnswer: 1,
    explanation: "Varnar för brant nedförsbacke. Använd motorbroms och var försiktig med bromsarna för att undvika överhettning.",
    commonMistakes: ["Procentsiffran anger backens lutning, inte hastighet"]
  },
  {
    id: 29,
    name: "Varning för backe uppför",
    description: "Triangulär skylt med procentsiffra och uppåtpil",
    category: "warning",
    imageUrl: signImages['29'],
    options: ["Backe nedför", "Varning för backe uppför", "Hastighetsbegränsning", "Minsta hastighet"],
    correctAnswer: 1,
    explanation: "Varnar för brant uppförsbacke. Håll jämn hastighet och var beredd på långsam trafik.",
    commonMistakes: ["Uppåtpil = uppför, nedåtpil = nedför"]
  },
  {
    id: 30,
    name: "Varning för smal väg",
    description: "Triangulär skylt med smalare vägsymbol",
    category: "warning",
    imageUrl: signImages['30'],
    options: ["Vägarbete", "Varning för smal väg", "Enkelriktad trafik", "Förbud mot lastbil"],
    correctAnswer: 1,
    explanation: "Varnar för att vägen blir smalare. Var beredd på möte med mötande trafik på mindre utrymme.",
    commonMistakes: ["Förväxlas med vägarbete - titta på symbolen noga"]
  },
  {
    id: 31,
    name: "Varning för sidovind",
    description: "Triangulär skylt med vindsymbol",
    category: "warning",
    imageUrl: signImages['31'],
    options: ["Varning för regn", "Varning för sidovind", "Varning för dimma", "Varning för snö"],
    correctAnswer: 1,
    explanation: "Varnar för kraftig sidovind som kan påverka fordonets stabilitet, särskilt för höga fordon.",
    commonMistakes: ["Vanlig på broar och öppna områden"]
  },
  {
    id: 32,
    name: "Varning för flygplan",
    description: "Triangulär skylt med flygplanssymbol",
    category: "warning",
    imageUrl: signImages['32'],
    options: ["Flygplats", "Varning för flygplan", "Flyguppvisning", "Militärområde"],
    correctAnswer: 1,
    explanation: "Varnar för lågt flygande flygplan, vanligen nära flygplatser. Var beredd på plötsligt buller.",
    commonMistakes: ["Betyder inte att det är en flygplats, bara att flygplan kan passera lågt"]
  },
  {
    id: 33,
    name: "Varning för tåg",
    description: "Triangulär skylt med tågsymbol",
    category: "warning",
    imageUrl: signImages['33'],
    options: ["Järnvägsstation", "Varning för tåg", "Spårväg", "Tunnelbana"],
    correctAnswer: 1,
    explanation: "Varnar för järnvägskorsning utan bommar. Stanna alltid och lyssna/titta åt båda hållen.",
    commonMistakes: ["Även utan bommar måste du alltid stanna och kontrollera"]
  },
  {
    id: 34,
    name: "Varning för cyklister",
    description: "Triangulär skylt med cykelsymbol",
    category: "warning",
    imageUrl: signImages['34'],
    options: ["Cykelbana", "Varning för cyklister", "Cykelförbud", "Cykelväg"],
    correctAnswer: 1,
    explanation: "Varnar för att cyklister kan förekomma på eller korsa vägen. Var extra uppmärksam.",
    commonMistakes: ["Triangel = varning, blå cirkel = cykelbana"]
  },
  {
    id: 35,
    name: "Varning för fotgängare",
    description: "Triangulär skylt med fotgängarsymbol",
    category: "warning",
    imageUrl: signImages['35'],
    options: ["Gångbana", "Varning för fotgängare", "Gångfartsområde", "Fotgängarförbud"],
    correctAnswer: 1,
    explanation: "Varnar för att fotgängare kan korsa eller vistas på vägen. Sänk hastigheten och var uppmärksam.",
    commonMistakes: ["Triangel = varning, blå cirkel = gångbana"]
  },

  // Fler förbud
  {
    id: 36,
    name: "Förbud mot lastbil",
    description: "Rund vit skylt med röd kant och lastbilssymbol",
    category: "prohibition",
    imageUrl: signImages['36'],
    options: ["Förbud mot buss", "Förbud mot lastbil", "Förbud mot släpvagn", "Förbud mot tung trafik"],
    correctAnswer: 1,
    explanation: "Förbud mot lastbilar. Gäller fordon för godstransport över viss vikt (vanligen 3,5 ton).",
    commonMistakes: ["Gäller endast lastbilar, inte alla tunga fordon"]
  },
  {
    id: 37,
    name: "Förbud mot moped",
    description: "Rund vit skylt med röd kant och mopedsymbol",
    category: "prohibition",
    imageUrl: signImages['37'],
    options: ["Förbud mot cykel", "Förbud mot moped", "Förbud mot motorcykel", "Förbud mot scooter"],
    correctAnswer: 1,
    explanation: "Förbud mot moped klass I och II. Gäller både EU-moped och vanlig moped.",
    commonMistakes: ["Skillnad mellan moped och motorcykel - titta på symbolen"]
  },
  {
    id: 38,
    name: "Förbud mot cykel",
    description: "Rund vit skylt med röd kant och cykelsymbol",
    category: "prohibition",
    imageUrl: signImages['38'],
    options: ["Förbud mot moped", "Förbud mot cykel", "Förbud mot motorcykel", "Cykelväg"],
    correctAnswer: 1,
    explanation: "Förbud mot cyklar. Cyklister måste använda alternativ väg eller gå med cykeln.",
    commonMistakes: ["Röd kant med symbol = förbud, blå bakgrund = tillåtet/påbjudet"]
  },
  {
    id: 39,
    name: "Förbud mot gående",
    description: "Rund vit skylt med röd kant och fotgängarsymbol",
    category: "prohibition",
    imageUrl: signImages['39'],
    options: ["Gångbana", "Förbud mot gående", "Gångfartsområde", "Varning för fotgängare"],
    correctAnswer: 1,
    explanation: "Förbud mot fotgängare. Gående måste använda annan väg eller passage.",
    commonMistakes: ["Vit med röd kant = förbud, blå = tillåtet för fotgängare"]
  },
  {
    id: 40,
    name: "Förbud mot U-sväng",
    description: "Rund vit skylt med röd kant och U-sväng symbol",
    category: "prohibition",
    imageUrl: signImages['40'],
    options: ["Förbud mot vänstersväng", "Förbud mot U-sväng", "Förbud mot vändning", "Enkelriktad trafik"],
    correctAnswer: 1,
    explanation: "Förbud mot U-sväng (180-graders vändning). Du får inte vända på denna sträcka.",
    commonMistakes: ["U-sväng = 180 grader, inte vanlig sväng"]
  },
  {
    id: 41,
    name: "Förbud mot högersvängning",
    description: "Rund vit skylt med röd kant och högersväng med rött streck",
    category: "prohibition",
    imageUrl: signImages['41'],
    options: ["Påbjuden höger", "Förbud mot högersvängning", "Förbud mot vänstersväng", "Enkelriktad höger"],
    correctAnswer: 1,
    explanation: "Förbud mot att svänga höger. Fortsätt rakt fram eller sväng vänster om tillåtet.",
    commonMistakes: ["Rött streck över pil = förbud mot den riktningen"]
  },
  {
    id: 42,
    name: "Förbud mot vänstersväng",
    description: "Rund vit skylt med röd kant och vänstersväng med rött streck",
    category: "prohibition",
    imageUrl: signImages['42'],
    options: ["Påbjuden vänster", "Förbud mot vänstersväng", "Förbud mot högersvängning", "Enkelriktad vänster"],
    correctAnswer: 1,
    explanation: "Förbud mot att svänga vänster. Fortsätt rakt fram eller sväng höger om tillåtet.",
    commonMistakes: ["Vanligt vid korsningar med mycket trafik"]
  },
  {
    id: 43,
    name: "Förbud mot fordon med farligt gods",
    description: "Rund vit skylt med röd kant och farligt gods-symbol",
    category: "prohibition",
    imageUrl: signImages['43'],
    options: ["Förbud mot lastbil", "Förbud mot fordon med farligt gods", "Förbud mot kemikalier", "Industriområde"],
    correctAnswer: 1,
    explanation: "Förbud mot fordon som transporterar farligt gods (explosiva, giftiga eller brandfarliga ämnen).",
    commonMistakes: ["Gäller endast fordon med farligt gods, inte alla lastbilar"]
  },

  // Fler påbud
  {
    id: 44,
    name: "Påbjuden färdriktning rakt fram eller höger",
    description: "Rund blå skylt med vita pilar rakt fram och höger",
    category: "mandatory",
    imageUrl: signImages['44'],
    options: ["Rekommenderad riktning", "Påbjuden färdriktning rakt fram eller höger", "Information", "Varning"],
    correctAnswer: 1,
    explanation: "Du MÅSTE köra antingen rakt fram eller svänga höger. Vänstersväng är förbjuden.",
    commonMistakes: ["Blå = påbud som måste följas, inte bara förslag"]
  },
  {
    id: 45,
    name: "Påbjuden färdriktning rakt fram eller vänster",
    description: "Rund blå skylt med vita pilar rakt fram och vänster",
    category: "mandatory",
    imageUrl: signImages['45'],
    options: ["Rekommenderad riktning", "Påbjuden färdriktning rakt fram eller vänster", "Information", "Varning"],
    correctAnswer: 1,
    explanation: "Du MÅSTE köra antingen rakt fram eller svänga vänster. Högersvängning är förbjuden.",
    commonMistakes: ["Kom ihåg att detta är ett påbud, inte ett val"]
  },
  {
    id: 46,
    name: "Påbjuden passage till höger",
    description: "Rund blå skylt med vit pil som går runt hinder till höger",
    category: "mandatory",
    imageUrl: signImages['46'],
    options: ["Sväng höger", "Påbjuden passage till höger", "Rondell", "Avfart höger"],
    correctAnswer: 1,
    explanation: "Du MÅSTE passera hindret (refug, trafikö) på höger sida. Vanlig vid vägarbeten.",
    commonMistakes: ["Skillnad mot vanlig högersvängning - denna visar passage runt hinder"]
  },
  {
    id: 47,
    name: "Påbjuden passage till vänster",
    description: "Rund blå skylt med vit pil som går runt hinder till vänster",
    category: "mandatory",
    imageUrl: signImages['47'],
    options: ["Sväng vänster", "Påbjuden passage till vänster", "Rondell", "Avfart vänster"],
    correctAnswer: 1,
    explanation: "Du MÅSTE passera hindret (refug, trafikö) på vänster sida. Vanlig vid vägarbeten.",
    commonMistakes: ["Pilen visar passage runt hinder, inte vanlig svängning"]
  },
  {
    id: 48,
    name: "Rondell",
    description: "Rund blå skylt med vita pilar i cirkel",
    category: "mandatory",
    imageUrl: signImages['48'],
    options: ["Cirkulationsplats", "Rondell", "Påbjuden riktning", "Trafikö"],
    correctAnswer: 1,
    explanation: "Anger rondell (cirkulationsplats). Kör medurs och lämna företräde åt trafik i rondellen.",
    commonMistakes: ["Kom ihåg väjningsplikt för trafik som redan är i rondellen"]
  },
  {
    id: 49,
    name: "Separat cykel- och gångbana",
    description: "Rund blå skylt med cykel- och fotgängarsymbol separerade med linje",
    category: "mandatory",
    imageUrl: signImages['49'],
    options: ["Gemensam cykel- och gångbana", "Separat cykel- och gångbana", "Cykelväg", "Gångväg"],
    correctAnswer: 1,
    explanation: "Separata banor för cyklister och fotgängare. Linjen visar att de har var sin sida.",
    commonMistakes: ["Linje mellan = separata banor, ingen linje = gemensam bana"]
  },

  // Fler upplysningsskyltar
  {
    id: 50,
    name: "Slut på motorväg",
    description: "Rektangulär grön skylt med överstruket motorvägssymbol",
    category: "information",
    imageUrl: signImages['50'],
    options: ["Motorväg", "Slut på motorväg", "Motortrafikled", "Avfart"],
    correctAnswer: 1,
    explanation: "Anger att motorvägen tar slut. Vanliga vägregler gäller igen från denna punkt.",
    commonMistakes: ["Rött streck över symbol = slut på det som symbolen visar"]
  },
  {
    id: 51,
    name: "Slut på motortrafikled",
    description: "Rektangulär blå skylt med överstruket bilsymbol",
    category: "information",
    imageUrl: signImages['51'],
    options: ["Motortrafikled", "Slut på motortrafikled", "Motorväg", "Allmän väg"],
    correctAnswer: 1,
    explanation: "Anger att motortrafikleden tar slut. Vanliga vägregler gäller igen.",
    commonMistakes: ["Blå bakgrund = motortrafikled, grön = motorväg"]
  },
  {
    id: 52,
    name: "Slut på huvudled",
    description: "Gul romb med svart diagonal linje",
    category: "information",
    imageUrl: signImages['52'],
    options: ["Huvudled", "Slut på huvudled", "Förkörsrätt", "Väjningsplikt"],
    correctAnswer: 1,
    explanation: "Anger att huvudleden tar slut. Du har inte längre förkörsrätt mot sidovägar.",
    commonMistakes: ["Svart streck genom gul romb = slut på huvudled"]
  },
  {
    id: 53,
    name: "Busshållplats",
    description: "Rektangulär vit skylt med buss-symbol och 'HÅLLPLATS'",
    category: "information",
    imageUrl: signImages['53'],
    options: ["Bussförbud", "Busshållplats", "Busskörfält", "Kollektivtrafik"],
    correctAnswer: 1,
    explanation: "Anger busshållplats. Parkering och stannande är förbjudet inom 15 meter före hållplatsen.",
    commonMistakes: ["15 meters regel före hållplatsen är viktig att komma ihåg"]
  },
  {
    id: 54,
    name: "Sjukhus",
    description: "Rektangulär blå skylt med vitt kors",
    category: "information",
    imageUrl: signImages['54'],
    options: ["Första hjälpen", "Sjukhus", "Apotek", "Vårdcentral"],
    correctAnswer: 1,
    explanation: "Anger riktning till sjukhus eller akutmottagning. Viktigt för utryckningsfordon.",
    commonMistakes: ["Vitt kors på blå bakgrund = sjukhus"]
  },
  {
    id: 55,
    name: "Bensinstation",
    description: "Rektangulär blå skylt med bensinpump-symbol",
    category: "information",
    imageUrl: signImages['55'],
    options: ["Verkstad", "Bensinstation", "Bilservice", "Parkeringsplats"],
    correctAnswer: 1,
    explanation: "Anger riktning till bensinstation eller tankställe.",
    commonMistakes: ["Bensinpump-symbol är lätt att känna igen"]
  },
  {
    id: 56,
    name: "Rastplats",
    description: "Rektangulär blå skylt med bord och bänk-symbol",
    category: "information",
    imageUrl: signImages['56'],
    options: ["Parkering", "Rastplats", "Picknickområde", "Lekplats"],
    correctAnswer: 1,
    explanation: "Anger rastplats med bord och bänkar för vila och måltider.",
    commonMistakes: ["Bord-symbol = rastplats, P = parkering"]
  },
  {
    id: 57,
    name: "Telefon",
    description: "Rektangulär blå skylt med telefon-symbol",
    category: "information",
    imageUrl: signImages['57'],
    options: ["Information", "Telefon", "Nödtelefon", "Kommunikation"],
    correctAnswer: 1,
    explanation: "Anger var det finns telefon, ofta nödtelefon längs motorvägar.",
    commonMistakes: ["Viktigt för nödsituationer, särskilt på motorvägar"]
  },
  {
    id: 58,
    name: "Toalett",
    description: "Rektangulär blå skylt med WC-symbol",
    category: "information",
    imageUrl: signImages['58'],
    options: ["Rastplats", "Toalett", "Service", "Vila"],
    correctAnswer: 1,
    explanation: "Anger var det finns toaletter, ofta vid rastplatser och serviceanläggningar.",
    commonMistakes: ["WC-symbol är internationell standard"]
  },
  {
    id: 59,
    name: "Camping",
    description: "Rektangulär blå skylt med tält-symbol",
    category: "information",
    imageUrl: signImages['59'],
    options: ["Rastplats", "Camping", "Övernattning", "Tältplats"],
    correctAnswer: 1,
    explanation: "Anger riktning till campingplats eller område där camping är tillåtet.",
    commonMistakes: ["Tält-symbol = camping/tältning"]
  },
  {
    id: 60,
    name: "Turistinformation",
    description: "Rektangulär blå skylt med 'i' i cirkel",
    category: "information",
    imageUrl: signImages['60'],
    options: ["Information", "Turistinformation", "Vägvisning", "Service"],
    correctAnswer: 1,
    explanation: "Anger var det finns turistinformation och vägledning för besökare.",
    commonMistakes: ["'i' i cirkel = information"]
  }
];

// Kombinera alla skyltar
const allTrafficSigns = [...trafficSigns, ...additionalTrafficSigns];

const categories = [
  { key: 'all', label: 'Alla skyltar', color: 'bg-gray-100 text-gray-800' },
  { key: 'warning', label: 'Varningsskyltar', color: 'bg-yellow-100 text-yellow-800' },
  { key: 'prohibition', label: 'Förbud', color: 'bg-red-100 text-red-800' },
  { key: 'mandatory', label: 'Påbud', color: 'bg-blue-100 text-blue-800' },
  { key: 'information', label: 'Upplysning', color: 'bg-green-100 text-green-800' }
];

interface QuizResult {
  score: number;
  total: number;
  passed: boolean;
  timeSpent: number;
  categoryScores: { [key: string]: { correct: number; total: number } };
  incorrectAnswers: { question: TrafficSign; userAnswer: number }[];
}

export const TrafficSignsQuiz: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showImages, setShowImages] = useState(true);

  const filteredSigns = selectedCategory === 'all' 
    ? allTrafficSigns 
    : allTrafficSigns.filter(sign => sign.category === selectedCategory);

  useEffect(() => {
    let interval: number;
    if (quizStarted && !quizCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted, startTime]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setAnswers(new Array(filteredSigns.length).fill(null));
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

    if (currentQuestion < filteredSigns.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowExplanation(false);
    } else {
      completeQuiz();
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

  const completeQuiz = () => {
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer;
    }

    const correctAnswers = finalAnswers.filter((answer, index) => 
      answer === filteredSigns[index].correctAnswer
    ).length;

    const incorrectAnswers = finalAnswers
      .map((answer, index) => ({ answer, index }))
      .filter(({ answer, index }) => answer !== filteredSigns[index].correctAnswer)
      .map(({ answer, index }) => ({ 
        question: filteredSigns[index], 
        userAnswer: answer || -1 
      }));

    const categoryScores: { [key: string]: { correct: number; total: number } } = {};
    
    categories.slice(1).forEach(category => {
      const categoryQuestions = filteredSigns.filter(q => q.category === category.key);
      const categoryCorrect = categoryQuestions.filter(q => {
        const questionIndex = filteredSigns.findIndex(fq => fq.id === q.id);
        return finalAnswers[questionIndex] === q.correctAnswer;
      }).length;
      
      if (categoryQuestions.length > 0) {
        categoryScores[category.key] = {
          correct: categoryCorrect,
          total: categoryQuestions.length
        };
      }
    });

    const quizResult: QuizResult = {
      score: correctAnswers,
      total: filteredSigns.length,
      passed: correctAnswers >= Math.ceil(filteredSigns.length * 0.8),
      timeSpent: timeElapsed,
      categoryScores,
      incorrectAnswers
    };

    setResult(quizResult);
    setQuizCompleted(true);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setTimeElapsed(0);
    setResult(null);
  };

  const getCategoryInfo = (categoryKey: string) => {
    return categories.find(cat => cat.key === categoryKey) || categories[0];
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Svenska Vägmärken Quiz</h2>
            <p className="text-gray-600 text-lg">
              Testa dina kunskaper om svenska vägmärken och trafikskyltar
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Välj kategori
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map(category => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedCategory === category.key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${category.color}`}>
                    {category.label}
                  </span>
                  <div className="text-sm text-gray-600">
                    {category.key === 'all' ? allTrafficSigns.length : allTrafficSigns.filter(s => s.category === category.key).length} skyltar
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={showImages}
                onChange={(e) => setShowImages(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Visa bilder (rekommenderat för bättre träning)</span>
            </label>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-800 mb-3">Quiz Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p><strong>Antal frågor:</strong> {filteredSigns.length}</p>
                <p><strong>Godkäntgräns:</strong> {Math.ceil(filteredSigns.length * 0.8)} rätt (80%)</p>
              </div>
              <div>
                <p><strong>Kategori:</strong> {getCategoryInfo(selectedCategory).label}</p>
                <p><strong>Tid:</strong> Obegränsad</p>
              </div>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Starta Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted && result) {
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
              {result.passed ? "Grattis! Du klarade quizen!" : "Tyvärr, du klarade inte quizen"}
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
                {Object.entries(result.categoryScores).map(([category, scores]) => {
                  const categoryInfo = getCategoryInfo(category);
                  return (
                    <div key={category} className="flex justify-between text-sm">
                      <span>{categoryInfo.label}:</span>
                      <span className="font-semibold">
                        {scores.correct}/{scores.total} ({Math.round((scores.correct / scores.total) * 100)}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {result.incorrectAnswers.length > 0 && (
            <div className="bg-red-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-red-800 mb-4">Fel svar att repetera</h3>
              <div className="space-y-4">
                {result.incorrectAnswers.slice(0, 5).map((incorrect, index) => (
                  <div key={index} className="bg-white rounded p-4">
                    <h4 className="font-medium text-gray-800 mb-2">{incorrect.question.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{incorrect.question.explanation}</p>
                    <div className="text-xs text-red-600">
                      Rätt svar: {incorrect.question.options[incorrect.question.correctAnswer]}
                    </div>
                  </div>
                ))}
                {result.incorrectAnswers.length > 5 && (
                  <p className="text-sm text-gray-600">
                    ...och {result.incorrectAnswers.length - 5} fler att repetera
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Nytt Quiz
            </button>
            <button
              onClick={() => setSelectedCategory('all')}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              Ändra kategori
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sign = filteredSigns[currentQuestion];
  const progress = ((currentQuestion + 1) / filteredSigns.length) * 100;
  const categoryInfo = getCategoryInfo(sign.category);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Fråga {currentQuestion + 1} av {filteredSigns.length}
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowImages(!showImages)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showImages ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {showImages ? 'Dölj' : 'Visa'} bild
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                {formatTime(timeElapsed)}
              </div>
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
          <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${categoryInfo.color}`}>
            {categoryInfo.label}
          </span>
        </div>

        {/* Sign image */}
        {showImages && (
          <div className="mb-6">
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <img 
                src={sign.imageUrl} 
                alt={sign.name}
                className="max-w-full h-48 mx-auto object-cover rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-600 mt-3 italic">{sign.description}</p>
            </div>
          </div>
        )}

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Vad betyder denna skylt?
          </h3>

          {/* Answer options */}
          <div className="space-y-3">
            {sign.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";
              
              if (showExplanation) {
                if (index === sign.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== sign.correctAnswer) {
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
                    {showExplanation && index === sign.correctAnswer && (
                      <CheckCircle className="h-5 w-5 ml-auto text-green-600" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== sign.correctAnswer && (
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
          <div className="mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 mb-4">
              <h4 className="font-semibold text-blue-800 mb-2">Förklaring:</h4>
              <p className="text-gray-700">{sign.explanation}</p>
            </div>
            
            {sign.commonMistakes && sign.commonMistakes.length > 0 && (
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 mb-2">Vanliga misstag:</h4>
                <ul className="text-gray-700 text-sm">
                  {sign.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              {currentQuestion === filteredSigns.length - 1 ? 'Avsluta Quiz' : 'Nästa'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

