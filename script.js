// 轻量状态管理：后续关卡会继续沿用这个模式。
const startScreen = document.querySelector("#start-screen");
const cookingScreen = document.querySelector("#cooking-screen");
const gameShell = document.querySelector(".game-shell");
const startButton = document.querySelector("#start-button");
const backButton = document.querySelector("#back-button");
const startArtboard = document.querySelector("#start-artboard");
const ingredientsArtboard = document.querySelector("#ingredients-artboard");
const bowl = document.querySelector("#mixing-bowl");
const mixingBowlArt = document.querySelector("#mixing-bowl-art");
const feedback = document.querySelector("#feedback");
const instruction = document.querySelector("#instruction");
const ingredients = [...document.querySelectorAll(".ingredient")];
const toKneadButton = document.querySelector("#to-knead-button");
const kneadScreen = document.querySelector("#knead-screen");
const kneadBackButton = document.querySelector("#knead-back-button");
const dough = document.querySelector("#dough");
const kneadMeter = document.querySelector("#knead-meter");
const kneadInstruction = document.querySelector("#knead-instruction");
const kneadFeedback = document.querySelector("#knead-feedback");
const toRollButton = document.querySelector("#to-roll-button");
const rollScreen = document.querySelector("#roll-screen");
const rollBackButton = document.querySelector("#roll-back-button");
const flatDough = document.querySelector("#flat-dough");
const rollMeter = document.querySelector("#roll-meter");
const rollInstruction = document.querySelector("#roll-instruction");
const rollFeedback = document.querySelector("#roll-feedback");
const toFillButton = document.querySelector("#to-fill-button");
const fillScreen = document.querySelector("#fill-screen");
const fillBackButton = document.querySelector("#fill-back-button");
const fillInstruction = document.querySelector("#fill-instruction");
const fillFeedback = document.querySelector("#fill-feedback");
const fillButtons = [...document.querySelectorAll(".filling")];
const pastrySkin = document.querySelector("#pastry-skin");
const lotusPaste = document.querySelector("#lotus-paste");
const yolkOne = document.querySelector("#yolk-one");
const yolkTwo = document.querySelector("#yolk-two");
const toWrapButton = document.querySelector("#to-wrap-button");
const wrapScreen = document.querySelector("#wrap-screen");
const wrapBackButton = document.querySelector("#wrap-back-button");
const wrappingDough = document.querySelector("#wrapping-dough");
const wrapFilling = document.querySelector("#wrap-filling");
const wrapInstruction = document.querySelector("#wrap-instruction");
const wrapFeedback = document.querySelector("#wrap-feedback");
const toMoldButton = document.querySelector("#to-mold-button");
const moldScreen = document.querySelector("#mold-screen");
const moldBackButton = document.querySelector("#mold-back-button");
const mold = document.querySelector("#mold");
const moldDough = document.querySelector("#mold-dough");
const moldInstruction = document.querySelector("#mold-instruction");
const pressedMooncake = document.querySelector("#pressed-mooncake");
const moldFeedback = document.querySelector("#mold-feedback");
const toBakeButton = document.querySelector("#to-bake-button");
const bakeScreen = document.querySelector("#bake-screen");
const bakeBackButton = document.querySelector("#bake-back-button");
const bakeMooncake = document.querySelector("#bake-mooncake");
const bakeClock = document.querySelector("#bake-clock");
const oven = document.querySelector("#oven");
const bakeInstruction = document.querySelector("#bake-instruction");
const bakeFeedback = document.querySelector("#bake-feedback");
const plate = document.querySelector("#plate");
const finishedMooncake = document.querySelector("#finished-mooncake");
const bakedTray = document.querySelector("#baked-tray");
const trayMooncake = document.querySelector("#tray-mooncake");
const finishButton = document.querySelector("#finish-button");
const recipe = ["flour", "sugar", "oil"];
const labels = { flour: "面粉", sugar: "糖", oil: "油" };
let step = 0;
let kneadProgress = 0;
let rollProgress = 0;
let fillStep = 0;
let wrapProgress = 0;
let selectedPattern = "";

function startGame() {
  gameShell.classList.add("is-ingredients");
  // 先显示场景；后续交互初始化即使出错，也不能阻断画面切换。
  try {
    resetIngredientStage();
  } catch (error) {
    console.error("食材关初始化失败：", error);
  }
}

function showStartScreen() {
  gameShell.classList.remove("is-ingredients");
  kneadScreen.hidden = true;
  rollScreen.hidden = true;
  fillScreen.hidden = true;
  wrapScreen.hidden = true;
  moldScreen.hidden = true;
  bakeScreen.hidden = true;
  startScreen.hidden = false;
}

function resetIngredientStage() {
  step = 0;
  bowl.classList.remove("has-contents", "success");
  bowl.classList.remove("bowl-stage-1", "bowl-stage-2", "bowl-stage-3");
  mixingBowlArt.src = "assets/ingredients/mixing-bowl-00.png";
  mixingBowlArt.alt = "空碗";
  feedback.textContent = "";
  toKneadButton.hidden = true;
  feedback.className = "feedback";
  instruction.hidden = false;
  instruction.classList.remove("speaker-right");
  instruction.querySelector("span").textContent = "加入面粉！";
  instruction.setAttribute("aria-label", "加入面粉");
  ingredients.forEach((ingredient) => ingredient.classList.remove("used", "dragging"));
}

function addIngredient(name, source) {
  if (name !== recipe[step]) {
    feedback.textContent = `先放${labels[recipe[step]]}喔！`;
    feedback.className = "feedback error";
    return;
  }
  source.classList.add("used");
  bowl.classList.add("has-contents", "success");
  window.setTimeout(() => bowl.classList.remove("success"), 460);
  step += 1;
  bowl.classList.remove("bowl-stage-1", "bowl-stage-2", "bowl-stage-3");
  bowl.classList.add(`bowl-stage-${step}`);
  mixingBowlArt.src = `assets/ingredients/mixing-bowl-0${step}.png`;
  mixingBowlArt.alt = `已加入${labels[name]}的碗`;
  feedback.className = "feedback";
  feedback.textContent = `加入${labels[name]}！`;
  if (step < recipe.length) {
    instruction.querySelector("span").textContent = `加入${labels[recipe[step]]}！`;
    instruction.setAttribute("aria-label", `加入${labels[recipe[step]]}`);
    instruction.classList.toggle("speaker-right", step % 2 === 1);
  } else {
    instruction.hidden = true;
    feedback.textContent = "太好了，三种食材都放好了！";
    toKneadButton.hidden = false;
  }
}

function resetKneadStage() {
  kneadProgress = 0;
  kneadMeter.style.width = "0%";
  kneadInstruction.textContent = "按住面团绕圈，把它揉得圆滚滚！";
  kneadFeedback.textContent = "";
  toRollButton.hidden = true;
  dough.classList.remove("press-left", "press-right", "press-up", "press-down", "kneading");
}

function showKneadStage() {
  gameShell.classList.remove("is-ingredients");
  cookingScreen.hidden = true;
  kneadScreen.hidden = false;
  resetKneadStage();
}

function resetRollStage() {
  rollProgress = 0;
  rollMeter.style.width = "0%";
  flatDough.style.width = "130px";
  flatDough.style.height = "130px";
  flatDough.classList.remove(...spreadClasses);
  rollInstruction.textContent = "从面团中心向四个角拖动，把它摊开！";
  rollFeedback.textContent = "";
  toFillButton.hidden = true;
}

function showRollStage() {
  gameShell.classList.remove("is-ingredients");
  kneadScreen.hidden = true;
  rollScreen.hidden = false;
  resetRollStage();
}

function resetFillStage() {
  fillStep = 0;
  lotusPaste.hidden = true;
  yolkOne.hidden = true;
  yolkTwo.hidden = true;
  fillButtons.forEach((button) => button.classList.remove("used"));
  fillInstruction.innerHTML = "先把<strong>莲蓉</strong>放到面皮中央";
  fillFeedback.textContent = "";
  toWrapButton.hidden = true;
}

function showFillStage() {
  gameShell.classList.remove("is-ingredients");
  rollScreen.hidden = true;
  fillScreen.hidden = false;
  resetFillStage();
}

function addFilling(name, button) {
  const order = ["lotus", "yolk-one", "yolk-two"];
  if (name !== order[fillStep]) {
    fillFeedback.textContent = fillStep === 0 ? "先放莲蓉喔！" : "从碗里取下一颗蛋黄。";
    return;
  }
  button.classList.add("used");
  if (name === "lotus") { lotusPaste.hidden = false; fillInstruction.innerHTML = "从碗中取出<strong>第一颗蛋黄</strong>"; }
  if (name === "yolk-one") { yolkOne.hidden = false; fillInstruction.innerHTML = "再放入<strong>第二颗蛋黄</strong>"; }
  if (name === "yolk-two") { yolkTwo.hidden = false; fillInstruction.textContent = "双黄莲蓉馅完成啦！"; fillFeedback.textContent = "两颗蛋黄都放好了。"; toWrapButton.hidden = false; }
  fillStep += 1;
}

function showWrapStage() { gameShell.classList.remove("is-ingredients"); fillScreen.hidden = true; wrapScreen.hidden = false; wrapProgress = 0; wrapFilling.style.opacity = "1"; wrappingDough.classList.remove("wrap-tl", "wrap-tr", "wrap-bl", "wrap-br"); wrapInstruction.textContent = "点击面皮四下，把馅包起来！"; wrapFeedback.textContent = ""; toMoldButton.hidden = true; }
function showMoldStage() { gameShell.classList.remove("is-ingredients"); wrapScreen.hidden = true; moldScreen.hidden = false; moldPlaced = false; selectedPattern = ""; mold.classList.remove("placed"); mold.style.transform = ""; moldInstruction.textContent = "点击模具，把它放到面团上！"; moldDough.className = "mold-dough"; moldFeedback.textContent = ""; toBakeButton.hidden = true; }
function showBakeStage() { gameShell.classList.remove("is-ingredients"); moldScreen.hidden = true; bakeScreen.hidden = false; bakeScreen.classList.remove("baking", "finished", "oven-open"); oven.classList.remove("baked"); bakeMooncake.className = `bake-mooncake ${selectedPattern}`; bakeMooncake.classList.remove("in-oven"); bakeClock.hidden = true; bakeClock.classList.remove("running"); bakedTray.hidden = true; finishButton.hidden = true; plate.hidden = true; finishedMooncake.className = "finished-mooncake"; trayMooncake.className = "finished-mooncake"; bakeInstruction.textContent = "点击月饼，把它送进烤箱！"; bakeFeedback.textContent = ""; }

function roll(amount) {
  const wasComplete = rollProgress >= 100;
  rollProgress = Math.min(100, rollProgress + amount);
  rollMeter.style.width = `${rollProgress}%`;
  const size = 130 + rollProgress * .6;
  flatDough.style.width = `${size}px`;
  flatDough.style.height = `${size}px`;
  if (!wasComplete && rollProgress >= 100) {
    rollInstruction.textContent = "面皮擀好啦！薄薄的、软软的。";
    rollFeedback.textContent = "接下来按顺序放入莲蓉和蛋黄吧！";
    toFillButton.hidden = false;
  }
}

function knead(amount) {
  const wasComplete = kneadProgress >= 100;
  kneadProgress = Math.min(100, kneadProgress + amount);
  kneadMeter.style.width = `${kneadProgress}%`;
  if (!wasComplete && kneadProgress >= 100) {
    kneadInstruction.textContent = "揉好啦！得到一团软乎乎的面团。";
    kneadFeedback.textContent = "下一步，把面团摊到木砧板上吧！";
    toRollButton.hidden = false;
  }
}

ingredients.forEach((ingredient) => {
  let dragging = false;
  let droppedInBowl = false;
  ingredient.addEventListener("pointerdown", () => { dragging = true; droppedInBowl = false; ingredient.classList.add("dragging"); });
  ingredient.addEventListener("pointerup", (event) => {
    if (!dragging) return;
    dragging = false;
    ingredient.classList.remove("dragging");
    const rect = bowl.getBoundingClientRect();
    const inBowl = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top - 30 && event.clientY <= rect.bottom;
    if (inBowl) {
      droppedInBowl = true;
      addIngredient(ingredient.dataset.ingredient, ingredient);
    }
  });
  ingredient.addEventListener("pointercancel", () => ingredient.classList.remove("dragging"));
  ingredient.addEventListener("click", () => {
    if (droppedInBowl) { droppedInBowl = false; return; }
    addIngredient(ingredient.dataset.ingredient, ingredient);
  });
});

startButton.addEventListener("click", startGame);
backButton.addEventListener("click", showStartScreen);
toKneadButton.addEventListener("click", showKneadStage);
kneadBackButton.addEventListener("click", showStartScreen);
toRollButton.addEventListener("click", showRollStage);
rollBackButton.addEventListener("click", showStartScreen);
toFillButton.addEventListener("click", showFillStage);
fillBackButton.addEventListener("click", showStartScreen);
fillButtons.forEach((button) => {
  button.addEventListener("click", () => addFilling(button.dataset.fill, button));
});
toWrapButton.addEventListener("click", showWrapStage);
wrapBackButton.addEventListener("click", showStartScreen);
toMoldButton.addEventListener("click", showMoldStage);
moldBackButton.addEventListener("click", showStartScreen);
toBakeButton.addEventListener("click", showBakeStage);
bakeBackButton.addEventListener("click", showStartScreen);

wrappingDough.addEventListener("click", () => { if (wrapProgress >= 4) return; wrapProgress += 1; wrapFilling.style.opacity = String(1 - wrapProgress / 4); wrappingDough.classList.add(["wrap-tl","wrap-tr","wrap-bl","wrap-br"][wrapProgress - 1]); if (wrapProgress === 4) { wrapInstruction.textContent = "包好啦！现在是圆滚滚的月饼团。"; wrapFeedback.textContent = "可以送去压模了！"; toMoldButton.hidden = false; } });
let moldPlaced = false;
mold.addEventListener("click", () => { if (!moldPlaced) { const moldRect = mold.getBoundingClientRect(); const doughRect = moldDough.getBoundingClientRect(); const x = doughRect.left + doughRect.width / 2 - (moldRect.left + moldRect.width / 2); const y = doughRect.top + doughRect.height / 2 - (moldRect.top + moldRect.height / 2); moldPlaced = true; mold.classList.add("placed"); mold.style.transform = `translate(${x}px, ${y}px)`; moldInstruction.textContent = "再点击一次，按压模具！"; return; } const patterns = ["pattern-flower", "pattern-rabbit", "pattern-moon"]; selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]; moldDough.classList.add(selectedPattern); moldFeedback.textContent = "压好啦！"; toBakeButton.hidden = false; mold.classList.remove("placed"); mold.style.transform = ""; moldPlaced = false; moldInstruction.textContent = ""; });
bakeMooncake.addEventListener("click", () => { bakeMooncake.classList.add("in-oven"); bakeScreen.classList.add("baking"); bakeClock.hidden = false; bakeClock.classList.add("running"); bakeInstruction.textContent = "烤一烤……"; window.setTimeout(() => { bakeClock.hidden = true; bakeClock.classList.remove("running"); oven.classList.add("baked"); bakeInstruction.textContent = "烤好啦！直接点击烤箱取出月饼。"; }, 1800); });
oven.addEventListener("click", () => { if (!oven.classList.contains("baked")) return; bakeScreen.classList.remove("baking"); bakeScreen.classList.add("oven-open"); bakedTray.hidden = false; trayMooncake.classList.add(selectedPattern); finishButton.hidden = false; bakeInstruction.textContent = "烤箱打开啦！"; bakeFeedback.textContent = "点击下一步，摆上完成盘。"; });
finishButton.addEventListener("click", () => { bakeScreen.classList.remove("oven-open"); bakeScreen.classList.add("finished"); bakedTray.hidden = true; finishButton.hidden = true; plate.hidden = false; finishedMooncake.classList.add(selectedPattern); bakeInstruction.textContent = "月饼完成！中秋快乐！"; bakeFeedback.textContent = ""; });

let lastKneadAngle = null;
const pressClasses = ["press-left", "press-right", "press-up", "press-down"];

function getDoughAngle(event) {
  const rect = dough.getBoundingClientRect();
  return Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2));
}

function showPressDirection(angle) {
  const direction = Math.round(angle / (Math.PI / 2));
  const pressClass = ["press-right", "press-down", "press-left", "press-up"][(direction + 4) % 4];
  dough.classList.remove(...pressClasses);
  dough.classList.add(pressClass);
}

dough.addEventListener("pointerdown", (event) => {
  lastKneadAngle = getDoughAngle(event);
  dough.setPointerCapture(event.pointerId);
  dough.classList.add("kneading");
});
dough.addEventListener("pointermove", (event) => {
  if (lastKneadAngle === null) return;
  const currentAngle = getDoughAngle(event);
  let angleChange = currentAngle - lastKneadAngle;
  if (angleChange > Math.PI) angleChange -= Math.PI * 2;
  if (angleChange < -Math.PI) angleChange += Math.PI * 2;
  if (Math.abs(angleChange) > 0.025) {
    // 四圈完成，避免来回摩擦就能通过。
    knead(Math.abs(angleChange) * (100 / (Math.PI * 2 * 4)));
    showPressDirection(currentAngle);
    lastKneadAngle = currentAngle;
  }
});
function finishKneading() { lastKneadAngle = null; dough.classList.remove("kneading", ...pressClasses); }
dough.addEventListener("pointerup", finishKneading);
dough.addEventListener("pointercancel", finishKneading);

let rollStartPoint = null;
let lastRollDistance = 0;
const spreadClasses = ["spread-top-left", "spread-top-right", "spread-bottom-left", "spread-bottom-right"];
flatDough.addEventListener("pointerdown", (event) => {
  const rect = flatDough.getBoundingClientRect();
  rollStartPoint = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  lastRollDistance = 0;
  flatDough.setPointerCapture(event.pointerId);
});
flatDough.addEventListener("pointermove", (event) => {
  if (!rollStartPoint) return;
  const x = event.clientX - rollStartPoint.x;
  const y = event.clientY - rollStartPoint.y;
  const distance = Math.hypot(x, y);
  if (distance < 16) return;
  const spreadClass = y < 0 ? (x < 0 ? "spread-top-left" : "spread-top-right") : (x < 0 ? "spread-bottom-left" : "spread-bottom-right");
  flatDough.classList.remove(...spreadClasses);
  flatDough.classList.add(spreadClass);
  const outwardDistance = Math.max(0, distance - lastRollDistance);
  if (outwardDistance > 0) roll(Math.min(9, outwardDistance / 8));
  lastRollDistance = distance;
});
function finishRolling() { rollStartPoint = null; lastRollDistance = 0; flatDough.classList.remove(...spreadClasses); }
flatDough.addEventListener("pointerup", finishRolling);
flatDough.addEventListener("pointercancel", finishRolling);
showStartScreen();
resetIngredientStage();

// 开始页始终按高度缩放：横向拉宽只会增加两侧留白，不会放大插画。
function resizeStartArtboard() {
  const scale = Math.min(1, window.innerHeight / 1920);
  startArtboard.style.setProperty("--start-scale", scale);
  // 宽屏时仅让左右两侧的装饰轻微向外展开；中央标题区不参与位移。
  const logicalWidth = window.innerWidth / scale;
  // 不设上限：窗口继续变宽时，两侧插画会始终缓慢向外移动。
  const sideShift = Math.max(0, (logicalWidth - 1080) * 0.12);
  startArtboard.style.setProperty("--start-side-shift", `${sideShift}px`);
  // 人物组在空间不足时整体等比缩小，始终保持原始间距与居中，不再相互重叠。
  const startCharacterGroupWidth = 1136;
  const startCharacterScale = Math.min(1, logicalWidth / startCharacterGroupWidth);
  const startCharacterLeft = 540 - startCharacterGroupWidth * startCharacterScale / 2 - sideShift;
  // 右侧素材本身的可见轮廓比画布边界更靠内；窄屏时补偿该留白，使视觉边距对称。
  const startRightEdgeCorrection = Math.min(44, (1 - startCharacterScale) * 200);
  const startCharacterRight = startCharacterLeft + 557 * startCharacterScale + sideShift * 2 + startRightEdgeCorrection;
  startArtboard.style.setProperty("--start-character-scale", startCharacterScale);
  startArtboard.style.setProperty("--start-character-left", `${startCharacterLeft}px`);
  startArtboard.style.setProperty("--start-character-right", `${startCharacterRight}px`);

  ingredientsArtboard.style.setProperty("--ingredients-scale", scale);
  ingredientsArtboard.style.setProperty("--ingredients-side-shift", `${sideShift}px`);
  const ingredientsCharacterGroupWidth = 1036;
  const ingredientsCharacterScale = Math.min(1, logicalWidth / ingredientsCharacterGroupWidth);
  const ingredientsCharacterLeft = 540 - ingredientsCharacterGroupWidth * ingredientsCharacterScale / 2 - sideShift;
  const ingredientsCharacterRight = ingredientsCharacterLeft + 555 * ingredientsCharacterScale + sideShift * 2;
  ingredientsArtboard.style.setProperty("--ingredients-character-scale", ingredientsCharacterScale);
  ingredientsArtboard.style.setProperty("--ingredients-character-left", `${ingredientsCharacterLeft}px`);
  ingredientsArtboard.style.setProperty("--ingredients-character-right", `${ingredientsCharacterRight}px`);
}

window.addEventListener("resize", resizeStartArtboard);
resizeStartArtboard();
