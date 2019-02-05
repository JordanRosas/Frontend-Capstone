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
    return fetch(`${localHost}/languages?q=${query}`)
    .then(e => e.json())
  }

}