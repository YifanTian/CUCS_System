


const a = {
    string: 'string',
    number: 123,
    bool: false,
    nul: null,
    date: new Date(),  // stringified
    undef: undefined,  // lost
    inf: Infinity,  // forced to 'null'
  }
  console.log(a);
  console.log(typeof a.date);  // Date object
  const clone = JSON.parse(JSON.stringify(a));
  console.log(clone);
  console.log(typeof clone.date);  // result of .toISOString()