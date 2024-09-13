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
export const notSameUser = {
  name: 'notSameUser',
  message: 'You are not authorized to perform this action.',
  status: 401
}
export const wrongCredentials = {
  name: 'wrongCredentials',
  message: 'Username and/or Password Incorrect',
  status: 401
}
export const failedLoginRegister = {
  name: 'failedLoginRegister',
  message: 'Unsuccessful login or register, please try again!',
  status: 400
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
export const badCreateModel = {
  name: 'badCreateModel',
  message: 'Could not create Model. Try again',
  status: 400
}
export const badGetModel = {
  name: 'badGetModel',
  message: 'Could not get Model. Try again',
  status: 400
}
export const badGetModels = {
  name: 'badGetModels',
  message: 'Could not get Model. Try again',
  status: 400
}
export const badUpdateModel = {
  name: 'badUpdateModel',
  message: 'Could not update Model. Try again',
  status: 400
}
export const badDeleteModel = {
  name: 'badDeleteModel',
  message: 'Could not delete Model. Try again',
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
export const badCreateClient = {
  name: 'badCreateClient',
  message: 'Something went wrong creating Client. Please try again.',
  status: 400
}
export const badGetClients = {
  name: 'badGetClients',
  message: 'Something went wrong getting Clients. Please try again.',
  status: 400
}
export const badGetClient = {
  name: 'badGetClient',
  message: 'Something went wrong getting Client. Please try again.',
  status: 400
}
export const badUpdateClient = {
  name: 'badUpdateClient',
  message: 'Something went wrong updating Client. Please try again.',
  status: 400
}
export const badDeactivateClient = {
  name: 'badDeactivateClient',
  message: 'Something went wrong deactivating Client. Please try again.',
  status: 400
}
export const badReactivateClient = {
  name: 'badReactivateClient',
  message: 'Something went wrong reactivating Client. Please try again.',
  status: 400
}

export const badCreateFavorite = {
  name: 'badCreateFavorite',
  message: 'Something went wrong creating Client Favorite. Please try again.',
  status: 400
}
export const badGetFavorite = {
  name: 'badGetFavorite',
  message: 'Something went wrong getting Client Favorite. Please try again.',
  status: 400
}
export const badGetFavorites = {
  name: 'badGetFavorites',
  message: 'Something went wrong getting Client Favorites. Please try again.',
  status: 400
}
export const badUpdateFavorite = {
  name: 'badUpdateFavorite',
  message: 'Something went wrong updating Client Favorite. Please try again.',
  status: 400
}
export const badDeleteFavorite = {
  name: 'badDeleteFavorite',
  message: 'Something went wrong deleting Client Favorite. Please try again.',
  status: 400
}
export const badCreatePiece = {
  name: 'badCreatePiece',
  message: 'Something went wrong creating Piece. Please try again.',
  status: 400
}

export default {
  noUserId,
  noUserFoundId,
  noUserFoundUsername,
  noUsername,
  notSameUser,
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
  badCreateModel,
  badGetModel,
  badGetModels,
  badUpdateModel,
  badDeleteModel,
  badCreatePattern,
  badGetPattern,
  badGetPatterns,
  badUpdatePattern,
  badDeletePattern,
  badCreateClient,
  badGetClients,
  badGetClient,
  badUpdateClient,
  badDeactivateClient,
  badReactivateClient
}
