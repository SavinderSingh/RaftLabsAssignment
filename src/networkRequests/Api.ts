import ApiBase from "./ApiBase"; // axios instance
import { API_ENDPOINTS } from "./ApiEndpoints";

export const fetchPropertiesList = async () => {
  try {
    const response = await ApiBase.get(API_ENDPOINTS.getProperties);
    if (!response || !response.data) {
      throw new Error("No data received from the server.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching property listings:", error?.message || error);
    throw new Error(
      "Something went wrong while fetching the property listings."
    );
  }
};

export const fetchBookingsList = async () => {
  try {
    const response = await ApiBase.get(API_ENDPOINTS.getBookings);
    if (!response || !response.data) {
      throw new Error("No data received from the server.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching bookings listings:", error?.message || error);
    throw new Error(
      "Something went wrong while fetching the bookings listings."
    );
  }
};

export const fetchProfile = async () => {
  try {
    const response = await ApiBase.get(API_ENDPOINTS.getProfile);
    if (!response || !response.data) {
      throw new Error("No data received from the server.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching profile:", error?.message || error);
    throw new Error("Something went wrong while fetching the profile.");
  }
};
