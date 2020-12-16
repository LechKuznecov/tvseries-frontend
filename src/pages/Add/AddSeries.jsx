import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { TextField, Button, Notification } from "../../components";
import * as S from "./AddSeries.style";

function newSeries(
  title,
  creator,
  premiere,
  poster,
  wallpaper,
  description,
  network,
  // history,
  setNotification
) {
  fetch(`http://localhost:8080/addtvseries`, {
    method: "Post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      creator: creator,
      premiere: premiere,
      poster: poster,
      wallpaper: wallpaper,
      description: description,
      network: network,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg === "User has been succesfully registered") {
        setNotification(data.msg);
        // history.push("/addSeasons");
      } else {
        setNotification(data.msg);
      }
    })
    .catch((err) => setNotification(err));
}

function AddSeries() {
  const [title, setTitle] = useState();
  const [creator, setCreator] = useState();
  const [premiere, setPremiere] = useState();
  const [poster, setPoster] = useState();
  const [wallpaper, setWallpaper] = useState();
  const [description, setDescription] = useState();
  const [network, setNetwork] = useState();
  const [notification, setNotification] = useState();
  // const history = useHistory();

  return (
    <S.StyledSection>
      <S.FormBox>
        <S.Heading>Add new Show</S.Heading>
        {notification && (
          <Notification
            color="error"
            handleChange={() => setNotification(false)}
          >
            {notification}
          </Notification>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newSeries(
              title,
              creator,
              premiere,
              poster,
              wallpaper,
              description,
              network,
              // history,
              setNotification
            );
          }}
        >
          <TextField
            type="text"
            id="title"
            name="title"
            labelText="Title"
            placeholder="Game of Thrones"
            handleChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            type="text"
            id="creator"
            name="creator"
            labelText="Creator of Show"
            placeholder="Craig Viveiros"
            handleChange={(e) => setCreator(e.target.value)}
          />
          <TextField
            type="number"
            id="premiere"
            name="premiere"
            labelText="Premiere of this show"
            placeholder="2019"
            handleChange={(e) => setPremiere(e.target.value)}
          />
          <TextField
            type="text"
            id="poster"
            name="poster"
            labelText="Poster of show"
            placeholder="http://poster.jpg"
            handleChange={(e) => setPoster(e.target.value)}
          />
          <TextField
            type="text"
            id="wallpaper"
            name="wallpaper"
            labelText="Wallpaper of show"
            placeholder="http://wallpaper.jpg"
            handleChange={(e) => setWallpaper(e.target.value)}
          />
          <TextField
            type="text"
            id="description"
            name="description"
            labelText="Description"
            placeholder="Description"
            handleChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="text"
            id="network"
            name="network"
            labelText="Network of Show"
            placeholder="HBO"
            handleChange={(e) => setNetwork(e.target.value)}
          />
          <Button type="submit">Add new Show</Button>
        </form>
      </S.FormBox>
      <S.LinkContainer>
        <S.StyledLink to="/addSeasons">
          Already show added? <strong>Add seasons</strong>.
        </S.StyledLink>
      </S.LinkContainer>
    </S.StyledSection>
  );
}

export default AddSeries;