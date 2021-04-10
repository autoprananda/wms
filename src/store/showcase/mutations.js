/*
export function someMutation (state) {
}
*/
export const setUser = (state, payload) => {
  state.user = payload
  localStorage.setItem('user', JSON.stringify(payload))
}
export const setToken = (state, payload) => {
  state.ugAccessToken = payload
  localStorage.setItem('ugAccessToken', payload)
  // LocalStorage.set('logged', 'true')
}
export const setRToken = (state, payload) => {
  state.ugRefreshToken = payload
  localStorage.setItem('ugRefreshToken', payload)
}
export const settokensExpiry = (state, payload) => {
  state.tokensExpiry = payload
  localStorage.setItem('tokensExpiry', state.tokensExpiry)
}
export const setAppsmode = (state, payload) => {
  state.appsmode = payload
  localStorage.setItem('appsmode', payload)
}

export const setDataArea = (state, payload) => {
  state.dataArea = payload
}
export const setDataBranch = (state, payload) => {
  state.dataBranch = payload
}
export const setDataCity = (state, payload) => {
  state.dataCity = payload
}
export const setDataCountry = (state, payload) => {
  state.dataCountry = payload
}
export const setDataCurrency = (state, payload) => {
  state.dataCurrency = payload
}
export const setDataCustomer = (state, payload) => {
  state.dataCustomer = payload
}
export const setDataDropDown = (state, payload) => {
  state.dataDropDown = payload
}
export const setDataMenu = (state, payload) => {
  state.dataMenu = payload
}
export const setDataProduct = (state, payload) => {
  state.dataProduct = payload
}
export const setDataSubMenu = (state, payload) => {
  state.dataSubMenu = payload
}
export const setDataNavUpload = (state, payload) => {
  state.dataNavUpload = payload
}
export const setDataRegion = (state, payload) => {
  state.dataRegion = payload
}