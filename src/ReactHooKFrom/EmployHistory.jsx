const EmployHistory = () => {
  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "employmentHistory",
    control,
  });


  return (
    <div>
      <form onSubmit={handleSubmit(employHistory)}></form>
    </div>
  );
};

export default EmployHistory;
