import { Box, Button } from "@mui/material";
import EditUserModal from "./EditUserModal";
import { useState } from "react";

export default function UserCreateAction() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const toggleCreateModal = () => {
    setCreateModalOpen((prev) => !prev);
  };
  return (
    <Box>
      <EditUserModal open={createModalOpen} handleClose={toggleCreateModal} />

      <Button
        variant="contained"
        type="submit"
        className="w-[120px]"
        onClick={() => {
          toggleCreateModal();
        }}
      >
        Create
      </Button>
    </Box>
  );
}
