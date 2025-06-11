import { initYaGames } from './main.js';

export async function buyCoins(amount) {
    const ya = await initYaGames();
    if (ya && ya.payments) {
        try {
            const items = await ya.payments.purchase({ id: `coins_${amount}` });
            return items; // for real use
        } catch (e) {
            console.log('purchase error', e);
        }
    } else {
        console.log(`Stub purchase ${amount} coins`);
    }
    return null;
}

export async function purchaseContinue() {
    const ya = await initYaGames();
    if (ya && ya.payments) {
        try {
            await ya.payments.purchase({ id: 'continue' });
            return true;
        } catch (e) {
            console.log('purchase continue error', e);
        }
    } else {
        console.log('Stub continue purchase');
        return true; // Always succeed in stub
    }
    return false;
}
