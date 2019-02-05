const localHost = "http://localhost:5002"

export default{
  getAllLanguages(){
    return fetch(`${localHost}/languages`)
    .then(e => e.json())
  }
}