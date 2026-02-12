/* dictionary.js */

// Cette variable contiendra la liste finale.
window.DICTIONARY_DATA = [];

/**
 * Charge le dictionnaire complet depuis un fichier compressé ou une liste brute.
 * Pour un dictionnaire de 330k mots, la méthode la plus propre est de pointer
 * vers un fichier .txt ou .json local.
 */
async function loadFullDictionary() {
    try {
        // Chemin vers votre fichier de mots (tous les mots séparés par un retour à la ligne)
        // Vous pouvez télécharger une liste comme 'liste_francais.txt' et la mettre dans le même dossier.
        const response = await fetch('mots_francais.txt'); 
        const text = await response.text();
        
        window.DICTIONARY_DATA = text.split(/\r?\n/).map(word => 
            word.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
        ).filter(word => word.length > 0);

        console.log(`📚 Dictionnaire chargé : ${window.DICTIONARY_DATA.length} mots.`);
        
        // On déclenche un événement pour dire au jeu que c'est prêt
        window.dispatchEvent(new Event('dictionaryReady'));
        
    } catch (e) {
        console.error("Erreur de chargement du dictionnaire local:", e);
        // Liste de secours si le fichier est manquant
        window.DICTIONARY_DATA = ["BONJOUR", "MAISON", "SOLEIL", "BOMBE", "JEU"];
        window.dispatchEvent(new Event('dictionaryReady'));
    }
}

// Lancement du chargement
loadFullDictionary();