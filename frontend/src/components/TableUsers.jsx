import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Button,
  Chip,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Icon
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useInfo } from '../hooks/useInfo';
import { useState } from 'react';

import { useAddPerson } from '../hooks/modals/useAddPerson.js';
import { getAllInfo } from '../../services/getAllInfo.js';

export function TableUsers() {
  const [,setData] = useState(null)
  const { allInfo,setAllInfo } = useInfo()
  const [selected, setSelected] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const { openModal, setDataToEdit } = useAddPerson()

  if (allInfo === null) { return <div>Cargando...</div> }

  // Filtrar datos por busqueda
  const filteredData = allInfo.data.filter(row => 
    row.pernom.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Acciones
  const handleView = (row) => {
    alert(`Ver detalles de: ${row.pernom}`)
  }

  const handleEdit = (row) => {
    setDataToEdit(row)
    openModal()
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estas seguro de eliminar este registro?')) {
      await fetch(`https://paseo-pagos.up.railway.app/paseo/${id}`, {
        method: 'DELETE'
      })
      getAllInfo(setAllInfo)
    }
  }

  const handleDeleteSelected = () => {
    if (window.confirm(`¿Eliminar ${selected.length} registros seleccionados?`)) {
      setData(allInfo.filter(row => !selected.includes(row.perid)))
      setSelected([])
    }
  }

  const handleAdd = () => { openModal() }

  return (
    <Box sx={{p: 3, maxWidth: '100%', mx: 'auto', backgroundColor: '#fff', borderRadius: '12px', marginTop: '20px'}}>
      <Typography variant='h4' sx={{ mb: 3, fontWeight: 'bold' }}>
        Gestión de usuarios
      </Typography>
      {/*BARRA DE HERRAMIENTAS*/}

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2}}>
        <TextField 
          placeholder='Buscar por nombre...'
          variant='outlined'
          size='small'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: 400, backgroundColor: '#ccf5ffff', border: 'none', borderRadius: '4px'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                  <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          {selected.length > 0 && (
            <Button
              variant='outlined'
              color='error'
              startIcon={<DeleteIcon />}
              onClick={handleDeleteSelected}
            >
              Eliminar ({selected.length})
            </Button>
          )}
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Agregar persona
          </Button>
        </Box>
      </Box>

      {/*TABLA*/}
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: '#ccf5ffff'}}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell padding='checkbox'>
                <Checkbox 
                  sx={{ color: 'white' }}
                  indeterminate={selected.length > 0 && selected.length < filteredData.length}
                  checked={filteredData.length > 0 && selected.length === filteredData.length}
                  // onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Celular</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Valor a pagar</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Valor pagado</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Valor restante</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell align='center' sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align='center' sx={{ py: 4 }}>
                  <Typography color='text.secondary'>
                    No se encontraron resultados
                  </Typography>
                </TableCell>
              </TableRow>
            ): (
              filteredData.map((row) => {
                // const isItemSelected = isSelected(row.perid)
                return (
                  <TableRow
                    key={row.perid}
                    hover
                    // selected={isItemSelected}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox 
                        // checked={isItemSelected}
                        // onChange={() => handleSelectedOne(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.pernom}</TableCell>
                    <TableCell>{row.percel}</TableCell>
                    <TableCell>{row.pervalpagar}</TableCell>
                    <TableCell>{row.pervalpagado}</TableCell>
                    <TableCell>{row.pervalres}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.perestado_text}
                        size='small'
                        color={row.perestado === 'N' ? 'error' : row.perestado === 'F' ? 'warning': 'success'}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <IconButton
                          size='small'
                          color='info'
                          onClick={() => handleView(row)}
                          title='Ver'
                        >
                          <VisibilityIcon fontSize='small' />
                        </IconButton>
                        <IconButton
                          size='small'
                          color='primary'
                          onClick={() => handleEdit(row)}
                          title='Editar'
                        >
                          <EditIcon fontSize='small' />
                        </IconButton>
                        <IconButton
                          size='small'
                          color='error'
                          onClick={() => handleDelete(row.perid)}
                          title='Eliminar'
                        >
                          <DeleteIcon  fontSize='small' />
                        </IconButton>
                      </Box>
                    </TableCell>

                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/*INFORMACIÓN DE SELECCION*/}
      {selected.length > 0 && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}>
          <Typography variant='body2' color=''>
            {selected.length} {selected.length === 1 ? 'registro seleccionado' : 'registros seleccionados'}
          </Typography>
        </Box>
      )}

    </Box>
  )
}
