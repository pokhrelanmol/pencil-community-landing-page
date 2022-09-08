import React from "react";

export interface AppContextType {
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

export interface AppContextProps {
    state: AppContextType;
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
    payload: AppContextType;
};
type EDIT = {
    type: actionTypes.EDIT;
    payload: boolean;
};
type INPUT_CHANGE = {
    type: actionTypes.INPUT_CHANGE;
    payload: AppContextType;
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
    payload: AppContextType;
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
export type Actions =
    | SET_INITIAL_STATE
    | EDIT
    | INPUT_CHANGE
    | LIST_ITEM_CHANGE
    | FAQ_CHANGE
    | DELETE_LIST_ITEM
    | PREVIEW
    | SAVE
    | CANCEL_EDIT;
