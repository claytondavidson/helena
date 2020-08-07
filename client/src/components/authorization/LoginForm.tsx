import React, { useContext } from "react";
import { Form, Button, Label, Header } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import TextInput from "../../common/form/TextInput";
import { RootStoreContext } from "../../common/stores/rootStore";
import { IUserFormValues } from "../../common/models/user";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtyFieldsSinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Header
            a={"h2"}
            content={"Login to Helena"}
            color={"teal"}
            textAlign={"center"}
          />
          <Field
            name={"email"}
            component={TextInput}
            placeholder={"email"}
          ></Field>
          <Field
            name={"password"}
            component={TextInput}
            placeholder={"password"}
            type={"password"}
          ></Field>
          {submitError && !dirtyFieldsSinceLastSubmit && (
            <Label color={"red"} basic content={submitError.statusText} />
          )}
          <Button
            disabled={(invalid && !dirtyFieldsSinceLastSubmit) || pristine}
            loading={submitting}
            positive
            content={"Login"}
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;
