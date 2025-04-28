const responseHandler = {
  success: (res, data, message = 'Success') => {
    res.status(200).json({
      status: 200,
      message,
      data,
    })
  },
  created: (res, data, message = 'Created') => {
    res.status(201).json({
      status: 201,
      message,
      data,
    })
  },
  noContent: (res, message = 'No Content') => {
    res.status(204).json({
      status: 204,
      message,
    })
  },
  badRequest: (res, message = 'Bad Request') => {
    res.status(400).json({
      status: 400,
      message,
    })
  },
  notFound: (res, message = 'Not Found') => {
    res.status(404).json({
      status: 404,
      message,
    })
  },
  unauthorized: (res, message = 'Unauthorized') => {
    res.status(401).json({
      status: 401,
      message,
    })
  },
  forbidden: (res, message = 'Forbidden') => {
    res.status(403).json({
      status: 403,
      message,
    })
  },
}

module.exports = responseHandler
