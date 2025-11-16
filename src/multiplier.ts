const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

process.argv.forEach((value, index) => {
  // para ver el index de cada arg
  console.log(`argv[${index}]:`, value);
});

const parseArguments = (args): Array<number> => {
  if (args.length !== 4) throw new Error("Wrong number of arguments");

  const firstNumber = Number(args[2]);
  const secondNumber = Number(args[3]);

  if (!isNaN(firstNumber) && !isNaN(secondNumber)) {
    return [firstNumber, secondNumber];
  } else {
    throw new Error("Provided arguments were not numbers");
  }
};

const cleanArguments = parseArguments(process.argv);

const a: number = cleanArguments[0];
const b: number = cleanArguments[1];

multiplicator(a, b, `multiplied ${a} and ${b} and the result is: `);
  