import { useMemo, useState } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";

import { User } from "../../types/user.type";
import { Calendar } from "../../types/calendar.type";

interface CreateModalProps {
    columns: MRT_ColumnDef<User>[];
    onClose: () => void;
    onSubmit: (values: User) => void;
    open: boolean;
}

// const validateRequired = (value: string) => !!value.length;
// const validateEmail = (email: string) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// const validateAge = (age: number) => age >= 18 && age <= 50;

export const CreateNewAccountModal = ({
    open,
    onClose,
    onSubmit,
}: CreateModalProps) => {
    //   const [validationErrors, setValidationErrors] = useState<{
    //     [cellId: string]: string;
    //   }>({});

    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "lastname", //simple recommended way to define a column
                header: "Lastname",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "phone", //simple recommended way to define a column
                header: "Phone",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
        ],
        []
    );

    const [values, setValues] = useState<User>();

    //   const getCommonEditTextFieldProps = useCallback(
    //     (
    //       cell: MRT_Cell<User>
    //     ): MRT_ColumnDef<User>["muiTableBodyCellEditTextFieldProps"] => {
    //       return {
    //         error: !!validationErrors[cell.id],
    //         helperText: validationErrors[cell.id],
    //         onBlur: (event) => {
    //           const isValid =
    //             cell.column.id === "email"
    //               ? validateEmail(event.target.value)
    //               : cell.column.id === "age"
    //               ? validateAge(+event.target.value)
    //               : validateRequired(event.target.value);
    //           if (!isValid) {
    //             //set validation error for cell if invalid
    //             setValidationErrors({
    //               ...validationErrors,
    //               [cell.id]: `${cell.column.columnDef.header} is required`,
    //             });
    //           } else {
    //             //remove validation error for cell if valid
    //             delete validationErrors[cell.id];
    //             setValidationErrors({
    //               ...validationErrors,
    //             });
    //           }
    //         },
    //       };
    //     },
    //     [validationErrors]
    //   );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New User</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: "100%",
                            minWidth: { xs: "300px", sm: "360px", md: "400px" },
                            gap: "1.5rem",
                        }}
                    >
                        {columns.map((column) => {
                            return (
                                <TextField
                                    key={column.accessorKey}
                                    label={column.header}
                                    name={column.accessorKey}
                                    onChange={(e) => {
                                        if (e.target.name == "phone") {
                                            // @ts-ignore
                                            setValues({ ...values, [e.target.name]: Number(e.target.value) })

                                        }
                                        else {
                                            // @ts-ignore
                                            setValues({ ...values, [e.target.name]: e.target.value })
                                        }
                                    }
                                    }
                                />
                            );
                        })}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: "1rem" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New User
                </Button>
            </DialogActions>
        </Dialog>
    );
};