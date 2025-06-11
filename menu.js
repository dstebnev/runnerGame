import { showFullscreenAdv } from './ads.js';
import { buyCoins } from './iap.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.scale;
        this.add.text(width / 2, height / 2 - 100, 'Runner', { fontSize: '48px', color: '#fff' }).setOrigin(0.5);

        const playBtn = this.add.text(width / 2, height / 2 - 20, 'Играть', { fontSize: '32px', color: '#0f0' }).setOrigin(0.5).setInteractive();
        playBtn.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        const shopBtn = this.add.text(width / 2, height / 2 + 40, 'Магазин', { fontSize: '28px', color: '#0f0' }).setOrigin(0.5).setInteractive();
        shopBtn.on('pointerdown', () => {
            this.openShop();
        });

        const removeAds = this.add.text(width / 2, height / 2 + 90, 'Отключить рекламу', { fontSize: '24px', color: '#0f0' }).setOrigin(0.5).setInteractive();
        removeAds.on('pointerdown', () => {
            buyCoins('noads');
        });
    }

    openShop() {
        const { width, height } = this.scale;
        const rect = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
        const coin100 = this.add.text(width / 2, height / 2 - 30, '100 монет - 29₽', { fontSize: '24px', color: '#fff' }).setOrigin(0.5).setInteractive();
        coin100.on('pointerdown', () => buyCoins(100));
        const coin500 = this.add.text(width / 2, height / 2 + 10, '500 монет - 99₽', { fontSize: '24px', color: '#fff' }).setOrigin(0.5).setInteractive();
        coin500.on('pointerdown', () => buyCoins(500));
        const close = this.add.text(width / 2, height / 2 + 60, 'Закрыть', { fontSize: '20px', color: '#0f0' }).setOrigin(0.5).setInteractive();
        close.on('pointerdown', () => {
            rect.destroy(); coin100.destroy(); coin500.destroy(); close.destroy();
        });
    }
}
