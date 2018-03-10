import axios from 'axios'
import appConfig from '../../config/appConfig'

export let handleError = (err) => {
  console.warn('err: ', err);
  throw Error;
}

let parseJSON = (json) => { return (json && json.data) ? json.data : null; }

export default class Api {
  api = null

  constructor(){
    this.api = function() {
      return axios.create({
        baseURL: (process.env.NODE_ENV === 'development') ? appConfig.apiEndpointLocal : appConfig.apiEndpointRemote,
        timeout: 5000
      })
    }();
  }

  get(){
    return this.api.get('get')
      .then(parseJSON)
      .catch(handleError)
  }

  // post(data){
  //   return this.api.post('post', data)
  //     .then(parseJSON)
  //     .catch(handleError)
  // }
  //
  // put(data){
  //   return this.api.put('put', data)
  //     .then(parseJSON)
  //     .catch(handleError)
  // }
  //
  // delete(){
  //   return this.api.get('delete')
  //     .then(parseJSON)
  //     .catch(handleError)
  // }
}
