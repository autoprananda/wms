/*
export function someGetter (state) {
}
*/
export function user(state) {
  return state.user
}
export function token(state) {
  return state.ugAccessToken
}
export function isAuth(state) {
  return state.user !== null
}
export function appsmode(state) {
  return state.appsmode
}
export function rtoken(state) {
  return state.ugRefreshToken
}
export function tokensExpiry(state) {
  return state.tokensExpiry
}