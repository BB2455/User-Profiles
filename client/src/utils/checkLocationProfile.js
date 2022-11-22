const regex = new RegExp(/^\/profile/iu)

export const checkLocationProfile = (text) => {
  return regex.test(text)
}
