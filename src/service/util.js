export default{
  S4 () {
    return (
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
      new Date() +
      Math.random(1000)
    )
  },
  getKeys () {
    return this.S4()
  }
}