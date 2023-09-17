import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import dayjs from "dayjs";

const tomorrow = dayjs().add(1, "day");
const today = new Date();
const schema = Yup.object({
  personalInfo: Yup.object()
    .shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      dateOfBirth: Yup.date()
        .required("Date of Birth is required")
        .max(new Date(), "Date of Birth cannot be in the future")
        .test(
          "valid-date-of-birth",
          "Please enter a valid date of birth",
          (value) => {
            const minDate = new Date(today);
            minDate.setFullYear(today.getFullYear() - 150);
            return value >= minDate;
          }
        ),
      gender: Yup.string().required("Gender is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .min(11, "minimum you need to 11 digits number"),
    })
    .required(),
  addressInfo: Yup.object({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string()
      .matches(/^\d{5}$/, "Zip code must be 5 digits")
      .required("Zip code is required"),
  }),
  additionalInfo: Yup.object({
    referredBy: Yup.string().required("refer is required"),
    comments: Yup.string().required("comments is required"),
  }),
  education: Yup.array().of(
    Yup.object({
      graduationYear: Yup.number()
        .typeError("Graduation year must be a number")
        .required("Graduation year is required")
        .min(1900, "Graduation year must be at least 1900")
        .max(
          new Date().getFullYear(),
          "Graduation year cannot be in the future"
        ),
      degree: Yup.string().trim().required("Degree is required"),
      institution: Yup.string().trim().required("Institution is required"),
    })
  ),
  employmentHistory: Yup.array().of(
    Yup.object({
      company: Yup.string().required("company is required"),
      position: Yup.string().required("position is required"),
      startDate: Yup.date()
        .required("Start  Date  is required")
        .max(new Date(), "Start Date cannot be in the future")
        .nullable()
        .typeError("Start Date must be a valid date"),
      endDate: Yup.date()
        .required(" End Date is required")
        .max(new Date(), "End Date  cannot be in the future")
        .nullable()
        .typeError("Start Date must be a valid date"),
    })
  ),
  interests: Yup.array()
    .of(Yup.string().trim())
    .min(1, "Select at least one interest")
    .required("Select at least one interest"),
});

const FromValid = () => {
  const defaultValueIs = {
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      gender: "",
      email: "",
      phone: "",
    },
    addressInfo: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    additionalInfo: {
      referredBy: "",
      comments: "",
    },
    education: [{ degree: " ", institution: " ", graduationYear: null }],
    employmentHistory: [
      { company: "", position: "", startDate: "", endDate: "" },
    ],
    interests: [],
  };

  const { register, handleSubmit, formState, control, setValue, watch } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: defaultValueIs,
    });
  console.log(watch());
  const { fields, append, prepend, remove } = useFieldArray({
    name: "education",
    control,
  });
  const {
    fields: employmentHistoryFields,
    append: employmentHistoryAppend,
    remove: employmentHistoryRemove,
  } = useFieldArray({
    name: "employmentHistory",
    control,
  });
  const { errors } = formState;

  const interestValue = ["Reading", "Hiking", "Cooking"];

  const onSubmitData = (data) => {
    console.log(data);
  };

  // console.log(watch());

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmitData)}>
        {/* Personal Info started */}
        <Typography align="center" color="GrayText" variant="h6">
          PerSonal Info
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            mt: "20px",
          }}
        >
          {/* Box part 3  */}
          <Box>
            <TextField
              variant="outlined"
              {...register("personalInfo.firstName")}
              sx={{ width: 250 }}
              size="small"
              error={
                !!errors?.personalInfo?.firstName &&
                !!errors?.personalInfo?.firstName
              }
              helperText={
                errors?.personalInfo?.firstName?.message &&
                errors?.personalInfo?.firstName?.message
              }
              label="First Name"
            />
            <Box>
              <Controller
                name="personalInfo.dateOfBirth"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <DatePicker
                      {...field}
                      inputRef={field.ref}
                      views={["year", "month", "day"]}
                      sx={{ width: 250, mt: "15px" }}
                      size="small"
                      disableFuture
                      label="DateOfBirth"
                      value={field?.value}
                      error={fieldState.error}
                      onChange={(newValue) => {
                        field.onChange(newValue?.$d);
                      }}
                    />
                    {fieldState.error && (
                      <FormHelperText error>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </Box>
            <Box sx={{ width: 200, mt: "1.3rem" }}>
              <Controller
                name="personalInfo.phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    inputStyle={{
                      width: 250,
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    country="RU"
                    value={field.value}
                    onChange={(phoneNumber) => field.onChange(phoneNumber)}
                    error={
                      !!errors?.personalInfo?.phone &&
                      !!errors?.personalInfo?.phone
                    }
                    helperText={
                      errors?.personalInfo?.phone?.message &&
                      errors?.personalInfo?.phone?.message
                    }
                  />
                )}
              />
            </Box>
            <FormHelperText error>
              {errors?.personalInfo?.phone?.message &&
                errors?.personalInfo?.phone?.message}
            </FormHelperText>
          </Box>
          {/* box part 2  */}
          <Box>
            <TextField
              variant="outlined"
              {...register("personalInfo.lastName")}
              sx={{ width: 250 }}
              size="small"
              error={
                !!errors?.personalInfo?.lastName &&
                !!errors?.personalInfo?.lastName
              }
              helperText={
                errors?.personalInfo?.lastName?.message &&
                errors?.personalInfo?.lastName?.message
              }
              label="Last Name"
            />

            <Box sx={{ width: 250, mt: "15px" }}>
              <Controller
                name="personalInfo.gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onChange={(e) => field.onChange(e.target.value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="interest"
                        placeholder="interest"
                        error={
                          !!errors?.personalInfo?.gender &&
                          !!errors?.personalInfo?.gender
                        }
                        helperText={errors?.personalInfo?.gender?.message}
                      />
                    )}
                  >
                    <Stack direction="row">
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </Stack>
                  </RadioGroup>
                )}
              />
            </Box>
            <FormHelperText error>
              {errors?.personalInfo?.gender?.message}
            </FormHelperText>

            <Box sx={{ width: 250, mt: "2rem" }}>
              <TextField
                variant="outlined"
                label="Email"
                error={
                  !!errors?.personalInfo?.email && !!errors?.personalInfo?.email
                }
                helperText={
                  errors?.personalInfo?.email?.message &&
                  errors?.personalInfo?.email?.message
                }
                {...register("personalInfo.email")}
                size="small"
              />
            </Box>
          </Box>
        </Box>
        {/* Personal Info ended */}

        {/* Address Info Started */}
        <Typography align="center" mt={2} color="GrayText" variant="h6">
          Address Info
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            mt: "20px",
          }}
        >
          <Box>
            <TextField
              label="Street"
              {...register("addressInfo.street")}
              variant="outlined"
              size="small"
              sx={{ width: 250 }}
              error={
                !!errors?.addressInfo?.street && !!errors?.addressInfo?.street
              }
              helperText={errors?.addressInfo?.street?.message}
            />
            <br /> <br />
            <TextField
              label="ZipCode"
              {...register("addressInfo.zipCode")}
              variant="outlined"
              size="small"
              sx={{ width: 250 }}
              error={
                !!errors?.addressInfo?.zipCode && !!errors?.addressInfo?.zipCode
              }
              helperText={errors?.addressInfo?.zipCode?.message}
            />
          </Box>
          <Box>
            <TextField
              label="State"
              {...register("addressInfo.state")}
              variant="outlined"
              size="small"
              sx={{ width: 250 }}
              error={
                !!errors?.addressInfo?.state && !!errors?.addressInfo?.state
              }
              helperText={errors?.addressInfo?.state?.message}
            />
            <br /> <br />
            <TextField
              label="City"
              {...register("addressInfo.city")}
              variant="outlined"
              size="small"
              sx={{ width: 250 }}
              error={!!errors?.addressInfo?.city && !!errors?.addressInfo?.city}
              helperText={errors?.addressInfo?.city?.message}
            />
          </Box>
        </Box>
        {/* Address Info End*/}

        {/* Additional Info  started */}
        <Typography align="center" mt={2} color="GrayText" variant="h6">
          Additional Info
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            mt: "20px",
          }}
        >
          <Box>
            <TextField
              label="DegreeName"
              {...register("additionalInfo.comments")}
              variant="outlined"
              size="small"
              sx={{ width: 250 }}
              error={
                !!errors?.additionalInfo?.comments &&
                !!errors?.additionalInfo?.comments
              }
              helperText={errors?.additionalInfo?.comments?.message}
            />
          </Box>
          <Box>
            <TextField
              label="ReferredBy"
              {...register("additionalInfo.referredBy")}
              variant="outlined"
              size="small"
              sx={{ width: 250, height: 50 }}
              error={
                !!errors?.additionalInfo?.referredBy &&
                !!errors?.additionalInfo?.referredBy
              }
              helperText={errors?.additionalInfo?.referredBy?.message}
            />
          </Box>
        </Box>
        {/* Additional Info  end */}

        {/* education section  started */}
        <Typography align="center" mt={2} color="GrayText" variant="h6">
          Education
        </Typography>
        <Box>
          {fields?.map((fields, index) => {
            return (
              <Box key={fields.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    mt: "20px",
                  }}
                  key={fields.id}
                >
                  <Box>
                    <TextField
                      label="institution"
                      {...register(`education.${index}.institution`)}
                      variant="outlined"
                      size="small"
                      sx={{ width: 250, height: 50 }}
                      error={
                        !!errors?.education?.[index]?.institution &&
                        !!errors?.education?.[index]?.institution
                      }
                      helperText={
                        errors?.education?.[index]?.institution?.message
                      }
                    />
                    <br /> <br />
                    <Box>
                      <TextField
                        label="Education Degree"
                        {...register(`education.${index}.degree`)}
                        variant="outlined"
                        size="small"
                        sx={{ width: 250, height: 50 }}
                        error={!!errors?.education?.[index]?.degree}
                        helperText={errors?.education?.[index]?.degree?.message}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <TextField
                      label="graduationYear"
                      {...register(`education.${index}.graduationYear`)}
                      variant="outlined"
                      size="small"
                      sx={{ width: 250, height: 50 }}
                      error={
                        !!errors?.education?.[index]?.graduationYear &&
                        !!errors?.education?.[index]?.graduationYear
                      }
                      helperText={
                        errors?.education?.[index]?.graduationYear?.message
                      }
                    />
                  </Box>
                  <br /> <br />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  my={2}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              append({ degree: " ", institution: " ", graduationYear: " " })
            }
          >
            Add Education +
          </Button>
        </Box>
        {/* education section  end */}

        {/* EmploymentHistory started */}
        <Typography align="center" mt={5} color="GrayText" variant="h6">
          Employment History
        </Typography>

        {employmentHistoryFields?.map((fields, index) => {
          return (
            <Box key={fields.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  mt: "20px",
                }}
              >
                <Box>
                  <TextField
                    label="company"
                    {...register(`employmentHistory.${index}.company`)}
                    variant="outlined"
                    size="small"
                    sx={{ width: 250, height: 50 }}
                    error={
                      !!errors?.employmentHistory?.[index]?.company &&
                      !!errors?.employmentHistory?.[index]?.company
                    }
                    helperText={
                      errors?.employmentHistory?.[index]?.company?.message
                    }
                  />
                  <br /> <br />
                  <Controller
                    name={`employmentHistory.${index}.startDate`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <DatePicker
                          {...field}
                          inputRef={field.ref}
                          disableFuture
                          views={["year", "month", "day"]}
                          sx={{ width: 250, mt: "15px" }}
                          size="small"
                          label="Start-Date"
                          value={field?.value}
                          error={fieldState.error}
                          onChange={(newValue) => {
                            field.onChange(newValue?.$d);
                          }}
                        />
                        {fieldState.error && (
                          <FormHelperText error>
                            {fieldState.error.message}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  />
                </Box>
                <Box>
                  <TextField
                    label="position"
                    {...register(`employmentHistory.${index}.position`)}
                    variant="outlined"
                    size="small"
                    sx={{ width: 250, height: 50 }}
                    error={
                      !!errors?.employmentHistory?.[index]?.position &&
                      !!errors?.employmentHistory?.[index]?.position
                    }
                    helperText={
                      errors?.employmentHistory?.[index]?.position?.message
                    }
                  />
                  <br /> <br />
                  <Controller
                    name={`employmentHistory.${index}.endDate`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <DatePicker
                          {...field}
                          inputRef={field.ref}
                          views={["year", "month", "day"]}
                          sx={{ width: 250, mt: "15px" }}
                          size="small"
                          disableFuture
                          label="End-Date"
                          value={field?.value}
                          error={fieldState.error}
                          onChange={(newValue) => {
                            field.onChange(newValue?.$d);
                          }}
                        />
                        {fieldState.error && (
                          <FormHelperText error>
                            {fieldState.error.message}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  sx={{ my: 3 }}
                  onClick={() => employmentHistoryRemove(index)}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          );
        })}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              employmentHistoryAppend({
                company: "",
                position: "",
                startDate: "",
                endDate: "",
              })
            }
          >
            Add EmployHistory +
          </Button>
        </Box>

        {/* EmploymentHistory ended  */}

        {/* interested started */}
        <Typography align="center" mt={2} color="GrayText" variant="h6">
          Interested
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            my: 2,
          }}
        >
          <Controller
            name="interests"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={interestValue}
                    getOptionLabel={(option) => option}
                    value={field.value}
                    onChange={(_, newValue) => {
                      setValue("interests", newValue); // Set the selected values in the form data
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputRef={field.ref}
                        label="interest"
                        placeholder="interest"
                        error={!!error && error}
                        helperText={errors?.interests?.message}
                      />
                    )}
                    sx={{ width: "500px" }}
                  />
                </>
              );
            }}
          />
        </Box>
        {/* interested  ended */}
        {/* Button seciton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            mt: "20px",
          }}
          mb={3}
        >
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Stack>
  );
};

export default FromValid;
