export const deserializeDB = (strData) => {
  if (!strData) return [];

  const data = strData.split(";");

  return data.map((row) => {
    const [word, count, findCount, known] = row.split(",");

    return {
      word,
      count: Number(count),
      findCount: Number(findCount),
      known: Boolean(Number(known)),
    };
  });
};

export const serializeDB = (data) =>
  data
    .map(
      (row) => `${row.word},${row.count},${row.findCount},${Number(row.known)}`
    )
    .join(";");

export const mergeData = (data, newData) => {
  const newDataMap = newData.reduce((acc, row) => {
    acc[row.word] = row;
    return acc;
  }, {});

  return data.map((row) => {
    if (newDataMap[row.word]) {
      return {
        ...row,
        count: row.count + newDataMap[row.word].count,
        findCount: row.findCount + 1,
      };
    }

    return row;
  });
};
