module.exports = (req,res,next) => {
    if (req.cookies.eltiempo) {
        req.session.userLogin = req.cookies.eltiempo
    }
    next()
}