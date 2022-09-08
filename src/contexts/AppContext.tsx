import React, { useContext, createContext, useEffect } from "react";
import { setInitialDataToDb } from "../utils";
import { Actions, actionTypes, AppContextProps, AppContextType } from "./types";

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export let initialState: AppContextType = {
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

const reducer = (state: AppContextType, action: Actions) => {
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
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
