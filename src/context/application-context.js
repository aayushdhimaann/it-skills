import { createContext } from "react";

export const ApplicationContext = createContext({
  isModalVisible: false,
  showModal: () => {},
  setModalTitle: () => {},
  modalTitle: "",
  html: "",
});
