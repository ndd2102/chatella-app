import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import Header from "../../components/Header/Header";
import Dashboard from "../Channel/Dashboard/Dashboard";

export default function Home() {
  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
}
