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
import React, { Component, Fragment } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Tools/Firebase/firebase";

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

class CocktailListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    const open = this.state.open;
    console.log(open);
    this.setState({ open: !open });
  }

  render() {
    const { cocktail, navigate } = this.props;
    const shareURL = `https://api-app-23303.web.app/cocktail/${cocktail.idDrink}`;

    const handleClick = () => {
      navigate(`/cocktail/${cocktail.idDrink}`);
    };

    async function handleSave() {
      let uid = await auth.currentUser.uid;
      if (uid) {
        const savedRef = doc(db, "saved", auth.currentUser.uid);
        await updateDoc(savedRef, {
          saved: arrayUnion(cocktail),
        });
      }
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
            <Tooltip title="Save">
              <IconButton onClick={handleSave}>
                <LibraryAddIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Divider sx={{ marginBottom: "1em", marginTop: "0.5em" }} />
          <Stack direction="column" spacing={1}>
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleModal}
          >
            Share
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Learn More
          </Button>
        </CardActions>
      </Fragment>
    );

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="outlined">{card}</Card>
        <Modal
          open={this.state.open}
          onClose={this.handleModal}
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
              >
                Copy
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Grid>
    );
  }
}

export default CocktailListItem;
