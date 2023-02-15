exports.getHomePage = async (req, res) => {
  res.render('index', {
    title: 'Home Page',
  });
};

exports.get404Page = async (req, res) => {
  res.render('404', {
    title: 'Error Page',
  });
};
