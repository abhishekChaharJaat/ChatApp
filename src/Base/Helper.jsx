export const appearanceAuthForm = {
  layout: {
    socialButtonsVariant: "blockButton",
    logoPlacement: "outside",
  },
  variables: {
    colorPrimary: "#4F46E5",
    colorBackground: "#F3F4F6",
    colorInputBackground: "#FFFFFF",
    colorText: "#1F2937",
    borderRadius: "8px",
    spacingUnit: "12px",
  },
  elements: {
    rootBox: {
      backgroundColor: "white",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px",
    },
    cardBox: {
      boxShadow: "none",
      height: "100%",
      width: "450px",
    },
    card: {
      backgroundColor: "white",
      padding: "10px",
      borderColor: "white",
      boxShadow: "none",
    },
    headerTitle: {
      fontSize: "24px",
      fontStyle: "italic",
      fontWeight: "700",
    },
    headerSubtitle: {
      color: "Green",
      fontWeight: "400",
    },
    socialButtonsBlockButton: {
      borderRadius: "22px",
      height: "40px",
    },
    formFieldInput: {
      borderRadius: "22px",
      border: "1px solid #D1D5DB",
      padding: "20px",
    },
    formButtonPrimary: {
      borderRadius: "22px",
      height: "40px",
      backgroundColor: "#1E3A8A",
      color: "white",
      fontWeight: "bold",
      ":hover": { backgroundColor: "#172554" },
      padding: "10px",
      border: "none",
      cursor: "pointer",
    },
    footer: {
      display: "none",
    },
  },
};
