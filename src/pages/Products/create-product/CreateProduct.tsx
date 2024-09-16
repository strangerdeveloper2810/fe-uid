import _ from "lodash";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { UploadChangeParam } from "antd/lib/upload";
import withLoadingIndicator from "../../../HOC/WithLoadingIndicatorProps";
import useProductApi from "../../../hooks/useProductApi";
import validationSchema from "./validation";
import { CreateProductType } from "../../../types/Product";

const CreateProduct: React.FC = () => {
  const [media, setMedia] = useState<File[]>([]);
  const { createProduct, loading } = useProductApi();

  const formik = useFormik<CreateProductType>({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      tags: "",
      productType: "",
      media: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const newProduct = {
        ...values,
        media,
      };
      createProduct(newProduct);
    },
  });

  const handleMediaChange = (info: UploadChangeParam) => {
    if (info.file.status === "done" && _.isObject(info.file.originFileObj)) {
      const newMedia = [...media, info.file.originFileObj as File];
      setMedia(newMedia);
      formik.setFieldValue("media", newMedia);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Form onFinish={formik.handleSubmit}>
      <Form.Item
        label="Title"
        validateStatus={
          formik.touched.title && formik.errors.title ? "error" : ""
        }
        help={
          formik.touched.title && formik.errors.title ? formik.errors.title : ""
        }
      >
        <Input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>
      <Form.Item
        label="Description"
        validateStatus={
          formik.touched.description && formik.errors.description ? "error" : ""
        }
        help={
          formik.touched.description && formik.errors.description
            ? formik.errors.description
            : ""
        }
      >
        <Editor
          apiKey="YOUR_TINYMCE_API_KEY" // Thay thế bằng API key của bạn
          initialValue=""
          value={formik.values.description}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help",
            content_css:
              "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/skins/content/default/content.min.css",
            skin_url:
              "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/skins/ui/oxide",
            external_plugins: {
              advlist:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/advlist/plugin.min.js",
              autolink:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/autolink/plugin.min.js",
              lists:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/lists/plugin.min.js",
              link: "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/link/plugin.min.js",
              image:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/image/plugin.min.js",
              charmap:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/charmap/plugin.min.js",
              print:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/print/plugin.min.js",
              preview:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/preview/plugin.min.js",
              anchor:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/anchor/plugin.min.js",
              searchreplace:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/searchreplace/plugin.min.js",
              visualblocks:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/visualblocks/plugin.min.js",
              code: "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/code/plugin.min.js",
              fullscreen:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/fullscreen/plugin.min.js",
              insertdatetime:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/insertdatetime/plugin.min.js",
              media:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/media/plugin.min.js",
              table:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/table/plugin.min.js",
              paste:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/paste/plugin.min.js",
              help: "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/help/plugin.min.js",
              wordcount:
                "https://cdn.jsdelivr.net/npm/tinymce@5.10.2/plugins/wordcount/plugin.min.js",
            },
          }}
          onEditorChange={(content) =>
            formik.setFieldValue("description", content)
          }
        />
      </Form.Item>
      <Form.Item
        label="Price"
        validateStatus={
          formik.touched.price && formik.errors.price ? "error" : ""
        }
        help={
          formik.touched.price && formik.errors.price ? formik.errors.price : ""
        }
      >
        <InputNumber
          name="price"
          value={formik.values.price}
          onChange={(value) => formik.setFieldValue("price", value)}
          onBlur={formik.handleBlur}
          min={0}
          step={0.01}
        />
      </Form.Item>
      <Form.Item
        label="Media"
        validateStatus={
          formik.touched.media && formik.errors.media ? "error" : ""
        }
        help={
          formik.touched.media && formik.errors.media ? formik.errors.media : ""
        }
      >
        <Upload
          name="media"
          listType="picture"
          multiple
          onChange={handleMediaChange}
          beforeUpload={() => false} // Prevent automatic upload
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Tags">
        <Input
          name="tags"
          value={formik.values.tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>
      <Form.Item label="Product Type">
        <Input
          name="productType"
          value={formik.values.productType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withLoadingIndicator(CreateProduct);
