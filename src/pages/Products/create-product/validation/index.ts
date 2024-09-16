import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be greater than 0"),
  media: Yup.mixed().required("At least one media file is required"),
});

export default validationSchema;
