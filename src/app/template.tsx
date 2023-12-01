import Navbar from "@/components/common/Navbar";
import SnackbarProvider from "@/components/providers/SnackbarProvider";
import { Box } from "@mui/material";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider>
      <Box>
        <Navbar />
        <Box className="min-w-screen min-h-screen">{children}</Box>
      </Box>
    </SnackbarProvider>
  );
}
