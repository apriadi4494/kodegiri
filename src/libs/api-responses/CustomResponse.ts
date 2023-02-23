export default class CustomResponse {
  private payload;
  private settings;
  private sets;
  private overrideStatus;

  constructor(data, settings = {}) {
    this.payload = data || null;
    this.settings = settings || {};
    this.sets = {};
    this.overrideStatus = null;
  }

  set(key, value) {
    this.sets = {
      [key]: value,
    };
  }

  status(newStatus) {
    this.overrideStatus = parseInt(newStatus, 10) || null;
  }
}
