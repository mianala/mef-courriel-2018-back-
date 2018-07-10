import {Injectable} from '@angular/core';

@Injectable()
export class XhrService {

  constructor() {
  }


  send(url, data, next) {

    this.post(url, data).then((result) => {
      console.log(result)
      next(result)
    }, (error) => {
      console.log(error)
    })

  }

  promise(url, formData, next) {
    new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', url, true);
      xhr.send(formData);

    }).then((result) => {
      next()
    }, (error) => {
      console.log(error)
    })
  }

  put(url, formData, next) {
    new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('PUT', url, true);
      xhr.send(formData);

    }).then((result) => {
      next()
    }, (error) => {
      console.log(error)
    })
  }


  post(url, model: any) {

    console.log('posting model')
    console.log(model)
    return new Promise((resolve, reject) => {
      const formData: any = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('data', JSON.stringify(model))

      if (model.files) {
        for (let i = 0; i < model.files.length; i++) {
          formData.append('files', model.files[i], model.files[i].name)
        }
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', url, true);
      xhr.send(formData)
    });
  }
}
