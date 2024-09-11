"use client"
import { useState } from "react";
import { ApplicationContext } from "./application-context";
// eslint-disable-next-line react/prop-types
const ApplicationContextProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("Modal");
  const [html, setHtml] = useState();
  const showModal = (value, mTitle, html) => {
    setIsModalVisible(value);
    if (mTitle == "") {
      mTitle = modalTitle;
    }
    setModalTitle(mTitle);
    setHtml(html);
  };
  const ctxValue = {
    isModalVisible,
    showModal,
    modalTitle,
    html,
  };
  return (
    <ApplicationContext.Provider value={ctxValue}>
      {children}
    </ApplicationContext.Provider>
  );
};
export default ApplicationContextProvider;
