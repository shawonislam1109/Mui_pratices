// import DateAndTimePiker from "./Component/DateAndTimePiker";
// import AlertDialog from "./Component/Dialog";
// import StandardImageList from "./Component/ImageList";
// import MuiAutoComplete from "./Component/MuiAutoComplete";
// import MuiLayout from "./Component/MuiLayout";
// import Navbar from "./Component/Navbar";
// import DataTable from "./Component/Table";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FromValid from "./ReactHooKFrom/FromValid";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <Navbar />
        <MuiAutoComplete />
        <MuiLayout />
        <StandardImageList />
        <DataTable />
        <AlertDialog />
        <DateAndTimePiker />
        <HookFrom /> */}
        <FromValid />
      </LocalizationProvider>
    </>
  );
}

export default App;
