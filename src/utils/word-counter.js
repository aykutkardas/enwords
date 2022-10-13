function wordCounter(content) {
  const result = {};

  const text = content
    .split(" ")
    .map((word) => word.trim().toLowerCase())
    .filter((word) => Boolean(word) && /^[a-z]+$/.test(word));

  text.forEach((word) => {
    if (result[word]) result[word] += 1;
    else result[word] = 1;
  });

  return result;
}

export default wordCounter;
