import { showFullscreenAdv, showRewarded } from './ads.js';
import { purchaseContinue } from './iap.js';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    init(data) {
        this.score = data.score || 0;
        this.level = data.level || 1;
    }

    create() {
        const { width, height } = this.scale;
        this.add.rectangle(0, 0, width, height, 0x000000, 0.6).setOrigin(0);

        const best = Math.max(this.score, Number(localStorage.getItem('bestScore') || 0));
        localStorage.setItem('bestScore', best);

        this.add.text(width / 2, height / 2 - 60, `Рекорд: ${best}`, { fontSize: '20px', color: '#fff' }).setOrigin(0.5);
        this.add.text(width / 2, height / 2 - 30, `Счёт: ${this.score}`, { fontSize: '24px', color: '#fff' }).setOrigin(0.5);

        const adBtn = this.add.text(width / 2, height / 2 + 10, 'Продолжить за рекламу', { fontSize: '20px', color: '#0f0' }).setOrigin(0.5).setInteractive();
        adBtn.on('pointerdown', async () => {
            await showRewarded();
            this.scene.stop();
            this.scene.resume('GameScene');
        });

        const buyBtn = this.add.text(width / 2, height / 2 + 50, 'Купить продолжение', { fontSize: '20px', color: '#0f0' }).setOrigin(0.5).setInteractive();
        buyBtn.on('pointerdown', async () => {
            const success = await purchaseContinue();
            if (success) {
                this.scene.stop();
                this.scene.resume('GameScene');
            }
        });
    }
}
