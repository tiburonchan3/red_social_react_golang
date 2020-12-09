import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import "./Friends.scss";
import { getFollowFriends } from "../../api/follow";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import FriendsList from "../../components/FriendsList";
import { useDebouncedCallback } from "use-debounce";
import { isEmpty } from "lodash";

function Friends(props) {
  const { setRefreshCheckLogin, location, history } = props;
  const [followFriends, setFollowFriends] = useState(null);
  const params = useFriendsQuery(location);
  const [typeUser, setTypeUser] = useState(params.tipo || "follow");
  const onSearch = useDebouncedCallback((value) => {
    setFollowFriends(null);
    history.push({
      search: queryString.stringify({ ...params, search: value, page: 1 }),
    });
  }, 300);
  useEffect(() => {
    getFollowFriends(queryString.stringify(params))
      .then((response) => {
        if (isEmpty(response)) {
          setFollowFriends([]);
        } else {
          setFollowFriends(response);
        }
      })
      .catch((err) => {
        setFollowFriends([]);
      });
  }, [location]);
  const onChangeType = (tipo) => {
    setFollowFriends(null);
    if (tipo === "new") {
      setTypeUser("new");
    } else {
      setTypeUser("follow");
    }
    history.push({
      search: queryString.stringify({ tipo: tipo, page: 1, search: "" }),
    });
  };
  return (
    <BasicLayout
      setRefreshCheckLogin={setRefreshCheckLogin}
      className="friends"
    >
      <div className="friends__title">
        <h2>Amigos</h2>
        <input
          type="text"
          placeholder="Escribe para buscar"
          onChange={(e) => onSearch.callback(e.target.value)}
        />
      </div>
      <ButtonGroup className="friends__options">
        <Button
          onClick={() => onChangeType("follow")}
          className={typeUser === "follow" && "active"}
        >
          Siguiendo
        </Button>
        <Button
          onClick={() => onChangeType("new")}
          className={typeUser === "new" && "active"}
        >
          Nuevos
        </Button>
      </ButtonGroup>

      {!followFriends ? (
        <div className="friends__loading">
          <Spinner animation="border" variant="info"></Spinner>
          Buscando usuarios
        </div>
      ) : (
        <FriendsList followFriends={followFriends} />
      )}
    </BasicLayout>
  );
}
function useFriendsQuery(location) {
  const { page = 1, tipo = "follow", search } = queryString.parse(
    location.search
  );
  return { page, tipo, search };
}
export default withRouter(Friends);
