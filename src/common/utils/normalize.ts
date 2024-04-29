export const toBoolean = value => {
  switch (value) {
    case true:
    case 'true':
    case 'Yes':
    case 1:
      return true;
    case false:
    case 'false':
    case 'No':
    case 0:
      return false;
    default:
      return null;
  }
};