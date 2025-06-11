import Player from './player.js';
import { showFullscreenAdv } from './ads.js';
import { buyCoins } from './iap.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.speed = 200;
        this.level = 1;
        this.score = 0;
    }

    preload() {
        this.load.image('ground', 'assets/ground.png');
        this.load.image('obstacle', 'assets/obstacle.png');
        this.load.image('player', 'assets/player.png');
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 600);
        this.ground = this.physics.add.staticGroup();
        for (let i = 0; i < 16; i++) {
            this.ground.create(i * 64, 568, 'ground').setOrigin(0, 0);
        }

        this.player = new Player(this, 100, 500);
        this.obstacles = this.physics.add.group();
        this.time.addEvent({ delay: 1500, callback: this.spawnObstacle, callbackScope: this, loop: true });
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.obstacles, this.gameOver, null, this);

        this.input.on('pointerdown', () => this.player.jump());
    }

    update() {
        this.obstacles.children.iterate(ob => {
            if (ob && ob.x < -50) ob.destroy();
        });
        this.score += 1;
    }

    spawnObstacle() {
        const obs = this.obstacles.create(850, 520, 'obstacle');
        obs.setVelocityX(-this.speed - this.level * 20);
    }

    gameOver() {
        this.scene.pause();
        this.scene.launch('UIScene', { score: this.score, level: this.level });
    }
}
