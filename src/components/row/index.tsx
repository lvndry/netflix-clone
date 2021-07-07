import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Movie } from "../../models/movie";
import { httpClient, imgBaseUrl } from "../../core/http";

export interface IRowProps {
  title: string;
  urlEndpoint: string;
  large?: boolean;
}

export const Row: React.FC<IRowProps> = ({ title, urlEndpoint, large }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await httpClient.get(urlEndpoint);
      setMovies(data.results);
    };

    getMovies();
  }, [urlEndpoint]);

  return (
    <RowContainer>
      <Title>{title}</Title>
      <MoviesRow>
        {movies.map((movie) => {
          return (
            <Moviesontainer key={movie.id}>
              <PosterImage
                src={`${imgBaseUrl}${
                  large ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.original_title}
              />
            </Moviesontainer>
          );
        })}
      </MoviesRow>
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
