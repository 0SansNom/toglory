import { Level1 } from './level1';

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('game.html')) {
        new Level1();
    }
});
