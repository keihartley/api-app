import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Modal,
  OutlinedInput,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Tools/Firebase/firebase";
import CustomRating from "../Review/CustomRating";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CustomAlert from "../Custom/CustomAlert";
import useGetSaved from "../../Tools/Hooks/useGetSaved";
import useMediaQuery from '@mui/material/useMediaQuery';

const MAX_CHARS = {
  xs: 50,
  sm: 70,
  md: 100,
  lg: 140,
  xl: 190
}

const HEIGHT = {
  xs: '2em',
  sm: '2.5em',
  md: '3.0em',
  lg: '3.5em',
  xl: '4.0em'
}

export default function CocktailCard({ cocktail }) {
  const [description, setDescription] = useState("");
  const [height, setHeight] = useState(HEIGHT.md)
  const breakpoint = useMediaQuery('(min-width:600px)') ? 'sm' : 'xs';
  const [truncatedDescription, setTruncatedDescription] = useState(description.substring(0, MAX_CHARS[breakpoint]));
  const theme = useTheme();
  const [save, setSave] = useState(false);
  const [saveAlert, setSaveAlert] = useState(false);
  const shareURL = `https://api-app-23303.web.app/cocktail/${cocktail.idDrink}`;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { saved } = useGetSaved();
  const [overflowOpacity, setOverflowOpacity] = useState(1);

  const handleOverflow = (e) => {
    if (e.target.scrollHeight > e.target.clientHeight) {
        setOverflowOpacity(0.5);
    } else {
        setOverflowOpacity(1);
    }
  }

  useEffect(() => {
    if (saved) {
      saved.forEach((save) => {
        if (save.idDrink === cocktail.idDrink) {
          setSave(true);
        }
      });
    }
  }, [saved, cocktail.idDrink]);

  useEffect(() => {
    setDescription(cocktail.strInstructions)
    setTruncatedDescription(description.substring(0, MAX_CHARS[breakpoint]))
    setHeight(HEIGHT[breakpoint])
  }, [breakpoint, cocktail, description])

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

  function handleModal() {
    setOpen(!open);
  }

  const handleClick = () => {
    navigate(`/cocktail/${cocktail.idDrink}`);
  };

  return (
    <Card
      sx={{
        color: theme.palette.text.surface,
        background: theme.palette.background.surface,
        height: "100%",
        width: "100%"
      }}
      elevation={6}
      square
    >
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
      <CardMedia
        component="img"
        image={cocktail.strDrinkThumb}
        alt="Cocktail Thumbnail"
      />
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ paddingBottom: "0.5em" }}
          >
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
              <IconButton onClick={handleSave} color="primary">
                <LibraryAddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        <Stack direction="column" spacing={2}>
          <CustomRating id={cocktail.idDrink} readOnly={true} />
          <Stack direction="row" spacing={1}>
            <Chip label={cocktail.strAlcoholic} color="secondary" />
            <Chip
              label={cocktail.strCategory}
              variant="outlined"
              color="secondary"
            />
          </Stack>
          <Typography
            variant="body2"
            color="text.surface"
            sx={{height: height, opacity: overflowOpacity}}
            onWheel={handleOverflow}
          >
            {description.length > MAX_CHARS[breakpoint] ? truncatedDescription + '... read more...' : description}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ paddingBottom: "1.5em" }}>
        <Button variant="outlined" color="primary" onClick={handleModal}>
          Share
        </Button>
        <Button variant="contained" onClick={handleClick}>
          Learn More
        </Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Share The Cocktail!
          </Typography>
          <Stack direction="row">
            <OutlinedInput value={shareURL} fullWidth />
            <Button
              startIcon={<ContentCopyIcon />}
              onClick={() => {
                navigator.clipboard.writeText(shareURL);
              }}
            >
              Copy
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Card>
  );
}