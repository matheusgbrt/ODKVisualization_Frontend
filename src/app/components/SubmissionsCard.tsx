import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import SubmissionsDetailsDialog from "./SubmissionDetailsDialog";

const SubmissionsCard: React.FC<{ item: any }> = ({ item }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  return (
    <>
      <Card sx={{ minHeight: 120 }}>
        <CardContent>
          <Typography variant="h6" color="secondary">
            Frota: {item.numero}
          </Typography>

          {/* Section for Today */}
          <Typography variant="body1" fontWeight="bold">Hoje</Typography>
          {item.today && item.today.length > 0 ? (
            item.today.map((submission: any) => (
              <div key={crypto.randomUUID()}>
                <Box sx={{ borderLeft: 4, borderColor: submission.checklistState? "error.main" :"secondary.main", pl: 1.5, my: 0.5 }}>
                  {submission.operador && (
                    <Typography variant="body2" color="textSecondary">
                      Operador: {submission.operador}
                    </Typography>
                  )}
                  {submission.end && (
                    <Typography variant="body2" color="textSecondary">
                      Horário: {new Date(submission.end).toLocaleString("pt-BR", {
                        day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
                      })}
                    </Typography>
                  )}
                  {/* Button to show more details if checklistState is true */}
                  
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      Ver Mais
                    </Button>
                </Box>
              </div>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">Nenhum envio</Typography>
          )}

          {/* Section for Yesterday */}
          <Typography variant="body1" fontWeight="bold">Ontem</Typography>
          {item.yesterday && item.yesterday.length > 0 ? (
            item.yesterday.map((submission: any) => (
              <div key={crypto.randomUUID()}>
                <Box sx={{ borderLeft: 4, borderColor: submission.checklistState? "error.main" :"secondary.main", pl: 1.5, my: 0.5 }}>
                  {submission.operador && (
                    <Typography variant="body2" color="textSecondary">
                      Operador: {submission.operador}
                    </Typography>
                  )}
                  {submission.end && (
                    <Typography variant="body2" color="textSecondary">
                      Horário: {new Date(submission.end).toLocaleString("pt-BR", {
                        day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
                      })}
                    </Typography>
                  )}
                  {/* Button to show more details if checklistState is true */}
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      Ver Mais
                    </Button>

                </Box>
              </div>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">Nenhum envio</Typography>
          )}
        </CardContent>
      </Card>

      <SubmissionsDetailsDialog
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </>
  );
};

export default SubmissionsCard;
