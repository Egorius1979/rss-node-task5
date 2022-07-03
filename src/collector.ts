import { merge } from 'lodash';
import { DocumentNode } from 'graphql';
import { user } from './modules/users/schema/user';
import { artist } from './modules/artists/schema/artist';
import { band } from './modules/bands/schema/band';
import { genre } from './modules/genres/schema/genre';
import { favourites } from './modules/favourites/schema/favourites';
import { album } from './modules/albums/schema/album';
import { track } from './modules/tracks/schema/track';

export { UserAPI } from './modules/users/services/user-api';
export { ArtistAPI } from './modules/artists/services/artist-api';
export { BandAPI } from './modules/bands/services/band-api';
export { GenreAPI } from './modules/genres/services/genre-api';

import { userResolvers } from './modules/users/resolvers/user-resolvers';
import { artistResolvers } from './modules/artists/resolvers/artist-resolvers';
import { bandResolvers } from './modules/bands/resolvers/band-resolvers';
import { genreResolvers } from './modules/genres/resolvers/genre-resolvers';

export const typeDefs: DocumentNode[] = [
  user,
  artist,
  band,
  genre,
  favourites,
  album,
  track,
];

export const resolvers = merge(
  {},
  userResolvers,
  artistResolvers,
  bandResolvers,
  genreResolvers
);
