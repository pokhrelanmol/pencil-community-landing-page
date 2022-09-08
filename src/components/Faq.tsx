import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { actionTypes, usePageContent } from "../contexts/PageContentContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Container } from "@mui/system";

export default function Faq() {
    const { state, dispatch } = usePageContent();
    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" textAlign="center">
                FAQ
            </Typography>
            {state.faqs &&
                state.faqs.map((faq, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
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
