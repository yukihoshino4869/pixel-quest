const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
    name: "Hero",
    hp: 100,
    mp: 30,
    atk: 10,
    level: 1,
    exp: 0,
    gold: 0,
    spells: ["Fireball"]
};

let enemy = {
    name: "Slime",
    hp: 30,
    atk: 5,
    exp: 20,
    gold: 10
};

function drawText(text, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(text, x, y);
}

function battleTurn() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawText("You attack the " + enemy.name + "!", 50, 50);
    enemy.hp -= player.atk;
    if (enemy.hp <= 0) {
        drawText("You defeated the " + enemy.name + "!", 50, 80);
        player.exp += enemy.exp;
        player.gold += enemy.gold;
        if (player.exp >= 50) {
            player.level += 1;
            player.hp += 20;
            player.atk += 5;
            player.exp = 0;
            drawText("Level up! You are now level " + player.level + "!", 50, 110);
        }
    } else {
        drawText(enemy.name + " attacks you!", 50, 110);
        player.hp -= enemy.atk;
    }
    drawStatus();
}

function drawStatus() {
    drawText("HP: " + player.hp + " MP: " + player.mp + " Gold: " + player.gold, 50, 440);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawText("Enemy: " + enemy.name + " HP: " + enemy.hp, 50, 50);
    drawText("1. Attack", 50, 100);
    drawText("2. Cast Spell", 50, 140);
    drawText("Press 1 or 2", 50, 180);
    drawStatus();
}

document.addEventListener("keydown", function(event) {
    if (event.key === "1") {
        battleTurn();
    } else if (event.key === "2" && player.mp >= 5) {
        enemy.hp -= 20;
        player.mp -= 5;
        drawText("You cast " + player.spells[0] + "!", 50, 80);
        if (enemy.hp <= 0) {
            drawText("Enemy defeated by magic!", 50, 110);
            player.exp += enemy.exp;
            player.gold += enemy.gold;
        }
        drawStatus();
    }
});

gameLoop();
