import { Co2Sharp } from "@mui/icons-material";
import React, { useContext, createContext, useEffect } from "react";
import { faq } from "../assets/dummyData";
import { setInitialDataToDb } from "../utils";
interface PageContentType {
    logo: string;
    title: string;
    heroImage: string;
    heroHeading: string;
    heroSubHeading: string;
    textBelowHeroSection: string;
    aboutCommunityList: Array<{ id: number; content: string }>;
    communityOwnerImage: string;
    communityOwnerName: string;
    communityOwnerHeading: string;
    communityOwnerDescription: string;

    communityOwnerSocialMediaLink: {
        facebook?: string;
        youtube?: string;
        linkedin?: string;
        twitter?: string;
    };
    faqs: Array<{ id: number; question: string; answer: string }>;
    edit: boolean;
    preview: boolean;
    saved: boolean;
}

interface PageContentContextProps {
    state: PageContentType;
    dispatch: React.Dispatch<Actions>;
}

export enum actionTypes {
    SET_INITIAL_STATE = "SET_INITIAL_STATE",
    EDIT = "EDIT",
    INPUT_CHANGE = "INPUT_CHANGE",
    DELETE_LIST_ITEM = "DELETE_LIST_ITEM",
    LIST_ITEM_CHANGE = "LIST_ITEM_CHANGE",
    PREVIEW = "PREVIEW",
    FAQ_CHANGE = "FAQ_CHANGE",
    SAVE = "SAVE",
    CANCEL_EDIT = "CANCEL_EDIT",
}
type SET_INITIAL_STATE = {
    type: actionTypes.SET_INITIAL_STATE;
    payload: PageContentType;
};
type EDIT = {
    type: actionTypes.EDIT;
    payload: boolean;
};
type INPUT_CHANGE = {
    type: actionTypes.INPUT_CHANGE;
    payload: PageContentType;
};
type LIST_ITEM_CHANGE = {
    type: actionTypes.LIST_ITEM_CHANGE;
    payload: {
        id: number;
        content: string;
    };
};
type FAQ_CHANGE = {
    type: actionTypes.FAQ_CHANGE;
    payload: {
        id: number;
        question: string;
        answer: string;
    };
};
type PREVIEW = {
    type: actionTypes.PREVIEW;
    payload: PageContentType;
};
type DELETE_LIST_ITEM = {
    type: actionTypes.DELETE_LIST_ITEM;
};

type SAVE = {
    type: actionTypes.SAVE;
};
type CANCEL_EDIT = {
    type: actionTypes.CANCEL_EDIT;
};
type Actions =
    | SET_INITIAL_STATE
    | EDIT
    | INPUT_CHANGE
    | LIST_ITEM_CHANGE
    | FAQ_CHANGE
    | DELETE_LIST_ITEM
    | PREVIEW
    | SAVE
    | CANCEL_EDIT;

const PageContentContext = createContext<PageContentContextProps>(
    {} as PageContentContextProps
);

export let initialState: PageContentType = {
    logo: "",
    title: "",
    heroImage: "",
    heroHeading: "",
    heroSubHeading: "",
    textBelowHeroSection: "",
    communityOwnerImage: "",
    communityOwnerName: "",
    communityOwnerHeading: "",
    communityOwnerDescription: "",

    communityOwnerSocialMediaLink: {
        facebook: "",
        youtube: "",
        linkedin: "",
        twitter: "",
    },
    faqs: [],
    edit: false,
    saved: false,
    preview: false,
    aboutCommunityList: [],
};

const reducer = (state: PageContentType, action: Actions) => {
    switch (action.type) {
        case actionTypes.SET_INITIAL_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case actionTypes.EDIT:
            return {
                ...state,
                edit: action.payload,
                preview: false,
            };
        case actionTypes.INPUT_CHANGE:
            return action.payload;

        case actionTypes.LIST_ITEM_CHANGE:
            return {
                ...state,
                aboutCommunityList: state.aboutCommunityList.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, content: action.payload.content }
                        : item
                ),
            };
        case actionTypes.DELETE_LIST_ITEM:
            state.aboutCommunityList.pop();
            return {
                ...state,
                aboutCommunityList: state.aboutCommunityList,
            };
        case actionTypes.FAQ_CHANGE:
            return {
                ...state,
                faqs: state.faqs.map((item) =>
                    item.id === action.payload.id
                        ? {
                              ...item,
                              question: action.payload.question,
                              answer: action.payload.answer,
                          }
                        : item
                ),
            };
        case actionTypes.PREVIEW:
            return {
                ...state,
                preview: true,
                edit: false,
            };
        case actionTypes.SAVE:
            localStorage.setItem(
                "initialdata",
                JSON.stringify({ ...state, edit: false, preview: false })
            );
            return {
                ...state,
                edit: false,
                preview: false,
                saved: true,
            };
        case actionTypes.CANCEL_EDIT:
            return {
                ...state,
                edit: false,
                preview: false,
            };

        default:
            return state;
    }
};

export const PageContentProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    useEffect(() => {
        if (!state.heroHeading && !state.logo && !state.title) {
            setInitialDataToDb();
        }

        const initailData = JSON.parse(
            localStorage.getItem("initialdata") || "{}"
        );
        initialState = initailData;
        dispatch({
            type: actionTypes.SET_INITIAL_STATE,
            payload: initailData,
        });
    }, [state.saved]);
    return (
        <PageContentContext.Provider value={{ state, dispatch }}>
            {children}
        </PageContentContext.Provider>
    );
};

export const usePageContent = () => useContext(PageContentContext);
