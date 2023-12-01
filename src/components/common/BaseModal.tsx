import { Box, Modal, ModalProps, SxProps } from "@mui/material";

const modalContentStyle: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export type BaseModalProps = ModalProps & {};

export default function BaseModal(props: ModalProps) {
  return (
    <Modal
      {...props}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          props.onClose?.(event, "escapeKeyDown");
        }
        if (event.key === "Enter") {
          event.preventDefault();
        }
        props.onKeyDown?.(event);
      }}
    >
      <Box sx={modalContentStyle}>{props.children}</Box>
    </Modal>
  );
}
