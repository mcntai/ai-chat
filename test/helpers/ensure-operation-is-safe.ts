const FORBIDDEN_ENVS = [
  'dev',
  'sandbox',
  'live',
];

export default function() {
  const env = process.env.NODE_ENV;

  if (!env || FORBIDDEN_ENVS.includes(env)) {
    throw new Error('Danger operation is detected!! Please change node env before running tests.');
  }
}
