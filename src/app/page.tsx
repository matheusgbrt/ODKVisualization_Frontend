"use client";
import { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, Container } from "@mui/material"
import SubmissionsCard from "./components/SubmissionsCard";

export default function DataPage() {
  const [abastecimentos, setAbastecimentos] = useState<any[]>([]);
  const [escavadeiras, setEscavadeiras] = useState<any[]>([]);
  const [tratorPneus, setTratorPneus] = useState<any[]>([]);
  const [tratorEsteiras, setTratorEsteiras] = useState<any[]>([]);
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [diarioMaquinas, setDiarioMaquinas] = useState<any[]>([]);


  const [loadingAbastecimentos, setLoadingAbastecimentos] = useState(true);
  const [loadingEscavadeiras, setLoadingEscavadeiras] = useState(true);
  const [loadingTratorPneus, setLoadingTratorPneus] = useState(true);
  const [loadingTratorEsteiras, setLoadingTratorEsteiras] = useState(true);
  const [loadingVeiculos, setLoadingVeiculos] = useState(true);
  const [loadingDiario, setLoadingDiario] = useState(true);

  const apiBaseUrl = "https://odk.api.pmgb.com.br";

  

  // Fetch abastecimentos independently
  useEffect(() => {
    async function fetchAbastecimentos() {
      try {
        const res = await fetch(`${apiBaseUrl}/api/envios/abastecimentos/ultimos`);
        const data = await res.json();
        setAbastecimentos(data);
      } catch (error) {
        console.error("Error fetching abastecimentos:", error);
      } finally {
        setLoadingAbastecimentos(false);
      }
    }
    fetchAbastecimentos();
  }, []);


  useEffect(() => {
    async function fetchEscavadeiras() {
      try {
        const res = await fetch(`${apiBaseUrl}/api/envios/checklistescavadeiras/ultimos`);
        const data = await res.json();

        setEscavadeiras(data);
      } catch (error) {
        console.error("Error fetching checklists:", error);
      } finally {
        setLoadingEscavadeiras(false);
      }
    }
    fetchEscavadeiras();
  }, []);

  useEffect(() => {
    async function fetchTratorPneus() {
      try {
        const res = await fetch(`${apiBaseUrl}/api/envios/checklisttratorpneus/ultimos`);
        const data = await res.json();

        setTratorPneus(data);
      } catch (error) {
        console.error("Error fetching checklists:", error);
      } finally {
        setLoadingTratorPneus(false);
      }
    }
    fetchTratorPneus();
  }, []);

  useEffect(() => {
    async function fetchTratorEsteiras() {
      try {
        const res = await fetch(`${apiBaseUrl}/api/envios/checklistratoresteiras/ultimos`);
        const data = await res.json();
        setTratorEsteiras(data);
      } catch (error) {
        console.error("Error fetching checklists:", error);
      } finally {
        setLoadingTratorEsteiras(false);
      }
    }
    fetchTratorEsteiras();
  }, []);

  useEffect(() => {
    async function fetchVeiculos() {
      try {
        const res = await fetch(`${apiBaseUrl}/api/envios/checklistveiculos/ultimos`);
        const data = await res.json();
        setVeiculos(data);
      } catch (error) {
        console.error("Error fetching checklists:", error);
      } finally {
        setLoadingVeiculos(false);
      }
    }
    fetchVeiculos();
  }, []);

  useEffect(() => {
    async function fetchDiarioMaquinas() {
      try {
        const res = await fetch(`${apiBaseUrl}/api/envios/diariomaquinas/ultimos`);
        const data = await res.json();
        setDiarioMaquinas(data);
      } catch (error) {
        console.error("Error fetching checklists:", error);
      } finally {
        setLoadingDiario(false);
      }
    }
    fetchDiarioMaquinas();
  }, []);

  

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ marginTop: 4, fontWeight: "bold" }}>
        Envios
      </Typography>

      {/* Abastecimentos Section */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Abastecimentos
      </Typography>
      {loadingAbastecimentos ? (
        <CircularProgress />
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={2}>
          {abastecimentos.map((item) => (
            <SubmissionsCard key = {crypto.randomUUID()} item = {item}></SubmissionsCard>
          ))}
        </Box>
      )}

      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Checklist de Escavadeiras
      </Typography>
      {loadingEscavadeiras ? (
        <CircularProgress />
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={2}>
          {escavadeiras.map((item) => (
            <SubmissionsCard key = {crypto.randomUUID()} item = {item}></SubmissionsCard>
          ))}
        </Box>
      )}

      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Checklist de Tratores de Pneus
      </Typography>
      {loadingTratorPneus ? (
        <CircularProgress />
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={2}>
          {tratorPneus.map((item) => (
            <SubmissionsCard key = {crypto.randomUUID()} item = {item}></SubmissionsCard>
          ))}
        </Box>
      )}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Checklist de Tratores de Esteiras
      </Typography>
      {loadingTratorEsteiras ? (
        <CircularProgress />
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={2}>
          {tratorEsteiras.map((item) => (
            <SubmissionsCard key = {crypto.randomUUID()} item = {item}></SubmissionsCard>
          ))}
        </Box>
      )}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Checklist de Veículos
      </Typography>
      {loadingVeiculos ? (
        <CircularProgress />
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={2}>
          {veiculos.map((item) => (
            <SubmissionsCard key = {crypto.randomUUID()} item = {item}></SubmissionsCard>
          ))}
        </Box>
      )}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Diário de Máquinas
      </Typography>
      {loadingDiario ? (
        <CircularProgress />
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={2}>
          {diarioMaquinas.map((item) => (
            <SubmissionsCard key = {crypto.randomUUID()} item = {item}></SubmissionsCard>
          ))}
        </Box>
      )}
    </Container>
  );
}