import SimpleSchema from "simpl-schema";
import { extendSchema } from "../Utils/CollectionUtils";

SimpleSchema.extendOptions(["index", "unique", "denyInsert", "denyUpdate"]);

const Files = new Mongo.Collection("files", {
  idGeneration: "MONGO"
});

Files.schema = new SimpleSchema(
  extendSchema({
    userId: {
      type: Meteor.Collection.ObjectID,
      regEx: SimpleSchema.RegEx.Id,
      blackbox: true
    },
    author: {
      type: String,
      defaultValue: ""
    },
    title: {
      type: String,
      defaultValue: ""
    },
    file: {
      type: String,
      defaultValue: ""
    },
    status: {
      type: String,
      allowedValues: ["WAITING", "ONGOING", "CANCEL", "SUCCESS", "DELETED"],
      defaultValue: "WAITING" // WAITING, ONGOING, CANCEL, SUCCESS, DELETED
    },
    analysis: {
      type: Object,
      optional: true,
      defaultValue: {}
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    },
    deletedAt: {
      type: Date,
      optional: true
    }
  })
);

export default Files;
