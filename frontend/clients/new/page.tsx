import AddClientForm from "@/app/(control)/clients/new/(Components)/addClientForm";

const ClientNewPage = () => {
    // const [submitted, setSubmitted] = useState(false);
    //
    // const requestApi = (data: ClientInterface) => {};
    //
    // const convertToFormData = () => {
    //     const dataConverted = new FormData();
    //
    //     Object.entries(formData).forEach(([key, value]) => {
    //         if (value instanceof FileList) {
    //             Array.from(value).forEach((file: File) => {
    //                 dataConverted.append(key, file);
    //             });
    //         } else {
    //             dataConverted.append(key, value);
    //         }
    //     });
    //
    //     return formData;
    // };
    //
    // const sendForm = () => {
    //     setSubmitted(true);
    //
    //     console.log("save", formData);
    // };
    // const sendFormAndNew = () => {
    //     setSubmitted(true);
    //
    //     console.log("save and new", formData);
    // };
    // const handleUpload = (event: FileUploadSelectEvent) => {
    //     const files = event.files;
    //     if (files && files.length > 0) {
    //         setFormData({ ...formData, files });
    //     }
    // };
    //
    // const items = [
    //     {
    //         label: "Criar",
    //         icon: "pi pi-check",
    //         command: () => sendForm(),
    //     },
    //     {
    //         label: "Criar e um novo",
    //         icon: "pi pi-id-card",
    //         command: () => sendFormAndNew(),
    //     },
    // ];

    return (
        <div className="grid col-12 card h-full p-0">
            <AddClientForm />
        </div>
    );
};

export default ClientNewPage;
