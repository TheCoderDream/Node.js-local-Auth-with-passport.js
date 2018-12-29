exports.getHomePage = (req, res) => {
    res.render('Welcome to my website');
};

exports.getDashboardPage = (req, res) => {
    res.render('dashboard', {
        user: req.user
    })
}