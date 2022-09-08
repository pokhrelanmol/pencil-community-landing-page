import { CameraAltOutlined, ResetTvRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { usePageContent } from "../contexts/PageContentContext";

const FileUploader = ({
    handleChange,
}: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const { state } = usePageContent();
    if (!state.edit) return null;
    return (
        <label style={{ cursor: "pointer" }}>
            <Tooltip title="upload image">
                {/* <CameraAltOutlined /> */}
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
