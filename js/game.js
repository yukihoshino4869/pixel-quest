const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const map = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
const player = { x: 1, y: 1, hp: 30, mp: 10, atk: 5 };
const enemy = { x: 4, y: 2, hp: 20, atk: 4, alive: true };

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      ctx.fillStyle = map[y][x] === 1 ? "#555" : "#333";
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  if (enemy.alive) {
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x * tileSize, enemy.y * tileSize, tileSize, tileSize);
  }
}

function battle() {
  if (!enemy.alive) return;
  enemy.hp -= player.atk;
  if (enemy.hp <= 0) {
    enemy.alive = false;
    alert("敵を倒した！");
  } else {
    player.hp -= enemy.atk;
    if (player.hp <= 0) {
      alert("あなたはやられた…");
    }
  }
  draw();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "w") player.y--;
  if (e.key === "s") player.y++;
  if (e.key === "a") player.x--;
  if (e.key === "d") player.x++;
  if (player.x === enemy.x && player.y === enemy.y) {
    battle();
  }
  draw();
});

draw();
