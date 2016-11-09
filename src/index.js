
import airbrakeJs from 'airbrake-js';

const middlewareFactory = (credentials, notify = {}) => {
  if (!credentials) {
    console.warn('Airbrake credentials must be provided for redux-airbrake middleware.');
  }

  const airbrake = new airbrakeJs(credentials);
  const airbrakeLog = (error, params) => {
    airbrake.addFilter(notice => {
      notice.params = { ...(notice.params || {}), ...params };
      return notice;
    });
    airbrake.notify({ ...notify, error });
  };

  return function middlewareStore (store) {
    return function middlewareNext (next) {
      return function middlewareAction (action) {
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
    };
  };
};

export default middlewareFactory;
