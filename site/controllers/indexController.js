
module.exports = {
    home: (req,res) => {
        return res.render('home')
    },
    nosotros: (req,res) => {
        return res.render('nosotros')
    }
 /*   error404: (req,res) => {
        return res.render('404')
    }*/

}