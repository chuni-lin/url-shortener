function generateRandomNumber() {
  let number = ''
  const element = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  for (let i = 0; i < 5; i++) {
    number += element[Math.floor(Math.random() * element.length)]
  }
  return number
}

module.exports = generateRandomNumber