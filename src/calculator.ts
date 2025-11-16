// === ANSI COLOR CODES (para mostrar mensajes coloreados en consola) ===
const RED = "\x1b[31m"; // Código ANSI para texto rojo
const GREEN = "\x1b[32m"; // Código ANSI para texto verde
const YELLOW = "\x1b[33m"; // Código ANSI para texto amarillo
const RESET = "\x1b[0m"; // Restablece el color al valor por defecto del terminal

// === TYPE DEFINITIONS ===
type Operation = "multiply" | "add" | "divide";
// Tipo union: solo se aceptan estas 3 operaciones válidas

type Result = number;
// Alias de tipo indicando que la función debe devolver un número

// === BUSINESS LOGIC FUNCTION (pura / sin consola) ===
const calculator = (a: number, b: number, op: Operation): Result => {
  // Usamos switch para decidir la operación de forma clara
  switch (op) {
    case "multiply":
      return a * b; // Si op es "multiply", devolvemos multiplicación

    case "add":
      return a + b; // Si op es "add", devolvemos suma

    case "divide":
      if (b === 0) throw new Error("Cannot divide by zero");
      // Protegemos contra división por cero
      return a / b; // Si es división válida, devolvemos el resultado

    default:
      throw new Error("Invalid operation");
    // Si llega aquí, la operación no era válida (TypeScript debería evitarlo)
  }
};

// === ARGUMENT PARSING FUNCTION ===
const parseArgs = (): [string, string, string] => {
  // Obtenemos argumentos usando destructuring e ignoramos los 2 primeros (node y filepath)
  const [, , arg1, arg2, argOp] = process.argv;

  // Devolvemos los 3 valores como tupla de strings
  return [arg1, arg2, argOp];
};

// === INPUT VALIDATOR FUNCTION ===
const validateArgs = (
  arg1: string,
  arg2: string,
  argOp: string
): [number, number, Operation] => {
  // Si falta uno de los argumentos, lanzamos error indicando cómo usar la app
  if (!arg1 || !arg2 || !argOp) {
    throw new Error(
      `Missing arguments.\nUsage: node dist/calculator.js <num1> <num2> <operation>\nAllowed ops: add | multiply | divide`
    );
  }

  // Convertimos los dos argumentos numéricos
  const num1 = Number(arg1);
  const num2 = Number(arg2);

  // Comprobamos si alguno no es un número válido
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error("Both num1 and num2 must be valid numbers");
  }

  // Definimos lista de operaciones permitidas
  const allowedOps: Operation[] = ["add", "multiply", "divide"];

  // Comprobamos si la operación recibida está dentro de las permitidas
  if (!allowedOps.includes(argOp as Operation)) {
    throw new Error(`Invalid operation: "${argOp}"`);
  }

  // Si todo es correcto, devolvemos tupla con datos ya validados y tipados
  return [num1, num2, argOp as Operation];
};

// === MAIN APPLICATION FLOW (controlador del programa CLI) ===
const main = () => {
  try {
    // Obtenemos argumentos de consola
    const [arg1, arg2, argOp] = parseArgs();

    // Validamos y convertimos los tipos según sea necesario
    const [num1, num2, op] = validateArgs(arg1, arg2, argOp);

    // Llamamos a la función de cálculo con valores correctos
    const result = calculator(num1, num2, op);

    // Mostramos el resultado en verde
    console.log(`${GREEN}Result: ${result}${RESET}`);
  } catch (error) {
    // Capturamos cualquier error y lo mostramos en rojo, luego terminamos el programa
    console.error(`${RED}Error: ${(error as Error).message}${RESET}`);
    process.exit(1); // Indicamos fin con error (código distinto a 0)
  }
};

// === RUN PROGRAM ===
main(); // Ejecutamos la función principal para iniciar el programa
