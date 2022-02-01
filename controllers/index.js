const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
//const dashboardRoutes = require('./dashboard-routes.js');
//const logout = require('./logout-routes.js');

router.use('/', homeRoutes);
//router.use('/dashboard', dashboardRoutes);
//router.use('/logout', logout);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });

module.exports = router;
