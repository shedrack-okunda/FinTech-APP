import { Button, Stack, Typography } from "@mui/material";
// import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack rowGap={1} justifyContent={"center"} alignItems={"center"}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h4" fontWeight={500}>
            404 Not Found
          </Typography>
          <Typography variant="h6" fontWeight={"300"}>
            Sorry, we coudn't find the page you were looking for
          </Typography>
        </Stack>

        <Button
          sx={{ mt: 3 }}
          size="large"
          //   component={Link}
          to={"/"}
          variant="contained"
        >
          Go back to homePage
        </Button>
      </Stack>
    </Stack>
  );
};
