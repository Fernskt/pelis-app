import { useQuery } from "@tanstack/react-query";
import api from "../api/tmdb";

interface UseMoviesProps {
  query?: string;
  page?: number;
  year?: string;
  genres?: number[];
  director?: string; 
  platforms?: string[]; 
  title?: string; 
}

export const useMovies = ({
  query = "",
  page = 1,
  year,
  genres,
  director,
  platforms,
  title,
}: UseMoviesProps = {}) =>
  useQuery({
    queryKey: [
      "movies",
      query,
      page,
      year,
      genres?.join(","),
      director,
      platforms?.join(","),
      title,
    ],
    queryFn: async () => {
      const endpoint = query || title ? "/search/movie" : "/discover/movie";
      const params: any = {
        language: "es-MX",
        page,
      };
      if (query || title) params.query = query || title;

      if (year) params.primary_release_year = year;

      if (genres && genres.length > 0) params.with_genres = genres.join(",");

      const { data } = await api.get(endpoint, { params });

      let results = data.results;

      if (director) {
        results = results.filter((m: any) =>
          m.director?.toLowerCase().includes(director.toLowerCase())
        );
      }

      if (platforms && platforms.length > 0) {
        results = results.filter((m: any) =>
          m.platforms?.some((p: string) => platforms.includes(p))
        );
      }

      return { ...data, results };
    },
  });
