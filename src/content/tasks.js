// 1. Удаление дубликатов из массива

function removeDuplicates(arr) {
  return [...new Set(arr)]; // Используем Set для удаления дубликатов
}

// Пример использования
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // Вывод: [1, 2, 3, 4, 5]

// 2. Реализация flatten массива
// Напишите функцию, которая "разворачивает" многомерный массив в одномерный.

function flatten(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val),
    []
  );
}

// Пример использования
console.log(flatten([1, [2, [3, 4], 5]])); // Вывод: [1, 2, 3, 4, 5]

// 3. Проверка, является ли строка палиндромом

function isPalindrome(str) {
  const cleaned = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase(); // Убираем не буквенно-цифровые символы
  return cleaned === cleaned.split("").reverse().join("");
}

// Пример использования
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Вывод: true

// 4. Сортировка массива объектов по свойству

function sortByProperty(arr, property) {
  return arr.sort((a, b) => (a[property] > b[property] ? 1 : -1));
}

// Пример использования
const people = [
  { name: "John", age: 25 },
  { name: "Jane", age: 22 },
];
console.log(sortByProperty(people, "age")); // Вывод: [{ name: 'Jane', age: 22 }, { name: 'John', age: 25 }]

// 5. Фибоначчи

function fibonacci(n) {
  if (n <= 1) return n; // 0 и 1 - базовые случаи
  return fibonacci(n - 1) + fibonacci(n - 2); // Рекурсия
}

// Пример использования
console.log(fibonacci(6)); // Вывод: 8

// 6. debounce

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Пример использования
const log = () => console.log("Executed");
const debouncedLog = debounce(log, 1000);
debouncedLog(); // Эта функция будет вызвана не ранее чем через 1000ms

// 7. throttle

function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Пример использования
const log = () => console.log("Executed");
const throttledLog = throttle(log, 2000);
throttledLog(); // Вывод: Executed (при повторных вызовах в пределах 2000 мс не будет дополнительных выводов)

// 8. Подсчет количества вхождений символа в строке

function countOccurrences(str, char) {
  return str.split(char).length - 1; // Разделяем строку и считаем
}

// Пример использования
console.log(countOccurrences("Hello World", "o")); // Вывод: 2

// 9. Переворот строки

function reverseString(str) {
  return str.split("").reverse().join(""); // Разделяем строку на массив символов, переворачиваем и соединяем обратно
}

// Пример использования
console.log(reverseString("Hello World")); // Вывод: 'dlroW olleH'

// 10. Найти недостающий номер в массиве.

function findMissingNumber(arr) {
  const n = arr.length + 1; // Учитываем, что один номер отсутствует
  const expectedSum = (n * (n + 1)) / 2; // Сумма от 1 до n
  const actualSum = arr.reduce((acc, num) => acc + num, 0); // Сумма элементов в массиве
  return expectedSum - actualSum; // Разность придаст недостающий номер
}

// Пример использования
console.log(findMissingNumber([1, 2, 4, 5])); // Вывод: 3
