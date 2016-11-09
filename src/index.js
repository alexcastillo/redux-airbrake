
import airbrakeJs from 'airbrake-js';

export default function middlewareFactory (credentials, notify = {}) {
  if (!credentials) {
    console.error('Airbrake credentials must be provided for redux-airbrake middleware.');
    return store => next => action => {
      next(action);
    }
  }

  const airbrake = new airbrakeJs(credentials);
  const airbrakeLog = (error, params) => {
    airbrake.addFilter(notice => {
      notice.params = { ...(notice.params || {}), ...params };
      return notice;
    });
    airbrake.notify({ ...notify, error });
  };

  return store => next => action => {
    try {
      return next(action);
    } catch (error) {
      console.error(error);
      const params = {
        reduxAction: action
      };
      airbrakeLog(error, params);
      return error;
    }
  };
}
