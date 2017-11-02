module.exports = {
  log: data => console.log(`\n${JSON.stringify(data, null, 2)}\n`),
  info: (...args) => console.info(...args),
}
