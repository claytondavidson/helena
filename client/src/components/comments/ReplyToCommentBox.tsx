import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { RootStoreContext } from "../../common/stores/rootStore";
import { Button, Form, Segment, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import TextAreaInput from "../../common/form/TextAreaInput";
import { CommentFormValues, IComment } from "../../common/models/comment";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

const ReplyToCommentBox: React.FC<{ comm: any }> = ({ comm }) => {
    const rootStore = useContext(RootStoreContext);
    const { createReply, submitting } = rootStore.commentStore;
    const { user } = rootStore.userStore;
    const [loading] = useState(false);
    const [comment] = useState(new CommentFormValues());

    const handleCommentFormSubmit = (values: any) => {
        const { ...comment } = values;
        if (!comment.id) {
            let newComment = {
                ...comment,
                id: uuid(),
                parentId: comm.id,
                createdAt: new Date(),
                username: user!.username,
                displayName: user!.displayName,
                image: user!.image
            };
            console.log(newComment);
            createReply(comm.id, newComment);
        }
    };

    return (
        <Segment clearing>
            <FinalForm
                onSubmit={handleCommentFormSubmit}
                render={({ handleSubmit, invalid, pristine, form }) => (
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e);
                            form.reset();
                        }}
                    >
                        <Field
                            name={"body"}
                            placeholder={"What are your thoughts?"}
                            value={comment.body}
                            component={TextAreaInput}
                        />
                        <Button
                            loading={submitting}
                            disabled={loading || invalid || pristine}
                            floated={"right"}
                            positive
                            type={"submit"}
                            content={"comment"}
                        />
                    </Form>
                )}
            />
        </Segment>
    );
};

export default observer(ReplyToCommentBox);
