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
      throw new Error(`[ERROR] ${error.message}`);
    }
  }
}

// 1. 사용자 입력
async function getInput() {
  return Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
}

// 2. 구분자를 기준으로 숫자 분리하기
function getNumbers(input) {
  // 기본 구분자
  let separators = [",", ":"];

  // 커스텀 구분자
  const customSeparatorInput = /^\/\/(.+)\\n(.*)$/;
  const matchInput = input.match(customSeparatorInput);

  if (matchInput) {
    const [, customSeparator, numbers] = matchInput;

    // 구분자가 숫자이면 에러 발생
    if (!Number.isNaN(Number(customSeparator))) {
      throw new Error("구분자는 숫자가 될 수 없습니다.");
    }

    separators.push(customSeparator);
    input = numbers;
  }

  // 구분자를 정규식으로 변환
  const escapeSeparator = separators.map((sep) =>
    sep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const SEPARATOR = new RegExp(escapeSeparator.join("|"));

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
