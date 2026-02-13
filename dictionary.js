/* dictionary.js - CORRIGÉ POUR MULTIJOUEUR */

window.DICTIONARY_DATA = new Set();

async function loadFullDictionary() {
    try {
        console.log("⏳ Chargement du dictionnaire...");
        
        const response = await fetch('French.txt'); 
        const text = await response.text();
        
        const rawWords = text.split(/\r?\n/);
        
        const cleanWords = rawWords
            .map(w => w.trim().toUpperCase())
            .filter(w => w.length > 1);

        window.DICTIONARY_DATA = new Set(cleanWords);

        console.log(`✅ Dictionnaire prêt : ${window.DICTIONARY_DATA.size} mots chargés.`);
        
        window.dispatchEvent(new Event('dictionaryReady'));
        
    } catch (e) {
        console.error("❌ Erreur de chargement :", e);
        window.DICTIONARY_DATA = new Set(["BOMBE", "EXPLOSION", "JOUEUR", "VICTOIRE", "TEMPS", "RAPIDE"]);
        window.dispatchEvent(new Event('dictionaryReady'));
    }
}

// CHARGEMENT AUTOMATIQUE - C'EST ÇA QUI MANQUAIT !
loadFullDictionary();
