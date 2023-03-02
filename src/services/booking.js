require('dotenv').config()
const axios = require('axios')

const base_url = process.env.BOOKING_URL
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Encoding': 'identity'
  }
}

module.exports = {
  async createClass() {

    const url = base_url + `/gyms/${process.env.GYM_ID}/classes`

    let body = {
      "classes": [
        {
          "name": "Musculação",
          "description": "Teste Booking QA",
          "notes": "Observações para preparo da Aula",
          "bookable": true,
          "visible": true,
          "product_id": process.env.PRODUCT_ID,
          "reference": "22222",
          "categories": [
            1
          ],
          "levels": [
            1
          ]
        }
      ]
    }

    try {
      const { data } = await axios.post(url, body, config)
      return data.classes[0].id
    } catch (error) {
      console.log(`Error call url - ${url} Message - ${error}`)
      throw new Error('Error', error)
    }
  },

  async createSlot(class_id) {

    const url = base_url + `/gyms/${process.env.GYM_ID}/classes/${class_id}/slots`

    var date = new Date();
    opens_at = date.toISOString();
    date.setMinutes(date.getMinutes() + 30);
    occur_date = date.toISOString();
    closes_at = date.toISOString();
    cancellable_until = date.toISOString();

    let body = {
      "occur_date": occur_date,
      "status": 1,
      "room": "Room 1",
      "length_in_minutes": 60,
      "total_capacity": 15,
      "total_booked": 1,
      "product_id": process.env.PRODUCT_ID,
      "booking_window": {
        "opens_at": opens_at,
        "closes_at": closes_at
      },
      "cancellable_until": cancellable_until,
      "instructors": [
        {
          "name": process.env.DEFAULT_NAME,
          "substitute": true
        }
      ],
      "rate": 4.0,
      "virtual": true,
      "virtual_class_url": "https://zoom.us/join"
    }

    try {
      await axios.post(url, body, config)
    } catch (error) {
      console.log(`Error call url - ${url} Message - ${error}`)
      throw new Error('Error', error)
    }
  },

  async getBookNumber(unique_token) {

    var date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    from = date.toISOString();
    date.setMinutes(date.getMinutes() + 31);
    to = date.toISOString();
    const params = new URLSearchParams({ from: from, to: to })
    const url = base_url + `/users/${unique_token}/bookings?${params.toString()}`

    try {
      const { data } = await axios.get(url, config)
      return data.results[0].booking_number
    } catch (error) {
      console.log(`Error call url - ${url} Message - ${error}`)
      throw new Error('Error', error)
    }
  },

  async approve(booking_number, class_id) {

    const url = base_url + `/gyms/${process.env.GYM_ID}/bookings/${booking_number}`
    let body = {
      "gym_id": process.env.GYM_ID,
      "class_id": class_id,
      "status": 2,
      "reason": "confirm"
    }
    try {
      await axios.patch(url, body, config)
    } catch (error) {
      console.log(`Error call url - ${url} Message - ${error}`)
      throw new Error('Error', error)
    }
  }
}
