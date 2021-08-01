const logger = (param) => (store) => (next) => (action) => {
  if (process.env.NODE_ENV === "development")
    console.log(action.type, { store, next, action });
  next(action);
};

export default logger;
