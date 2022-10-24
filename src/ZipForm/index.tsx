import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Box, Button, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

interface ZipFormProps {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}

export function ZipForm() {
  const [zipData, setZipData] = useState<ZipFormProps>()
  const [zipCode, setZipCode] = useState<string>();

  useEffect(() => {
    api.get('https://viacep.com.br/ws/01001000/json/')
    .then(res => {
      console.log(res.data);
    })
  }, [])

  function searchData() {
    api.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then(res => {
      if(res.data.erro) {
        alert('CEP não encontrado');
      }
      setZipData(res.data);
    })
  }

  return(
    <Box
      display="flex"
      flexDirection="column"
      gap={5}
    >
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          justifySelf="center"
          alignSelf="center"
          mt={5}
        >
          <Typography>
            Digite abaixo o CEP para buscar o endereço correspondente
          </Typography>

          <FormControl>
            <TextField
              label="CEP"
              type="number"
              variant="outlined"
              sx={{ width: 200, alignSelf: "center" }}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              inputProps={{ maxLength: 8 }}
            />
          </FormControl>
          <Button
            type="button"
            onClick={searchData}
          >
            Buscar
          </Button>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          justifySelf="center"
          alignSelf="center"
        >
          <Box display="flex" flexDirection="row" gap={3}>
            <FormControl>
              <TextField
                id="adress"
                label="Endereço"
                variant="outlined"
                value={zipData?.logradouro}
                sx={{ width: 700 }}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Box>

          <Box display="flex" flexDirection="row">
            <FormControl>
              <TextField
                label="Bairro"
                variant="outlined"
                value={zipData?.bairro}
                sx={{ width: 700 }}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Box>

          <Box display="flex" flexDirection="row" gap={3}>
            <FormControl>
              <TextField
                label="Cidade"
                variant="outlined"
                value={zipData?.localidade}
                sx={{ width: 500 }}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Estado"
                variant="outlined"
                value={zipData?.uf}
                sx={{ width: 150 }}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Box>
        </Box>
    </Box>
  )
}
