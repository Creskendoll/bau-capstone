const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const pickRand = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// The Fisher-Yates shuffle
export const shuffle = (array: any[]) => {
  for (let current = array.length - 1; current > 0; current--) {
    let random = Math.floor(Math.random() * (current + 1));

    let swap = array[current]; 
    array[current] = array[random]; 
    array[random] = swap
  }
  return array;
};

export { sleep, pickRand };
