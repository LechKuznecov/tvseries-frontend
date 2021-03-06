import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Notification,
  DropDownInput,
  DropDownSeason,
} from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./AddSeries.style";

function newSeason(season, seriesId, setNotification, setNotifSuccess, auth) {
  fetch(`http://localhost:8080/addseasons`, {
    method: "Post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      season: season,
      seriesId: seriesId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg) {
        setNotifSuccess(data.msg);
      } else {
        setNotification(data.msg);
      }
    })
    .catch((err) => setNotification(err));
}

function newEpisode(
  episode,
  seriesId,
  seasonId,
  episodeTitle,
  setNotification,
  setNotifSuccess,
  auth
) {
  fetch(`http://localhost:8080/addEpisodes`, {
    method: "Post",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${auth.token}`,
    },
    body: JSON.stringify({
      orderNum: episode,
      seriesId: seriesId,
      seasonId: seasonId,
      episodeTitle: episodeTitle,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg) {
        setNotifSuccess(data.msg);
      } else {
        setNotification(data.msg);
      }
    })
    .catch((err) => setNotification(err));
}

function AddSeasons() {
  const auth = useContext(AuthContext);

  const [series, setSeries] = useState([]);
  const [seriesId, setSeriesId] = useState();

  const [season, setSeason] = useState();
  const [seasonId, setSeasonId] = useState();
  const [seasonsArr, setSeasonsArr] = useState();

  const [episode, setEpisode] = useState();
  const [episodeTitle, setEpisodeTitle] = useState();

  const [notification, setNotification] = useState();
  const [notifSuccess, setNotifSuccess] = useState();

  //selects all from tvseries to dropdown
  useEffect(() => {
    fetch(`http://localhost:8080/shows`)
      .then((res) => res.json())
      .then((data) => {
        setSeries(data);
        setSeriesId(data[0].id);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/shows/${seriesId}/seasons`)
      .then((res) => res.json())
      .then((data) => {
        setSeasonsArr(data);
      })
      .catch((err) => console.log(err));
  }, [seriesId]);

  return (
    <S.StyledSection>
      <S.FormBox>
        {notification && (
          <Notification
            color="error"
            handleChange={() => setNotification(false)}
          >
            {notification}
          </Notification>
        )}
        {notifSuccess && (
          <Notification handleChange={() => setNotifSuccess(false)}>
            {notifSuccess}
          </Notification>
        )}
        <S.Heading>Add new Season</S.Heading>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            newSeason(season, seriesId, setNotification, setNotifSuccess, auth);
          }}
        >
          <DropDownInput
            labelText="SELECT SHOW"
            options={series}
            handleChange={(seriesId) => setSeriesId(seriesId)}
          />
          <TextField
            type="text"
            id="season"
            name="season"
            labelText="Season"
            placeholder="Season 1"
            handleChange={(e) => setSeason(e.target.value)}
          />
          <Button type="submit">Add new Season</Button>
        </form>
      </S.FormBox>

      <S.FormBox>
        <S.Heading>Add new episode</S.Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newEpisode(
              episode,
              seriesId,
              seasonId,
              episodeTitle,
              setNotification,
              setNotifSuccess,
              auth
            );
          }}
        >
          <DropDownSeason
            labelText="SELECT SEASON"
            options={seasonsArr}
            handleChange={(e) => setSeasonId(e.target.value)}
          />
          <TextField
            type="number"
            id="episode"
            name="episode"
            labelText="Episode NR."
            placeholder="1"
            handleChange={(e) => setEpisode(e.target.value)}
          />
          <TextField
            type="text"
            id="episodeTitle"
            name="episodeTitle"
            labelText="Episode Title"
            placeholder="Winter is Coming"
            handleChange={(e) => setEpisodeTitle(e.target.value)}
          />
          <Button type="submit">Add Episode</Button>
        </form>
      </S.FormBox>
    </S.StyledSection>
  );
}

export default AddSeasons;
