/**
 * Posição do mouse sobre o hero, normalizada de -1 a 1 a partir do centro.
 * Objeto simples (não reativo) lido a cada quadro pelo 3D e pela paralaxe.
 */
export type HeroPointer = { x: number; y: number; active: boolean };

export const createHeroPointer = (): HeroPointer => ({ x: 0, y: 0, active: false });
