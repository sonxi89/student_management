import local from './local';
import production from './production';

export default function () {
  return process.env.REACT_APP_ENV === 'production' ? production : local;
}
