import React, { useEffect, useState } from "react";
import "./PublicationInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import * as Regular from "@fortawesome/free-regular-svg-icons";
import {
  readReaction,
  addReaction,
  deleteReaction,
} from "../../../api/publication";
import useAuth from "../../../hooks/useAuth";
import { API_HOST } from "../../../utils/constants";

export default function PublicationInfo(props) {
  const { pub, comments } = props;
  const pubPhoto = `${API_HOST}/mostrarFotoPub?id=${pub._id}`;
  const [reactions, setReactions] = useState([]);
  const [userReact, setUserReact] = useState([]);
  const [reaction, setReaction] = useState(0);
  const [refreshReactions, setRefreshReactions] = useState(false);
  const user = useAuth();
  useEffect(() => {
    readReaction(pub._id).then((response) => {
      setReactions(response);
    });
  }, [props, refreshReactions]);
  useEffect(() => {
    if (reactions) {
      setUserReact(reactions.filter((react) => react.userid === user._id));
    }
  }, [reactions]);
  useEffect(() => {
    if (reaction === 1) {
      addReaction(pub._id)
        .then((response) => {
          setRefreshReactions(true);
          setReaction(0);
        })
        .catch(() => {
          console.log("error en el codigo");
        });
    } else if (reaction === 2) {
      deleteReaction(pub._id)
        .then(() => {
          console.log("se elimino con exito");
        })
        .catch(() => {
          console.log("error en el codigo");
        });
    }
  }, [reaction]);
  return (
    <>
      <div className="publication">
        <p className="publication__txt"> {pub.publicacion} </p>
        <div>
            <img src={pubPhoto} alt="no-image" className="photoPub" />
        </div>
        <span className="publication__tnlg"> #{pub.tecnologias} </span>
        <div className="publication__like-comment">
          {userReact.length > 0 ? (
            <span className="solid-like">
              <FontAwesomeIcon
                onClick={() => setReaction(2)}
                icon={Solid.faHeart}
              />
              {reactions && <span className="count"> {reactions.length} </span>}
            </span>
          ) : (
            <span className="like">
              <FontAwesomeIcon
                onClick={() => setReaction(1)}
                icon={Regular.faHeart}
              />
              {reactions && <span className="count"> {reactions.length} </span>}
            </span>
          )}
            <span className="comments">
              <FontAwesomeIcon icon={Solid.faCommentAlt} />
              <span className="count"> {comments ? comments.length : ""} </span>
            </span>
          <div className="hr" />
        </div>
      </div>
    </>
  );
}
