import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Bar from "../../Components/Nav/Bar";
import { auth, db } from "../../Tools/Firebase/firebase";

export default function Saved() {
  const [saved, setSaved] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function getSave(uid) {
      const docRef = doc(db, "saved", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSaved(docSnap.data().saved);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    if (user) {
      getSave(user.uid);
    }
  }, [user]);

  console.log(saved);

  return (
    <Box>
      <Bar />
      <Grid
      container
      spacing={4}
      sx={{ padding: "3em" }}
      alignItems="stretch"
      >
        {saved != null &&
          saved.length >= 1 &&
          saved.map((save, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={save.strDrinkThumb}
                  alt="Cocktail Thumbnail"
                />
                <CardContent>
                  <CardHeader title={save.strDrink} />
                  <Stack direction="row" spacing={1}>
                    <Chip label={save.strAlcoholic} />
                    <Chip label={save.strCategory} variant="outlined" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}