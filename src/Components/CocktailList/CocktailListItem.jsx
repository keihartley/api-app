import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import CocktailCard from "./CocktailCard";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CocktailListItem({ cocktail }) {
  const controls = useAnimation();
  const [inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Grid item xs={12} sm={6} md={4} xl={3}>
      <motion.div
        initial={{ opacity: 0}}
        whileInView={{ opacity: 1}}
        viewport={{ once: true }}
      >
        <CocktailCard cocktail={cocktail} />
      </motion.div>
    </Grid>
  );
}
