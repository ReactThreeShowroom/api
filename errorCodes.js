export const noUserId = {
  name: 'noUserId',
  message: 'No User ID Given',
  status: 400
}
export const noUserFoundId = {
  name: 'noUserFoundId',
  message: 'No User Found With Given ID',
  status: 400
}
export const noUserFoundUsername = {
  name: 'noUserFoundUsername',
  message: 'No User Found With Given Username',
  status: 400
}
export const noUsername = {
  name: 'noUsername',
  message: 'No Username Given',
  status: 400
}
export const missingCredentials = {
  name: 'missingCredentials',
  message: 'Missing required credentials, please try again.',
  status: 400
}
export const wrongCredentials = {
  name: 'wrongCredentials',
  message: 'Username and/or Password Incorrect',
  status: 401
}
export const tokenMalformed = (prefix) => ({
  name: 'TokenMalformed',
  message: `Authorization token must start with '${prefix}'`,
  status: 400
})
export const authHeaderError = {
  name: 'AuthorizationHeaderError',
  message: 'Authorization token malformed',
  status: 401
}
export const noUser = {
  name: 'noUser',
  message: 'No User Given',
  status: 400
}
export const notAdmin = {
  name: 'notAdmin',
  message: 'User Not Admin',
  status: 401
}
export const notAuthorized = {
  name: 'notAuthorized',
  message: "You don't have authorization for this action"
}
export const unknownError = {
  name: 'unknownError',
  message: 'Something went wrong, please try again'
}
export const cannotFindUser = {
  name: 'cannotFindUser',
  message: 'Cannot validate User Token or Id',
  status: 400
}
export const usernameAlreadyExists = {
  name: 'usernameAlreadyExists',
  status: 400,
  message: 'Username Already Exists'
}
export const unknownType = {
  name: 'unknownType',
  message: 'Unknown Type Given for Check',
  status: 400
}

export default {
  noUserId,
  noUserFoundId,
  noUserFoundUsername,
  noUsername,
  missingCredentials,
  wrongCredentials,
  tokenMalformed,
  authHeaderError,
  noUser,
  notAdmin,
  notAuthorized,
  unknownError,
  cannotFindUser
}
