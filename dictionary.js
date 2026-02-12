/* dictionary.js */

// On utilise un Set pour que la vérification des mots soit instantanée
window.DICTIONARY_DATA = new Set();

async function loadFullDictionary() {
    try {
        console.log("⏳ Chargement du dictionnaire...");
        
        // On charge ton fichier French.txt (le nouveau que tu as créé)
        const response = await fetch('French.txt'); 
        const text = await response.text();
        
        // On sépare chaque ligne, on nettoie les espaces et on met en majuscules
        // On filtre aussi pour enlever les lignes vides si elles existent
        const rawWords = text.split(/\r?\n/);
        
        const cleanWords = rawWords
            .map(w => w.trim().toUpperCase())
            .filter(w => w.length > 1);

        // On stocke tout dans le Set
        window.DICTIONARY_DATA = new Set(cleanWords);

        console.log(`✅ Dictionnaire prêt : ${window.DICTIONARY_DATA.size} mots chargés.`);
        
        // On prévient le jeu que c'est prêt
        window.dispatchEvent(new Event('dictionaryReady'));
        
    } catch (e) {
        console.error("❌ Erreur critique de chargement :", e);
        // Liste de secours minimale pour que le jeu ne plante pas
        window.DICTIONARY_DATA = new Set(["BOMBE", "EXPLOSION", "JOUEUR", "VICTOIRE"]);
        window.dispatchEvent(new Event('dictionaryReady'));
    }
}

// Lancement automatique au chargement de la page
loadFullDictionary();