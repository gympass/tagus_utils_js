require('dotenv').config()
const axios = require('axios')

const base_url = process.env.CLASS_SEARCH_URL
const config = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}

module.exports = {

  async getClassId() {

    var date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    start_date = date.toISOString();
    date.setMinutes(date.getMinutes() + 31);
    end_date = date.toISOString();
    const params = new URLSearchParams({ classes_availability: all, version: tagus, gym: process.env.GYM_ID, only_open_booking_window: true, start_date: start_date, end_date: end_date })
    const url = base_url + `search?${params.toString()}`

    try {
      const { data } = await axios.get(url, config)
      return data.near_classes[0].class.id
    } catch (error) {
      console.log(`Error call url - ${url} Message - ${error}`)
      throw new Error('Error', error)
    }
  }
}
