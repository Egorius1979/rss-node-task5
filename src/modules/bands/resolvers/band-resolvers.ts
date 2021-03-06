import {
  transform,
  getFromIdsArray,
  deleteMessage,
  setMembers,
  setQuery,
} from '../../../common-handlers';
import { IBand, Band, IGenre } from '../services/band-type';

export const bandResolvers = {
  Query: {
    band: async (_, { id }: IBand, { dataSources }): Promise<Band> => {
      const res = await dataSources.bandAPI.getBand(id);
      return transform(res);
    },
    bands: async (_, { offset, limit }, { dataSources }): Promise<Band[]> => {
      const query = setQuery(offset, limit);
      const { items } = await dataSources.bandAPI.getAllBands(query);
      return items.map((it: Band) => transform(it));
    },
  },
  Band: {
    members: async (parent, __, { dataSources }) => {
      const { members } = parent;
      const artistsIds = members.map((it) => it.artistId);
      const artists = await getFromIdsArray(artistsIds, dataSources.artistAPI, 'getArtist');
      return setMembers(members, artists);
    },
    genres: ({ genresIds }: IBand, __, { dataSources }): Promise<IGenre[]> => {
      return getFromIdsArray(genresIds, dataSources.genreAPI, 'getGenre');
    },
  },
  Mutation: {
    createBand: async (_, band: IBand, { dataSources }): Promise<Band> => {
      const res = await dataSources.bandAPI.createBand(band);
      return transform(res);
    },
    updateBand: async (_, update: IBand, { dataSources }): Promise<Band> => {
      const res = await dataSources.bandAPI.updateBand(update);
      return transform(res);
    },
    deleteBand: async (_, { id }: IBand, { dataSources }) => {
      await dataSources.bandAPI.deleteBand(id);
      return deleteMessage;
    },
  },
};
