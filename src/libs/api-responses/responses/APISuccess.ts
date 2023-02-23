import APIResponseInterface from '../APIResponseInterface.js';

export default class APISuccess extends APIResponseInterface {
  constructor(response) {
    super(response);
    this.setStatus(200);
    this.setSuccess(this.response.payload);
  }
}
