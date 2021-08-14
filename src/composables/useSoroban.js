import { ref } from 'vue'

const MIN_SUM = 1
const MAX_SUM = 9

export default function useSoroban() {
  const calculations = ref([])

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const randomWithExclude = ([min, max], exclude) => {
    const number = random(min, max)
    // const isExist = Array.isArray(exclude) ? exclude.includes(number) : exclude === number
    if (exclude === number) {
      return randomWithExclude([min, max], exclude)
    }

    return number
  }

  const sumOrSub = () => {
    const rand = Math.floor(Math.random() * 10)
    return rand % 2 ? -1 : 1
  }

  const getLastNumber = () => {
    return calculations.value.length ? calculations.value.slice(-1).pop() : 0
  }

  const getCurrentSum = () => {
    return calculations.value.reduce((a, b) => a + b, 0)
  }

  const calcNextNumber = () => {
    const sum = getCurrentSum()
    const lastNumber = getLastNumber()
    if (sum === MAX_SUM) {
      return randomWithExclude([MIN_SUM, MAX_SUM], Math.abs(lastNumber)) * -1
    }

    if (sum <= MIN_SUM) {
      return randomWithExclude([MIN_SUM, MAX_SUM - 1], Math.abs(lastNumber))
    }

    if (Math.abs(lastNumber) === 1 && sum === MAX_SUM - 1) {
      return random(MIN_SUM, MAX_SUM - 1) * -1
    }

    const operator = sumOrSub()
    const newMax = operator < 0 ? sum : MAX_SUM - sum

    return randomWithExclude([MIN_SUM, newMax], Math.abs(lastNumber)) * operator
  }

  const generate = (rows) => {
    console.log('generate', rows)
    calculations.value = []
    for (let i = 0; i < rows; i++) {
      calculations.value.push(calcNextNumber())
    }
  }

  return {
    calculations,
    getCurrentSum,
    generate
  }
}
