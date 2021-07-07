import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Movie } from "../../models/movie";
import { httpClient, imgBaseUrl } from "../../core/http";
import Player from "react-player";
import movieTrailer from "movie-trailer";

export interface IRowProps {
  title: string;
  urlEndpoint: string;
  large?: boolean;
}

export const Row: React.FC<IRowProps> = ({ title, urlEndpoint, large }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerId, setTrailerId] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await httpClient.get(urlEndpoint);
      setMovies(data.results);
    };

    getMovies();
  }, [urlEndpoint]);

  const handleClick = (movie: Movie) => {
    if (trailerId) {
      setTrailerId(null);
    } else {
      movieTrailer(
        movie.original_name || movie.original_title || movie.name || ""
      )
        .then((url?: string) => {
          if (url) {
            console.log(url);
            setTrailerId(url);
          }
        })
        .catch((err: any) => console.error(err));
    }
  };

  return (
    <RowContainer>
      <Title>{title}</Title>
      <MoviesRow>
        {movies.map((movie) => {
          return (
            <Moviesontainer key={movie.id}>
              <PosterImage
                onClick={() => handleClick(movie)}
                src={`${imgBaseUrl}${
                  large ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.original_title}
              />
            </Moviesontainer>
          );
        })}
      </MoviesRow>
      {trailerId && (
        <TrailerPlayer
          className="player"
          url={trailerId}
          controls
          playing
          width="100%"
        />
      )}
    </RowContainer>
  );
};

const RowContainer = styled.div``;

const Title = styled.h2`
  color: white;
  text-align: left;
`;

const MoviesRow = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Moviesontainer = styled.div`
  margin-right: 10px;
`;

const PosterImage = styled.img`
  object-fit: contain;
  width: 15rem;
  transition: transform 450ms;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 1em;

  &:hover {
    transform: scale(1.1);
  }
`;

const TrailerPlayer = styled(Player)`
  width: unset;
  height: unset;
`;
