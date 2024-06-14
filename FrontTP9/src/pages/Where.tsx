import { Box } from "@mui/material";

function Where() {
  return (
    <>
      <Box sx={{ borderRadius: 8, overflow: "hidden" }}>
        <iframe
          className="embed-responsive-item"
          title={"mapa"}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4480686362303!2d-68.83827769999999!3d-32.8863197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1681687248844!5m2!1ses!2sar"
          width="1200"
          height="500"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </>
  );
}

export default Where;
