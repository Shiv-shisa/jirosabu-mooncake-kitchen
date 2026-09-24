(() => {
  const install = () => {
    if (!document.querySelector('.filling, .mold, .oven') || document.querySelector('.background[data-step-background]')) return;
    const screen = document.querySelector('.screen');
    const artboard = document.querySelector('#artboard');
    if (!screen || !artboard) return;
    document.body.classList.add('step-with-background');
    const background = document.createElement('div');
    background.className = 'background';
    background.dataset.stepBackground = '1';
    screen.insertBefore(background, artboard);
    const characterLayer = document.createElement('div');
    characterLayer.className = 'step-character-layer';
    screen.insertBefore(characterLayer, artboard);
    const left = document.createElement('img');
    left.className = 'step-character step-character-left';
    left.src = 'assets/ingredients/ingredients-character-left.png';
    left.alt = '';
    const right = document.createElement('img');
    right.className = 'step-character step-character-right';
    right.src = 'assets/ingredients/ingredients-character-right.png';
    right.alt = '';
    characterLayer.append(left, right);
    const resize = () => {
      const scale = Math.min(1, innerHeight / 1920);
      const logical = innerWidth / scale;
      const side = Math.max(0, (logical - 1080) * .12);
      const groupWidth = 1036;
      const characterScale = Math.min(1, logical / groupWidth);
      const characterLeft = 540 - groupWidth * characterScale / 2 - side;
      const characterRight = characterLeft + 555 * characterScale + side * 2;
      artboard.style.setProperty('--scale', scale);
      characterLayer.style.setProperty('--scale', scale);
      artboard.style.setProperty('--side', side + 'px');
      characterLayer.style.setProperty('--character-scale', characterScale);
      characterLayer.style.setProperty('--character-left', characterLeft + 'px');
      characterLayer.style.setProperty('--character-right', characterRight + 'px');
    };
    resize();
    addEventListener('resize', resize);
    if (window.parent === window) artboard.classList.add('step-entered');
    addEventListener('message', event => {
      if (event.data?.type === 'enter-step') artboard.classList.add('step-entered');
      if (event.data?.type === 'characters-normal') {
        left.src = 'assets/ingredients/ingredients-character-left.png';
        right.src = 'assets/ingredients/ingredients-character-right.png';
      }
      if (event.data?.type === 'characters-smile') {
        left.src = 'assets/ingredients/ingredients-character-left-smile.png';
        right.src = 'assets/ingredients/ingredients-character-right-smile.png';
      }
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once:true });
  else install();
})();
