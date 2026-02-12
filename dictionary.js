/* dictionary.js */

window.DICTIONARY_DATA = new Set();

async function loadFullDictionary() {
    try {
        // On charge ton fichier French.txt
        const response = await fetch('French.txt'); 
        const text = await response.text();
        
        const lines = text.split(/\r?\n/);
        const cleanWords = [];

        for (let line of lines) {
            // 1. On ignore la première ligne (le chiffre)
            if (!isNaN(line.trim())) continue;

            // 2. On ne garde que ce qui est AVANT le slash '/' ou l'espace
            let word = line.split('/')[0].split(' ')[0].trim();

            // 3. On nettoie (accents, majuscules)
            word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

            // 4. On ignore les mots trop courts ou bizarres (chiffres, symboles)
            if (word.length > 1 && /^[A-Z-]+$/.test(word)) {
                cleanWords.push(word);
            }
        }

        // Utilisation d'un Set pour supprimer les doublons et chercher super vite
        window.DICTIONARY_DATA = new Set(cleanWords);

        console.log(`📚 Dictionnaire nettoyé : ${window.DICTIONARY_DATA.size} mots chargés.`);
        window.dispatchEvent(new Event('dictionaryReady'));
        
    } catch (e) {
        console.error("Erreur de chargement :", e);
        window.DICTIONARY_DATA = new Set(["BOMBE", "EXPLOSION", "VOCABULAIRE"]);
    }
}

loadFullDictionary();