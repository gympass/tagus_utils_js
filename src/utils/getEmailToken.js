const Imap = require("imap");
const { simpleParser } = require("mailparser");

const imapConfig = {
  user: process.env.EMAIL,
  password: process.env.PASSWORD,
  host: "imap.outlook.com",
  port: 993,
  tls: true,
};

const getEmails = ({ to }) =>
  new Promise((resolve) => {
    const imap = new Imap(imapConfig);
    const searchEmail = () =>
      imap.search(
        ["UNSEEN", ["SINCE", new Date()], ["TO", to]],
        (err, results) => {
          if (!results || !results.length) {
            console.log(`Token for email ${to} not found`);
            throw new Error('Error', err)
          }

          const lastEmail = results[results.length - 1];
          const fetched = imap.fetch(lastEmail, { bodies: "" });

          fetched.on("message", (msg) => {
            msg.on("body", (stream) => {
              simpleParser(stream, async (err, parsed) => {
                resolve(parsed);
              });
            });
            msg.once("attributes", (attrs) => {
              const { uid } = attrs;
              imap.setFlags(uid, ["\\Seen"], (err) => {
                if (err) {
                  throw err;
                }
              });
              imap.setFlags(uid, ["\\Deleted"], (err) => {
                if (err) {
                  throw err;
                }
              });
            });
          });

          fetched.once("error", (ex) => Promise.reject(ex));

          fetched.once("end", () => {
            console.log("Done fetching all messages!");
            imap.end();
          });
        }
      );

    imap.once("ready", () => {
      imap.openBox("INBOX", false, () => {
        setTimeout(function () {
          searchEmail();
        }, 8000);
      });
    });
    imap.connect();
  });

module.exports = getEmails;
