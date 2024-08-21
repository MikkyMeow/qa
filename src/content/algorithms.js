// АЛГОРИТМЫ ПОИСКА

// Линейный поиск (Linear Search) - Простой алгоритм, который перебирает каждый элемент массива, пока не найдет искомый элемент.

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Возвращает индекс элемента
    }
  }
  return -1; // Возвращает -1, если элемент не найден
}

// Бинарный поиск (Binary Search) - Эффективный алгоритм, который работает на отсортированных массивах, деля массив пополам и сравнивая средний элемент с искомым.

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Возвращает индекс элемента
    } else if (arr[mid] < target) {
      left = mid + 1; // Ищем в правой половине
    } else {
      right = mid - 1; // Ищем в левой половине
    }
  }

  return -1; // Возвращает -1, если элемент не найден
}

// Поиск с помощью хеш-таблиц (Hash Table Search) - Алгоритм, который использует хеш-таблицы для быстрого поиска элементов по ключу.

class HashTable {
  constructor() {
    this.table = {};
  }

  // Метод для добавления элемента в хеш-таблицу
  set(key, value) {
    this.table[key] = value;
  }

  // Метод для поиска элемента в хеш-таблице
  get(key) {
    return this.table[key] !== undefined ? this.table[key] : null;
  }
}

// Пример использования
const hashTable = new HashTable();
hashTable.set("apple", 1);
hashTable.set("banana", 2);
hashTable.set("orange", 3);

console.log(hashTable.get("banana")); // Вывод: 2
console.log(hashTable.get("grape")); // Вывод: null

// Экспоненциальный поиск (Exponential Search) - Алгоритм, который комбинирует линейный поиск и бинарный поиск, начиная с малых расстояний и постепенно увеличивая их в степени двойки.

function exponentialSearch(arr, target) {
  if (arr[0] === target) {
    return 0; // Если искомый элемент - первый элемент массива
  }

  let index = 1;
  while (index < arr.length && arr[index] <= target) {
    index *= 2; // Увеличиваем индекс в два раза
  }

  // Бинарный поиск на найденном диапазоне
  return binarySearchInExponentialSearch(
    arr,
    target,
    Math.floor(index / 2),
    Math.min(index, arr.length - 1)
  );
}

function binarySearchInExponentialSearch(arr, target, left, right) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // Возвращает индекс элемента
    } else if (arr[mid] < target) {
      left = mid + 1; // Ищем в правой половине
    } else {
      right = mid - 1; // Ищем в левой половине
    }
  }
  return -1; // Возвращает -1, если элемент не найден
}

// Поиск по интерполяции (Interpolation Search) - Улучшенный бинарный поиск, который использует значения ключей для определения вероятного местоположения искомого элемента в отсортированном массиве.

function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      return arr[low] === target ? low : -1;
    }

    // Вычисление позиции для поиска
    const pos =
      low +
      Math.floor(((high - low) / (arr[high] - arr[low])) * (target - arr[low]));

    if (arr[pos] === target) {
      return pos; // Возвращает индекс элемента
    }
    if (arr[pos] < target) {
      low = pos + 1; // Ищем в правой половине
    } else {
      high = pos - 1; // Ищем в левой половине
    }
  }
  return -1; // Возвращает -1, если элемент не найден
}

// Тернарный поиск (Ternary Search) - Похож на бинарный поиск, но делит массив на три части вместо двух и сравнивает искомый элемент с двумя средними значениями.

function ternarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (right >= left) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);

    if (arr[mid1] === target) {
      return mid1; // Возвращает индекс элемента
    }
    if (arr[mid2] === target) {
      return mid2; // Возвращает индекс элемента
    }

    if (target < arr[mid1]) {
      return ternarySearch(arr, target, left, mid1 - 1); // Ищем в первой части
    } else if (target > arr[mid2]) {
      return ternarySearch(arr, target, mid2 + 1, right); // Ищем в третьей части
    } else {
      return ternarySearch(arr, target, mid1 + 1, mid2 - 1); // Ищем во второй части
    }
  }
  return -1; // Возвращает -1, если элемент не найден
}

// Фибоначчиев поиск (Fibonacci Search) - Алгоритм, основанный на числах Фибоначчи, который также работает на отсортированных массивах и использует свойства последовательности Фибоначчи.

export function fibonacciSearch(arr, target) {
  let fibM2 = 0; // (m-2)'th Fibonacci number
  let fibM1 = 1; // (m-1)'th Fibonacci number
  let fibM = fibM2 + fibM1; // m'th Fibonacci number

  const n = arr.length;

  // Нахождение ближайшего Фибоначчиевого числа >= длине массива
  while (fibM < n) {
    fibM2 = fibM1; // Переход к следующему числу Фибоначчи
    fibM1 = fibM;
    fibM = fibM2 + fibM1;
  }

  let offset = -1;

  // Поиск элемента, используя числа Фибоначчи
  while (fibM > 1) {
    // Индекс для сравнения
    const i = Math.min(offset + fibM2, n - 1);

    if (arr[i] < target) {
      fibM = fibM1; // Переход к следующему числу Фибоначчи
      fibM1 = fibM2;
      fibM2 = fibM - fibM1; // Переход к (m-2)'th числу Фибоначчи
      offset = i; // Обновление смещения
    } else if (arr[i] > target) {
      fibM = fibM2; // Переход к (m-2)'th числу Фибоначчи
      fibM1 = fibM1 - fibM2; // Обновление m-1
      fibM2 = fibM - fibM1; // Обновление m-2
    } else {
      return i; // Возвращает индекс элемента
    }
  }

  // Проверяем последний элемент
  if (fibM1 && arr[offset + 1] === target) {
    return offset + 1; // Возвращает индекс найденного элемента
  }

  return -1; // Элемент не найден
}

// Пример использования
const arrayFibo = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
const targetFibo = 85;
const resultFibo = fibonacciSearch(arrayFibo, targetFibo);
console.log(resultFibo); // Вывод: 8

// Скачущий поиск (Jump Search) - Алгоритм, который делит массив на блоки фиксированного размера и выполняет линейный поиск внутри найденного блока.

function jumpSearch(arr, target) {
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n)); // Размер скачка
  let prev = 0;

  // Поиск блока, в котором может находиться элемент
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      return -1; // Элемент не найден
    }
  }

  // Линейный поиск внутри найденного блока
  for (let i = prev; i < Math.min(step, n); i++) {
    if (arr[i] === target) {
      return i; // Возвращает индекс элемента
    }
  }
  return -1; // Элемент не найден
}

// Поиск битового представления (Bitwise Search) - Использует битовые операции для ускорения поиска в определенных структурах данных.

function bitwiseSearch(arr, target) {
  const bitMask = 1 << target; // Создание битовой маски для искомого элемента
  for (let i = 0; i < arr.length; i++) {
    if ((bitMask & (1 << arr[i])) !== 0) {
      return i; // Возвращает индекс элемента
    }
  }
  return -1; // Элемент не найден
}

// АЛГОРИТМЫ СОРТИРОВКИ

// Сортировка пузырьком (Bubble Sort)
// Простой алгоритм, который многократно проходит через список, сравнивает соседние элементы и меняет их местами, если они находятся в неправильном порядке.

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Обмен элементов
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Пример использования
const bubbleSortedArray = bubbleSort([64, 34, 25, 12, 22, 11, 90]);
console.log(bubbleSortedArray); // Вывод: [11, 12, 22, 25, 34, 64, 90]

// Сортировка выбором (Selection Sort)
// Алгоритм, который разделяет массив на два подмассива: отсортированный и неотсортированный. Каждый раз выбирается минимальный элемент из неотсортированного и помещается в конец отсортированного.

function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j; // Находим индекс минимального элемента
      }
    }
    // Обмен с найденным минимальным элементом
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

// Пример использования
const selectionSortedArray = selectionSort([64, 34, 25, 12, 22, 11, 90]);
console.log(selectionSortedArray); // Вывод: [11, 12, 22, 25, 34, 64, 90]

// Сортировка вставками (Insertion Sort)
// Алгоритм, который строит отсортированную последовательность по одному элементу, вставляя каждый новый элемент в правильную позицию.

function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Перемещение элементов arr[0..i-1], которые больше ключа, на одну позицию вперед
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key; // Вставка ключа на правильное место
  }
  return arr;
}

// Пример использования
const insertionSortedArray = insertionSort([64, 34, 25, 12, 22, 11, 90]);
console.log(insertionSortedArray); // Вывод: [11, 12, 22, 25, 34, 64, 90]

// Сортировка слиянием (Merge Sort)
// Разделяет массив на две половины, рекурсивно сортирует каждую половину и затем сливает их обратно.

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr; // Массив длиной 0 или 1 уже отсортирован
  }

  const mid = Math.floor(arr.length / 2); // Находим середину массива
  const left = mergeSort(arr.slice(0, mid)); // Сортируем левую половину
  const right = mergeSort(arr.slice(mid)); // Сортируем правую половину

  return merge(left, right); // Сливаем отсортированные половины
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  // Слияние двух отсортированных массивов
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Объединение оставшихся элементов
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Пример использования
const mergeSortedArray = mergeSort([64, 34, 25, 12, 22, 11, 90]);
console.log(mergeSortedArray); // Вывод: [11, 12, 22, 25, 34, 64, 90]

// Быстрая сортировка (Quick Sort)
// Разделяет массив на две части по опорному элементу, сортирует каждую часть рекурсивно. Один из самых быстрых алгоритмов при среднем времени выполнения O(n log n).

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr; // Массив длиной 0 или 1 уже отсортирован
  }

  const pivot = arr[arr.length - 1]; // Опорный элемент
  const left = []; // Массив для элементов, меньших опорного
  const right = []; // Массив для элементов, больших опорного

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]); // Добавление в левый массив
    } else {
      right.push(arr[i]); // Добавление в правый массив
    }
  }

  // Рекурсивная сортировка и объединение
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Пример использования
const quickSortedArray = quickSort([64, 34, 25, 12, 22, 11, 90]);
console.log(quickSortedArray); // Вывод: [11, 12, 22, 25, 34, 64, 90]

// Heap Sort (Сортировка кучей)
// Алгоритм, который использует структуру данных "куча" для сортировки элементов. Сначала строится куча, а затем на каждом шаге извлекается максимальный элемент.

function heapSort(arr) {
  const n = arr.length;

  // Постро кучи (max heap)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Извлечение элементов из кучи
  for (let i = n - 1; i > 0; i--) {
    // Перемещение текущего корня в конец
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // Восстановление кучи
    heapify(arr, i, 0);
  }
  return arr;
}

// Функция для восстановления кучи
function heapify(arr, n, i) {
  let largest = i; // Инициализация корня
  const left = 2 * i + 1; // Левый дочерний элемент
  const right = 2 * i + 2; // Правый дочерний элемент

  // Если левый дочерний элемент больше корня
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // Если правый дочерний элемент больше самого большого
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // Если самый большой элемент не корень
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Обмен

    // Рекурсивно восстанавливаем кучу
    heapify(arr, n, largest);
  }
}

// Пример использования
const heapSortedArray = heapSort([64, 34, 25, 12, 22, 11, 90]);
console.log(heapSortedArray); // Вывод: [11, 12, 22, 25, 34, 64, 90]

// Сортировка подсчетом (Counting Sort)
// Эффективный алгоритм для сортировки чисел, который считает количество вхождений каждого уникального элемента и выводит их в отсортированном порядке.

function countingSort(arr) {
  const max = Math.max(...arr); // Находим максимальное значение
  const count = new Array(max + 1).fill(0); // Создаем массив для подсчета частоты
  const output = new Array(arr.length); // Массив для отсортированных элементов

  // Подсчет частоты каждого элемента
  for (let num of arr) {
    count[num]++;
  }

  // Преобразование count для хранения позиции каждого элемента
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  // Построение отсортированного массива
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i]; // Вставка элемента в выходной массив
    count[arr[i]]--;
  }

  return output;
}

// Пример использования
const countingSortedArray = countingSort([64, 34, 25, 12, 22, 11, 90]);
console.log(countingSortedArray); // Вывод: [11, 12, 22, 25, 34, 64, 90]

// Поразрядная сортировка (Radix Sort)
// Сортирует целые числа поразрядно, начиная с младшего разряда к старшему. Может использоваться в сочетании с сортировкой подсчетом для обработки отдельных разрядов.

function countingSortForRadix(arr, exp) {
  const n = arr.length;
  const output = new Array(n); // Выходной массив
  const count = new Array(10).fill(0); // Массив для подсчета частоты

  // Подсчет частоты элементов на основе значений в текущем разряде
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  // Преобразование count для хранения позиции каждого элемента
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Построение выходного массива
  for (let i = n - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }

  // Копирование выходного массива в arr
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

function radixSort(arr) {
  const max = Math.max(...arr); // Находим максимальное значение

  // Применяем подсчет для каждой цифры (разряда)
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortForRadix(arr, exp);
  }

  return arr;
}

// Пример использования
const radixSortedArray = radixSort([64, 34, 25, 12, 22, 11, 90]);
console.log(radixSortedArray); // Вывод: [11, 12, 22, 25, 34, 64, 90]
