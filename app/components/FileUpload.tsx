"use client";

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
    onSuccess: (res: any) => void;
    onProgress?: (progress: number) => void;
    fileType?: "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload a valid video file.");
            }
        }

        if (file.size > 100 * 1024 * 1024) {
            setError("File size must be less than 100 MB");
        }

        return true;
    };

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {};
    return (
        <>
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileChange}
            />

            {uploading && <span>Uploading....</span>}
        </>
    );
};

export default FileUpload;
