export const noUserId = { name: 'noUserId', message: 'No User ID Given', status: 400 }
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
export const noUsername = { name: 'noUsername', message: 'No Username Given', status: 400 }
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
export const noUser = { name: 'noUser', message: 'No User Given', status: 400 }
export const notAdmin = { name: 'notAdmin', message: 'User Not Admin', status: 401 }
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
export const badCreateColor = {
  name: 'badCreateColor',
  message: 'Could not create Color. Try again',
  status: 400
}
export const badGetColors = {
  name: 'badGetColors',
  message: 'Could not get Colors. Try again',
  status: 400
}
export const badGetColor = {
  name: 'badGetColor',
  message: 'Could not get Color. Try again',
  status: 400
}
export const badUpdateColor = {
  name: 'badUpdateColor',
  message: 'Could not update Color. Try again',
  status: 400
}
export const badDeleteColor = {
  name: 'badDeleteColor',
  message: 'Could not delete Color. Try again',
  status: 400
}
export const badCreateItem = {
  name: 'badCreateItem',
  message: 'Could not create Item. Try again',
  status: 400
}
export const badGetItem = {
  name: 'badGetItem',
  message: 'Could not get Item. Try again',
  status: 400
}
export const badGetItems = {
  name: 'badGetItems',
  message: 'Could not get Item. Try again',
  status: 400
}
export const badUpdateItem = {
  name: 'badUpdateItem',
  message: 'Could not update Item. Try again',
  status: 400
}
export const badDeleteItem = {
  name: 'badDeleteItem',
  message: 'Could not delete Item. Try again',
  status: 400
}
export const badCreatePattern = {
  name: 'badCreatePattern',
  message: 'Could not create Pattern. Try again',
  status: 400
}
export const badGetPattern = {
  name: 'badGetPattern',
  message: 'Could not get Pattern. Try again',
  status: 400
}
export const badGetPatterns = {
  name: 'badGetPatterns',
  message: 'Could not get Patterns. Try again',
  status: 400
}
export const badUpdatePattern = {
  name: 'badUpdatePattern',
  message: 'Could not update Pattern. Try again',
  status: 400
}
export const badDeletePattern = {
  name: 'badDeletePattern',
  message: 'Could not delete Pattern. Try again',
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
  cannotFindUser,
  badCreateColor,
  badGetColors,
  badGetColor,
  badUpdateColor,
  badDeleteColor,
  badCreateItem,
  badGetItem,
  badGetItems,
  badUpdateItem,
  badDeleteItem,
  badCreatePattern,
  badGetPattern,
  badGetPatterns,
  badUpdatePattern,
  badDeletePattern
}
