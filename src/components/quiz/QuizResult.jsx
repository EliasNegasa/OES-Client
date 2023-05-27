import { Stack, Typography } from "@mui/material";

const QuizResult = () => {
  return (
    <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
        You Scored:
      </Typography>
    </Stack>
  );
};

export default QuizResult;
