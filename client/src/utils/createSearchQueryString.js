const initialQueries = {
  q: '',
  search: 'first_name',
  startDate: '',
  endDate: '',
  sort: 'createdAt',
  order: 'desc',
}

export const createSearchQueryString = (searchQueries) => {
  let newSearchURL = ''
  for (const key in searchQueries) {
    if (!newSearchURL) {
      if (searchQueries[key] && searchQueries[key] !== initialQueries[key]) {
        newSearchURL = `?${key.toString()}=${encodeURIComponent(
          searchQueries[key].toString().trim()
        )}`
      }
    } else {
      if (searchQueries[key] && searchQueries[key] !== initialQueries[key]) {
        newSearchURL =
          newSearchURL +
          `&${key.toString()}=${encodeURIComponent(
            searchQueries[key].toString().trim()
          )}`
      }
    }
  }
  return newSearchURL
}
