![GitHub Repo stars](https://img.shields.io/github/stars/maleneivy/popthebubble?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/maleneivy/popthebubble)
![GitHub license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey)

📖 This document is available in [English](README.en.md).

# 🫧 Pop The Bubble 🫧  

**Pop The Bubble** er et morsomt og interaktivt nettleserspill der målet er å poppe flest mulig bobler før tiden renner ut! Men pass deg – noen bobler gir minuspoeng!  

![Pop The Bubble Gameplay](/src/assets/img/game.png)

## 🎮 Spillets regler  
- Pop blå bobler for å tjene poeng.  
- Unngå de røde boblene – de gir minuspoeng!  
- Spillet varer i **20 sekunder** – hvor mange poeng kan du få?  
- Velg mellom **forskjellige vanskelighetsgrader** og **spillmoduser**:  
  - **Lett, Medium, Hard** (hastighet på boblene)  
  - **Calm eller Chaos** (bevegelsesmønster)  

## ✨ Funksjoner  
✔️ **Dynamiske bobler** med varierende størrelse og poengverdi.  
✔️ **Røde minusbobler** gir spillet en ekstra utfordring.  
✔️ **Nedtelling og visuelle effekter** for siste sekunder.  
✔️ **Responsivt design** – spill på både desktop og mobil.  
✔️ **Lett å utvide** – enkel kodebase med TypeScript.  

## 🛠️ Teknologi  
**Pop The Bubble** er laget med følgende teknologier:  
- **HTML, CSS, TypeScript**  
- **DOM-manipulasjon for dynamiske bobler**  
- **CSS-animasjoner for boblebevegelser**  

## 📂 Prosjektstruktur  
```
pop-the-bubble/   
├── src/ # Kildekode 
│   ├── app.ts # Hovedlogikk for spillet 
│   ├── styles.css # Spilldesign og layout 
│   ├── index.html # Hoved-HTML-struktur 
├── assets/ # Bilder, ikoner og lyder 
│   ├── icons/ # SVG-ikoner
├── dist/ # Bygget versjon (for distribusjon) 
├── .github/workflows/ # CI/CD workflows
├── README.md # Dokumentasjon på norsk
├── README.en.md # Dokumentasjon på engelsk
├── LICENSE # Prosjektlisens (CC BY-NC 4.0 – Kun ikke-kommersiell bruk)
├── package.json # Prosjektavhengigheter og scripts 
├── tsconfig.json # TypeScript-konfigurasjon
├── eslint.config.js # ESLint-konfigurasjon for kodekvalitet
```

## Kom i gang  
### 1️⃣ Installer avhengigheter  
```sh
npm install
```

### 2️⃣ Kjør spillet lokalt
```sh
npm run watch
```

Dette starter en live-server slik at du kan teste spillet i nettleseren.

### 3️⃣ Bygg prosjektet
```sh
npm run build
```
Dette kompilerer TypeScript-koden og kopierer nødvendige filer til dist/-mappen.

## Videre utvikling
Ønsker du å bidra eller utvide spillet? Her er noen idéer:

- 🎨 **Flere bobletyper** (for eksempel power-ups eller frosne bobler).
- 🔊 **Forskjellige lydeffekter** basert på boblestørrelse.
- 🏆 **Highscore-lagring** med LocalStorage eller database.

## Contributing (Bidra til prosjektet)
Dette prosjektet er åpent for læring og eksperimentering! Om du vil bidra: 

1. Fork repoet til din egen GitHub-konto
2. Lag en ny branch for endringene dine:
   ```
   git checkout -b feature-navn
   ```
3. Gjør endringer, commit og push branchen din:
   ```
   git commit -m "La til ny funksjon"
   git push origin feature-navn
   ````
4. Opprett en Pull Request til main-branchen.

## 🔒 Regler for bidrag
* Alle endringer må gjøres via Pull Requests – direkte push til `main` er ikke tillatt.
* Koden skal følge TypeScript-standarden, og linting/build checks må passere før en PR kan merges.
* Hold koden ryddig, og legg til beskrivelse av hva som er endret.

## 📜 Lisens
Dette prosjektet er lisensiert under **CC BY-NC 4.0**.  
🔹 Du kan bruke, modifisere og dele koden.  
❌ **Men du kan ikke bruke den kommersielt uten tillatelse.**  

Dette betyr at du kan bruke og dele koden, men du kan **ikke** bruke den i en kommersiell app eller tjeneste uten eksplisitt tillatelse.

For mer informasjon: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
