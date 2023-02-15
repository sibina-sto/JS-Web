const pathController = {
  login: {
    pathName: 'login',
    title: 'Login Page',
  },
  register: {
    pathName: 'register',
    title: 'Register Page',
  },
  create: {
    pathName: 'trip-create',
    title: 'Create Offer Page',
  },
  edit: {
    pathName: 'trip-edit',
    title: 'Edit Page',
  },
  buy: {
    pathName: 'details',
    title: 'Details Page',
  },
};

const checkError = (error) => {
  let err;

  if (error.code == '11000') {
    const field = Object.keys(error.keyValue);
    const value = Object.values(error.keyValue);
    const message = `Duplicate field:(${field}) value: (${value}). Please use another value!`;

    return (err = { message, statusCode: error.statusCode || 400 });
  }
  if (error.name == 'CastError') {
    const message = `${error.path.toUpperCase()} must be a ${error.kind.toUpperCase()}.`;
    return { message, statusCode: error.statusCode || 400 };
  }
  err = { message: error.message, statusCode: error.statusCode || 400 };
  return err;
};

const errorController = (error, req, res, next) => {
  console.log(error)
  if (error.message === 'jwt expired') {
    res.clearCookie('auth');

    return res.redirect('/');
  }
  if (error.message === 'invalid signature') {
    res.clearCookie('auth');

    return res.redirect('/');
  }

  const path = req.path.split('/').slice(-1);
  const data = req.body;

  let err;
  if (error.errors) {
    err = Object.values(error.errors).map((el) => checkError(el));

    res.status(400).render(pathController[path].pathName, {
      errors: err,
      title: pathController[path].title,
      data,
    });
  } else {
    err = checkError(error);

    res.status(err.statusCode).render(pathController[path].pathName, {
      error: err,
      title: pathController[path].title,
      data,
    });
  }
};

module.exports = errorController;
