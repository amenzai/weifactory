import storage from 'good-storage'

const USER_INFO = '__userinfo__'

// function insertArray(arr, val, compare, maxLen) {
//   const index = arr.findIndex(compare)
//   if (index === 0) {
//     return
//   }
//   if (index > 0) {
//     arr.splice(index, 1)
//   }
//   arr.unshift(val)
//   if (maxLen && arr.length > maxLen) {
//     arr.pop()
//   }
// }

// function deleteFromArray(arr, compare) {
//   const index = arr.findIndex(compare)
//   if (index > -1) {
//     arr.splice(index, 1)
//   }
// }

// export function saveSearch(query) {
//   let searches = storage.get(SEARCH_KEY, [])
//   insertArray(searches, query, (item) => {
//     return item === query
//   }, SEARCH_MAX_LEN)
//   storage.set(SEARCH_KEY, searches)
//   return searches
// }

// export function deleteSearch(query) {
//   let searches = storage.get(SEARCH_KEY, [])
//   deleteFromArray(searches, (item) => {
//     return item === query
//   })
//   storage.set(SEARCH_KEY, searches)
//   return searches
// }
// 
export function getUserInfo() {
  return storage.get(USER_INFO, {})
}
export function removeUserInfo() {
  return storage.remove(USER_INFO)
}
export function setUserInfo(userInfo) {
  storage.set(USER_INFO, userInfo)
}

export function removeAll() {
  storage.clear()
}

