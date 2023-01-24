
module.exports = {
  async generateUser() {
    try {
      let number = Math.floor(Math.random() * Math.pow(10, 6));
      number = (number.toString().length < 6) ? random(6) : number;
      let email = `gympass.qa+${number}@outlook.com`;
      return email;
    } catch (error) {
      console.log(`Error generate email - ${error}`)
      throw new Error('Error', error)
    }
  }
}
