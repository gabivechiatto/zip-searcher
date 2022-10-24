import { Box, Typography } from "@mui/material";

export function ZipHeader() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="70px"
      gap={3}
      sx={{ color: "#fff", backgroundColor: "#3f51b5" }}
    >
      <Typography variant="h4">Zip Searcher</Typography>
    </Box>
  );
}
