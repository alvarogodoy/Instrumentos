export interface CloudinaryError {
    message: string;
    http_code: number;
}

export interface CloudinaryResultInfo {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    original_filename: string;
}

export interface CloudinaryResult {
    event: string;
    info: CloudinaryResultInfo;
}