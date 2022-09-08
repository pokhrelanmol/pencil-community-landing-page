import * as React from "react";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppContext } from "../contexts/AppContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Container } from "@mui/system";
import { actionTypes } from "../contexts/types";
import uniqid from "uniqid";

export default function Faq() {
    const { state, dispatch } = useAppContext();
    return (
        <Container sx={{ my: 5 }}>
            <Typography variant="h4" textAlign="center">
                FAQ
            </Typography>
            {state.faqs &&
                state.faqs.map((faq, index) => (
                    <Accordion key={uniqid()}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                suppressContentEditableWarning={true}
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    dispatch({
                                        type: actionTypes.FAQ_CHANGE,
                                        payload: {
                                            id: faq.id,
                                            question: e.currentTarget.innerText,
                                            answer: faq.answer,
                                        },
                                    });
                                }}
                                contentEditable={state.edit}
                            >
                                {state.preview
                                    ? state.faqs[faq.id].question
                                    : faq.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography
                                contentEditable={state.edit}
                                suppressContentEditableWarning={true}
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    dispatch({
                                        type: actionTypes.FAQ_CHANGE,
                                        payload: {
                                            id: faq.id,
                                            question: faq.question,
                                            answer: e.currentTarget.innerText,
                                        },
                                    });
                                }}
                            >
                                {state.preview
                                    ? state.faqs[faq.id].answer
                                    : faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
        </Container>
    );
}
