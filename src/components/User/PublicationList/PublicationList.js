import React, { useState, useEffect } from "react";
import { Image, Media, Popover } from "react-bootstrap";
import { map } from "lodash";
import { getUserApi } from "../../../api/user";
import { replaceURLWithHTMLLinks } from "../../../utils/functions";
import { API_HOST } from "../../../utils/constants";
import NotFound from "../../../assets/no-image.jpg";
import "./PublicationList.scss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import * as Regular from "@fortawesome/free-regular-svg-icons";
import { CopyBlock, dracula } from "react-code-blocks";
import { Link } from "react-router-dom";
import PopOver from "../../Publication/PopOver";
import useAuth from "../../../hooks/useAuth";
import * as Comment from "../../../api/comment";
import {
  readReaction,
  addReaction,
  deleteReaction,
} from "../../../api/publication";

export default function List(props) {
  const { publications, setRefreshPublication } = props;
  return (
    <div className="publication-list">
      {map(publications, (publication, index) => (
        <Publication
          key={index}
          publication={publication}
          setRefreshPublication={setRefreshPublication}
        />
      ))}
    </div>
  );
}
function Publication(props) {
  const [comments, setComments] = useState(null);
  const { publication, loggedUser, setRefreshPublication } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [userReact, setUserReact] = useState([]);
  const [refreshReactions, setRefreshReactions] = useState(false)
  const user = useAuth();
  const isUserPublication = () => {
    if (loggedUser._id === publication.userid) {
      return true;
    } else {
      return false;
    }
  };
  const [pop, setPop] = useState(false);
  const [target, setTarget] = useState(null);
  const ShowPop = (e) => {
    setPop(!pop);
    setTarget(e.target);
  };
  useEffect(() => {
    getUserApi(publication.userid)
      .then((response) => {
        setUserInfo(response);
        setAvatarUrl(
          response?.avatar
            ? `${API_HOST}/mostrarAvatr?id=${publication.userid}`
            : NotFound
        );
      })
      .catch((err) => {
        alert("error");
      });
    Comment.getComments(publication._id)
      .then((response) => {
        setComments(response);
      })
      .catch((err) => {
        console.log(err);
      });
    readReaction(publication._id)
      .then((response) => {
        setReactions(response || []);
      })
      .catch(() => {
        console.log("error en el codigo maldito si que si");
      });
  }, [props, publication,refreshReactions]);

  useEffect(() => {
    if (reactions) {
      setUserReact(reactions.filter((react) => react.userid === user._id));
    }
  }, [reactions]);
  const addReactionPublication = () => {
    let id = publication._id;
    if (userReact.length === 0) {
      addReaction(id)
        .then(() => {
          setRefreshReactions(true)
        })
        .catch("error en el codigo");
    } else {
      deleteReaction(id)
        .then(() => {
          setRefreshReactions(true)
        })
        .catch("error en el codigo");
    }
  };

  return (
    <div className="publication">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.nombre} {userInfo?.apellidos}
          <span className="date">{moment(publication.fecha).calendar()}</span>
          {isUserPublication ? (
            <span className="more-options" onClick={ShowPop}>
              <FontAwesomeIcon icon={Solid.faEllipsisH} />
            </span>
          ) : null}
        </div>
        <div
          className="link"
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(publication.publicacion),
          }}
        />
        <div>
          <div className="lang">
            <span>#{publication.tecnologias}</span>
          </div>
          <CopyBlock
            text={publication.code}
            language={publication.tecnologias}
            showLineNumbers={true}
            theme={dracula}
            wrapLines
          />
        </div>
        <div className="options">
          {userReact.length > 0 ? (
            <span className="like" onClick={addReactionPublication}>
              <FontAwesomeIcon className="solid-like" icon={Solid.faHeart} />
              <span className="count">{reactions.length || ""}</span>
            </span>
          ) : (
            <span className="like" onClick={addReactionPublication}>
              <FontAwesomeIcon icon={Regular.faHeart} />
              <span className="count">{reactions.length || ""}</span>
            </span>
          )}
          {comments && (
            <Media as={Link} to={`/u/${publication.userid}/${publication._id}`}>
              <span className="comments">
                <FontAwesomeIcon icon={Solid.faCommentAlt} />
                <span className="count">{comments.length}</span>
              </span>
            </Media>
          )}
        </div>
        <PopOver
          setRefreshPublication={setRefreshPublication}
          id={publication._id}
          setPop={setPop}
          pop={pop}
          target={target}
        ></PopOver>
      </div>
    </div>
  );
}
