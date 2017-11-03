
export default function middlewareFactory (airbrake, noticeAnnotations = {}) {
  if (!airbrake || !airbrake.notify) {
    console.error('A valid Airbrake instance must be provided for redux-airbrake.');
    return store => next => action => {
      next(action);
    };
  }

  const airbrakeNotify = async (notice) =>
    await airbrake.notify({
      ...noticeAnnotations,
      ...notice,
      params: {
        ...(noticeAnnotations.params || {}),
        ...notice.params
      }
    });

  return store => next => action => {
    try {
      return next(action);
    } catch (error) {
      console.error(error);
      airbrakeNotify({
        error,
        params: {
          action,
          state: store.getState()
        }
      });
      return error;
    }
  };
}
