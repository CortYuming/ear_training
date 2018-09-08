/* global Tone */
function get_parameter(key) {
  const items = location.search.substr(1).split('&');
  let result = null;

  items.forEach((item) => {
    let key_value = item.split('=');
    if (key_value[0] === key) {
      result = decodeURIComponent(key_value[1]);
    }
  });
  return result;
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main() {
  //Tone.Transport.bpm.value = 240/2;
  const synth = new Tone.Synth().toMaster();

  const note = get_parameter('note');
  const NOTES = [
    'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2',
    'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
    'C4', 'Db4', 'D4', 'Eb4',
    'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
    // 'C5', 'Db5', 'D5', 'Eb5',
  ];
  document.getElementById('series_of_notes').innerHTML= NOTES.join(', ');

  function make_sound() {
    window.location.href = `/?note=${random(NOTES)}`;
  }
  function stop_sound() {
    window.location.href = '/';
  }

  document.getElementById('make_sound').addEventListener('click', make_sound.bind(this));
  document.getElementById('stop_sound').addEventListener('click', stop_sound.bind(this));

  if (!NOTES.includes(note)) {
    return;
  }

  const interval_sec = 4;
  const repeat_count = 4;
  const duration = interval_sec - 0.3;
  [...Array(repeat_count).keys()].forEach((i) => {
    synth.triggerAttackRelease(note, duration, interval_sec * i);
  });
  document.getElementById('note').innerHTML= note.replace(/\d+?$/, '') ;

  await sleep(interval_sec * repeat_count * 1000);

  make_sound();
}

window.onload = () => {
  main();
};
