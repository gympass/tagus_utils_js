
const { getIdUserByEmail, getOrderByUserId } = require("../services/tagus")
const { associatePlan } = require("../services/billing")
const { checkoutPlan } = require("../services/checkout")
const { cancelUserPlanByOrderId } = require("../services/atlantic");


module.exports = {
  async associatePlanUser(email, plan) {
    const user_id = await getIdUserByEmail(email);
    const signed_payload = await associatePlan(user_id, plan);
    await checkoutPlan(signed_payload);
  },

  async cancelPlan(email) {
    const user_id = await getIdUserByEmail(email);
    const order_id = await getOrderByUserId(user_id);
    if (order_id) {
      await cancelUserPlanByOrderId(order_id)
    }
  }
}
