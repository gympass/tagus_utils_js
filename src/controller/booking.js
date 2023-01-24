const { createClass, createSlot, getBookNumber, approve } = require("../services/booking")
const { getGympassIdByEmail } = require("../services/tagus")
const { getClassId } = require("../services/classSearch")


module.exports = {
  async createBooking() {
    const class_id = await createClass();
    await createSlot(class_id);
  },

  async approveBooking(email) {
    const unique_token = await getGympassIdByEmail(email);
    const booking_number = await getBookNumber(unique_token);
    const class_id = await getClassId()
    await approve(booking_number, class_id);
  }
}
