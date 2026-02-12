/**
 * 💣 TIC TAC BOOM - DICTIONNAIRE FRANÇAIS
 * Dictionnaire complet avec conjugaisons et pluriels
 * Chargement asynchrone pour optimiser les performances
 */

const Dictionary = {
    words: new Set(),
    loaded: false,
    
    /**
     * Charger le dictionnaire depuis l'API Lexique.org
     */
    async load() {
        if (this.loaded) return true;
        
        try {
            console.log('📚 Chargement du dictionnaire...');
            
            const response = await fetch('https://www.lexique.org/databases/Lexique383/Lexique383.tsv', {
                signal: AbortSignal.timeout(15000) // Timeout 15s
            });
            
            if (!response.ok) throw new Error('Erreur réseau');
            
            const text = await response.text();
            const lines = text.split('\n');
            
            // Ignorer la première ligne (en-têtes)
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const columns = line.split('\t');
                if (columns.length > 0) {
                    const word = columns[0].toUpperCase().trim();
                    
                    // Validation stricte : minimum 3 lettres, lettres françaises uniquement
                    if (word.length >= 3 && /^[A-ZÀÂÄÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/.test(word)) {
                        this.words.add(word);
                        
                        // Ajouter aussi la version sans accents pour la recherche
                        const unaccented = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        this.words.add(unaccented);
                    }
                }
            }
            
            this.loaded = true;
            console.log(`✅ Dictionnaire chargé : ${this.words.size.toLocaleString()} mots`);
            return true;
            
        } catch (error) {
            console.error('❌ Erreur chargement dictionnaire:', error);
            this.loadFallback();
            return false;
        }
    },
    
    /**
     * Dictionnaire de secours en cas d'échec de chargement
     */
    loadFallback() {
        console.log('📚 Chargement dictionnaire de secours...');
        
        const fallbackWords = [
            // Mots courants (200+ mots)
            'ABANDON', 'ABRI', 'ABSENCE', 'ABSOLU', 'ACCENT', 'ACCEPTER', 'ACCIDENT', 'ACCORD', 'ACCUEIL', 'ACHETER',
            'ACIER', 'ACTEUR', 'ACTION', 'ADIEU', 'ADMIRER', 'ADRESSE', 'ADULTE', 'AFFAIRE', 'AFFICHE', 'AFFREUX',
            'AFRICAIN', 'AGENT', 'AGIR', 'AGITER', 'AGNEAU', 'AGONIE', 'AGRICOLE', 'AIDER', 'AIGLE', 'AIGUILLE',
            'AILE', 'AILLEURS', 'AIMER', 'AINSI', 'AJOUTER', 'ALARME', 'ALBUM', 'ALCOOL', 'ALIMENT', 'ALLEMAND',
            'ALLER', 'ALLUMER', 'ALORS', 'AMANT', 'AMBITION', 'AMENER', 'AMER', 'AMICAL', 'AMITIE', 'AMOUR',
            'AMUSANT', 'AMUSER', 'ANCIEN', 'ANGE', 'ANGLAIS', 'ANGOISSE', 'ANIMAL', 'ANNEAU', 'ANNEE', 'ANNONCER',
            'ANTIQUE', 'ANXIEUX', 'APERCEVOIR', 'APAISER', 'APPAREIL', 'APPARTEMENT', 'APPELER', 'APPORTER', 'APPRENDRE', 'APPROCHER',
            'APPUYER', 'APRES', 'ARBRE', 'ARGENT', 'ARGUMENT', 'ARME', 'ARMEE', 'ARRACHER', 'ARRETER', 'ARRIVER',
            'ARTISTE', 'ASPECT', 'ASSEOIR', 'ASSEZ', 'ASSIETTE', 'ASSISTER', 'ASSURER', 'ATTACHER', 'ATTAQUE', 'ATTEINDRE',
            'ATTENDRE', 'ATTENTION', 'ATTIRER', 'ATTITUDE', 'AUCUN', 'AUDACE', 'AUGMENTER', 'AUJOURD', 'AUSSITOT', 'AUTANT',
            'AUTEUR', 'AUTOMNE', 'AUTORISER', 'AUTORITE', 'AUTOUR', 'AUTRE', 'AVANCE', 'AVANCER', 'AVANT', 'AVANTAGE',
            'AVENIR', 'AVENTURE', 'AVENUE', 'AVERTIR', 'AVEUGLE', 'AVION', 'AVIS', 'AVOCAT', 'AVOIR', 'AVOUER',
            'BAGAGE', 'BAGUE', 'BAIN', 'BAISER', 'BAISSER', 'BALANCE', 'BALCON', 'BALLE', 'BALLON', 'BANDE',
            'BANQUE', 'BANQUET', 'BAPTEME', 'BARBE', 'BARREAU', 'BARRIERE', 'BASE', 'BATAILLE', 'BATEAU', 'BATIMENT',
            'BATIR', 'BATTRE', 'BEAU', 'BEAUCOUP', 'BEAUTE', 'BEBE', 'BESOIN', 'BETE', 'BETISE', 'BEURRE',
            'BIBLIOTHEQUE', 'BIEN', 'BIENTOT', 'BIJOU', 'BILLET', 'BIZARRE', 'BLANC', 'BLANCHIR', 'BLESSER', 'BLEU',
            'BLOND', 'BOIRE', 'BOIS', 'BOISSON', 'BOITE', 'BONBON', 'BOND', 'BONHEUR', 'BONJOUR', 'BONSOIR',
            'BONTE', 'BORD', 'BORNE', 'BOUCHE', 'BOUCHER', 'BOUCLE', 'BOUE', 'BOUGER', 'BOUGIE', 'BOUILLIR',
            'BOULANGER', 'BOULEVARD', 'BOURGEOIS', 'BOURSE', 'BOUT', 'BOUTEILLE', 'BOUTIQUE', 'BOUTON', 'BRANCHE', 'BRAS',
            'BRAVE', 'BRAVER', 'BREF', 'BRIDGE', 'BRILLANT', 'BRILLER', 'BRISER', 'BRONZE', 'BROSSE', 'BROSSER',
            'BROUILLARD', 'BRUIT', 'BRULER', 'BRUN', 'BRUSQUE', 'BRUTAL', 'BUREAU', 'CACHER', 'CACHETTE', 'CADAVRE',
            'CADEAU', 'CADRE', 'CAFE', 'CAGE', 'CAISSE', 'CALCUL', 'CALENDRIER', 'CALME', 'CALMER', 'CAMARADE',
            'CAMERA', 'CAMP', 'CAMPAGNE', 'CANAL', 'CANARD', 'CANDIDAT', 'CANON', 'CAPABLE', 'CAPITAL', 'CAPITAINE',
            'CAPTIF', 'CAPRICE', 'CAPTIVER', 'CAPTER', 'CARACTERE', 'CARESSER', 'CARGO', 'CARNAVAL', 'CARRE', 'CARREAU',
            'CARRIERE', 'CARTE', 'CARTON', 'CASCADE', 'CASSER', 'CATASTROPHE', 'CATEGORIE', 'CATHEDRALE', 'CAUSE', 'CAUSER',
            'CAVALIER', 'CAVE', 'CELEBRE', 'CELEBRER', 'CELIBATAIRE', 'CELUI', 'CENDRE', 'CENT', 'CENTRAL', 'CENTRE',
            'CERCLE', 'CEREMONIE', 'CERISE', 'CERTAIN', 'CERTAINEMENT', 'CERTES', 'CERVEAU', 'CESSER', 'CHAGRIN', 'CHAINE',
            'CHAIR', 'CHAISE', 'CHALEUR', 'CHAMBRE', 'CHAMP', 'CHAMPAGNE', 'CHAMPION', 'CHANCE', 'CHANGEMENT', 'CHANGER',
            'CHANSON', 'CHANTER', 'CHANTEUR', 'CHAPEAU', 'CHAPELLE', 'CHAPITRE', 'CHAQUE', 'CHARBON', 'CHARGE', 'CHARGER',
            'CHARME', 'CHARMANT', 'CHARMER', 'CHASSE', 'CHASSER', 'CHASSEUR', 'CHAT', 'CHATEAU', 'CHAUD', 'CHAUFFER',
            'CHAUSSEE', 'CHAUSSER', 'CHAUSSURE', 'CHEF', 'CHEMIN', 'CHEMINEE', 'CHEMISE', 'CHER', 'CHERCHER', 'CHERI',
            'CHEVAL', 'CHEVALIER', 'CHEVEU', 'CHEVILLE', 'CHEVRE', 'CHIEN', 'CHIFFON', 'CHIFFRE', 'CHIMIE', 'CHINOIS',
            'CHOCOLAT', 'CHOISIR', 'CHOIX', 'CHOSE', 'CHRETIEN', 'CHUTE', 'CIEL', 'CIGARE', 'CIGARETTE', 'CIMETIERE',
            'CINEMA', 'CINQ', 'CINQUANTE', 'CIRCONSTAN', 'CIRCULER', 'CIRER', 'CIRQUE', 'CISEAUX', 'CITER', 'CITOYEN',
            'CITRON', 'CIVILISATION', 'CLAIR', 'CLAIREMENT', 'CLARTE', 'CLASSE', 'CLASSER', 'CLASSIQUE', 'CLIENT', 'CLIMAT',
            'CLOCHE', 'CLOCHER', 'CLOITRE', 'CLORE', 'CLOU', 'CLOUER', 'CLUB', 'COCHER', 'COEUR', 'COFFRE',
            'COIN', 'COLERE', 'COLIS', 'COLLECTIF', 'COLLECTION', 'COLLEGE', 'COLLER', 'COLLIER', 'COLLINE', 'COLONNE',
            'COMBAT', 'COMBATTRE', 'COMBIEN', 'COMBINAISON', 'COMBINER', 'COMEDIE', 'COMIQUE', 'COMMANDANT', 'COMMANDE', 'COMMANDER',
            'COMME', 'COMMENCER', 'COMMENT', 'COMMENTAIRE', 'COMMENTER', 'COMMERCE', 'COMMERCIAL', 'COMMETTRE', 'COMMIS', 'COMMISSAIRE',
            'COMMISSION', 'COMMODE', 'COMMUN', 'COMMUNAL', 'COMMUNE', 'COMMUNIQUER', 'COMPAGNE', 'COMPAGNIE', 'COMPAGNON', 'COMPARABLE',
            'COMPARER', 'COMPARAITRE', 'COMPATRIOTE', 'COMPLET', 'COMPLEMENT', 'COMPLETER', 'COMPLEXE', 'COMPLICE', 'COMPLIMENT', 'COMPLIQUER',
            'COMPORTER', 'COMPOSER', 'COMPOSITEUR', 'COMPOSITION', 'COMPRENDRE', 'COMPROMETTRE', 'COMPTE', 'COMPTER', 'COMPTOIR', 'COMTE',
            'CONCEVOIR', 'CONCIERGE', 'CONCLURE', 'CONCLUSION', 'CONCOURS', 'CONCRET', 'CONDAMNER', 'CONDITION', 'CONDUCTEUR', 'CONDUIRE',
            'CONDUITE', 'CONFERENCE', 'CONFERER', 'CONFESSER', 'CONFIANCE', 'CONFIDENT', 'CONFIER', 'CONFIRMER', 'CONFITURE', 'CONFONDRE',
            'CONFORT', 'CONFUS', 'CONFUSION', 'CONGE', 'CONGRES', 'CONNAISSANCE', 'CONNAITRE', 'CONQUERIR', 'CONQUETE', 'CONSACRER',
            'CONSCIENCE', 'CONSEIL', 'CONSEILLER', 'CONSENTIR', 'CONSEQUENCE', 'CONSERVATEUR', 'CONSERVER', 'CONSIDERABLE', 'CONSIDERER', 'CONSIGNE'
        ];
        
        fallbackWords.forEach(word => {
            this.words.add(word);
            // Ajouter aussi la version sans accents
            const unaccented = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            this.words.add(unaccented);
        });
        
        this.loaded = true;
        console.log(`✅ Dictionnaire de secours chargé : ${this.words.size} mots`);
    },
    
    /**
     * Vérifier si un mot existe dans le dictionnaire
     */
    has(word) {
        if (!this.loaded) {
            console.warn('⚠️ Dictionnaire pas encore chargé');
            return true; // Par défaut, accepter le mot si le dictionnaire n'est pas chargé
        }
        
        const upperWord = word.toUpperCase();
        
        // Vérifier le mot tel quel
        if (this.words.has(upperWord)) return true;
        
        // Vérifier la version sans accents
        const unaccented = upperWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (this.words.has(unaccented)) return true;
        
        return false;
    },
    
    /**
     * Obtenir le nombre de mots dans le dictionnaire
     */
    get size() {
        return this.words.size;
    },
    
    /**
     * Obtenir un mot aléatoire (pour tests)
     */
    getRandomWord() {
        if (!this.loaded || this.words.size === 0) return null;
        const wordsArray = Array.from(this.words);
        return wordsArray[Math.floor(Math.random() * wordsArray.length)];
    }
};

// Export pour utilisation dans le jeu
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dictionary;
}
