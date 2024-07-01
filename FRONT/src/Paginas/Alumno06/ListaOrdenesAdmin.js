import React, { useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Link, Pagination } from '@mui/material';
import BarraLateral2 from '../../Componentes/BarraLateral2';
import Header2 from '../../Componentes/Header2';
import Footer from '../../Componentes/Footer';
import RellenarOrden from "./ContenidoTablaOrdenes";

const drawerWidth = 240;

const ListaOrdenes = () => {
  const [pagina, setPagina] = useState(1);
  const [filasPorPagina, setFilasPorPagina] = useState(0);

  const handleChangePagina = (event, nuevaPagina) => {
    setPagina(nuevaPagina + 1);
  };

  /*Conexion al backend*/
  /*----------------------------------------------------------------------------------------------------------------*/
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function busquedaDatos(query=""){
    const url_base = "http://localhost:3100/ordenes";
    const url = query ? `${url_base}-url?id=${query}&usuario=${query}` : url_base; 
    try {
      const res = await fetch(url);
      if (res.status === 200) {
          const data = await res.json();
          setData(data);
      } else {
          alert("La orden no existe");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
     }
  }

  useEffect(() => {
    busquedaDatos();
  }, []);

  const handleSearch = () => {
    busquedaDatos(searchQuery);
  };

  /** INICIO DEL FRONTEND **/
  return (
    <>
      <Header2 />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <BarraLateral2 />
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center', mb:3}}>
            <Typography variant="h4" style={{fontWeight:'bold'}} gutterBottom>
            Lista de Órdenes
            </Typography>
          <Button variant="contained" style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }}>
              Agregar Orden
            </Button>
          </Box>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Buscar por nombre o apellido de usuario o nro de orden..."
            value = {searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                  <Button type="button" onClick={handleSearch} variant="contained" component="label" style={{ backgroundColor: '#FFEB3B', color: 'black', fontWeight: 'bold' }}>
                      Buscar
                  </Button>
              ),
          }}
          />
          <Paper>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{textAlign: 'center'}}>ID</TableCell>
                    <TableCell style={{textAlign: 'center'}}>Usuario</TableCell>
                    <TableCell style={{textAlign: 'center'}}>Fecha de Orden</TableCell>
                    <TableCell style={{textAlign: 'center'}}>Monto total</TableCell>
                    <TableCell style={{textAlign: 'center'}}>Correo</TableCell>
                    <TableCell style={{textAlign: 'center'}}>Estado</TableCell>
                    <TableCell style={{textAlign: 'center'}}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? data.map((item, index) => (
                      <RellenarOrden key={index} orden={item}/>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={8} style={{ textAlign: 'center' }}>No hay datos disponibles</TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
              <Typography variant="body2">Anterior</Typography>
              <Pagination
              /*
                count={Math.ceil(ordenes.length / filasPorPagina)}
                page={pagina}
                onChange={handleChangePagina}
                shape="rounded"
                color="primary"
                */
              />
              <Typography variant="body2">Siguiente</Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ListaOrdenes;
