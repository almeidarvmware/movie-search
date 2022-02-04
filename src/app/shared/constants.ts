export const APIUrls = {
    MOVIES: {
        GET_WITH_QUERY: (query: string, page: number) =>
          `https://api.themoviedb.org/3/search/movie?&api_key=feb6f0eeaa0a72662967d77079850353&query=${query}&page=${page}`
      }
}