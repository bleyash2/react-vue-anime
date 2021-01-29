import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import "./MediaView.css";

const QUERY = gql`
  query($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        english
        native
        romaji
      }
      coverImage {
        large
      }
      bannerImage
      description(asHtml: true)
      status
      genres
      averageScore
    }
  }
`;

export default function MediaView() {
  const history = useHistory();
  const { id } = useParams();
  const { data, error, loading } = useQuery(QUERY, { variables: { id } });
  console.log(data ? data : error);
  if (loading) return "Loading";
  if (error) return "API Limit Probably Reached";

  const handleTitle = (title) => {
    const { english, romaji } = title;
    return english !== null ? english : romaji;
  };

  const { bannerImage, coverImage, description, title, status, genres } = data.Media;
  return (
    <div className="mediaView">
      <div className="BackBtn" onClick={() => history.goBack()}>
        <ArrowBackIosRoundedIcon />
      </div>
      <div className="banner">
        <img src={bannerImage} alt="" />
      </div>
      <div className="content">
        <div className="coverImage">
          <img src={coverImage.large} alt="" />
          <div className="genres">
            {genres.map((genre, i) => (
              <div key={i} className="genreBadge">
                {genre}
              </div>
            ))}
          </div>
        </div>
        <div className="words">
          <div className="title">
            {handleTitle(title)}
            <div className="status">{`${status}`}</div>
          </div>
          <div className="subtitle">{title.native}</div>
          <div className="description" dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    </div>
  );
}
