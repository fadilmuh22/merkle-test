"use client";

import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useUsers } from "@/hooks/users";
import { Box, Grid } from "@mui/material";
import { User } from "@/lib/types";
import EditUserModal from "@/components/users/EditUserModal";
import { useState } from "react";
import Button from "@/components/common/Button";
import SkeletonTable from "@/components/common/SkeletonTable";
import UserActionMenu from "./UserActionMenu";
import { useRouter } from "next/navigation";
import UserCreateAction from "./UserCreateAction";

export default function UserTable() {
  const { data: users, isLoading } = useUsers();

  const columns: GridColDef<User>[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "First Name",
      width: 130,
      renderCell: ({ row }) => (
        <div className="capitalize">{row.name.firstname}</div>
      ),
    },
    {
      field: "name",
      headerName: "Last Name",
      width: 130,
      renderCell: ({ row }) => (
        <div className="capitalize">{row.name.lastname}</div>
      ),
    },
    { field: "username", headerName: "Username", width: 130 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "phone", headerName: "Phone", width: 130 },
    {
      field: "city",
      headerName: "City",
      width: 130,
      renderCell: ({ row }) => (
        <div className="capitalize">{row.address.city}</div>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      width: 130,
      renderCell: ({ row }) => (
        <div className="capitalize">{row.address.street}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <Grid container justifyContent="end">
            <UserActionMenu user={row} />
          </Grid>
        );
      },
    },
  ];

  return (
    <Box className="max-h-[80vh]">
      <Grid container justifyContent="end" marginBottom={1}>
        <Grid item>
          <UserCreateAction />
        </Grid>
      </Grid>

      {isLoading ? (
        <SkeletonTable columns={columns} rows={5} />
      ) : (
        <DataGrid columns={columns} rows={users ?? []} />
      )}
    </Box>
  );
}
