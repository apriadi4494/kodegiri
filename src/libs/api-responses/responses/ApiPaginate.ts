import APIResponseInterface from '../APIResponseInterface.js';

export default class APIPaginate extends APIResponseInterface {
  constructor(response) {
    super(response);
    this.setStatus(200);
    this.setPaginate(this.response.payload);
  }
}
