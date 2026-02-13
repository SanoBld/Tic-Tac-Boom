// achievements.js - Système de succès pour Word Bomb

const ACHIEVEMENTS = [
    {
        id: 'first_win',
        name: 'Première Victoire',
        description: 'Gagner votre première partie',
        icon: '🏆',
        check: (stats) => stats.wins >= 1
    },
    {
        id: 'speed_demon',
        name: 'Démon de Vitesse',
        description: 'Gagner une partie en mode Rapide',
        icon: '⚡',
        check: (stats) => stats.fast_wins >= 1
    },
    {
        id: 'survivor',
        name: 'Survivant',
        description: 'Gagner une partie en mode Survie',
        icon: '💀',
        check: (stats) => stats.survival_wins >= 1
    },
    {
        id: 'marathon_master',
        name: 'Maître du Marathon',
        description: 'Atteindre 1000 points en Marathon',
        icon: '🏃',
        check: (stats) => stats.marathon_score >= 1000
    },
    {
        id: 'word_wizard',
        name: 'Sorcier des Mots',
        description: 'Utiliser 100 mots différents',
        icon: '🧙',
        check: (stats) => stats.unique_words >= 100
    },
    {
        id: 'solo_100',
        name: 'Centurion',
        description: 'Atteindre le score de 100 en solo',
        icon: '💯',
        check: (stats) => stats.solo_best >= 100
    },
    {
        id: 'solo_500',
        name: 'Guerrier',
        description: 'Atteindre le score de 500 en solo',
        icon: '⚔️',
        check: (stats) => stats.solo_best >= 500
    },
    {
        id: 'solo_1000',
        name: 'Légende',
        description: 'Atteindre le score de 1000 en solo',
        icon: '👑',
        check: (stats) => stats.solo_best >= 1000
    },
    {
        id: 'perfect_streak',
        name: 'Perfection',
        description: 'Réaliser une série de 10',
        icon: '🔥',
        check: (stats) => stats.best_streak >= 10
    },
    {
        id: 'level_10',
        name: 'Vétéran',
        description: 'Atteindre le niveau 10',
        icon: '⭐',
        check: (stats) => stats.max_level >= 10
    },
    {
        id: 'level_25',
        name: 'Expert',
        description: 'Atteindre le niveau 25',
        icon: '🌟',
        check: (stats) => stats.max_level >= 25
    },
    {
        id: 'games_played_10',
        name: 'Habitué',
        description: 'Jouer 10 parties',
        icon: '🎮',
        check: (stats) => stats.games_played >= 10
    },
    {
        id: 'games_played_50',
        name: 'Vétéran Confirmé',
        description: 'Jouer 50 parties',
        icon: '🎯',
        check: (stats) => stats.games_played >= 50
    },
    {
        id: 'long_word',
        name: 'Érudit',
        description: 'Utiliser un mot de 12 lettres ou plus',
        icon: '📚',
        check: (stats) => stats.longest_word >= 12
    }
];

function getStats() {
    const stored = localStorage.getItem('wordbomb_stats');
    return stored ? JSON.parse(stored) : {
        wins: 0,
        fast_wins: 0,
        survival_wins: 0,
        marathon_score: 0,
        unique_words: 0,
        solo_best: 0,
        best_streak: 0,
        max_level: 0,
        games_played: 0,
        longest_word: 0
    };
}

function saveStats(stats) {
    localStorage.setItem('wordbomb_stats', JSON.stringify(stats));
}

function getUnlockedAchievements() {
    const stored = localStorage.getItem('wordbomb_achievements');
    return stored ? JSON.parse(stored) : [];
}

function saveUnlockedAchievements(unlocked) {
    localStorage.setItem('wordbomb_achievements', JSON.stringify(unlocked));
}

function checkAchievements(newStats) {
    const stats = getStats();
    
    // Mettre à jour les stats
    if(newStats.score && newStats.score > stats.solo_best) {
        stats.solo_best = newStats.score;
    }
    if(newStats.level && newStats.level > stats.max_level) {
        stats.max_level = newStats.level;
    }
    if(newStats.streak && newStats.streak > stats.best_streak) {
        stats.best_streak = newStats.streak;
    }
    if(newStats.mode) {
        stats.games_played++;
    }
    
    saveStats(stats);
    
    // Vérifier les succès
    const unlocked = getUnlockedAchievements();
    const newlyUnlocked = [];
    
    ACHIEVEMENTS.forEach(achievement => {
        if(!unlocked.includes(achievement.id) && achievement.check(stats)) {
            unlocked.push(achievement.id);
            newlyUnlocked.push(achievement);
        }
    });
    
    if(newlyUnlocked.length > 0) {
        saveUnlockedAchievements(unlocked);
    }
    
    return newlyUnlocked;
}

function getAllAchievements() {
    const unlocked = getUnlockedAchievements();
    return ACHIEVEMENTS.map(achievement => ({
        ...achievement,
        unlocked: unlocked.includes(achievement.id)
    }));
}
