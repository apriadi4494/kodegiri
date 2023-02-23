import APISuccess from './responses/APISuccess';
import APIPaginate from './responses/ApiPaginate';
import * as _ from 'lodash';

export const ApiResponse = (res) => {
  const applySettings = (apiResponse, status) => {
    res.status(apiResponse.response.overrideStatus || status);
    apiResponse.setStatus(res.statusCode);

    return {
      send: () => res.send(_.omit(apiResponse, '_response')),
    };
  };

  const success = (data) => {
    const response = new APISuccess(data);
    applySettings(response, res.statusCode).send();
  };

  const paginate = (data) => {
    const response = new APIPaginate(data);
    applySettings(response, res.statusCode).send();
  };

  return {
    success,
    paginate,
  };
};
