import sleep from 'atomic-sleep';

export function delay(seconds) {
  sleep(seconds * 1000);
}
