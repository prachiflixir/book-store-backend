var appRouter = new Object();
import genericHelper from "../../app/helpers/generic.helper"

appRouter.initialize = function (app) {

var userMaster = require('./user.route');
app.use('/api/user',userMaster);
} 