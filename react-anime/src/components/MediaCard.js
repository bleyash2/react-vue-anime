import React from "react";
import { useHistory } from "react-router-dom";
import "./MediaCard.css";

export default function MediaCard({ media }) {
  const history = useHistory();

  const handleTitle = (title) => {
    const { english, romaji } = title;
    return english !== null ? english : romaji;
  };

  return (
    <div onClick={() => history.push(`/title/${media.id}`)} className="mediaCard">
      <div className="coverImage">
        <div className="overlay">
          <div>{media.status}</div>
          <div>
            {media.genres.map((genre) => (
              <div key={`${media.id}-${genre}`}>{genre}</div>
            ))}
          </div>
        </div>
        <img src={media.coverImage.large} alt="" />
      </div>
      <h4>{handleTitle(media.title)}</h4>
      <h5>{media.title.native}</h5>
    </div>
  );
}
