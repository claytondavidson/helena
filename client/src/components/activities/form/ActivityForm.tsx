import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Segment, Form, Button } from "semantic-ui-react";
import { ActivityFormValues } from "../../../common/models/activity";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../common/form/TextInput";
import TextAreaInput from "../../../common/form/TextAreaInput";
import SelectInput from "../../../common/form/SelectInput";
import DateInput from "../../../common/form/DateInput";
import { category } from "../../../common/options/categoryOptions";
import { combineDateAndTime } from "../../../common/util/util";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import { RootStoreContext } from "../../../common/stores/rootStore";

const validate = combineValidators({
  title: isRequired("Title"),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "The description needs to be at least five characters",
    })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Date"),
  time: isRequired("Time"),
});

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    submitting,
    loadActivity,
    editActivity,
    createActivity,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setActivity(new ActivityFormValues(activity)))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <FinalForm
        validate={validate}
        initialValues={activity}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field
              name="title"
              placeholder={"Title"}
              value={activity.title}
              component={TextInput}
            />
            <Field
              name="description"
              placeholder={"Description"}
              value={activity.description}
              component={TextAreaInput}
              rows={3}
            />
            <Field
              name="category"
              placeholder={"Category"}
              value={activity.category}
              options={category}
              component={SelectInput}
            />
            <Form.Group widths={"equal"}>
              <Field
                name={"date"}
                placeholder={"Date"}
                date={true}
                value={activity.date}
                component={DateInput}
              />
              <Field
                name={"time"}
                placeholder={"Time"}
                time={true}
                value={activity.time}
                component={DateInput}
              />
            </Form.Group>
            <Field
              name={"city"}
              placeholder={"City"}
              value={activity.city}
              component={TextInput}
            />
            <Field
              name={"venue"}
              placeholder={"Venue"}
              value={activity.venue}
              component={TextInput}
            />
            <Button
              loading={submitting}
              disabled={loading || invalid || pristine}
              floated={"right"}
              positive
              type={"submit"}
              content={"submit"}
            />
            <Button
              disabled={loading}
              onClick={
                activity.id
                  ? () => history.push(`/activities/${activity.id}`)
                  : () => history.push("/activities")
              }
              floated={"right"}
              type={"button"}
              content={"cancel"}
            />
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(ActivityForm);
