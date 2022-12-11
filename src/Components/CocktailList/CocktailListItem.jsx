import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { Fragment } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Tools/Firebase/firebase";
import useGetSaved from "../../Tools/Hooks/useGetSaved";
import { useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomRating from "../Review/CustomRating";
import CustomAlert from "../Custom/CustomAlert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "40%",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function CocktailListItem({ cocktail }) {
  const [open, setOpen] = useState(false);
  const [save, setSave] = useState(false);
  const [saveAlert, setSaveAlert] = useState(false);
  const navigate = useNavigate();
  const shareURL = `https://api-app-23303.web.app/cocktail/${cocktail.idDrink}`;
  const { saved } = useGetSaved();

  useEffect(() => {
    if (saved) {
      saved.forEach((save) => {
        if (save.idDrink === cocktail.idDrink) {
          setSave(true);
        }
      });
    }
  }, [saved, cocktail.idDrink]);

  function handleModal() {
    setOpen(!open);
  }

  const handleClick = () => {
    navigate(`/cocktail/${cocktail.idDrink}`);
  };

  async function handleSave() {
    let uid = await auth.currentUser.uid;
    if (uid) {
      const savedRef = doc(db, "saved", auth.currentUser.uid);
      if (save) {
        await updateDoc(savedRef, {
          saved: arrayRemove(cocktail),
        });
        setSave(false);
      } else {
        await updateDoc(savedRef, {
          saved: arrayUnion(cocktail),
        });
        setSave(true);
      }
    }
    setSaveAlert(true);
  }

  function readMore(str, max = 10) {
    const array = str.trim().split(" ");
    const ellipsis = array.length > max ? "..." : "";
    return array.slice(0, max).join(" ") + ellipsis;
  }

  const card = (
    <Fragment>
      <CardMedia
        component="img"
        image={cocktail.strDrinkThumb}
        alt="Cocktail Thumbnail"
      />
      <CardContent sx={{ padding: "1em" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" component="div">
            {cocktail.strDrink}
          </Typography>
          {save ? (
            <Tooltip title="Remove">
              <IconButton onClick={handleSave}>
                <RemoveCircleIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Save">
              <IconButton onClick={handleSave}>
                <LibraryAddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        <Divider sx={{ marginBottom: "1em", marginTop: "0.5em" }} />
        <Stack direction="column" spacing={1}>
          <CustomRating id={cocktail.idDrink} readOnly={true} />
          <Stack direction="row" spacing={1}>
            <Chip label={cocktail.strAlcoholic} />
            <Chip label={cocktail.strCategory} variant="outlined" />
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: "40px" }}
          >
            {readMore("Instructions: " + cocktail.strInstructions, 16)}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: "1em" }}>
        <Button variant="outlined" color="secondary" onClick={handleModal}>
          Share
        </Button>
        <Button variant="contained" onClick={handleClick}>
          Learn More
        </Button>
      </CardActions>
    </Fragment>
  );

  return (
    <Grid item>
      {saveAlert && (
        <CustomAlert
          title="Success!"
          message={
            save
              ? `${cocktail.strDrink}'s was saved to your profile.`
              : `${cocktail.strDrink}'s was removed from your profile.`
          }
          severity="success"
          show={saveAlert}
          setShow={setSaveAlert}
        />
      )}
      <Card variant="outlined" sx={{ maxWidth: 300 }}>
        {card}
      </Card>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "0.5em" }}
          >
            Share The Cocktail!
          </Typography>
          <Divider sx={{ marginBottom: "1em" }} />
          <Stack direction="row">
            <OutlinedInput value={shareURL} fullWidth />
            <Button
              startIcon={<ContentCopyIcon />}
              sx={{ padding: "1em 2em" }}
              onClick={() => {
                navigator.clipboard.writeText(shareURL);
              }}
            >
              Copy
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Grid>
  );
}
