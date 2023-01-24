const { addElegibleMember, getEligibilityByEmail, deleteElegibleMember } = require("../services/hades");
const { generateToken, signupMember } = require("../services/signup");
const { getClientOrder, createEligibilities, getOrderByUserId, deleteUserById } = require("../services/tagus")
const { cancelUserPlanByOrderId } = require("../services/atlantic");
const { generateUser } = require("../utils/getRandomUser.js")
const getEmails = require("../utils/getEmailToken.js");
const associatePlan = require("./plan");


module.exports = {
  async createUserWithoutPlan() {
    const email = await generateUser();
    const eligibility_item_id = await getClientOrder();
    await addElegibleMember(eligibility_item_id, email);
    const seed = await generateToken(email);
    const emailToken = await getEmails({
      to: email.toString(),
      after: new Date(),
    });
    const token = emailToken?.textAsHtml?.match(/>\d{4}/)[0].split(">")[1];
    const eligible_member_id = await getEligibilityByEmail(email)
    const eligibility_id = await createEligibilities(eligible_member_id, eligibility_item_id);
    await signupMember(email, seed, token, eligibility_id);
    return email;
  },
  
  async createUserWithPlan(plan) {
    const email = await generateUser();
    const eligibility_item_id = await getClientOrder();
    await addElegibleMember(eligibility_item_id, email);
    const seed = await generateToken(email);
    const emailToken = await getEmails({
      to: email.toString(),
      after: new Date(),
    });
    const token = emailToken?.textAsHtml?.match(/>\d{4}/)[0].split(">")[1];
    const eligible_member_id = await getEligibilityByEmail(email)
    const eligibility_id = await createEligibilities(eligible_member_id, eligibility_item_id);
    await signupMember(email, seed, token, eligibility_id);
    await associatePlan.associatePlanUser(email, plan);
    return email;
  },

  async deletUser(email) {
    const user_id = await getUserByEmail(email);
    if (user_id) {
      const order_id = await getOrderByUserId(user_id);
      if (order_id) {
        await cancelUserPlanByOrderId(order_id)
      }
      await deleteUserById(user_id)
    }
    const eligible_member_id = await getEligibilityByEmail(email)
    if (eligible_member_id) {
      await deleteElegibleMember(eligible_member_id);
    }
  }
}
