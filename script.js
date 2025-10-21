// --- Funció que descodifica de cifrat a Xp primera descodificació ---
function descodificaXppAXp(missatgeCifrat) {
    const longitud = missatgeCifrat.length;
    let resultatArray = new Array(longitud); // array temporal per reconstruir X'
    let indexEsquerra = 0;                   // posició on col·locar caràcters per l'esquerra
    let indexDreta = longitud - 1;           // posició on col·locar caràcters per la dreta
  
    // Recorrem el missatge Xpp i el reconstruïm
    for (let i = 0; i < longitud; i++) {
      if (i % 2 === 0) {
        // Els caràcters en posició parell (0,2,4...) van a l'esquerra
        resultatArray[indexEsquerra] = missatgeCifrat[i];
        indexEsquerra++;
      } else {
        // Els caràcters en posició senar (1,3,5...) van a la dreta
        resultatArray[indexDreta] = missatgeCifrat[i];
        indexDreta--;
      }
    }
    return resultatArray.join(""); // Convertim l’array a cadena
  }
  
  // --- Funció que descodifica de Xp a X (missatge original) ---
  function descodificaXpAX(missatgeXp) {
    let resultat = "";
    let blocConsonants = ""; // acumula caràcters que no són vocals
    const vocals = "aeiouAEIOU";
  
    for (let i = 0; i < missatgeXp.length; i++) {
      const caracter = missatgeXp[i];
      if (vocals.includes(caracter)) {
        // Quan trobem una vocal:
        // 1. Afegim el bloc de consonants invertit
        // 2. Afegim la vocal
        resultat += invertir(blocConsonants) + caracter;
        blocConsonants = "";
      } else {
        // Si no és vocal, acumulem al bloc
        blocConsonants += caracter;
      }
    }
    // Si queda un bloc de consonants al final, també l'afegim invertit
    resultat += invertir(blocConsonants);
    return resultat;
  }
  
  // --- Funció auxiliar per invertir una cadena ---
  function invertir(text) {
    return text.split("").reverse().join("");
  }
  
  // --- Botó: mostra només la primera descodificació (Xpp → Xp) ---
  function mostrarPrimera() {
    const missatgeCifrat = document.getElementById("entrada").value;
    const primeraDescodificacio = descodificaXppAXp(missatgeCifrat);
    document.getElementById("output").innerText =
      "Primera descodificació: " + primeraDescodificacio;
  }
  
  // --- Botó: mostra només la segona descodificació (Xp → X) ---
  function mostrarSegona() {
    const missatgeCifrat = document.getElementById("entrada").value;
    const primeraDescodificacio = descodificaXppAXp(missatgeCifrat);
    const missatgeOriginal = descodificaXpAX(primeraDescodificacio);
    document.getElementById("output").innerText =
      "Missatge descodificat: " + missatgeOriginal;
  }
  
  // --- Botó: mostra tot el procés complet ---
  function mostrarTotes() {
    const missatgeCifrat = document.getElementById("entrada").value;
    const primeraDescodificacio = descodificaXppAXp(missatgeCifrat);
    const missatgeOriginal = descodificaXpAX(primeraDescodificacio);
    document.getElementById("output").innerText =
      "Missatge original: " + missatgeCifrat + "\n" +
      "Primera descodificació: " + primeraDescodificacio + "\n" +
      "Missatge descodificat: " + missatgeOriginal;
  }
  