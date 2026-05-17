import { useEffect, useRef, useCallback } from 'react';

const W = 480;
const H = 580;
const ENEMY_ROWS = 4;
const ENEMY_COLS = 8;

const ROW_COLORS = ['#f4a261', '#e8624c', '#d97a9a', '#f0c85a'];
const ENEMY_CHARS = [
  ['資', '暑', '與', '你', '夏', '令', '營', '開'],
  ['G', 'o', 'B', 'o', 't', 'G', 'i', 't'],
  ['f', 'u', 'n', 'c', '{', '}', '(', ')'],
  ['✦', '●', '◐', '◈', '✦', '●', '◐', '◈'],
];

function buildEnemies() {
  const list = [];
  for (let r = 0; r < ENEMY_ROWS; r++) {
    for (let c = 0; c < ENEMY_COLS; c++) {
      list.push({
        x: 34 + c * 52,
        y: 52 + r * 44,
        char: ENEMY_CHARS[r][c],
        color: ROW_COLORS[r],
        alive: true,
      });
    }
  }
  return list;
}

function buildState() {
  return {
    player: { x: W / 2, y: H - 46 },
    bullets: [],
    enemies: buildEnemies(),
    eBullets: [],
    particles: [],
    score: 0,
    lives: 3,
    phase: 'playing',
    enemyDir: 1,
    enemyStep: 0,
    lastShot: 0,
    lastEnemyShot: 0,
    invincible: 0,
  };
}

function spawnParticles(state, x, y, color) {
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
    state.particles.push({
      x, y,
      vx: Math.cos(angle) * (1.5 + Math.random() * 3),
      vy: Math.sin(angle) * (1.5 + Math.random() * 3),
      life: 1,
      color,
    });
  }
}

function update(state, dt, now, keys, moveDirRef, touchFireRef) {
  if (state.phase !== 'playing') return;

  const spd = 4.5 * dt;
  if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A') || moveDirRef.current === -1)
    state.player.x = Math.max(18, state.player.x - spd);
  if (keys.has('ArrowRight') || keys.has('d') || keys.has('D') || moveDirRef.current === 1)
    state.player.x = Math.min(W - 18, state.player.x + spd);

  if ((keys.has(' ') || keys.has('ArrowUp') || touchFireRef.current) && now - state.lastShot > 170) {
    state.bullets.push({ x: state.player.x, y: state.player.y - 22 });
    state.lastShot = now;
  }

  state.bullets = state.bullets.filter(b => { b.y -= 9 * dt; return b.y > -10; });

  const alive = state.enemies.filter(e => e.alive);
  state.enemyStep += dt;
  const interval = Math.max(4, 20 - alive.length * 0.35);

  if (state.enemyStep >= interval) {
    state.enemyStep = 0;
    const maxX = alive.reduce((m, e) => Math.max(m, e.x), 0);
    const minX = alive.reduce((m, e) => Math.min(m, e.x), W);

    if ((state.enemyDir > 0 && maxX >= W - 28) || (state.enemyDir < 0 && minX <= 28)) {
      state.enemyDir *= -1;
      alive.forEach(e => { e.y += 16; });
      if (alive.some(e => e.y > H - 76)) state.phase = 'dead';
    } else {
      alive.forEach(e => { e.x += state.enemyDir * 13; });
    }
  }

  if (now - state.lastEnemyShot > 850 + Math.random() * 650 && alive.length > 0) {
    const shooter = alive[Math.floor(Math.random() * alive.length)];
    state.eBullets.push({ x: shooter.x, y: shooter.y + 12, color: shooter.color });
    state.lastEnemyShot = now;
  }

  state.eBullets = state.eBullets.filter(b => { b.y += 5 * dt; return b.y < H + 10; });

  state.bullets = state.bullets.filter(b => {
    for (const e of state.enemies) {
      if (!e.alive) continue;
      if (Math.abs(b.x - e.x) < 15 && Math.abs(b.y - e.y) < 15) {
        e.alive = false;
        state.score += 10;
        spawnParticles(state, e.x, e.y, e.color);
        return false;
      }
    }
    return true;
  });

  if (state.invincible <= 0) {
    state.eBullets = state.eBullets.filter(b => {
      if (Math.abs(b.x - state.player.x) < 15 && Math.abs(b.y - state.player.y) < 15) {
        state.lives--;
        state.invincible = 90;
        spawnParticles(state, state.player.x, state.player.y, '#e8624c');
        if (state.lives <= 0) state.phase = 'dead';
        return false;
      }
      return true;
    });
  } else {
    state.invincible -= dt;
  }

  state.particles = state.particles.filter(p => {
    p.x += p.vx * dt; p.y += p.vy * dt; p.life -= 0.05 * dt;
    return p.life > 0;
  });

  if (alive.length > 0 && state.enemies.every(e => !e.alive)) state.phase = 'won';
}

function draw(ctx, state) {
  ctx.fillStyle = '#080d1a';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(245,232,212,0.10)';
  for (let i = 0; i < 50; i++)
    ctx.fillRect((i * 137.508 + 11) % W, (i * 89.31 + 5) % H, 1, 1);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  state.enemies.forEach(e => {
    if (!e.alive) return;
    ctx.font = 'bold 17px serif';
    ctx.fillStyle = e.color;
    ctx.shadowColor = e.color;
    ctx.shadowBlur = 7;
    ctx.fillText(e.char, e.x, e.y);
  });
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#f0c85a';
  ctx.shadowColor = '#f0c85a';
  ctx.shadowBlur = 9;
  state.bullets.forEach(b => ctx.fillRect(b.x - 2, b.y - 8, 4, 14));
  ctx.shadowBlur = 0;

  state.eBullets.forEach(b => {
    ctx.fillStyle = b.color;
    ctx.shadowColor = b.color;
    ctx.shadowBlur = 5;
    ctx.fillRect(b.x - 2, b.y - 5, 4, 10);
  });
  ctx.shadowBlur = 0;

  if (state.invincible <= 0 || Math.floor(state.invincible / 7) % 2 === 0) {
    const px = state.player.x, py = state.player.y, sz = 18;
    ctx.shadowColor = '#e8624c';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#e8624c';
    ctx.beginPath();
    ctx.moveTo(px, py - sz);
    ctx.lineTo(px - sz * 0.72, py + sz * 0.52);
    ctx.lineTo(px - sz * 0.26, py + sz * 0.1);
    ctx.lineTo(px, py + sz * 0.42);
    ctx.lineTo(px + sz * 0.26, py + sz * 0.1);
    ctx.lineTo(px + sz * 0.72, py + sz * 0.52);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    // Thruster glow
    ctx.fillStyle = 'rgba(240,200,90,0.55)';
    ctx.beginPath();
    ctx.ellipse(px, py + sz * 0.6, 5, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  state.particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
  });
  ctx.globalAlpha = 1;

  ctx.font = '12px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(245,232,212,0.5)';
  ctx.fillText(`SCORE  ${String(state.score).padStart(4, '0')}`, 12, 10);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#e8624c';
  ctx.fillText('♥ '.repeat(Math.max(0, state.lives)).trim(), W - 10, 10);

  if (state.phase !== 'playing') {
    ctx.fillStyle = 'rgba(8,13,26,0.82)';
    ctx.fillRect(0, 0, W, H);
    const isWin = state.phase === 'won';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isWin ? '#f0c85a' : '#e8624c';
    ctx.shadowColor = isWin ? '#f0c85a' : '#e8624c';
    ctx.shadowBlur = 22;
    ctx.font = 'bold 30px monospace';
    ctx.fillText(isWin ? '夏天圓滿！' : 'GAME OVER', W / 2, H / 2 - 28);
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(245,232,212,0.85)';
    ctx.font = '15px monospace';
    ctx.fillText(`SCORE  ${state.score}`, W / 2, H / 2 + 14);
    ctx.fillStyle = 'rgba(245,232,212,0.38)';
    ctx.font = '11px monospace';
    ctx.fillText('[ ESC ]  離開', W / 2, H / 2 + 48);
  }
}

export default function ShootingGame({ onClose }) {
  const canvasRef = useRef(null);
  const moveDirRef = useRef(0);
  const touchFireRef = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext('2d');
    const state = buildState();
    const keys = new Set();

    const onKeyDown = (e) => {
      keys.add(e.key);
      if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key))
        e.preventDefault();
      if (e.key === 'Escape') onCloseRef.current();
    };
    const onKeyUp = (e) => keys.delete(e.key);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    let raf;
    let prev = performance.now();

    function loop(now) {
      const dt = Math.min((now - prev) / 16.67, 3);
      prev = now;
      update(state, dt, now, keys, moveDirRef, touchFireRef);
      draw(ctx, state);
      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => startGame(), [startGame]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink/93 backdrop-blur-sm">
      <div className="flex w-full max-w-[480px] flex-col items-center gap-3 px-4">
        <div className="flex w-full items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.18em] text-paper/35">
            ← → 移動 · SPACE 射擊
          </span>
          <button
            onClick={onClose}
            className="font-mono text-[11px] text-paper/35 transition hover:text-paper/70"
          >
            ESC ✕
          </button>
        </div>

        <canvas
          ref={canvasRef}
          className="block w-full rounded-xl border border-paper/10"
          style={{ maxWidth: W, aspectRatio: `${W} / ${H}`, maxHeight: 'calc(100svh - 150px)' }}
        />

        {/* Mobile controls */}
        <div className="flex w-full gap-3 sm:hidden">
          <button
            className="flex-1 select-none rounded-xl border border-paper/20 bg-paper/5 py-4 font-mono text-xl text-paper/60 active:bg-paper/10"
            onPointerDown={() => { moveDirRef.current = -1; }}
            onPointerUp={() => { moveDirRef.current = 0; }}
            onPointerLeave={() => { moveDirRef.current = 0; }}
          >
            ←
          </button>
          <button
            className="flex-[1.4] select-none rounded-xl border border-sunset/40 bg-sunset/10 py-4 font-mono text-sm tracking-[0.1em] text-sunset active:bg-sunset/20"
            onPointerDown={() => { touchFireRef.current = true; }}
            onPointerUp={() => { touchFireRef.current = false; }}
            onPointerLeave={() => { touchFireRef.current = false; }}
          >
            FIRE
          </button>
          <button
            className="flex-1 select-none rounded-xl border border-paper/20 bg-paper/5 py-4 font-mono text-xl text-paper/60 active:bg-paper/10"
            onPointerDown={() => { moveDirRef.current = 1; }}
            onPointerUp={() => { moveDirRef.current = 0; }}
            onPointerLeave={() => { moveDirRef.current = 0; }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
