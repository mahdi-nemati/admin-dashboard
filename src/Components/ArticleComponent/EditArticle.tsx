import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "./BackDrop";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneAsyncArticle, putAsyncArticle } from "../../Feature/FileSlice";
import { t } from "i18next";
import { useState } from "react";
import { toast } from "react-toastify";
//Formik & Yup imports
import { useFormik } from "formik";
import * as yup from "yup";
import TextFieldCustom from "../../common/TextFieldCustom";
export default function EditArticle() {
  const [hover, setHover] = useState(false);
  const variantChangeHandle = () => {
    setHover(!hover);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Article, error, loading } = useSelector(
    (store: any) => store.Article
  );
  useEffect(() => {
    dispatch(getOneAsyncArticle({id}));
  }, []);
  // set initail
  const initialValues = {
    title: Article.title,
    author: Article.author,
    body: Article.body,
  };
  // set validate
  const validationSchema = yup.object({
    title: yup.string().required("enter article's tilte").min(2),
    author: yup.string().required("enter article's author").min(2),
  });
  type onSubmitArgum = {
    title: string;
    author: string;
    body: string;
  };
  // submit
  const onSubmit = ({ title, author, body }: onSubmitArgum) => {
    dispatch(
      putAsyncArticle({ id, title, author, body, upload: Article.upload })
    );
    navigate("/home");
    toast.success(t("Successfully update !"));
  };
  // formik
  const formik = useFormik({
    validateOnMount: true,
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  if (loading) return <SimpleBackdrop />;
  if (error) return <p>something went wrong!</p>;

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mt: 1, width: 600 }}
      >
        <TextFieldCustom
          formik={formik}
          name="title"
          label="Title"
          type={""}
          focus={false}
          iconStart={undefined}
          iconEnd={undefined}
          InputProps={undefined}
        />
        <TextFieldCustom
          formik={formik}
          name="author"
          label="Author"
          type={""}
          focus={false}
          iconStart={undefined}
          iconEnd={undefined}
          InputProps={undefined}
        />
        <TextFieldCustom
          formik={formik}
          name="body"
          label="Content"
          type={""}
          focus={false}
          iconStart={undefined}
          iconEnd={undefined}
          InputProps={undefined}
        />
        <Button
          type="submit"
          fullWidth
          variant={hover ? "outlined" : "contained"}
          sx={{ mt: 3, mb: 2 }}
          disabled={!formik.isValid}
          onMouseEnter={variantChangeHandle}
          onMouseLeave={variantChangeHandle}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}
