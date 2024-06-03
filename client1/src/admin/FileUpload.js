import React, { useState } from "react";
import axios from "axios";
import Layout from "../core/Layout";

const FileUpload = ({ history }) => {
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("uploadfile", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(` https://us-central1-hospital-management-23dbf.cloudfunctions.net/api/uploadfile`, formData, config);

      setUploading(false);
      history.push("/list-vendors");
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <Layout title="Category test Form">
      <div className="form-group col-md-2">
        <label htmlFor="exampleFormControlFile1">Upload vendor Excel</label>
        <div className="custom-file">
        <input
          type="file"
          onChange={uploadFileHandler}
          className="custom-file-input"
          id="exampleFormControlFile1"
        />
        <label className="custom-file-label" htmlFor="inputPhoto">
                Choose file
              </label>
              </div>
        {uploading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FileUpload;