import { useState, useContext, useRef } from "react";
import MessageDisplay from "./MessageDisplay";
import styles from "../styles/TextInput.module.css";
import { Context } from "../Context";
import axios from "axios";
import AttachmentIcon from "../../assets/attachment.svg";
import SendIcon from "../../assets/send.svg";

function TextInput() {
  const {
    note,
    setNote,
    messages,
    currentFile,
    setCurrentFile,
    currentUID,
    currentUName,
    api,
    refreshMessages,
    setRefreshMessages,
  } = useContext(Context);

  const fileInputRef = useRef(null);

  let localFileId = "";

  const handleFileInput = (e) => {
    const uploadedFile = e.target.files[0]; //Target data
    const newFile = {
      fileName: uploadedFile.name,
      url: URL.createObjectURL(uploadedFile), // Create a URL for each file
    };
    setCurrentFile(newFile);
  };

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (note.trim() || currentFile.fileName) {
      if (currentFile.fileName) {
        try {
          await axios.post(`${api}upload_id`, {
            userID: currentUID,
            userName: currentUName,
            message_index: messages.length,
          });
        } catch (error) {
          console.error(error);
        }

        const formData = new FormData();
        formData.append("file", fileInputRef.current.files[0]);

        try {
          const result = await axios.post(`${api}upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" }, // Important for file upload
          });

          localFileId = result.data.localFileId;

          try {
            const result = await axios.post(`${api}updatemessages`, {
              id: currentUID,
              userName: currentUName,
              message_text: note,
              file_text: currentFile.fileName,
              file_Id: localFileId,
            });

            setRefreshMessages(!refreshMessages); //Fetch messages again to show the latest
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      }

      //For condition when only message is sent and no file is attached
      if (note && !currentFile.fileName) {
        try {
          const result = await axios.post(`${api}updatemessages`, {
            id: currentUID,
            userName: currentUName,
            message_text: note,
            file_text: "",
            file_Id: "",
          });

          setRefreshMessages(!refreshMessages); //Fetch messages again to show the latest
        } catch (error) {
          console.error(error);
        }
      }

      setNote(""); // Clear message input
      setCurrentFile({ fileName: "" }); // Clear files after submission
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.textInputContainer}>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <textarea
          className={styles.textArea}
          value={note}
          onChange={handleChange}
          placeholder="Type a message..."
        />
        <label className={styles.customFileInput} htmlFor="file-upload">
          <img
            src={AttachmentIcon}
            alt="Upload"
            className={styles.uploadIcon}
          />
        </label>
        <input
          type="file"
          id="file-upload"
          className={styles.fileInput}
          onInput={handleFileInput}
          ref={fileInputRef}
        />
        {currentFile.fileName ? (
          <a
            className={styles.currentFile}
            href={currentFile.url}
            download={currentFile.fileName}
          >
            {currentFile.fileName}
          </a>
        ) : (
          <></>
        )}
        <button type="submit" className={styles.sendBtn}>
          <img src={SendIcon} alt="Send" className={styles.sendIcon} />
        </button>
      </form>
    </div>
  );
}

export default TextInput;
