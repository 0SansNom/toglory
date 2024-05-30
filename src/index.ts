import { App } from './app';

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('game.html')) {
        new App();
    }
});
