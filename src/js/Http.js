class Http {
  constructor(uri) {
    this.uri = uri;
    this.xhr = new XMLHttpRequest();
  }
  static serialize(obj) {
    let arr = [];
    for (let prop in obj) {
      arr = [
        ...arr,
        `${encodeURIComponent(prop)}=${encodeURIComponent(obj[prop])}`,
      ];
    }
    return arr.join("&");
  }
  get(sq) {
    return new Promise((resolve, reject) => {
      this.xhr.open("GET", `${this.uri}/?${Http.serialize(sq)}`, true);
      this.xhr.addEventListener("load", function () {
        resolve(JSON.parse(this.response));
      });
      this.xhr.addEventListener("error", (error) => reject(error));
      this.xhr.send();
    });
  }
  post(data) {
    return new Promise((resolve, reject) => {
      this.xhr.open("POST", this.uri, true);
      this.xhr.setRequestHeader("Content-Type", "application/json");
      this.xhr.addEventListener("load", function () {
        resolve({ status: this.statusText, response: this.response });
      });
      this.xhr.addEventListener("error", (error) => reject(error));
      this.xhr.send(data);
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      this.xhr.open("DELETE", `${this.uri}/${id}`, true);
      this.xhr.addEventListener("load", function () {
        resolve({ status: this.statusText, response: this.response });
      });
      this.xhr.addEventListener("error", (error) => reject(error));
      this.xhr.send();
    });
  }
}

export default Http;
