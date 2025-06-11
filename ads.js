import { initYaGames } from './main.js';

export async function showFullscreenAdv() {
    const ya = await initYaGames();
    if (ya && ya.adv) {
        try {
            await ya.adv.showFullscreenAdv();
        } catch (e) {
            console.log('Fullscreen adv error', e);
        }
    } else {
        console.log('Stub fullscreen adv');
    }
}

export async function showRewarded() {
    const ya = await initYaGames();
    if (ya && ya.adv) {
        try {
            await ya.adv.showRewardedVideo({ callbacks: {} });
        } catch (e) {
            console.log('Rewarded error', e);
        }
    } else {
        console.log('Stub rewarded video');
    }
}
