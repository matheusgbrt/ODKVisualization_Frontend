import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const SubmissionsCard: React.FC<{ item: any }> = ({ item }) => (
  <Card sx={{ minHeight: 120 }}>
    <CardContent>
      <Typography variant="h6" color="secondary">
        Frota: {item.numero}
      </Typography>

      <Typography variant="body1" component="div" fontWeight="bold">Hoje</Typography>
      {item.today && item.today.length > 0 ? (
        item.today.map((submission: any) => (
          <div key={crypto.randomUUID()}>
               {/*<Typography variant="body2" component="div" sx={{ mt: 1 }}>{item.today.length - index}⁰</Typography>*/}
            <Box sx={{
              borderLeft: 4, borderColor: 'secondary.main', pl: 1.5, my: 0.5
            }}>
              {submission.operador && (
                <Typography variant="body2" color="textSecondary">
                  Operador: {submission.operador}
                </Typography>
              )}
              {submission.end && (
                <Typography variant="body2" color="textSecondary">
                  Horário: {new Date(submission.end).toLocaleString()}
                </Typography>
              )}
            </Box>
          </div>
        ))
      ) : (

        <Typography variant="body2" color="textSecondary">Nenhum envio</Typography>
      )}

      {/* Section for yesterday's data */}
      <Typography variant="body1" fontWeight="bold">Ontem</Typography>
      {item.yesterday && item.yesterday.length > 0 ? (
        item.yesterday.map((submission: any) => (
          <div key={crypto.randomUUID()}>
            {/* <Typography variant="body2" component="div" sx={{ mt: 1 }}>{item.yesterday.length - index}⁰</Typography> */}
            <Box sx={{
              borderLeft: 4, borderColor: 'secondary.main', pl: 1.5, my: 0.5
            }}>
              {submission.operador && (
                <Typography variant="body2" color="textSecondary">
                  Operador: {submission.operador}
                </Typography>
              )}
              {submission.end && (
                <Typography variant="body2" color="textSecondary">
                  Horário: {new Date(submission.end).toLocaleString()}
                </Typography>
              )}
            </Box>
          </div>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">Nenhum envio</Typography>
      )}
    </CardContent>
  </Card>
);

export default SubmissionsCard;