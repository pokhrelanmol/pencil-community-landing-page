import { CameraAltOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";

const FileUploader = ({
    handleChange,
}: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const { state } = useAppContext();
    if (!state.edit) return null;
    return (
        <label style={{ cursor: "pointer" }}>
            <Tooltip title="upload image">
                <CameraAltOutlined />
            </Tooltip>
            <input
                // className="custom-file-input"
                style={{
                    display: "none",
                }}
                type="file"
                onChange={handleChange}
            />
        </label>
    );
};

export default FileUploader;
