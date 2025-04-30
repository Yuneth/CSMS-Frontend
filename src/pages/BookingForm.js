// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import {
//   createBooking,
//   updateBooking,
//   getBookingById,
// } from "../services/bookingService";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   InputAdornment,
//   Grid,
//   Snackbar,
//   CircularProgress,
// } from "@mui/material";
// import { Person, LocationOn, CalendarMonth, Build } from "@material-ui/icons";
// import { useNavigate, useParams } from "react-router-dom";
// import * as Yup from "yup";

// function BookingForm() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const formik = useFormik({
//     initialValues: {
//       customerName: "",
//       address: "",
//       dateTime: "",
//       serviceId: "",
//     },
//     validationSchema: Yup.object({
//       customerName: Yup.string().required("Customer Name is required"),
//       address: Yup.string().required("Address is required"),
//       dateTime: Yup.string().required("Date and Time is required"),
//       serviceId: Yup.number().required("Service ID is required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         setLoading(true);
//         const userId = localStorage.getItem("userId");
//         const payload = { ...values, userId };

//         if (id) {
//           await updateBooking(id, payload);
//         } else {
//           await createBooking(payload);
//         }
//         navigate("/");
//       } catch (error) {
//         console.error(error);
//         setErrorMsg("Failed to save booking. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   useEffect(() => {
//     const loadBooking = async () => {
//       if (id) {
//         setLoading(true);
//         try {
//           const res = await getBookingById(id);
//           const data = res.data;
//           data.dateTime = new Date(data.dateTime).toISOString().slice(0, 16); // Format for datetime-local
//           formik.setValues(data);
//         } catch (error) {
//           console.error(error);
//           setErrorMsg("Failed to load booking data.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     loadBooking();
//   }, [id]);

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(to right, #ece9e6, #ffffff)",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 2,
//       }}
//     >
//       <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 5 }}>
//         <CardContent>
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             textAlign="center"
//             gutterBottom
//           >
//             {id ? "Edit Booking" : "Create New Booking"}
//           </Typography>

//           {loading ? (
//             <Box display="flex" justifyContent="center" p={4}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <form onSubmit={formik.handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Customer Name"
//                     name="customerName"
//                     value={formik.values.customerName}
//                     onChange={formik.handleChange}
//                     error={
//                       formik.touched.customerName &&
//                       Boolean(formik.errors.customerName)
//                     }
//                     helperText={
//                       formik.touched.customerName && formik.errors.customerName
//                     }
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Person />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Address"
//                     name="address"
//                     value={formik.values.address}
//                     onChange={formik.handleChange}
//                     error={
//                       formik.touched.address && Boolean(formik.errors.address)
//                     }
//                     helperText={formik.touched.address && formik.errors.address}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOn />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Date and Time"
//                     name="dateTime"
//                     type="datetime-local"
//                     value={formik.values.dateTime}
//                     onChange={formik.handleChange}
//                     error={
//                       formik.touched.dateTime && Boolean(formik.errors.dateTime)
//                     }
//                     helperText={
//                       formik.touched.dateTime && formik.errors.dateTime
//                     }
//                     InputLabelProps={{ shrink: true }}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <CalendarMonth />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Service ID"
//                     name="serviceId"
//                     type="number"
//                     value={formik.values.serviceId}
//                     onChange={formik.handleChange}
//                     error={
//                       formik.touched.serviceId &&
//                       Boolean(formik.errors.serviceId)
//                     }
//                     helperText={
//                       formik.touched.serviceId && formik.errors.serviceId
//                     }
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Build />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Button
//                     fullWidth
//                     type="submit"
//                     variant="contained"
//                     size="large"
//                     sx={{ mt: 1 }}
//                   >
//                     {id ? "Update Booking" : "Create Booking"}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           )}
//         </CardContent>
//       </Card>

//       <Snackbar
//         open={!!errorMsg}
//         onClose={() => setErrorMsg("")}
//         message={errorMsg}
//         autoHideDuration={6000}
//       />
//     </Box>
//   );
// }

// export default BookingForm;
