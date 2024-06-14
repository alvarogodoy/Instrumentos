import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function Home() {
  const [image, setImage] = useState<string>("tienda1.jpg");
  const [count, setCount] = useState<number>(0);

  const images = ["tienda1.jpg", "tienda2.jpg", "tienda3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(images[count]);
      setCount((prevCount) =>
        prevCount === images.length - 1 ? 0 : prevCount + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [count, images]);

  return (
    <>
      <Box
        sx={{
          bgcolor: "black",
          width: "80%",
          height: 400,
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={"src/assets/img/" + image}
          alt="tienda"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Typography variant="h6" sx={{ width: "80%", mt: 2 }}>
        Musical Hendrix es una tienda de instrumentos musicales con ya más de 15
        años de experiencia. Tenemos el conocimiento y la capacidad como para
        informarte acerca de las mejores elecciones para tu compra musical.
      </Typography>
    </>
  );
}

export default Home;
