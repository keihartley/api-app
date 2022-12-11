import {
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Modal,
  OutlinedInput,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import Bar from "../Nav/Bar";
import getInfo from "./cocktailFunctions";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import useFetchCocktail from "../../Tools/Hooks/useFetchCocktail";
import { useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useEffect } from "react";
import useGetSaved from "../../Tools/Hooks/useGetSaved";
import { auth, db } from "../../Tools/Firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import CustomAlert from "../Custom/CustomAlert";
import CustomRating from "../Review/CustomRating";
import Review from "../Review/Review";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  width: "40%",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function CocktailDetails() {
  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const [saveAlert, setSaveAlert] = useState(false);
  const { id } = useParams();
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data, loading } = useFetchCocktail(url);
  const keys = Object.keys(data);
  const ingredients = getInfo(keys, "strIngredient", data);
  const measurements = getInfo(keys, "strMeasure", data);
  const { saved } = useGetSaved();
  const shareURL = `https://api-app-23303.web.app/cocktail/${data.idDrink}`;

  useEffect(() => {
    if (saved && save.idDrink === data.idDrink) {
      setSave(true);
    }
  }, [saved, data.idDrink, save.idDrink]);

  function handleModal() {
    setOpen(!open);
  }

  async function handleSave() {
    let uid = await auth.currentUser.uid;
    if (uid) {
      const savedRef = doc(db, "saved", auth.currentUser.uid);
      if (save) {
        await updateDoc(savedRef, {
          saved: arrayRemove(data),
        });
        setSave(false);
      } else {
        await updateDoc(savedRef, {
          saved: arrayUnion(data),
        });
        setSave(true);
      }
    }
    setSaveAlert(true);
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareURL);
    setCopyAlert(true);
    setOpen(false);
  }

  //console.log(ingredients, measurements);
  return (
    <Box>
      {copyAlert && (
        <CustomAlert
          title="Success!"
          message={`${data.strDrink}'s link was copied.`}
          severity="success"
          show={copyAlert}
          setShow={setCopyAlert}
        />
      )}
      {saveAlert && (
        <CustomAlert
          title="Success!"
          message={
            save
              ? `${data.strDrink}'s was saved to your profile.`
              : `${data.strDrink}'s was removed from your profile.`
          }
          severity="success"
          show={saveAlert}
          setShow={setSaveAlert}
        />
      )}
      <Bar />
      {loading && <LinearProgress />}
      <Grid container justifyContent="center">
        <Grid
          item
          xl={5}
          lg={7}
          md={8}
          sm={9}
          xs={11}
          sx={{ padding: "2em" }}
          justifyContent="center"
        >
          <Card>
            <CardMedia
              component="img"
              height="350"
              image={data.strDrinkThumb}
              alt="Paella dish"
            />
            <Stack spacing={1} sx={{ padding: "2em" }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">{data.strDrink}</Typography>
                <div>
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
                  <Button
                    variant="contained"
                    sx={{ marginLeft: "1em" }}
                    onClick={handleModal}
                  >
                    Share
                  </Button>
                </div>
              </Stack>
              <Divider />
              <CustomRating id={id} />
              <Typography>Type: {data.strAlcoholic}</Typography>
              <Typography>Category: {data.strCategory}</Typography>
              <Typography>Served in {data.strGlass}</Typography>
              <Typography>Instructions: {data.strInstructions}</Typography>
              <Stack direction="row" spacing={1}>
                <List>
                  <ListSubheader>Ingredients</ListSubheader>
                  {ingredients.map((ingredient, index) => (
                    <ListItem key={index}>
                      <ListItemText>{ingredient}</ListItemText>
                    </ListItem>
                  ))}
                </List>

                <List>
                  <ListSubheader>Measurements</ListSubheader>
                  {measurements.map((measure, index) => (
                    <ListItem key={index}>
                      <ListItemText>{measure}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Stack>
              <Review id={id} />
            </Stack>
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
                  onClick={handleCopy}
                >
                  Copy
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
}
