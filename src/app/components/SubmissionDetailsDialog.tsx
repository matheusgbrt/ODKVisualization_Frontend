import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, List, ListItem, IconButton, ListItemText, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SubmissionDetailsDialogProps {
    submission: any | null;
    onClose: () => void;
}
const EXCLUDEDKEYS = ["meta", "systeminfo", "deviceid", "start", "id", "localizacao", "username", "today", "startgeopoint", "system"
];

const KEYNAMEMAP: Record<string, string> = {
    //General
    operador: "OPERADOR",
    frota: "FROTA",
    checkliststate: "POSSUI NÃO CONFORME",
    end: "DATA",
    obs: "OBSERVAÇÕES",

    // Documentos
    documentos: "Documentos",
    cnh: "OPERADOR ESTÁ PORTANDO CNH VÁLIDA?",
    possuiast: "OPERADOR POSSUI AST (ANÁLISE SEGURANÇA DO TRABALHO)?",
    conheceast: "OPERADOR POSSUI CONHECIMENTO DA AST?",
    possuios: "OPERADOR POSSUI OS (ORDEM DE SERVIÇO)?",
    conheceos: "OPERADOR POSSUI CONHECIMENTO DA OS?",
    fluxograma: "MÁQUINA POSSUI FLUXOGRAMA DE EMERGÊNCIA",

    // Máquina
    maquina: "Máquina",
    adesivos: "ADESIVOS",
    cinto: "CINTO DE SEGURANÇA/BANCO",
    limpeza: "LIMPEZA INTERNA/MATERIAIS SOLTOS",
    arcondicionado: "AR CONDICIONADO",
    sistemaeletrico: "SISTEMA ELÉTRICO",
    buzina: "BUZINA",
    luzespainel: "LUZES DO PAINEL/PAINEL DE INSTRUMENTOS",
    iluminacao: "ILUMINAÇÃO",
    sinalizacao: "SINALIZAÇÃO",
    horimetro: "HORÍMETRO",
    extintor: "EXTINTOR DE INCÊNDIO VÁLIDO, LACRADO E PRESSURIZADO",
    limpadorparabriza: "LIMPADOR DE PARABRISA",
    retrovisor: "RETROVISOR",
    cabineflorestal: "CABINE FLORESTAL",
    pelicula: "PELÍCULA DE BLINDAGEM NOS VIDROS. DESCREVA SE NC",
    motorpartida: "MOTOR DE PARTIDA",
    sinalizador: "SINALIZADOR SONORO MARCHA RÉ",
    baterias: "BATERIAS/POLOS/TERMINAIS",
    advertenciaradiador: "ADESIVO DE ADVERTÊNCIA RADIADOR",
    acessocabine: "PEGAS/CORRIMÕES/ESCADA DE ACESSO À CABINE",
    filtros: "FILTRO DE AR/DE COMBUSTÍVEL/DE MOTOR",
    conexoes: "MANGUEIRAS/BRAÇADEIRAS E CONEXÕES",
    tanquecombustivel: "TANQUE DE COMBUSTÍVEL",
    contrapeso: "CONTRA-PESO",
    cremalheiras: "MESA DE GIRO/ENGRENAGENS (CREMALHEIRAS)",
    manetes: "MANETES",
    retentores: "RETENTORES",
    lubricacao: "LUBRIFICAÇÃO",
    radiador: "RADIADOR/NÍVEL DE ÁGUA NO RESERVATÓRIO",
    travaradiador: "TRAVA NO RADIADOR",
    bloqueioenergia: "DISPOSITIVO DE BLOQUEIO DE ENERGIA",
    graxeiras: "GRAXEIRAS",
    oleomotor: "NÍVEL DE ÓLEO MOTOR",
    oleohidraulico: "NÍVEL DE ÓLEO HIDRÁULICO",
    oleogiro: "NÍVEL DE ÓLEO MOTOR DE GIRO",
    oleotracao: "NÍVEL DE ÓLEO MOTOR DE TRAÇÃO",
    vazamentooleo: "VAZAMENTOS DE ÓLEO, SE SIM, DESCREVA ABAIXO",
    pinos: "PINOS/BUCHAS - VERIFICAR FOLGAS",
    dentesunhas: "DENTES/UNHAS CONCHAS",
    desgasteroletes: "DESGASTE NOS ROLETES, INFORME ABAIXO",
    esteiras: "TENSÃO DAS ESTEIRAS",
    sistemapistoestravas: "SISTEMA DE LEVANTAMENTO/PISTÕES/CONJUNTO DE TRAVAS",
    contencaovazamentos: "POSSUI KIT DE CONTENÇÃO DE VAZAMENTOS?",
    tamparadiador: "BLOQUEIO DA TAMPA DO RADIADOR",
    saidaemergencia: "SAÍDA DE EMERGÊNCIA VERIFICADA?",
    radiocomunicacao: "POSSUI RÁDIO DE COMUNICAÇÃO?",
    sistemahidraulico: "SISTEMA HIDRÁULICO DE IMPLEMENTOS",
    pneusdianteiros: "CONDIÇÃO DOS PNEUS DIANTEIROS",
    pneustraseiros: "CONDIÇÃO DOS PNEUS TRASEIROS",
    oleotransmissao: "NÍVEL DE ÓLEO TRANSMISSÃO",
    odometro: "ODÔMETRO/VELOCÍMETRO",
    banco: "BANCOS",
    parabrisa: "PARABRISAS",
    vidros: "VIDROS/PORTAS/TRANCAS/TRAVAS",
    direcao: "SISTEMA DE DIREÇÃO",
    freios: "SISTEMA DE FREIO",
    pastilhaslonas: "PASTILHAS/LONAS",
    pedais: "PEDAIS/PROTEÇÃO DE BORRACHA",
    freiomao: "FREIO DE MÃO",
    nivelradiador: "NÍVEL DE ÁGUA DO RADIADOR",
    oleodirecao: "NÍVEL DE ÓLEO DIREÇÃO",
    oleofreio: "NÍVEL DE ÓLEO FREIO",
    parachoque: "PARACHOQUE",
    protetorcarter: "PROTETOR DE CÁRTER",
    escapamento: "ESCAPAMENTO",
    calibragem: "CALIBRAGEM DOS PNEUS",
    pneusrodas: "PNEUS/RODAS/PARAFUSOS",
    reapertorodas: "REAPERTO DAS RODAS",
    estepe: "ESTEPE",
    placas: "PLACAS",
    apoiomacacotriangulo: "MACACO/TRIÂNGULO/CHAVE RODAS",
    cameras: "CÂMERAS DE MONITORAMENTO INTERNAS SEM AVARIAS",
    lacrefadiga: "LACRE DO SENSOR DE FADIGA",
    sensorfadiga: "SENSOR DE FADIGA EM FUNCIONAMENTO SEM AVARIAS",

    //Abastecimentos
    atividade: "ATIVIDADE",
    rf: "RF",
    combustivel: "COMBUSTÍVEL",
    litros: "LITROS",
    engraxou: "ENGRAXOU",

    //Diário de Máquinas
    horimetrointinicial: "HORÍMETRO INICIAL",
    horimetrointfinal: "HORÍMETRO FINAL",
    oleohidraulicoint: "USOU ÓLEO HIDRÁULICO (L)",
    oleomotorint: "USOU ÓLEO DE MOTOR (L)",
    liquidoradiadorint: "UTILIZOU LÍQUIDO DE RADIADOR (L)",
    observacoes: "OBSERVAÇÕES"

};

const VALUENAMEMAP: Record<string, string> = {
    false: "Não",
    true: "Sim",

}

const formatValue = (key: string, value: any): string => {
    if (value == null) return "N/A"; // Handle null values
    // Check if the key is a date field
    if (key.toLowerCase() == "data") {
        return new Date(value).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }

    // Return mapped value if exists, otherwise the original value
    return VALUENAMEMAP[String(value)] || String(value)
};

const SubmissionDetailsDialog: React.FC<SubmissionDetailsDialogProps> = ({ submission, onClose }) => {
    /**
     * Function to render properties as sections
     */
    const renderList = (data: any, level: number = 0) => {
        if (!data) return null;

        return Object.entries(data).filter(([key]) => !EXCLUDEDKEYS.includes(key.toLowerCase().replace(/_/g, ""))).map(([key, value]) => {
            const displayKey = KEYNAMEMAP[key.toLowerCase().replace(/_/g, "")] || key;
            const isNestedObject = typeof value === "object" && value !== null;
            const paddingLeft = level * 2; // Indentation for nested items
            const formatedValue = formatValue(displayKey, value)
            return (
                <React.Fragment key={key}>
                    <ListItem sx={{
                        pl: paddingLeft,
                        borderLeft: formatedValue === "NC" ? 4 : 0,
                        borderColor: formatedValue === "NC" ? "error.main" : "transparent",
                        my: 0.5
                    }}>
                        {isNestedObject ? (
                            <Typography variant="h6" sx={{ fontWeight: "bold", mt: level > 0 ? 1 : 2 }}>
                                {displayKey.toUpperCase()}
                            </Typography>
                        ) : (
                            <ListItemText
                                primary={
                                    <Typography variant="body2">
                                        <strong>{displayKey}</strong><br></br> {formatedValue}
                                    </Typography>
                                }
                            />
                        )}
                    </ListItem>
                    {isNestedObject && renderList(value, level + 1)}
                    {level === 0 && <Divider />}
                </React.Fragment>
            );
        });
    };

    return (
        <Dialog open={Boolean(submission)} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle variant="h6" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Detalhes do Envio</Typography>
                <IconButton onClick={onClose} sx={{ color: "grey.500", ml: "auto" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {submission ? (
                    <List>{renderList(submission)}</List>
                ) : (
                    <Typography variant="body2">Nenhuma informação disponível.</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SubmissionDetailsDialog;
