import MenuScene from './menu.js';
import GameScene from './game.js';
import UIScene from './ui.js';

let yaGames = null;
export async function initYaGames() {
    try {
        yaGames = await YaGames.init();
    } catch (e) {
        console.log('YaGames init failed, running in stub mode', e);
    }
    return yaGames;
}

window.addEventListener('load', async () => {
    await initYaGames();

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        scene: [MenuScene, GameScene, UIScene]
    };

    new Phaser.Game(config);
});
