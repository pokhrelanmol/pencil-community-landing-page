import { Co2Sharp } from "@mui/icons-material";
import React, { useContext, createContext, useEffect } from "react";
interface PageContentType {
    logo: string;
    title: string;
    heroImage: string;
    heroHeading: string;
    heroSubHeading: string;
    aboutCommunityList: Array<{ id: number; content: string }>;
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
    ADD_MORE_LIST = "ADD_MORE_LIST",
    LIST_ITEM_CHANGE = "LIST_ITEM_CHANGE",
    PREVIEW = "PREVIEW",
    SAVE = "SAVE",
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
type PREVIEW = {
    type: actionTypes.PREVIEW;
    payload: PageContentType;
};
type ADD_MORE_LIST = {
    type: actionTypes.ADD_MORE_LIST;
};

type SAVE = {
    type: actionTypes.SAVE;
};
type Actions =
    | SET_INITIAL_STATE
    | EDIT
    | INPUT_CHANGE
    | LIST_ITEM_CHANGE
    | ADD_MORE_LIST
    | PREVIEW
    | SAVE;

const PageContentContext = createContext<PageContentContextProps>(
    {} as PageContentContextProps
);

export let initialState: PageContentType = {
    logo: "",
    title: "",
    heroImage: "",
    heroHeading: "",
    heroSubHeading: "",
    edit: false,
    saved: false,
    preview: false,
    aboutCommunityList: [
        { id: 1, content: "lorem ipsum dolor sit amet " },
        { id: 2, content: "lorem ipsum dolor sit amet " },
        { id: 3, content: "lorem ipsum dolor sit amet " },
        {
            id: 4,
            content: "lorem ipsum dolor sit amet ",
        },
    ],
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
            console.log(state);
            return {
                ...state,
                aboutCommunityList: state.aboutCommunityList.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, content: action.payload.content }
                        : item
                ),
            };
        case actionTypes.ADD_MORE_LIST:
            return {
                ...state,
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
        // save initial state to local storage

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
