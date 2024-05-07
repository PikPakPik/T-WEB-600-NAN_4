import { CheckSharp } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FilterListIcon from '@mui/icons-material/FilterList'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import * as React from 'react'

interface Data {
    [key: string]: number | string
}

interface HeadCell {
    disablePadding: boolean
    id: keyof Data
    label: string
    numeric: boolean
    boolean: boolean
}

type Order = 'asc' | 'desc'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

interface EnhancedTableProps {
    numSelected: number
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
    order: Order
    orderBy: string
    rowCount: number
    headCells: readonly HeadCell[]
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
        props
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all items',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                        {headCell.boolean && (
                            <Box component="span" sx={visuallyHidden}>
                                {headCell.id === 'boolean' ? 'boolean' : 'numeric'}
                            </Box>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

interface EnhancedTableToolbarProps {
    numSelected: number
    name: string
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, name } = props

    return (
        <>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            ),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {name}
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <>
                        {numSelected === 1 && (
                            <Tooltip title="Edit">
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title="Create new entry">
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter list">
                            <IconButton>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Toolbar>
        </>
    )
}

export default function DataTable({ data, name }: { data: any[]; name: string }) {
    const [order, setOrder] = React.useState<Order>('asc')
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories')
    const [selected, setSelected] = React.useState<readonly number[]>([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        if (event) {
            const isAsc = orderBy === property && order === 'asc'
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(property)
        }
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((index) => index)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
        if (event.shiftKey) {
            const newSelected = [...selected]
            const start = newSelected[0]
            const end = index
            const range = Array.from({ length: Math.abs(end - start) + 1 }, (_, i) =>
                start < end ? start + i : start - i
            )
            newSelected.push(...range)
            setSelected(newSelected)
        }
        const selectedIndex = selected.indexOf(index)
        let newSelected: readonly number[] = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }
        setSelected(newSelected)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        if (event) {
            setPage(newPage)
        }
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked)
    }

    const isSelected = (index: number) => selected.indexOf(index) !== -1

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

    const visibleRows = React.useMemo(
        () =>
            stableSort(data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [data, order, orderBy, page, rowsPerPage]
    )

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} name={name} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy as string}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            headCells={Object.keys(data[0]).map((key) => ({
                                id: key,
                                numeric: typeof data[0][key] === 'number',
                                boolean: typeof data[0][key] === 'boolean',
                                disablePadding: false,
                                label: key,
                            }))}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(page * rowsPerPage + index)
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) =>
                                            handleClick(event, page * rowsPerPage + index)
                                        }
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        {Object.keys(row).map((key, colIndex) => {
                                            if (typeof row[key] === 'boolean') {
                                                return (
                                                    <TableCell key={colIndex} align="right">
                                                        {row[key] ? <CheckSharp /> : <CloseIcon />}
                                                    </TableCell>
                                                )
                                            } else if (typeof row[key] === 'number') {
                                                return (
                                                    <TableCell key={colIndex} align="right">
                                                        {row[key]}
                                                    </TableCell>
                                                )
                                            } else if (typeof row[key] === 'object') {
                                                return (
                                                    <TableCell
                                                        key={colIndex}
                                                        align="right"
                                                        sx={{ whiteSpace: 'pre' }}
                                                    >
                                                        {JSON.stringify(row[key])}
                                                    </TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell key={colIndex} align="left">
                                                        {row[key]}
                                                    </TableCell>
                                                )
                                            }
                                        })}
                                    </TableRow>
                                )
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={Object.keys(data[0]).length + 1} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    )
}
