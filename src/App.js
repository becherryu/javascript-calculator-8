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
      validateNumbers(numbers);
      const sum = calculateSum(numbers);

      printResult(sum);
    } catch (error) {
      Console.print(`[ERROR] ${error.message}`);
    }
  }
}

// 1. 사용자 입력
async function getInput() {
  return Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
}

// 2. 구분자를 기준으로 숫자 분리하기
function getNumbers(input) {
  const SEPARATOR = /,|:/;

  return input.split(SEPARATOR).map(Number);
}

// 3. 가져온 숫자가 기준에 맞는지 확인
function validateNumbers(numbers) {
  numbers.forEach((num) => {
    if (Number.isNaN(num)) {
      throw new Error("입력값이나 구분자를 확인해주세요.");
    }

    if (num <= 0) {
      throw new Error("0보다 큰 양수인 숫자만 입력 가능합니다.");
    }
  });
}

// 4. 계산하기
function calculateSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// 5. 결과 출력
function printResult(sum) {
  Console.print(`결과 : ${sum}`);
}
export default App;
