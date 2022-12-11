import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../Tools/Firebase/firebase";
import useGetReview from "../../Tools/Hooks/useGetReview";

export default function CustomReview({ id }) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const { reviews, loading } = useGetReview(id);

  async function handleReviewing(res) {
    let user = await auth.currentUser;
    if (user) {
      const reviewRef = doc(db, "reviews", id);
      const docSnap = await getDoc(reviewRef);
      if (user.uid in docSnap.data()) {
        await updateDoc(reviewRef, {
          [`${user.uid}`]: {
            title: title,
            message: message,
            displayName: user.displayName,
            createdAt: serverTimestamp(),
          },
        });
      } else {
        await setDoc(doc(db, "reviews", id), {
          [`${user.uid}`]: {
            title: title,
            message: message,
            displayName: user.displayName,
            createdAt: serverTimestamp(),
          },
        });
      }
    }
  }

  return (
    <Grid container direction="column" sx={{ padding: "1em" }}>
      <FormControl
        margin="normal"
        variant="filled"
        sx={{ marginBottom: "1em" }}
      >
        <FormLabel sx={{ marginBottom: "1em" }}>Submit a review</FormLabel>
        <Divider />
        <TextField
          margin="normal"
          label="Title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <TextField
          margin="normal"
          minRows={4}
          label="Message"
          multiline
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        />
        <Button
          variant="filled"
          sx={{ marginTop: "1em" }}
          onClick={handleReviewing}
        >
          Submit
        </Button>
      </FormControl>
      <Typography variant="subtitle1" sx={{ marginBottom: "1em" }}>
        Reviews
      </Typography>
      <Divider />
      {loading && <LinearProgress />}
      <Grid container direction="column" spacing={3}>
        {reviews &&
          reviews.map((v, i) => (
            <Grid item key={i}>
              <Typography>Username: {v[1].displayName}</Typography>
              <Typography>Title: {v[1].title}</Typography>
              <Typography variant='body1'>Message: {v[1].message}</Typography>
              {/* <div>{v[1].title}</div>
              <div>{v[1].message}</div> */}
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
