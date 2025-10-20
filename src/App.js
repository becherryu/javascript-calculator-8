import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const input = await getInput();

      if (input.trim() === "") {
        printResult(0);
        return;
      }

      const numbers = getNumbers(input);
      const sum = calculateSum(numbers);

      printResult(sum);
    } catch (error) {
      Console.print(`[ERROR]`);
      throw error;
    }
  }
}

// 1. 사용자 입력
async function getInput() {
  return Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
}

function getNumbers(input) {
  const SEPARATOR = /,|:/;

  return input.split(SEPARATOR).map(Number);
}

function calculateSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

function printResult(sum) {
  Console.print(`결과 : ${sum}`);
}
export default App;
