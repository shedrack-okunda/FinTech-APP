import { CreditCard } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  MenuItem,
  Select,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import card from "../assets/card.png";
import { axio } from "../config/axios";
import { useSelector } from "react-redux";
import { SelectLoggedInUser } from "../features/auth/AuthSlice";
import axios from "axios";

export const CardPage = () => {
  const loggedInUser = useSelector(SelectLoggedInUser);
  const [activeStep, setActiveStep] = useState(0);
  const [cards, setCards] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    cardType: "",
    cardBrand: "",
    cardFee: "",
    yourCardFee: "",
    toBeDebitedFrom: "",
    totalAmount: "",
  });

  // Fetch cards from the server
  const fetchCards = async () => {
    try {
      const userId = loggedInUser?._id;
      const response = await axio.get(`/cards/user/${userId}`);
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = loggedInUser?._id;
      const newCard = { ...formData, user: userId };
      await axios.post("/cards", newCard);
      fetchCards(); // Refresh the card list
      setFormVisible(false); // Close the form
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setFormVisible(false);
    }
  };

  return (
    <Box sx={{ ml: { xs: "0px", sm: "0px", md: "120px" } }}>
      {formVisible && (
        <Box
          id="overlay"
          onClick={handleOutsideClick}
          sx={{
            position: "fixed",
            top: 10,
            left: { xs: 0, md: 400 },
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: "450px",
              padding: "20px",
              height: "auto",
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Add New Card
            </Typography>

            <Stepper activeStep={activeStep}>
              <Step>
                <StepLabel>Card Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Fees & Review</StepLabel>
              </Step>
            </Stepper>

            <form onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <>
                  <TextField
                    name="cardName"
                    label="Card Name"
                    fullWidth
                    margin="normal"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                  <TextField
                    name="cardType"
                    label="Card Type"
                    fullWidth
                    margin="normal"
                    value={formData.cardType}
                    onChange={handleChange}
                  />
                  <TextField
                    name="cardBrand"
                    label="Card Brand"
                    fullWidth
                    margin="normal"
                    value={formData.cardBrand}
                    onChange={handleChange}
                  />
                </>
              )}

              {activeStep === 1 && (
                <>
                  <TextField
                    name="cardFee"
                    label="Your Card Fee ($)"
                    fullWidth
                    margin="normal"
                    value={formData.cardFee}
                    onChange={handleChange}
                  />
                  <TextField
                    name="yourCardFee"
                    label="Amount Input"
                    fullWidth
                    margin="normal"
                    value={formData.yourCardFee}
                    onChange={handleChange}
                  />
                  <Select
                    name="toBeDebitedFrom"
                    value={formData.toBeDebitedFrom}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="Account A">Account A</MenuItem>
                    <MenuItem value="Account B">Account B</MenuItem>
                  </Select>
                  <TextField
                    name="totalAmount"
                    label="Total Amount"
                    fullWidth
                    margin="normal"
                    value={formData.totalAmount}
                    onChange={handleChange}
                  />
                </>
              )}

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {activeStep > 0 && (
                  <Button variant="outlined" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {activeStep < 1 ? (
                  <Button variant="contained" onClick={handleContinue}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </Box>
      )}

      <Paper>
        <Box>
          <Typography variant="h5" sx={{ p: 2 }}>
            Cards
          </Typography>

          <Divider />

          <Box component="img" width={"530px"} height={"308px"} src={card} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={toggleFormVisibility}
              sx={{
                padding: "10px 50px",
                margin: "20px",
                backgroundColor: "#7105E9",
                textTransform: "none",
                fontWeight: 600,
                width: "100%",
                fontSize: "18px",
              }}
              startIcon={<CreditCard />}
            >
              Create new card
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box>{cards}</Box>
    </Box>
  );
};
