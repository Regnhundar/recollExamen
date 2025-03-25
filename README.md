# **RECOLLACTION:**

<br>

### **KURS:**

_"EXAMENSARBETE"_

<br>

### **ELEV:**

MAGNUS NILSSON

<br>
<br>

# **PROJEKTET:**

### **HUR MAN TESTAR APPEN:**

Kort svar. Be mig om en .apk fil så du kan installera appen på din android telefon.

Vill du testa koden lokalt behöver du ta hem appen [EXPO GO](https://play.google.com/store/apps/details?id=host.exp.exponent&pli=1) på din telefon.

Klona repot till din dator.

Skriv i terminalen:

`npm i `

Följt av:

`npx expo start`

Du kommer nu se en QR-kod.

Öppna expo go på din telefon. Du ska se ett val att scanna en QR-kod. Välj det och scanna QR-koden i terminalen. Detta ska starta appen.

Du SKA inte behöva skapa ett konto på expo men om den tvingar dig till det så hittar du adressen [HÄR](https://expo.dev/).

Om inte detta fungerar och du inte vill installera en apk-fil så försöker vi lösa det med en webtunnel till min dev-server.

### **VAD HAR JAG BYGGT?**

Jag har som mitt första projekt i React-Native byggt ett spel. Det är ett klassbaserat memory-spel där man spelar mot en annan spelare på samma mobiltelefon. Man sitter mittemot varandra med telefonen i mitten.

Varje klass har 3 abilities. För att få mana till dessa abilities så matchar du kort. Första korten du matchar på din omgång ger 1 mana till sin respektive ability. Andra paret ger 2 och så fortsätter det så tills du misslyckas och det resettar tillbaka till 1 igen. Matchar du alla 3 abilities får du en ny slumpad spelplan och kombon fortsätter.

Spelet når game over när din eller din motståndares hälsa når 0.

### **PLANERING:**

Jag fick idéen till spelet för ganska länge sedan men har hela tiden tänkt att det ska göras som en app för att slippa adressfältet, statusbar osv.

Väldigt nyfiken på att skapa appar och då jag vid det här laget tycker jag kan vanliga React så borde det vara lätt att gå över till native.

Jag började med att spåna på idéer och basic layout i FIGMA: [LÄNK HÄR](https://www.figma.com/design/Utjr2rRZpQy4rXqkazPtht/Memorizer?node-id=0-1&t=01LRsVt8EwXxLyKs-1).

Efter det skapade jag upp repot på github och gjorde ett project på github projects med initiala userstories i backloggen:

![Github-project](/assets/images/githubProjects.png)

Jag har jobbat enligt principen "Make it work, make it good". Nu har inte tiden räckt till för att göra det faktiskt bra men allteftersom backlog blivit tom har jag lagt till nya features för att förbättra det som sticker ut mest. En iterativ process helt enkelt.

### **STRUKTUR:**

Jag har försökt strukturera koden på ett logiskt sätt. Mapparna app(som innehåller routes, tänk pages) och assets måste vara i root och kan inte flyttas.

Resten har jag flyttat till src där components, interfaces, stores osv har egna mappar. Mappen theme innehåller vad man kan likna med CSS-variabler.

Jag har försökt bryta ned funktioner till mindre delar för att sedan använda de små funktionerna för att bygga logiken. I utility håller jag allmänna funktioner. Mappen game är uppdelad till två: gameboard och player.

Gameboard innehåller utility-funktioner relaterade till gameboard medan player håller utility funktioner och data specifikt för spelarna.
