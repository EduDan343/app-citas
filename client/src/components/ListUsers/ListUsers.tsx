import { useMemo, useEffect, useState } from "react";
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    type MaterialReactTableProps,
} from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    // Dialog,
    // DialogActions,
    // DialogContent,
    // DialogTitle,
    IconButton,
    // MenuItem,
    // Stack,
    // TextField,
    Tooltip,
} from "@mui/material";

import { CreateNewAccountModal } from "../ModalForm/ModalForm";

import axios from "axios";

import Dropdown from "../Dropdown/Dropdown";

import { User } from "../../types/user.type";
import { Calendar } from "../../types/calendar.type";


export const ListUsers = () => {

    const [usersData, setUsersData] = useState<User[]>([]);

    const [userSelectedIndex, setUserSelectedIndex] = useState<number>(0);

    const [citasUsuario, setCitasUsuario] = useState<Calendar[]>([]);


    // const [horarios, setHorarios] = useState<Calendar[]>([]);

    console.log(usersData)

    // useEffect(() => {
    //     axios.get('http://localhost:3001/horarios')
    //         .then((res) => {
    //             console.log({ res: res.data })
    //             setHorarios(res.data);
    //         })
    //         .catch(err => console.log({ error: err }))
    // }, [])

    const [createModalOpen, setCreateModalOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/users");
            // const data = await response.json();
            setUsersData(response.data);
        } catch (error) {
            console.log({ error });
        }
    };

    useEffect(() => {
        if (usersData.length === 0) {
            fetchUsers();
        } else {
            setCitasUsuario(usersData[userSelectedIndex].citas)
        }
    }, [usersData]);

    useEffect(() => {
        if (usersData.length) {
            setCitasUsuario(usersData[userSelectedIndex].citas)
        }
    }, [userSelectedIndex])


    const updateUserById = async (cita: Calendar, id: number) => {
        const idUser = usersData[id].id;
        const copiaCitas = [...usersData[id].citas]
        const indexCita = copiaCitas.findIndex(data => data.horario === cita.horario)
        const addUpdateCita = copiaCitas[indexCita] = cita;
        console.log({ copiaCitas, addUpdateCita, indexCita })
        const updateCitasUser = { citas: copiaCitas }
        try {
            const updateUser = await axios.put(
                `http://localhost:3001/users/${idUser}`,
                updateCitasUser
            );
            console.log({ updateUser });
            fetchUsers();
        } catch (error) {
            console.log({ error });
        }
    };

    const handleDeleteUser = async (id: string) => {
        try {
            console.log("id user delete : ", id);
            const deletedUser = await axios.delete(
                `http://localhost:3001/users/${id}`
            );
            console.log({ deletedUser });
            await fetchUsers();
        } catch (error) {
            console.log({ error });
            alert("Error deleting user");
        }
    };



    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: "horario", //simple recommended way to define a column
                header: "Horarios",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "lunes", //simple recommended way to define a column
                header: "Lunes",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "martes", //simple recommended way to define a column
                header: "Martes",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "miercoles", //simple recommended way to define a column
                header: "Miercoles",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "jueves", //simple recommended way to define a column
                header: "Jueves",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "viernes", //simple recommended way to define a column
                header: "Viernes",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "sabado", //simple recommended way to define a column
                header: "Sabado",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
            {
                accessorKey: "domingo", //simple recommended way to define a column
                header: "Domingo",
                muiTableHeadCellProps: { sx: { color: "#0266a2" } }, //custom props
                Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong>, //optional custom cell render
            },
        ],
        []
    );

    const handleCreateUser = async (user: User) => {
        try {
            console.log({ user });
            const addedCitas = {
                ...user, citas: [{
                    horario: "08:00 - 09:00",
                },
                {
                    horario: "09:00 - 10:00",
                },
                {
                    horario: "10:00 - 11:00",
                },
                {
                    horario: "11:00 - 12:00",
                },
                {
                    "horario": "12:00 - 13:00",
                },
                {
                    horario: "13:00 - 14:00",
                },
                {
                    horario: "14:00 - 15:00",
                },
                {
                    horario: "15:00 - 16:00",
                },
                {
                    horario: "16:00 - 17:00",
                },
                {
                    horario: "17:00 - 18:00",
                }]
            }
            const response = await axios.post("http://localhost:3001/users", addedCitas);
            console.log({ response });
            fetchUsers();
        } catch (error) {
            console.log({ error });
        }
    };

    //   const handleUpdateUser = async (user: User) => {
    //     try {
    //       console.log({ user });
    //     } catch (error) {
    //       console.log({ error });
    //   }
    // }
    const handleSaveRowEdits: MaterialReactTableProps<User>["onEditingRowSave"] =
        async ({ exitEditingMode, row, values }) => {
            // if (!Object.keys(validationErrors).length) {
            //   tableData[row.index] = values;
            //   //send/receive api updates here, then refetch or update local table data for re-render
            //   setTableData([...tableData]);
            // }
            console.log({ row, values });
            // const userId = row.original.id;

            try {
                // await updateUsers(values, userId);
                // @ts-ignore
                await updateUserById(values, userSelectedIndex)
                // await fetchUsers();
            } catch (error) {
                console.log({ error });
                // alert("Error updating user");
            }
            exitEditingMode(); //required to exit editing mode and close modal
        };

    return (
        <div style={{ width: "100%" }}>
            <CreateNewAccountModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateUser}
            />
            {/*  */}
            <Dropdown usersData={usersData} userSelectedIndex={userSelectedIndex} setUserSelectedIndex={setUserSelectedIndex} />
            <MaterialReactTable
                // @ts-ignore
                columns={columns}
                // @ts-ignore
                data={citasUsuario}
                editingMode="modal" //default
                enableColumnOrdering
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                renderTopToolbarCustomActions={() => (
                    <Button
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                        style={{ backgroundColor: "#0266a2" }}
                    >
                        Create New User
                    </Button>
                )}
                // onEditingRowSave={handleSaveRowEdits}
                // onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip arrow placement="left" title="Editar">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>

                        {/* <Tooltip arrow placement="right" title="Delete">
                            <IconButton
                                color="error"
                                onClick={() => handleDeleteUser(row.original.id)}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip> */}
                    </Box>
                )}
            />
        </div>
    );
};