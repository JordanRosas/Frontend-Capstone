const localHost = "http://localhost:5002"

export default {

    get(id) {
        return fetch(`${localHost}/messages/${id}`).then(data => data.json())
    },
    messageFriends(id){
      return fetch(`${localHost}/messages/${id}`).then(e => e.json())
    },
    getAll() {
        return fetch(`${localHost}/messages?_expand=user`).then(data => data.json())
    },

    postNewMessage(messageObj) {
        return fetch(`${localHost}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(messageObj)
        })
        .then(data => data.json())
      },

    editMessage(messageId, editedMessage) {
        return fetch(`${localHost}/messages/${messageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedMessage)
        })
      }
}