

module.exports = function(req, res, ok) {

    if(req.session.authenticated) {
        return ok();
    }

    else {
        var requireLoginError = [{name: "requireLogin", message: "You have to be signed in"}]
        req.session.flash = {
            err: requireLoginError
        }
    }
    res.redirect("http://localhost:3000/Login");
}