"use client";

import { MoreHoriz } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import EditUserModal from "./EditUserModal";
import { User } from "@/lib/types";
import DeleteUserModal from "./DeleteUserModal";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
  hideView?: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function UserActionMenu({
  user,
  hideView,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    router.push(`/users/${user.id}`);
    handleClose();
    onView?.();
  };

  const toggleEditModal = () => {
    setEditModalOpen((prev) => !prev);
    handleClose();
    onEdit?.();
  };
  const toggleDeleteModal = () => {
    setDeleteModalOpen((prev) => !prev);
    handleClose();
  };

  return (
    <Box>
      <EditUserModal
        open={editModalOpen}
        handleClose={toggleEditModal}
        user={user}
      />
      <DeleteUserModal
        open={deleteModalOpen}
        handleClose={toggleDeleteModal}
        id={user.id}
      />
      <IconButton onClick={handleClick} aria-haspopup="true">
        <MoreHoriz />
      </IconButton>
      <Menu
        id="user-table-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {!hideView && <MenuItem onClick={handleView}>View</MenuItem>}
        <MenuItem onClick={toggleEditModal}>Edit</MenuItem>
        <MenuItem onClick={toggleDeleteModal}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}
