const sounds = {
  click: new Audio('/sounds/click.mp3'),
  achievement: new Audio('/sounds/achievement.mp3'),
  lost: new Audio('/sounds/lost.mp3'),
  right: new Audio('/sounds/right.mp3'),
  won: new Audio('/sounds/won.mp3'),
  wrong: new Audio('/sounds/wrong.mp3'),
  key: new Audio('/sounds/key.mp3'),
};

Object.values(sounds).forEach(sound => {
  sound.preload = "auto";
});

export default function playSound(type) {
  const sound = sounds[type];
  if (!sound) return;

   if (type === 'click') {
    sound.playbackRate = 0.9 + Math.random() * 0.2;
  } else {
    sound.playbackRate = 1;
  }

  sound.currentTime = 0;
  sound.play().catch(() => {});
}