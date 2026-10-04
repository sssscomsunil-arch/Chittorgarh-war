const player = document.getElementById("player");
const car = document.getElementById("car");

const hpText = document.getElementById("hp");
const ammoText = document.getElementById("ammo");
const botsText = document.getElementById("bots");
const message = document.getElementById("message");

let x = 48;
let y = 12;

let hp = 500;
let ammo = 30;

const bots = [
    document.querySelector(".bot1"),
    document.querySelector(".bot2"),
    document.querySelector(".bot3"),
    document.querySelector(".bot4")
];

function updatePlayer() {

    x = Math.max(2, Math.min(94, x));
    y = Math.max(8, Math.min(75, y));

    player.style.left = x + "%";
    player.style.bottom = y + "%";
}

function move(direction) {

    const speed = 2;

    if (direction === "up") {
        y += speed;
    }

    if (direction === "down") {
        y -= speed;
    }

    if (direction === "left") {
        x -= speed;
    }

    if (direction === "right") {
        x += speed;
    }

    updatePlayer();
}

document.getElementById("up")
    .addEventListener("click", () => move("up"));

document.getElementById("down")
    .addEventListener("click", () => move("down"));

document.getElementById("left")
    .addEventListener("click", () => move("left"));

document.getElementById("right")
    .addEventListener("click", () => move("right"));

/* KEYBOARD */

document.addEventListener("keydown", function(e) {

    if (e.key === "w" || e.key === "ArrowUp") {
        move("up");
    }

    if (e.key === "s" || e.key === "ArrowDown") {
        move("down");
    }

    if (e.key === "a" || e.key === "ArrowLeft") {
        move("left");
    }

    if (e.key === "d" || e.key === "ArrowRight") {
        move("right");
    }

    if (e.code === "Space") {
        shoot();
    }

});

/* SHOOT */

document.getElementById("fireBtn")
    .addEventListener("click", shoot);

function shoot() {

    if (ammo <= 0) {

        message.textContent = "🔴 Ammo khatam!";

        setTimeout(() => {
            message.textContent =
                "Mission: Fort ke andar sabhi bots ko eliminate karo";
        }, 1200);

        return;
    }

    ammo--;

    ammoText.textContent = ammo;

    /* nearest visible bot */

    let aliveBot = bots.find(bot =>
        bot.style.display !== "none"
    );

    if (aliveBot) {

        aliveBot.style.transform = "scale(.7)";

        setTimeout(() => {

            aliveBot.style.display = "none";

            let remaining =
                bots.filter(bot =>
                    bot.style.display !== "none"
                ).length;

            botsText.textContent = remaining;

            if (remaining === 0) {

                message.textContent =
                    "🏆 CHITTORGARH FORT CLEAR!";

            }

        }, 180);

    }
}

/* BOT MOVEMENT */

setInterval(() => {

    bots.forEach((bot) => {

        if (bot.style.display === "none") return;

        const currentLeft =
            parseFloat(bot.style.left) || 20;

        const randomMove =
            (Math.random() - .5) * 4;

        bot.style.left =
            Math.max(5, Math.min(90,
            currentLeft + randomMove)) + "%";

    });

}, 1200);

/* CAR */

let carX = 66;

setInterval(() => {

    carX += 0.4;

    if (carX > 90) {
        carX = 55;
    }

    car.style.left = carX + "%";

}, 100);
