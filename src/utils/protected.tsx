import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "./routes";
import { useAuth } from "hooks/auth";
import { Spinner } from "@chakra-ui/react";

interface IPROPS {
  children: any;
}

const Protected: React.FC<IPROPS> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate(LOGIN);
    }
  }, [user, loading]);
  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return children;
};
export default Protected;
