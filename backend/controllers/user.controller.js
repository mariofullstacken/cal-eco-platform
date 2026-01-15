const {
  successResponse,
  notFoundResponse,
  validationErrorResponse,
} = require('../utils/response');
const logger = require('../utils/logger');
const userService = require('../services/user.service');

const validateProfilePayload = (payload) => {
  const errors = [];
  const { firstName, lastName, username, intro } = payload;

  if (firstName !== undefined && typeof firstName !== 'string') {
    errors.push('First name must be a string');
  }
  if (lastName !== undefined && typeof lastName !== 'string') {
    errors.push('Last name must be a string');
  }
  if (intro !== undefined && typeof intro !== 'string') {
    errors.push('Intro must be a string');
  }
  if (username !== undefined) {
    if (typeof username !== 'string') {
      errors.push('Username must be a string');
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      errors.push('Username must be 3-20 characters and use letters, numbers, or _');
    }
  }

  return errors;
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await userService.getUserProfileByAddress(req.address);
    if (!user) {
      const { response, statusCode } = notFoundResponse('User not found');
      return res.status(statusCode).json(response);
    }

    const { response, statusCode } = successResponse(user);
    return res.status(statusCode).json(response);
  } catch (error) {
    logger.error('Get user error:', error);
    return next(error);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      intro: req.body.intro,
    };

    const validationErrors = validateProfilePayload(payload);
    const hasUpdates = Object.values(payload).some((value) => value !== undefined);
    if (!hasUpdates) {
      const { response, statusCode } = validationErrorResponse(
        'No profile fields provided'
      );
      return res.status(statusCode).json(response);
    }

    if (validationErrors.length > 0) {
      const { response, statusCode } = validationErrorResponse(
        'Invalid profile payload',
        { errors: validationErrors }
      );
      return res.status(statusCode).json(response);
    }

    if (payload.username) {
      const isTaken = await userService.isUsernameTaken(payload.username, req.user_id);
      if (isTaken) {
        const { response, statusCode } = validationErrorResponse(
          'Username already exists'
        );
        return res.status(statusCode).json(response);
      }
    }

    const user = await userService.updateUserProfile(req.address, payload);
    if (!user) {
      const { response, statusCode } = notFoundResponse('User not found');
      return res.status(statusCode).json(response);
    }

    const { response, statusCode } = successResponse(user, 'Profile updated');
    return res.status(statusCode).json(response);
  } catch (error) {
    logger.error('Update user error:', error);
    return next(error);
  }
};

exports.checkUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      const { response, statusCode } = validationErrorResponse('Username is required');
      return res.status(statusCode).json(response);
    }

    const exists = await userService.isUsernameTaken(username, req.user_id);
    const { response, statusCode } = successResponse({ exists });
    return res.status(statusCode).json(response);
  } catch (error) {
    logger.error('Check username error:', error);
    return next(error);
  }
};
