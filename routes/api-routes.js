var db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    res.redirect("/burgers");
  });

  app.get("/burgers", (req, res) => {
    var query = {};
    if (req.query.CustomerId) {
      query.Customer = req.query.CustomerId;
    }

    db.Burger.findAll({
      include: db.Customer,
      where: query
    }).then(data => {
      var hbsObject = { burgers: data };
      res.render("index", hbsObject);
    });
  });


  app.post("/burgers/create", (req, res) => {
    db.Burger.create({
      burger_name: req.body.burger_name
    }).then(() => {
      res.redirect("/burgers");
    });
  });

  
  app.put("/burgers/update", (req, res) => {
    var customerName = req.body.eaten_by;

    db.Customer.findAll({
      where: { customer_name: customerName }
    }).then(data => {
      if (data.length > 0) {
        console.log("duplicate customer");
        devour(data[0].dataValues.id);
      } else {
        console.log("new customer");
        db.Customer.create({
          customer_name: req.body.eaten_by
        }).then(data => devour(data.dataValues.id));
      }
    });

    function devour(customer) {
      console.log("yummy");

      db.Burger.update(
        {
          devoured: true,
          CustomerId: customer
        },
        {
          where: { id: req.body.burger_id }
        }
      ).then(() => {
        res.redirect("/burgers");
      });
    }
  });
};
