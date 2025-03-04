import React from "react";
import { Editor } from "primereact/editor";
import { Formik, Field, Form } from "formik";
import { urlAxios } from "../../Services/URL";
import axios from "axios";

export default function BasicDemo({ name, label, placeholder, initialValues }) {

  const sendEssay = () => {
    axios.post(`https://mockapi.io/projects/67c352611851890165aec600`)
      .then(res => {})
      .catch(err => {})
  }


  return (
    <Formik
      initialValues={initialValues || { [name]: '' }}
      onSubmit={(values) => {
      }}
    >
      {({ setFieldValue, handleReset }) => (
        <Form>
          <div className="card">
            <Field name={name}>
              {({ field, form }) => (
                <div>
                  <Editor
                    value={field.value || placeholder}  // Ensure placeholder is a string
                    onTextChange={(e) => form.setFieldValue(name, e.htmlValue)}
                    label={label}
                    placeholder={placeholder}  // This will be used as a hint
                    style={{ height: '320px' }}
                  />
                  <div className="flex gap-5">
                    <button onClick={sendEssay} type="submit">اسال</button>
                    <button type="button">Reset</button>
                  </div>
                </div>
              )}
            </Field>
          </div>
        </Form>
      )}
    </Formik>
  );
}
