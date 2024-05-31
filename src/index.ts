import { App } from './level1';

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('game.html')) {
        new App();
    }
});
