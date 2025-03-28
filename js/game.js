document.addEventListener('keydown', (event) => {
  switch(event.code) {  // event.codeを使用するとキーを識別できます [oai_citation_attribution:1‡developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms/Desktop_with_mouse_and_keyboard#:~:text=Then%20we%20will%20listen%20for,all%20readable%20string%20names%2C%20but)
    case "KeyW": // Wキー
      attemptMove(0, -1);
      break;
    case "KeyS": // Sキー
      attemptMove(0, 1);
      break;
    case "KeyA": // Aキー
      attemptMove(-1, 0);
      break;
    case "KeyD": // Dキー
      attemptMove(1, 0);
      break;
  }
});
function attemptMove(dx, dy) {
  const newX = playerX + dx;
  const newY = playerY + dy;
  // 範囲チェックと衝突チェック
  if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[0].length) return;
  if (map[newY][newX] === 1) return;  // 壁(1)には移動不可
  // 移動を反映
  playerX = newX;
  playerY = newY;
  // キャラクターとマップを再描画
  drawMapAndPlayer();
  // 敵との接触チェック
  checkEncounter();
}
const enemyTypes = {
  "スライム":  { maxHp: 10,  attack: 3,  defense: 0, exp: 5,  gold: 3 },
  "ゴブリン":  { maxHp: 20,  attack: 5,  defense: 1,  exp: 10, gold: 5 },
  "ドラゴン":  { maxHp: 50,  attack: 12, defense: 5,  exp: 30, gold: 20 }
};
let enemies = [];  // マップ上の敵一覧

function spawnEnemy() {
  // ランダムな敵種別を選択
  const types = Object.keys(enemyTypes);
  const type = types[Math.floor(Math.random() * types.length)];
  // ランダムな位置を探す（空白の地形に出現）
  let ex, ey;
  do {
    ex = Math.floor(Math.random() * map[0].length);
    ey = Math.floor(Math.random() * map.length);
  } while (map[ey][ex] !== 0);  // 空地(0)でない限りループ
  // 敵を配置
  enemies.push({ type: type, hp: enemyTypes[type].maxHp, x: ex, y: ey });
}

// ゲーム開始時に数体スポーン
for (let i = 0; i < 5; i++) {
  spawnEnemy();
}
function checkEncounter() {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].x === playerX && enemies[i].y === playerY) {
      // 敵に接触 → バトル開始
      startBattle(enemies[i]);
      enemies.splice(i, 1);  // マップ上から敵を削除（戦闘へ移行）
      break;
    }
  }
}
