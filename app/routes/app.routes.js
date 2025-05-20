var appRouter = new Object();

appRouter.initialize = function (app) {
  var userMaster = require('./user.route');
  app.use('/api/user', userMaster);

}

module.exports = appRouter;
