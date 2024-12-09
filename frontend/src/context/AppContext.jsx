import React, { createContext, useContext, useState } from "react";
import {
  Client,
  Communication,
  Deliverable,
  FeedbackItem,
} from "../types/index.js";

/**
 * @typedef {Object} AppContextType
 * @property {Array<Client>} clients - Array of clients
 * @property {Array<Communication>} communications - Array of communications
 * @property {Array<Deliverable>} deliverables - Array of deliverables
 * @property {Array<FeedbackItem>} feedback - Array of feedback items
 * @property {function(Client): void} addClient - Function to add a client
 * @property {function(string, Client): void} updateClient - Function to update a client
 * @property {function(string): void} deleteClient - Function to delete a client
 * @property {function(Communication): void} addCommunication - Function to add a communication
 * @property {function(Deliverable): void} addDeliverable - Function to add a deliverable
 * @property {function(string, Deliverable): void} updateDeliverable - Function to update a deliverable
 * @property {function(FeedbackItem): void} addFeedback - Function to add feedback
 */

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [deliverables, setDeliverables] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const addClient = (client) => {
    setClients([...clients, client]);
  };

  const updateClient = (id, updatedClient) => {
    setClients(
      clients.map((client) => (client.id === id ? updatedClient : client))
    );
  };

  const deleteClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const addCommunication = (communication) => {
    setCommunications([...communications, communication]);
  };

  const addDeliverable = (deliverable) => {
    setDeliverables([...deliverables, deliverable]);
  };

  const updateDeliverable = (id, updatedDeliverable) => {
    setDeliverables(
      deliverables.map((d) => (d.id === id ? updatedDeliverable : d))
    );
  };

  const addFeedback = (feedbackItem) => {
    setFeedback([...feedback, feedbackItem]);
  };

  return (
    <AppContext.Provider
      value={{
        clients,
        communications,
        deliverables,
        feedback,
        addClient,
        updateClient,
        deleteClient,
        addCommunication,
        addDeliverable,
        updateDeliverable,
        addFeedback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
