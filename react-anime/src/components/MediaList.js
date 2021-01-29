import React, { Fragment } from "react";
import MediaCard from "./MediaCard";
import { gql, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";

const MEDIA_QUERY = gql`
  query($page: Int) {
    Page(page: $page, perPage: 10) {
      pageInfo {
        hasNextPage
      }
      media(type: ANIME, season: WINTER, seasonYear: 2021, sort: TRENDING_DESC) {
        id
        title {
          english
          native
          romaji
        }
        coverImage {
          large
        }
        status
        genres
      }
    }
  }
`;

export default function MediaList() {
  const { pageNum } = useParams();
  const history = useHistory();
  const { data, loading, error } = useQuery(MEDIA_QUERY, { variables: { page: pageNum } });

  if (loading) return "Loading";
  if (error) return "API Limit Probably Reached";

  const handlePageClick = (direction) => {
    console.log(data);
    if (direction === "forward" && data.Page.pageInfo.hasNextPage) {
      console.log("Going to Next Page");
      history.replace(`/${parseInt(pageNum) + 1}`);
    } else if (direction === "backward" && parseInt(pageNum) > 1) {
      history.replace(`/${parseInt(pageNum) - 1}`);
    }
  };

  return (
    <Fragment>
      <div className="MediaList">
        {data?.Page?.media.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>
      <div className="PageButtons">
        <div className="pageBtn" onClick={() => handlePageClick("backward")}>
          <ArrowBackIosRoundedIcon />
        </div>
        {pageNum}
        <div className="pageBtn" onClick={() => handlePageClick("forward")}>
          <ArrowForwardIosRoundedIcon />
        </div>
      </div>
    </Fragment>
  );
}
