let currentEnemy = null;
let battling = false;

function startBattle(enemy) {
  currentEnemy = enemy;
  battling = true;
  // UI表示と初期値設定
  document.getElementById("enemyName").innerText = enemy.type;
  document.getElementById("enemyHP").innerText = enemy.hp;
  document.getElementById("heroHP").innerText = hero.hp;
  document.getElementById("heroMP").innerText = hero.mp;
  document.getElementById("battleLog").innerText = `${enemy.type}が現れた！`;
  document.getElementById("battleUI").style.display = "block";
}
function buyPotion() {
  if (hero.gold >= 10) {
    hero.gold -= 10;
    hero.potions = (hero.potions || 0) + 1;
    updateShopDisplay();
    alert("ポーションを購入しました。所持数: " + hero.potions);
  } else {
    alert("ゴールドが足りません！");
  }
}

let swordBought = false;
function buySword() {
  if (swordBought) {
    alert("これ以上購入できません");
    return;
  }
  if (hero.gold >= 50) {
    hero.gold -= 50;
    hero.attack += 5;
    swordBought = true;
    updateShopDisplay();
    alert("銅の剣を購入しました！攻撃力が5上がった。");
  } else {
    alert("ゴールドが足りません！");
  }
}
function closeShop() {
  document.getElementById("shopUI").style.display = "none";
}
function openShop() {
  document.getElementById("goldAmount").innerText = hero.gold;
  document.getElementById("shopUI").style.display = "block";
}
function updateShopDisplay() {
  document.getElementById("goldAmount").innerText = hero.gold;
}
