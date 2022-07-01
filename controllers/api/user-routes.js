const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  // try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
     console.log(user);
    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    console.log(user.dataValues.password, req.body.password);
    if (!(await bcrypt.compare(req.body.password, user.dataValues.password ))){
      res.status(400).json({ message: 'Invalid Password!' });
      return;
    }


    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.status(200).json({ user, message: 'You are now logged in!' });
    });
  // } catch (err) {
    // res.status(400).json({ message: 'No user account found!' });
  // }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
