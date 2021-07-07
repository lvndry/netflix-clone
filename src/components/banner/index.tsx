import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { endpoints, httpClient, imgBaseUrl } from "../../core/http";

import { Movie } from "../../models/movie";

export interface IBannerProps {}

export const Banner: React.FC<IBannerProps> = () => {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const getBannerMovie = async () => {
      const { data } = await httpClient.get(`${endpoints.trending}`);
      const index = Math.floor(Math.random() * data.results.length);
      setMovie(data.results[index]);
    };

    getBannerMovie();
  }, []);

  return movie ? (
    <BannerHeader endpoint={movie.backdrop_path}>
      <BannerContent>
        <BannerTitle>{movie.original_title || movie.original_name}</BannerTitle>
        <BannerButton>Play</BannerButton>
        <BannerButton>+ My List</BannerButton>
        <Description>{movie.overview}</Description>
      </BannerContent>
      <BottomFade />
    </BannerHeader>
  ) : null;
};

const BannerHeader = styled.header<{ endpoint: string }>`
  background-image: ${({ endpoint }) => `url("${imgBaseUrl}${endpoint}")`};
  background-size: cover;
  background-position: center top;
  color: white;
  object-fit: contain;
  height: 18em;
`;

const BannerContent = styled.div`
  margin-left: 30px;
  padding-top: 3em;
  height: 190px;
`;

const BannerTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
  margin-bottom: 0.3em;
`;

const BannerButton = styled.button`
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding: 0.5rem 2rem;
  margin-right: 1rem;
  background-color: rgba(51, 51, 51, 0.5);
  opacity: 0.9;

  :hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.4s;
  }
`;

const Description = styled.div`
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 1rem;
  max-width: 55em;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const BottomFade = styled.div`
  height: 5rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;
