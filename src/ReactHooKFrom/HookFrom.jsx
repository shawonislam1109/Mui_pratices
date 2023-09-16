import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// const schema = yup
//   .object({
//     firstName: yup.string().required("This is requires field"),
//     age: yup.number().positive().integer().required("Enter your age"),
//   })
//   .required();

const schema = yup.object().shape({
  firstName: yup.string().required("This is required field that is "),
  age: yup.number().min(18).required("This Age field"),
});

const HookFrom = () => {
  const defaultValueIs = {
    firstName: "shawon",
    age: 12,
    social: {
      facebook: "shawon",
      twitter: "Rabiyul",
    },
    phoneNumber: ["3123123", "23123123"],
    phoneNumbers: [{ number: "" }],
  };

  const { register, handleSubmit, formState, control, getValues, setValue } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: defaultValueIs,
    });

  const {
    errors,
    isDirty,
    isValid,
    touchedFields,
    isSubmitted,
    isSubmitSuccessful,
    isValidating,
  } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };
  const onError = (errors) => {
    console.log(errors);
  };

  const handleValues = () => {
    console.log("getValues", getValues());
  };
  const handleSetValues = () => {
    setValue("firstName", "rabi");
  };
  const { fields, append, remove } = useFieldArray({
    name: "phoneNumbers",
    control,
  });

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <TextField
          variant="outlined"
          label="firstName"
          {...register("firstName")}
        />
        <p>{errors.firstName?.message}</p>
        <TextField variant="outlined" label="Age" {...register("age")} />
        <p>{errors.age?.message}</p>

        <TextField
          variant="outlined"
          label="facebook"
          {...register("social.facebook")}
        />
        <p>{errors.social?.facebook?.message}</p>

        <TextField
          variant="outlined"
          label="twitter"
          {...register("social.twitter")}
        />
        <p>{errors.social?.twitter?.message}</p>

        <TextField
          variant="outlined"
          label="present number"
          {...register("phoneNumber.0")}
        />
        <p>{errors.phoneNumber?.message}</p>
        <TextField
          variant="outlined"
          label="parmanent number"
          {...register("phoneNumber.1")}
        />
        <p>{errors.phoneNumber?.message}</p>

        <Box>
          <Typography>This is phone number list</Typography>
          <Box>
            {fields?.map((field, index) => {
              return (
                <Box key={index}>
                  <TextField
                    variant="outlined"
                    label="addNUmber"
                    {...register(`phoneNumbers.${index}.number`)}
                  />
                  <Button onClick={() => remove(index)}>Remove</Button>
                </Box>
              );
            })}
            <Button onClick={() => append({ number: "" })}>Add Number</Button>
          </Box>
          <Button variant="text" color="secondary" onClick={handleValues}>
            get Value
          </Button>
          <Button variant="text" color="secondary" onClick={handleSetValues}>
            set Value
          </Button>
        </Box>
        <TextField type="submit" />
      </form>
    </Stack>
  );
};

export default HookFrom;
