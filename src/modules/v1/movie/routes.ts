import * as movieController from './controllers/movie-controller';
import { authorizeTokenSetContext } from '../../../hooks/index';
import moduleConfig from './config/default';

const routes = [
  {
    path: '/listing',
    method: 'get',
    action: movieController.getMovieListing  
  },
  {
    path: '/genre/listing',
    method: 'get',
    action: movieController.getGenreListing  
  }
];

export default routes;
