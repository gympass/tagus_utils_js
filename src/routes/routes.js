const managerUser = require("../controller/user");
const managerPlan = require("../controller/plan");
const managerBooking = require("../controller/booking");

module.exports = (app) => {
    app.post("/user", async (req, res) => {
      try {
        email = await managerUser.createUserWithoutPlan();
        return res.status(201).send(`User ${email} created!`);
      } catch (error) {
        return res.status(400).send(`Error creating user :(`);
      }
    }),

    app.post("/user/plan", async (req, res) => {
      try {
        email = await managerUser.createUserWithPlan(req.query.plan);
        return res.status(201).send(`User ${email} with plan ${req.query.plan} created!`);
      } catch (error) {
        return res.status(400).send(`Error creating user with plan :(`);
      }
    }),

    app.delete("/user/delete", async (req, res) => {
      try {
        await managerUser.deletUser(req.query.email);
        return res.status(200).send(`User ${req.query.email} deleted!`);
      } catch (error) {
        return res.status(400).send(`Error associate plan :(`);
      }
    }),

    app.post("/plan/user", async (req, res) => {
      try {
        await managerPlan.associatePlanUser(req.query.email, req.query.plan);
        return res.status(200).send(`Plan ${req.query.plan} assigned to ${req.query.email}!`);
      } catch (error) {
        return res.status(400).send(`Error associate plan :(`);
      }
    }),

    app.delete("/plan/user/delete", async (req, res) => {
      try {
        await managerPlan.cancelPlan(req.query.email);
        return res.status(200).send(`Plan user ${req.query.email} deleted!`);
      } catch (error) {
        return res.status(400).send(`Error cancel plan user:(`);
      }
    }),

    app.post("/booking", async (req, res) => {
      try {
        await managerBooking.createBooking();
        return res.status(200).send(`Booking created`);
      } catch (error) {
        return res.status(400).send(`Error create booking:(`);
      }
    }),

    app.patch("/booking/approve", async (req, res) => {
      try {
        await managerBooking.approveBooking(req.query.email);
        return res.status(200).send(`Booking aproved`);
      } catch (error) {
        return res.status(400).send(`Error aprove booking:(`);
      }
    })
};
