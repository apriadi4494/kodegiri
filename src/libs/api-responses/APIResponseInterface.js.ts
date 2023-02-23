/* eslint-disable no-underscore-dangle */

import CustomResponse from './CustomResponse';

export default class APIResponseInterface {
  private _response;
  private status;
  private success;
  private error;
  private data;
  private meta;

  constructor(response) {
    if (!(response instanceof CustomResponse)) {
      // eslint-disable-next-line no-param-reassign
      response = new CustomResponse(response);
    }
    this._response = response;
    this.status = 0;
    this.success = false;
    this.error = null;
    this.data = null;
    this.meta = null;
  }

  setStatus(status) {
    this.status = parseInt(status, 10) || 0;
  }

  setError(error) {
    this.success = false;
    this.error = error;
    this.data = null;
  }

  setSuccess(data) {
    this.success = true;
    this.error = null;
    this.data = data;
  }

  setPaginate(data) {
    this.success = true;
    this.error = null;
    this.data = data.data ? data.data : null;
    this.meta = data.meta ? data.meta : null;
  }

  get response() {
    return this._response;
  }
}
