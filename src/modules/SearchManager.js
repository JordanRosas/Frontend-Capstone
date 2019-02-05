const localHost = "http://localhost:5002"

export default{
  getAll(){
    return fetch(`${localHost}/users`)
    .then(r => r.json())
  },
  getAllLanguages(){
    return fetch(`${localHost}/languages`).then(e => e.json())
  },
  searchUserLanguages(query) {
    return fetch(`${localHost}/languages?language_like=${query}`)
    .then(e => e.json())

  },
  searchUsers(query) {
    return fetch(`${localHost}/users?languageId_like=${query}`)
    .then(e => e.json())
  }

}