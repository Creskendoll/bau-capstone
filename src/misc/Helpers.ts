const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const pickRand = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export { sleep, pickRand };
